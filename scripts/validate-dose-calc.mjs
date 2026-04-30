/**
 * Validates all `data-dose-calc` attributes in repo HTML against dose-calc/compute.js.
 * Run from repo root: `npm run validate:dose-calc`
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDoseCalcAttr, computePerDose } from '../dose-calc/compute.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function walkHtmlFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkHtmlFiles(p, acc);
    else if (name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

/** Matches data-dose-calc='...' (single-quoted JSON inside HTML attributes). */
const ATTR_RE = /data-dose-calc='([^']*)'/g;

function collectSpecs(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const rel = filePath.slice(root.length + 1).replace(/\\/g, '/');
  const specs = [];
  let m;
  ATTR_RE.lastIndex = 0;
  while ((m = ATTR_RE.exec(text)) !== null) {
    specs.push({ rel, json: m[1], index: m.index });
  }
  return specs;
}

const files = [
  join(root, 'index.html'),
  ...walkHtmlFiles(join(root, 'diseases')),
];

let total = 0;
const errors = [];

for (const file of files) {
  for (const { rel, json } of collectSpecs(file)) {
    total++;
    const spec = parseDoseCalcAttr(json);
    if (!spec) {
      errors.push(`${rel}: invalid JSON or empty data-dose-calc`);
      continue;
    }
    const out = computePerDose(40, spec);
    if (out.error) {
      errors.push(`${rel}: computePerDose rejects spec (${out.error}): ${json}`);
    }
  }
}

if (errors.length) {
  console.error(`validate-dose-calc: ${errors.length} error(s) in ${total} attribute(s)\n`);
  errors.forEach(function (e) {
    console.error('  - ' + e);
  });
  process.exit(1);
}

console.log(`validate-dose-calc: OK — ${total} data-dose-calc attribute(s) checked`);
