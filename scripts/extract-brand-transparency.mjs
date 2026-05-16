/**
 * One-shot script: convert the source brand JPEGs (with flat backgrounds)
 * into transparent PNGs by knocking out pixels close to the dominant bg
 * color and snapping the foreground to a single brand color.
 *
 * Run: node scripts/extract-brand-transparency.mjs
 */

import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/brand";
const OUT_DIR = "public/brand";

// Brand colors
const BLUE = { r: 27, g: 58, b: 92 };
const CREAM = { r: 245, g: 239, b: 228 };

// Per-asset config:
//   bg: which color is the background (gets knocked out)
//   fg: which color to snap kept pixels to
const config = {
  "wordmark-on-beige.jpg": { out: "wordmark-blue.png", bg: CREAM, fg: BLUE },
  "wordmark-on-blue.jpg":  { out: "wordmark-cream.png", bg: BLUE, fg: CREAM },
  "monogram-on-beige.jpg": { out: "monogram-blue.png", bg: CREAM, fg: BLUE },
  "monogram-on-blue.jpg":  { out: "monogram-cream.png", bg: BLUE, fg: CREAM },
  "flourish-on-beige.jpg": { out: "flourish-blue.png", bg: CREAM, fg: BLUE },
  "flourish-on-blue.jpg":  { out: "flourish-cream.png", bg: BLUE, fg: CREAM },
  "swoosh-on-beige.jpg":   { out: "swoosh-blue.png", bg: CREAM, fg: BLUE },
  "swoosh-on-blue.jpg":    { out: "swoosh-cream.png", bg: BLUE, fg: CREAM },
  "apostrophe-on-beige.jpg": { out: "apostrophe-blue.png", bg: CREAM, fg: BLUE },
  "apostrophe-on-blue.jpg":  { out: "apostrophe-cream.png", bg: BLUE, fg: CREAM },
  "pattern-on-beige.jpg":  { out: "pattern-blue.png", bg: CREAM, fg: BLUE },
  "pattern-on-blue.jpg":   { out: "pattern-cream.png", bg: BLUE, fg: CREAM },
};

// Color distance — euclidean in RGB. Pixels closer to bg than threshold
// become transparent; the rest get snapped to fg color with alpha based on
// how close they were to fg (anti-aliasing preserved).
const TOLERANCE_BG = 70;   // pixels within this distance of bg → fully transparent
const TOLERANCE_FG = 110;  // pixels within this distance of fg → fully opaque

function dist(a, b) {
  const dr = a.r - b.r, dg = a.g - b.g, db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function process(srcFile, cfg) {
  const inPath = path.join(SRC_DIR, srcFile);
  const outPath = path.join(OUT_DIR, cfg.out);

  const { data, info } = await sharp(inPath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const px = { r: data[i], g: data[i + 1], b: data[i + 2] };
    const dBg = dist(px, cfg.bg);
    const dFg = dist(px, cfg.fg);

    let alpha;
    if (dBg < TOLERANCE_BG) {
      alpha = 0;
    } else if (dFg < TOLERANCE_FG) {
      alpha = 255;
    } else {
      // In-between (anti-aliased edges): interpolate
      const t = dBg / (dBg + dFg);
      alpha = Math.round(t * 255);
    }

    // Snap to fg color but keep computed alpha
    out[i] = cfg.fg.r;
    out[i + 1] = cfg.fg.g;
    out[i + 2] = cfg.fg.b;
    out[i + 3] = alpha;
  }

  await sharp(out, { raw: { width, height, channels } })
    .png({ quality: 90, compressionLevel: 9 })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 5 })
    .toFile(outPath);

  console.log(`✓ ${srcFile.padEnd(28)} → ${cfg.out}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = await readdir(SRC_DIR);

  for (const file of files) {
    if (!config[file]) continue;
    try {
      await process(file, config[file]);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }
}

main();
