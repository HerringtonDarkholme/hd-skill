#!/usr/bin/env node
// Runs the skill evaluation: each task in evals/tasks/ is given to a fresh
// headless Claude Code session that has only the hd-lang skill installed,
// then graded with hidden tests, end-to-end runs and idiom checks.
//
//   node evals/run.mjs --label baseline --model haiku
//   node evals/run.mjs --reference              # grade the reference solutions instead
//   node evals/run.mjs --label x --tasks 05,07  # only tasks whose id contains a word
//   node evals/run.mjs --label x --regrade      # grade existing workspaces again, no agent runs
//
// Environment: HD (default `hd`), CLAUDE (default `claude`).

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import zlib from 'node:zlib';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.dirname(here);
const HD = process.env.HD || 'hd';
const CLAUDE = process.env.CLAUDE || 'claude';

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i < 0 ? fallback : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

const reference = has('reference');
const regrade = has('regrade');
const label = reference ? 'reference' : flag('label', 'baseline');
const model = flag('model', 'haiku');
const concurrency = Number(flag('concurrency', '4'));
const only = (flag('tasks', '') || '').split(',').filter(Boolean);
const agentTimeoutMs = Number(flag('timeout-min', '25')) * 60_000;

const tasksDir = path.join(here, 'tasks');
const resultsDir = path.join(here, 'results', label);
const workRoot = path.join(os.tmpdir(), 'hd-skill-evals', label);

const PREAMBLE = `
---
Work in the current directory: create the hd package here, with the package
name given above. The \`hd\` command is installed. Write tests for your code.
When you finish, \`hd check --tests\` and \`hd test\` must pass. Don't search
this machine or the internet for hd-lang sources or documentation.`;

const ALLOWED_TOOLS = [
  'Bash(hd:*)', 'Bash(ls:*)', 'Bash(printf:*)', 'Bash(echo:*)', 'Bash(mkdir:*)',
  'Bash(cd:*)', 'Bash(pwd)', 'Skill',
];

// ---------- helpers ----------

function sh(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', timeout: 180_000, maxBuffer: 64 << 20, ...opts });
  return { status: r.status, stdout: r.stdout || '', stderr: r.stderr || '', timedOut: r.error?.code === 'ETIMEDOUT' };
}

