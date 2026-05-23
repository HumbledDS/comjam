/**
 * Generate -thumb.jpg + re-encode the wide JPG for already-numbered photos
 * passed as CLI args. Use when source JPGs were dropped into
 * public/media/photos/ already named NN.jpg (e.g. 27.jpg).
 *
 * Run: npm exec node -- scripts/thumb-existing.mjs 27 28 29
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = "public/media/photos";

async function processOne(num) {
  const src = path.join(DIR, `${num}.jpg`);
  const buf = await readFile(src);

  const wide = await sharp(buf)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(src, wide);

  await sharp(buf)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toFile(path.join(DIR, `${num}-thumb.jpg`));

  console.log(`✓ ${num}.jpg + ${num}-thumb.jpg`);
}

const nums = process.argv.slice(2);
if (nums.length === 0) {
  console.error("Usage: node scripts/thumb-existing.mjs <num> [num...]");
  process.exit(1);
}

for (const n of nums) {
  await processOne(n);
}
