// Gera /public/media a partir de lamour-assets-organizados/ (fonte da verdade).
// As fotos originais são capturas de carrossel: o recorte remove setas,
// paginação e textos embutidos. Roda automaticamente antes de dev e build.
import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(path.join(root, "media.manifest.json"), "utf8"));
const publicDir = path.join(root, "public");

async function isFresh(src, out) {
  try {
    const [s, o] = await Promise.all([stat(src), stat(out)]);
    return o.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

for (const [key, img] of Object.entries(manifest.images)) {
  const src = path.join(root, img.src);
  const out = path.join(publicDir, img.out);
  if (await isFresh(src, out)) continue;
  await mkdir(path.dirname(out), { recursive: true });
  await sharp(src).extract(img.crop).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  console.log(`media: ${key} -> ${img.out}`);
}

for (const [key, video] of Object.entries(manifest.videos)) {
  const src = path.join(root, video.src);
  const out = path.join(publicDir, video.out);
  if (await isFresh(src, out)) continue;
  await mkdir(path.dirname(out), { recursive: true });
  await copyFile(src, out);
  console.log(`media: ${key} -> ${video.out}`);
}
