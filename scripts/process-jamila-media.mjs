/**
 * Convert HEIC photos and MOV video from public/img_jamila/ into web-ready,
 * web-served assets in public/media/.
 *
 * Photos: HEIC → JPG (1600px wide, q80) + thumbnail JPG (800px, q75)
 * Video:  MOV → MP4 (1080p H.264, web optimized, ~3 Mbps) + WebM fallback
 *
 * Output names: photos numbered 01..N (sorted by source filename); video named "reel".
 * Source originals stay in img_jamila/ but should be .gitignored so they don't
 * inflate the deployment.
 *
 * Run: node scripts/process-jamila-media.mjs
 */

import sharp from "sharp";
import { spawn } from "node:child_process";
import { readdir, mkdir, stat, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const heicConvert = require("heic-convert");

const SRC_DIR = "public/img_jamila";
const OUT_DIR = "public/media";
const PHOTOS_OUT = path.join(OUT_DIR, "photos");
const VIDEOS_OUT = path.join(OUT_DIR, "video");

const PHOTO_WIDE = 1600;
const PHOTO_THUMB = 800;
const PHOTO_QUALITY = 82;

async function processPhotos() {
  await mkdir(PHOTOS_OUT, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => /\.heic$/i.test(f)).sort();

  const manifest = [];
  let i = 0;

  for (const file of files) {
    i += 1;
    const num = String(i).padStart(2, "0");
    const inPath = path.join(SRC_DIR, file);

    try {
      // 1. Decode HEIC → raw JPEG buffer via heic-convert (Sharp's libvips
      //    on Windows ships without the HEVC codec, so we can't go HEIC→Sharp directly)
      const heicBuf = await readFile(inPath);
      const jpegBuf = await heicConvert({ buffer: heicBuf, format: "JPEG", quality: 0.95 });

      // 2. Then Sharp handles rotation + resize + reencode
      const meta = await sharp(jpegBuf).metadata();
      const aspect = meta.width && meta.height ? meta.width / meta.height : 0.75;
      const orientation = aspect > 1.2 ? "landscape" : aspect < 0.85 ? "portrait" : "square";

      // Wide JPG (1600px)
      await sharp(jpegBuf)
        .rotate()
        .resize({ width: PHOTO_WIDE, withoutEnlargement: true })
        .jpeg({ quality: PHOTO_QUALITY, mozjpeg: true })
        .toFile(path.join(PHOTOS_OUT, `${num}.jpg`));

      // Thumb JPG (800px)
      await sharp(jpegBuf)
        .rotate()
        .resize({ width: PHOTO_THUMB, withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true })
        .toFile(path.join(PHOTOS_OUT, `${num}-thumb.jpg`));

      manifest.push({
        id: num,
        src: `/media/photos/${num}.jpg`,
        thumb: `/media/photos/${num}-thumb.jpg`,
        sourceFile: file,
        orientation,
        width: meta.width,
        height: meta.height,
      });

      console.log(`✓ photo ${num} (${orientation.padEnd(9)}) ${meta.width}×${meta.height}  ← ${file}`);
    } catch (err) {
      console.error(`✗ photo ${num} (${file}): ${err.message}`);
    }
  }

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log(`\nManifest written: ${path.join(OUT_DIR, "manifest.json")}\n`);
}

async function processVideo() {
  await mkdir(VIDEOS_OUT, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => /\.(mov|mp4|webm)$/i.test(f));
  if (files.length === 0) {
    console.log("No video found.");
    return;
  }

  const inPath = path.join(SRC_DIR, files[0]);
  const outMp4 = path.join(VIDEOS_OUT, "reel.mp4");
  const outWebm = path.join(VIDEOS_OUT, "reel.webm");
  const outPoster = path.join(VIDEOS_OUT, "reel-poster.jpg");

  // Extract poster frame (at ~1.5s in)
  await runFfmpeg([
    "-y",
    "-ss", "1.5",
    "-i", inPath,
    "-frames:v", "1",
    "-q:v", "3",
    "-vf", "scale=1600:-2",
    outPoster,
  ]);
  console.log(`✓ poster        ← ${path.basename(inPath)}`);

  // H.264 MP4, web-friendly, 1080p, ~3 Mbps, audio dropped (hero loops muted)
  await runFfmpeg([
    "-y",
    "-i", inPath,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "26",
    "-vf", "scale='if(gt(iw,ih),1920,-2)':'if(gt(iw,ih),-2,1920)':flags=lanczos,format=yuv420p",
    "-movflags", "+faststart",
    "-an",
    outMp4,
  ]);
  console.log(`✓ reel.mp4      ← ${path.basename(inPath)}`);

  // VP9 WebM smaller fallback
  await runFfmpeg([
    "-y",
    "-i", inPath,
    "-c:v", "libvpx-vp9",
    "-crf", "32",
    "-b:v", "0",
    "-vf", "scale='if(gt(iw,ih),1280,-2)':'if(gt(iw,ih),-2,1280)':flags=lanczos",
    "-an",
    outWebm,
  ]);
  console.log(`✓ reel.webm     ← ${path.basename(inPath)}`);
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    p.stderr.on("data", (d) => (stderr += d.toString()));
    p.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}\n${stderr.slice(-600)}`));
    });
  });
}

async function main() {
  // Sanity check
  try {
    await stat(SRC_DIR);
  } catch {
    console.error(`Source dir not found: ${SRC_DIR}`);
    process.exit(1);
  }

  console.log("=== Photos ===");
  await processPhotos();

  console.log("=== Video ===");
  try {
    await processVideo();
  } catch (err) {
    console.error(`Video processing failed: ${err.message}`);
  }
}

main();
