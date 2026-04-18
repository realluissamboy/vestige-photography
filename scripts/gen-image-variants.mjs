#!/usr/bin/env node
import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/', import.meta.url).pathname;
const WIDTHS = [480, 768, 1280];
const VARIANT_RE = /-(\d+)w\.webp$/;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (e.isFile() && e.name.endsWith('.webp')) files.push(p);
  }
  return files;
}

async function variantsFor(src) {
  if (VARIANT_RE.test(src)) return 0;
  const { dir, name } = parse(src);
  const meta = await sharp(src).metadata();
  let made = 0;
  for (const w of WIDTHS) {
    if (meta.width && meta.width <= w) continue;
    const out = join(dir, `${name}-${w}w.webp`);
    if (existsSync(out)) continue;
    await sharp(src).resize({ width: w }).webp({ quality: 80, effort: 4 }).toFile(out);
    made++;
  }
  return made;
}

const sources = await walk(ROOT);
let total = 0;
for (const src of sources) {
  const n = await variantsFor(src);
  if (n > 0) console.log(`  ${src.replace(ROOT, '')}: +${n}`);
  total += n;
}
console.log(`\nGenerated ${total} variants across ${sources.length} sources.`);
