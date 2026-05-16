/**
 * One-shot: take any UUID-named .jpg in public/media/photos/, renumber it
 * starting at the next available index, and generate a matching -thumb.jpg.
 *
 * Run: node scripts/add-new-photos.mjs
 */

import sharp from "sharp";
import { readdir, rename, readFile } from "node:fs/promises";
import path from "node:path";

const DIR = "public/media/photos";
const THUMB_WIDTH = 800;
const WIDE_WIDTH = 1600;

const isNumbered = (name) => /^\d+\.jpg$/.test(name);
const isUuid = (name) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg$/.test(name);

async function nextIndex() {
  const files = await readdir(DIR);
  const nums = files
    .filter(isNumbered)
    .map((f) => parseInt(f.split(".")[0], 10));
  return nums.length ? Math.max(...nums) + 1 : 1;
}

async function processFile(file, idx) {
  const num = String(idx).padStart(2, "0");
  const wide = path.join(DIR, `${num}.jpg`);
  const thumb = path.join(DIR, `${num}-thumb.jpg`);
  const src = path.join(DIR, file);

  const buf = await readFile(src);

  // Wide JPG (1600px max)
  await sharp(buf)
    .rotate()
    .resize({ width: WIDE_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(wide);

  // Thumb JPG (800px max)
  await sharp(buf)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toFile(thumb);

  // Delete the source UUID file
  await rename(src, `${src}.processed`);

  console.log(`✓ ${file} → ${num}.jpg + ${num}-thumb.jpg`);
}

async function main() {
  const files = (await readdir(DIR)).filter(isUuid).sort();
  if (files.length === 0) {
    console.log("No UUID-named photos to process.");
    return;
  }

  let idx = await nextIndex();
  console.log(`Found ${files.length} new photo(s). Starting at index ${idx}.\n`);

  for (const file of files) {
    await processFile(file, idx);
    idx += 1;
  }

  // Clean up the processed source files now that thumbnails exist
  for (const file of files) {
    const marker = path.join(DIR, `${file}.processed`);
    await rename(marker, marker.replace(".processed", ".tmp")).catch(() => {});
  }

  console.log("\nDone. Update lib/media.ts to include the new numbers.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
