#!/usr/bin/env node
import { mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SOURCE = '/Users/luissamboy/Downloads/Susana Photos/Website Candidates';
const OUTPUT = new URL('../work/optimized-candidates/', import.meta.url).pathname;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VARIANT_WIDTHS = [480, 768];

async function filesIn(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return entries.filter(entry => entry.isFile() && EXTENSIONS.has(parse(entry.name).ext.toLowerCase()));
}

const categories = (await readdir(SOURCE, { withFileTypes: true })).filter(entry => entry.isDirectory());
let converted = 0;
let variants = 0;

for (const category of categories) {
  const sourceFolder = join(SOURCE, category.name);
  const outputFolder = join(OUTPUT, category.name);
  await mkdir(outputFolder, { recursive: true });
  for (const entry of await filesIn(sourceFolder)) {
    const source = join(sourceFolder, entry.name);
    const name = parse(entry.name).name;
    const base = join(outputFolder, `${name}.webp`);
    if (!existsSync(base)) {
      await sharp(source).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 4 }).toFile(base);
      converted++;
    }
    const metadata = await sharp(base).metadata();
    const widths = [...VARIANT_WIDTHS];
    if (metadata.width && metadata.height && metadata.width > metadata.height) widths.push(1280);
    for (const width of widths) {
      if (!metadata.width || metadata.width <= width) continue;
      const variant = join(outputFolder, `${name}-${width}w.webp`);
      if (existsSync(variant)) continue;
      await sharp(base).resize({ width }).webp({ quality: 80, effort: 4 }).toFile(variant);
      variants++;
    }
  }
}

console.log(`Converted ${converted} source files and generated ${variants} responsive variants in ${OUTPUT}`);
