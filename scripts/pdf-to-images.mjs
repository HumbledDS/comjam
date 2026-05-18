/**
 * Convert a PDF into per-page JPGs so the contents can be read.
 * Usage: node scripts/pdf-to-images.mjs <path-to-pdf> <output-dir>
 */

import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
const { getDocument } = pdfjs;
const sharp = require("sharp");

const [, , pdfPath, outDir = "/tmp/pdf-pages"] = process.argv;
if (!pdfPath) {
  console.error("Usage: node scripts/pdf-to-images.mjs <pdf> [outDir]");
  process.exit(1);
}

// pdfjs-legacy needs a Node-compatible canvas substitute. Use @napi-rs/canvas if installed,
// else render via the built-in approach which falls back gracefully.
let createCanvas;
try {
  const { createCanvas: c } = require("@napi-rs/canvas");
  createCanvas = c;
} catch {
  try {
    const { createCanvas: c } = require("canvas");
    createCanvas = c;
  } catch {
    console.error("Need either @napi-rs/canvas or canvas. Install one of them.");
    process.exit(1);
  }
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const data = new Uint8Array(await fs.readFile(pdfPath));
  const pdf = await getDocument({ data, useSystemFonts: true }).promise;
  console.log(`Pages: ${pdf.numPages}`);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const buf = canvas.toBuffer("image/png");
    const out = path.join(outDir, `page-${String(i).padStart(2, "0")}.jpg`);
    await sharp(buf).jpeg({ quality: 85 }).toFile(out);
    console.log(`✓ page ${i} → ${out}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