function jsonLines(text) {
  return text.split('\n').filter((l) => l.startsWith('{')).map((l) => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const HIDDEN_FILE = 'zz_hidden_eval.hd';

function agentFiles(ws) {
  const files = [...walk(path.join(ws, 'src')), ...walk(path.join(ws, 'tests'))]
    .filter((f) => f.endsWith('.hd') && path.basename(f) !== HIDDEN_FILE);
  return files;
}

function readScope(ws, scope) {
  if (scope === 'hd.toml') return fs.existsSync(path.join(ws, 'hd.toml')) ? fs.readFileSync(path.join(ws, 'hd.toml'), 'utf8') : '';
  const files = agentFiles(ws).filter((f) => scope === 'all' || f.startsWith(path.join(ws, 'src')));
  return files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
}

function capabilitiesSection(toml) {
  const m = toml.match(/^\[capabilities\]\s*\n([\s\S]*?)(?=^\[|$(?![\s\S]))/m);
  if (!m) return [];
  return m[1].split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean)
    .map((l) => { const [k, v] = l.split('=').map((s) => s.trim()); return { name: k, value: v }; })
    .filter((c) => c.value !== 'false');
}

// ---------- grading ----------

function grade(task, ws) {
  const g = { check: {}, own_tests: {}, hidden: {}, runs: [], idiom: [], fmt_clean: null };

  // 1. The package checks, with its tests.
  const check = sh(HD, ['check', '--all', '--format', 'json'], { cwd: ws });
  const diags = jsonLines(check.stdout + check.stderr).filter((d) => d.kind === 'diagnostic');
  const errors = diags.filter((d) => d.severity === 'error');
  g.check = { ok: check.status === 0 && errors.length === 0, errors: errors.length, codes: [...new Set(errors.map((d) => d.code))] };

  // 2. The agent's own tests.
  const own = sh(HD, ['test', '--format', 'json', '--time-limit', '60s'], { cwd: ws });
  const ownCases = jsonLines(own.stdout).filter((d) => d.kind === 'test');
  g.own_tests = {
    cases: ownCases.length,
    passed: ownCases.filter((c) => c.outcome === 'passed').length,
    failed: ownCases.filter((c) => c.outcome !== 'passed').map((c) => c.name),
  };

  // 3. Hidden tests, dropped in as an integration test.
  const hiddenSrc = path.join(task.dir, 'hidden', 'hidden.hd');
  if (fs.existsSync(hiddenSrc)) {
    fs.mkdirSync(path.join(ws, 'tests'), { recursive: true });
    const dest = path.join(ws, 'tests', HIDDEN_FILE);
    fs.copyFileSync(hiddenSrc, dest);
    const r = sh(HD, ['test', '--format', 'json', '--time-limit', '60s', '--filter', 'hidden'], { cwd: ws });
    fs.rmSync(dest);
    const lines = jsonLines(r.stdout);
    const cases = lines.filter((d) => d.kind === 'test' && d.name.startsWith('hidden'));
    const ok = (c) => c.name.startsWith('hidden-panics:')
      ? c.outcome === 'failed' && /panic/.test(c.message)
      : c.outcome === 'passed';
    const compileErrors = lines.filter((d) => d.kind === 'diagnostic' && d.severity === 'error');
    g.hidden = {
      expected: task.expected_hidden ?? cases.length,
      passed: cases.filter(ok).length,
      failed: cases.filter((c) => !ok(c)).map((c) => `${c.name}: ${c.message}`.slice(0, 300)),
      compile_errors: compileErrors.map((d) => `${d.file}:${d.line}: ${d.code}: ${d.message}`.slice(0, 300)),
    };
  }

  // 4. End-to-end runs of the built program.
  for (const [rel, text] of Object.entries(task.files || {})) {
    fs.mkdirSync(path.dirname(path.join(ws, rel)), { recursive: true });
    fs.writeFileSync(path.join(ws, rel), text);
  }
  for (const run of task.runs || []) {
    const r = sh(HD, ['run', '--time-limit', '30s', '--', ...run.args], { cwd: ws, input: run.stdin });
    const okOut = r.stdout === run.stdout;
    const okStatus = r.status === run.status;
    const okErr = !run.stderr_contains || r.stderr.includes(run.stderr_contains);
    g.runs.push({ args: run.args, ok: okOut && okStatus && okErr, status: r.status, stdout: r.stdout.slice(0, 400), stderr: r.stderr.slice(0, 400) });
  }

  // 5. Idiom checks.
  for (const c of task.idiom || []) {
    let ok;
    if (c.kind === 'min_tests') {
      const n = (readScope(ws, 'all').match(/^\s*(it|it_each|it_prop|it_prop_with)\(/gm) || []).length;
      ok = n >= c.n;
    } else if (c.kind === 'capabilities_only') {
      const caps = capabilitiesSection(readScope(ws, 'hd.toml')).map((x) => x.name);
      ok = caps.length > 0 && caps.every((x) => c.allow.includes(x));
    } else {
      ok = new RegExp(c.pattern, 'm').test(readScope(ws, c.scope)) === c.expect;
    }
    g.idiom.push({ id: c.id, desc: c.desc, ok });
  }

  // 6. Formatting.
  g.fmt_clean = sh(HD, ['fmt', '--check'], { cwd: ws }).status === 0;

  const hiddenOk = !g.hidden.expected || g.hidden.passed === g.hidden.expected;
  g.pass = g.check.ok && hiddenOk && g.runs.every((r) => r.ok);
  g.idiom_score = g.idiom.length ? g.idiom.filter((i) => i.ok).length / g.idiom.length : null;
  return g;
}

// ---------- transcript metrics ----------

function metrics(transcriptPath) {
  const m = {
    skill_invoked: false, pages_read: [], bash: 0, hd: {}, denied: [], diagnostic_codes: {},
    failing_checks: 0, turns: null, cost_usd: null, duration_s: null, tokens: null, final_message: '',
  };
  const gz = `${transcriptPath}.gz`;
  let text;
  if (fs.existsSync(transcriptPath)) text = fs.readFileSync(transcriptPath, 'utf8');
  else if (fs.existsSync(gz)) text = zlib.gunzipSync(fs.readFileSync(gz)).toString('utf8');
  else return m;
  const events = jsonLines(text);
  const uses = new Map();
  for (const e of events) {
    const content = e.message?.content;
    if (e.type === 'assistant' && Array.isArray(content)) {
      for (const c of content) {
        if (c.type !== 'tool_use') continue;
        uses.set(c.id, c);
        if (c.name === 'Skill' && /hd-lang/.test(JSON.stringify(c.input))) m.skill_invoked = true;
        if (c.name === 'Read' && c.input?.file_path?.includes('/.claude/skills/hd-lang/')) {
          const rel = c.input.file_path.split('/.claude/skills/hd-lang/')[1];
          if (rel.endsWith('.md')) m.pages_read.push(rel);
          if (rel === 'SKILL.md') m.skill_invoked = true;
        }
        if (c.name === 'Bash') {
          m.bash++;
          for (const sub of ['check', 'test', 'run', 'doc', 'fmt', 'lint', 'new', 'help']) {
            const n = (c.input.command.match(new RegExp(`\\bhd ${sub}\\b`, 'g')) || []).length;
            if (n) m.hd[sub] = (m.hd[sub] || 0) + n;
          }
          const files = (c.input.command.match(/\bhd [\w./-]+\.hd\b/g) || []).length;
          if (files) m.hd.file = (m.hd.file || 0) + files;
        }
      }
    }
    if (e.type === 'user' && Array.isArray(content)) {
      for (const c of content) {
        if (c.type !== 'tool_result') continue;
        const use = uses.get(c.tool_use_id);
        if (use?.name !== 'Bash' || !/\bhd\b/.test(use.input.command)) continue;
        const text = typeof c.content === 'string' ? c.content : (c.content || []).map((x) => x.text || '').join('\n');
        const codes = [
          ...[...text.matchAll(/"code":"([a-z][a-z0-9-]*)","severity":"error"/g)].map((x) => x[1]),
          ...[...text.matchAll(/^error: [^\n:]+:\d+:\d+: ([a-z][a-z0-9-]*):/gm)].map((x) => x[1]),
        ];
        for (const code of codes) m.diagnostic_codes[code] = (m.diagnostic_codes[code] || 0) + 1;
        if (/\bhd check\b/.test(use.input.command) && codes.length) m.failing_checks++;
      }
    }
    if (e.type === 'result') {
      m.turns = e.num_turns;
      m.cost_usd = e.total_cost_usd;
      m.duration_s = Math.round((e.duration_ms || 0) / 1000);
      const u = e.usage || {};
      m.tokens = (u.input_tokens || 0) + (u.output_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
      m.denied = (e.permission_denials || []).map((d) => `${d.tool_name}: ${d.tool_input?.command || d.tool_input?.file_path || ''}`.slice(0, 200));
      m.final_message = (e.result || '').slice(0, 1500);
      m.is_error = e.is_error;
    }
  }
  return m;
}

// ---------- running one task ----------

function loadTasks() {
  return fs.readdirSync(tasksDir).sort()
    .filter((id) => !only.length || only.some((w) => id.includes(w)))
    .map((id) => ({ id, dir: path.join(tasksDir, id), ...JSON.parse(fs.readFileSync(path.join(tasksDir, id, 'task.json'), 'utf8')) }));
}

function runAgent(task, ws, transcriptPath) {
  const prompt = fs.readFileSync(path.join(task.dir, 'prompt.md'), 'utf8') + PREAMBLE;
  const args = [
    '-p', prompt, '--model', model,
    '--setting-sources', 'project,local', '--strict-mcp-config',
    '--permission-mode', 'acceptEdits', '--permission-prompts', 'none',
    '--allowedTools', ...ALLOWED_TOOLS,
    '--disallowedTools', 'WebFetch', 'WebSearch', 'Agent',
    '--output-format', 'stream-json', '--verbose', '--no-session-persistence',
  ];
  return new Promise((resolve) => {
    const out = fs.createWriteStream(transcriptPath);
    const child = spawn(CLAUDE, args, { cwd: ws, stdio: ['ignore', 'pipe', 'pipe'] });
    child.stdout.pipe(out);
    let stderr = '';
    child.stderr.on('data', (d) => { stderr += d; });
    const timer = setTimeout(() => child.kill('SIGTERM'), agentTimeoutMs);
    child.on('close', (code) => { clearTimeout(timer); out.end(); resolve({ code, stderr: stderr.slice(-2000) }); });
  });
}

function prepareWorkspace(task) {
  const ws = path.join(workRoot, task.id, task.package);
  if (!regrade) {
    fs.rmSync(path.dirname(ws), { recursive: true, force: true });
    fs.mkdirSync(ws, { recursive: true });
    if (reference) {
      fs.cpSync(path.join(task.dir, 'reference'), ws, { recursive: true });
    } else {
      fs.cpSync(path.join(repo, 'skills', 'hd-lang'), path.join(ws, '.claude', 'skills', 'hd-lang'), { recursive: true });
    }
  }
  return ws;
}

function saveSolution(ws, dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  for (const f of [path.join(ws, 'hd.toml'), ...agentFiles(ws)]) {
    if (!fs.existsSync(f)) continue;
    const to = path.join(dest, path.relative(ws, f));
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(f, to);
  }
}

async function runTask(task) {
  const out = path.join(resultsDir, task.id);
  fs.mkdirSync(out, { recursive: true });
  const ws = prepareWorkspace(task);
  const transcript = path.join(out, 'transcript.jsonl');
  let agent = null;
  if (!reference && !regrade) {
    process.stderr.write(`[${task.id}] agent started\n`);
    agent = await runAgent(task, ws, transcript);
  }
  const g = grade(task, ws);
  const m = reference ? null : metrics(transcript);
  if (fs.existsSync(transcript)) {
    // Kept compressed: the transcripts are the log of what the agent got wrong.
    fs.writeFileSync(`${transcript}.gz`, zlib.gzipSync(fs.readFileSync(transcript)));
    fs.rmSync(transcript);
  }
  if (!reference) saveSolution(ws, path.join(out, 'solution'));
  const result = { task: task.id, package: task.package, scenario: task.scenario, selling_points: task.selling_points, grade: g, metrics: m, agent_exit: agent?.code ?? null, agent_stderr: agent?.stderr || undefined };
  fs.writeFileSync(path.join(out, 'result.json'), JSON.stringify(result, null, 2) + '\n');
  process.stderr.write(`[${task.id}] ${g.pass ? 'PASS' : 'FAIL'} hidden ${g.hidden.passed ?? '-'}/${g.hidden.expected ?? '-'} idiom ${g.idiom_score?.toFixed(2)}\n`);
  return result;
}

// ---------- summary ----------

function summarize(results) {
  const pct = (x) => (x == null ? '–' : `${Math.round(x * 100)}%`);
  const sum = (f) => results.reduce((a, r) => a + (f(r) || 0), 0);
  const lines = [];
  const sha = sh('git', ['rev-parse', '--short', 'HEAD'], { cwd: repo }).stdout.trim();
  const hdv = sh(HD, ['--version']).stdout.trim() || sh(HD, ['--version']).stderr.split('\n')[0];
  lines.push(`# Evaluation: ${label}`, '');
  lines.push(`- Skill: hd-skill ${sha}; model: \`${model}\`; date: ${new Date().toISOString().slice(0, 10)}`);
  if (!reference) {
    lines.push(`- Passed: **${results.filter((r) => r.grade.pass).length} / ${results.length}**`);
    lines.push(`- Mean idiom score: **${pct(sum((r) => r.grade.idiom_score) / results.length)}**`);
    lines.push(`- Skill opened: ${results.filter((r) => r.metrics.skill_invoked).length} / ${results.length}`);
    lines.push(`- Total cost: $${sum((r) => r.metrics.cost_usd).toFixed(2)}; turns: ${sum((r) => r.metrics.turns)}`);
  }
  lines.push('', '| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const r of results) {
    const g = r.grade, m = r.metrics || {};
    const runs = g.runs.length ? `${g.runs.filter((x) => x.ok).length}/${g.runs.length}` : '–';
    const hidden = g.hidden.expected ? `${g.hidden.passed}/${g.hidden.expected}` : '–';
    lines.push(`| ${r.task} | ${g.pass ? '✅' : '❌'} | ${g.check.ok ? 'ok' : `${g.check.errors} err`} | ${hidden} | ${runs} | ${pct(g.idiom_score)} | ${g.own_tests.passed}/${g.own_tests.cases} | ${m.skill_invoked ? 'yes' : 'no'} | ${m.pages_read?.length ?? '–'} | ${m.hd?.check ?? 0} (${m.failing_checks ?? 0}) | ${m.turns ?? '–'} | ${m.cost_usd != null ? '$' + m.cost_usd.toFixed(2) : '–'} |`);
  }
  // Idiom misses.
  lines.push('', '## Idiom checks missed', '');
  for (const r of results) {
    const missed = r.grade.idiom.filter((i) => !i.ok);
    if (missed.length) lines.push(`- **${r.task}**: ${missed.map((i) => i.desc).join('; ')}`);
  }
  if (!reference) {
    // Diagnostics across all runs.
    const codes = {};
    for (const r of results) for (const [k, v] of Object.entries(r.metrics.diagnostic_codes)) codes[k] = (codes[k] || 0) + v;
    lines.push('', '## Diagnostics the agents hit', '', '| Code | Count |', '| --- | --- |');
    for (const [k, v] of Object.entries(codes).sort((a, b) => b[1] - a[1])) lines.push(`| \`${k}\` | ${v} |`);
    // Pages.
    const pages = {};
    for (const r of results) for (const p of new Set(r.metrics.pages_read)) pages[p] = (pages[p] || 0) + 1;
    lines.push('', '## Skill pages opened (tasks that opened each)', '', '| Page | Tasks |', '| --- | --- |');
    for (const [k, v] of Object.entries(pages).sort((a, b) => b[1] - a[1])) lines.push(`| ${k} | ${v} |`);
  }
  // Failures.
  lines.push('', '## Failures', '');
  for (const r of results) {
    const g = r.grade;
    const notes = [];
    if (!g.check.ok) notes.push(`check: ${g.check.codes.join(', ')}`);
    if (g.hidden.compile_errors?.length) notes.push(`hidden tests did not compile: ${g.hidden.compile_errors.slice(0, 3).join(' / ')}`);
    if (g.hidden.failed?.length) notes.push(`hidden failed: ${g.hidden.failed.slice(0, 4).join(' / ')}`);
    for (const run of g.runs.filter((x) => !x.ok)) notes.push(`run \`${run.args.join(' ')}\`: status ${run.status}, stdout ${JSON.stringify(run.stdout.slice(0, 80))}, stderr ${JSON.stringify(run.stderr.slice(0, 120))}`);
    if (notes.length) lines.push(`- **${r.task}**`, ...notes.map((n) => `  - ${n}`));
  }
  return lines.join('\n') + '\n';
}

// ---------- main ----------

const tasks = loadTasks();
fs.mkdirSync(resultsDir, { recursive: true });
const results = new Array(tasks.length);
let next = 0;
await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, async () => {
  while (next < tasks.length) {
    const i = next++;
    results[i] = await runTask(tasks[i]);
  }
}));

if (reference && has('write-expected')) {
  for (const r of results) {
    const file = path.join(tasksDir, r.task, 'task.json');
    const t = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (r.grade.hidden.expected) t.expected_hidden = r.grade.hidden.passed;
    fs.writeFileSync(file, JSON.stringify(t, null, 2) + '\n');
  }
}

fs.writeFileSync(path.join(resultsDir, 'summary.json'), JSON.stringify(results, null, 2) + '\n');
fs.writeFileSync(path.join(resultsDir, 'summary.md'), summarize(results));
process.stdout.write(summarize(results));
