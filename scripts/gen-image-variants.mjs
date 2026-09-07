#!/usr/bin/env node
import { readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/', import.meta.url).pathname;
const WIDTHS = [480, 768, 1280];
const MANIFEST = new URL('../src/data/image-variants.json', import.meta.url);
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
  const widths = src.includes("/hero-slides/") ? [...WIDTHS, 1920] : WIDTHS;
  for (const w of widths) {
    if (meta.width && meta.width <= w) continue;
    const out = join(dir, `${name}-${w}w.webp`);
    if (existsSync(out)) continue;
    await sharp(src).resize({ width: w }).webp({ quality: 80, effort: 4 }).toFile(out);
    made++;
  }
  return made;
}

const sources = (await walk(ROOT)).filter(src => !VARIANT_RE.test(src)).sort();
const manifest = {};
let total = 0;
for (const src of sources) {
  const n = await variantsFor(src);
  if (n > 0) console.log(`  ${src.replace(ROOT, '')}: +${n}`);
  total += n;
  const meta = await sharp(src).metadata();
  const { dir, name } = parse(src);
  const variants = [];
  for (const width of [...WIDTHS, 1920]) {
    const file = join(dir, `${name}-${width}w.webp`);
    if (existsSync(file)) variants.push({ src: '/' + file.slice(ROOT.length), width });
  }
  variants.push({ src: '/' + src.slice(ROOT.length), width: meta.width });
  manifest['/' + src.slice(ROOT.length)] = { width: meta.width, height: meta.height, variants };

}
console.log(`\nGenerated ${total} variants across ${sources.length} sources.`);

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
