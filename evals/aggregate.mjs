#!/usr/bin/env node
// Merges several runs of evals/run.mjs (trials) into one report.
//
//   node evals/aggregate.mjs baseline baseline-t1 baseline-t2 baseline-t3
//
// The first argument names the report: evals/results/<name>.md.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [name, ...labels] = process.argv.slice(2);
if (!name || !labels.length) {
  console.error('usage: node evals/aggregate.mjs NAME LABEL...');
  process.exit(2);
}

const runs = labels.map((l) => JSON.parse(fs.readFileSync(path.join(here, 'results', l, 'summary.json'), 'utf8')));
const byTask = new Map();
for (const run of runs) for (const r of run) {
  if (!byTask.has(r.task)) byTask.set(r.task, []);
  byTask.get(r.task).push(r);
}

const pct = (x) => (x == null || Number.isNaN(x) ? '–' : `${Math.round(x * 100)}%`);
const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
const all = [...byTask.values()].flat();
const trials = runs.length;

const lines = [];
lines.push(`# Evaluation: ${name}`, '');
lines.push(`${byTask.size} tasks × ${trials} trials = ${all.length} runs (${labels.join(', ')}).`, '');
lines.push(`- Runs passed: **${all.filter((r) => r.grade.pass).length} / ${all.length}** (${pct(mean(all.map((r) => (r.grade.pass ? 1 : 0))))})`);
lines.push(`- Tasks passed in every trial: **${[...byTask.values()].filter((rs) => rs.every((r) => r.grade.pass)).length} / ${byTask.size}**; in at least one: ${[...byTask.values()].filter((rs) => rs.some((r) => r.grade.pass)).length} / ${byTask.size}`);
lines.push(`- Hidden cases passed: ${all.reduce((a, r) => a + (r.grade.hidden.passed || 0), 0)} / ${all.reduce((a, r) => a + (r.grade.hidden.expected || 0), 0)}`);
lines.push(`- Mean idiom score: **${pct(mean(all.map((r) => r.grade.idiom_score)))}**`);
lines.push(`- Package checks clean: ${all.filter((r) => r.grade.check.ok).length} / ${all.length}; \`hd fmt\` clean: ${all.filter((r) => r.grade.fmt_clean).length} / ${all.length}`);
lines.push(`- Skill opened: ${all.filter((r) => r.metrics.skill_invoked).length} / ${all.length}; reference pages opened per run: ${mean(all.map((r) => r.metrics.pages_read.length)).toFixed(1)}`);
lines.push(`- \`hd check\` calls per run: ${mean(all.map((r) => r.metrics.hd.check || 0)).toFixed(1)}, of which failing: ${mean(all.map((r) => r.metrics.failing_checks)).toFixed(1)}; \`hd doc\` invocations: ${all.reduce((a, r) => a + (r.metrics.hd.doc || 0), 0)} in all`);
lines.push(`- Turns per run: ${mean(all.map((r) => r.metrics.turns || 0)).toFixed(1)}; time per run: ${Math.round(mean(all.map((r) => r.metrics.duration_s || 0)))} s; total cost: $${all.reduce((a, r) => a + (r.metrics.cost_usd || 0), 0).toFixed(2)}`);

