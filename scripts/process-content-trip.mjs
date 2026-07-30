/**
 * One-shot: process the Content Trip source assets from public/lanzarote/
 * into web-ready files under public/media/content-trip/.
 *
 * - Amsterdam edition photos → amsterdam-N.jpg (1600px) + amsterdam-N-thumb.jpg (800px)
 * - Villa Lanzarote → villa.jpg + villa-thumb.jpg
 * - Portraits → jamila.jpg / djeneba.jpg / sia.jpg (800px square-ish crop kept)
 * - Videos → copied as amsterdam-video-1.mp4 / amsterdam-video-2.mp4 (already small)
 *
 * Run: node scripts/process-content-trip.mjs
 */
import sharp from "sharp";
import { readdir, readFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const SRC = "public/lanzarote";
const OUT = "public/media/content-trip";

async function jpg(buf, width, dest, quality = 80) {
  await sharp(buf)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(dest);
  console.log("✓", dest);
}

await mkdir(OUT, { recursive: true });

// Amsterdam photos
const amsDir = path.join(SRC, "edition_passee_amsterdam");
const amsFiles = (await readdir(amsDir))
  .filter((f) => f.toLowerCase().endsWith(".jpeg") || f.toLowerCase().endsWith(".jpg"))
  .sort();
let i = 1;
for (const f of amsFiles) {
  const buf = await readFile(path.join(amsDir, f));
  await jpg(buf, 1600, path.join(OUT, `amsterdam-${i}.jpg`));
  await jpg(buf, 800, path.join(OUT, `amsterdam-${i}-thumb.jpg`), 74);
  i += 1;
}

// Amsterdam videos (small enough to copy as-is)
const amsVideos = (await readdir(amsDir)).filter((f) => f.endsWith(".mp4")).sort();
let v = 1;
for (const f of amsVideos) {
  const dest = path.join(OUT, `amsterdam-video-${v}.mp4`);
  await copyFile(path.join(amsDir, f), dest);
  console.log("✓", dest);
  v += 1;
}

// Villa Lanzarote
const villaDir = path.join(SRC, "nouvelle_edition");
const villaFile = (await readdir(villaDir)).find((f) => /\.(jpe?g|png)$/i.test(f));
if (villaFile) {
  const buf = await readFile(path.join(villaDir, villaFile));
  await jpg(buf, 1600, path.join(OUT, "villa.jpg"));
  await jpg(buf, 800, path.join(OUT, "villa-thumb.jpg"), 74);
}

// Portraits
for (const name of ["jamila", "djeneba", "sia"]) {
  const buf = await readFile(path.join(SRC, `photo_${name}.jpg`));
  await jpg(buf, 800, path.join(OUT, `${name}.jpg`));
}

console.log("\nDone.");