lines.push('', '## By task', '', '| Task | Scenario | Passed | Hidden | Runs | Idiom | Failing / all checks | Pages | Turns |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
for (const [task, rs] of byTask) {
  const hidden = rs[0].grade.hidden.expected ? `${rs.reduce((a, r) => a + r.grade.hidden.passed, 0)}/${rs.reduce((a, r) => a + r.grade.hidden.expected, 0)}` : '–';
  const runsOk = rs[0].grade.runs.length ? `${rs.reduce((a, r) => a + r.grade.runs.filter((x) => x.ok).length, 0)}/${rs.reduce((a, r) => a + r.grade.runs.length, 0)}` : '–';
  const checks = `${rs.reduce((a, r) => a + r.metrics.failing_checks, 0)}/${rs.reduce((a, r) => a + (r.metrics.hd.check || 0), 0)}`;
  lines.push(`| ${task} | ${rs[0].scenario} | ${rs.filter((r) => r.grade.pass).length}/${rs.length} | ${hidden} | ${runsOk} | ${pct(mean(rs.map((r) => r.grade.idiom_score)))} | ${checks} | ${mean(rs.map((r) => r.metrics.pages_read.length)).toFixed(1)} | ${mean(rs.map((r) => r.metrics.turns || 0)).toFixed(0)} |`);
}

lines.push('', '## Idiom checks', '', 'How often each design move appeared, across trials.', '', '| Task | Check | Hit |', '| --- | --- | --- |');
for (const [task, rs] of byTask) {
  for (const c of rs[0].grade.idiom) {
    const hits = rs.filter((r) => r.grade.idiom.find((i) => i.id === c.id)?.ok).length;
    lines.push(`| ${task} | ${c.desc} | ${hits}/${rs.length} |`);
  }
}

const codes = {};
for (const r of all) for (const [k, v] of Object.entries(r.metrics.diagnostic_codes)) {
  codes[k] ??= { count: 0, runs: 0 };
  codes[k].count += v;
  codes[k].runs += 1;
}
lines.push('', '## Diagnostics the agents hit', '', 'From `hd` output in the transcripts, while the agents worked.', '', '| Code | Times | Runs |', '| --- | --- | --- |');
for (const [k, v] of Object.entries(codes).sort((a, b) => b[1].count - a[1].count)) lines.push(`| \`${k}\` | ${v.count} | ${v.runs} |`);

const pages = {};
for (const r of all) for (const p of new Set(r.metrics.pages_read)) pages[p] = (pages[p] || 0) + 1;
lines.push('', '## Reference pages opened', '', '| Page | Runs |', '| --- | --- |');
for (const [k, v] of Object.entries(pages).sort((a, b) => b[1] - a[1])) lines.push(`| ${k} | ${v} |`);

const denied = {};
for (const r of all) for (const d of r.metrics.denied) {
  const key = d.split(':')[0] + ': ' + (d.split(':').slice(1).join(':').trim().split(/\s+/)[0] || '');
  denied[key] = (denied[key] || 0) + 1;
}
if (Object.keys(denied).length) {
  lines.push('', '## Denied tool calls', '', '| Call | Times |', '| --- | --- |');
  for (const [k, v] of Object.entries(denied).sort((a, b) => b[1] - a[1])) lines.push(`| \`${k}\` | ${v} |`);
}

lines.push('', '## Failures', '');
for (const [task, rs] of byTask) {
  const notes = [];
  rs.forEach((r, i) => {
    const g = r.grade;
    const t = `trial ${i + 1}`;
    if (!g.check.ok) notes.push(`${t}: check fails: ${g.check.codes.join(', ')}`);
    if (g.hidden.compile_errors?.length) notes.push(`${t}: hidden tests don't compile: ${g.hidden.compile_errors[0]}`);
    else if (g.hidden.failed?.length) notes.push(`${t}: hidden failed: ${g.hidden.failed.slice(0, 3).join(' / ')}`);
    for (const run of g.runs.filter((x) => !x.ok)) notes.push(`${t}: run \`${run.args.join(' ')}\`: status ${run.status}, stdout ${JSON.stringify(run.stdout.slice(0, 60))}, stderr ${JSON.stringify(run.stderr.slice(0, 100))}`);
  });
  if (notes.length) lines.push(`- **${task}**`, ...notes.map((n) => `  - ${n.replace(/\n/g, ' ')}`));
}

const out = path.join(here, 'results', `${name}.md`);
fs.writeFileSync(out, lines.join('\n') + '\n');
process.stdout.write(lines.join('\n') + '\n');
