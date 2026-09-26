// Gera /public/media a partir de lamour-assets-organizados/ (fonte da verdade).
// - Fotos: recorte das capturas de carrossel (remove setas, paginação e
//   textos embutidos).
// - Vídeos: cópia + poster (quadro de capa extraído por extract-posters.mjs).
// - OG: imagens 1200×630 de compartilhamento (foto + assinatura).
// Roda automaticamente antes de dev e build.
import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(path.join(root, "media.manifest.json"), "utf8"));
const publicDir = path.join(root, "public");
const self = import.meta.filename;

async function isFresh(out, ...sources) {
  try {
    const o = await stat(out);
    const s = await Promise.all([...sources, self, path.join(root, "media.manifest.json")].map((f) => stat(f)));
    return s.every((x) => o.mtimeMs >= x.mtimeMs);
  } catch {
    return false;
  }
}

async function prepare(out) {
  const abs = path.join(publicDir, out);
  await mkdir(path.dirname(abs), { recursive: true });
  return abs;
}

// Fotos
for (const [key, img] of Object.entries(manifest.images)) {
  const src = path.join(root, img.src);
  const out = await prepare(img.out);
  if (await isFresh(out, src)) continue;
  await sharp(src).extract(img.crop).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  console.log(`media: ${key} -> ${img.out}`);
}

// Vídeos + posters
for (const [key, video] of Object.entries(manifest.videos)) {
  const src = path.join(root, video.src);
  const out = await prepare(video.out);
  if (!(await isFresh(out, src))) {
    await copyFile(src, out);
    console.log(`media: ${key} -> ${video.out}`);
  }
  const posterSrc = path.join(root, video.poster);
  const posterOut = await prepare(video.posterOut);
  if (!(await isFresh(posterOut, posterSrc))) {
    await sharp(posterSrc).jpeg({ quality: 82, mozjpeg: true }).toFile(posterOut);
    console.log(`media: ${key} poster -> ${video.posterOut}`);
  }
}

// Imagens de compartilhamento (Open Graph)
const logoSource = await readFile(path.join(root, "components/brand/Logo.tsx"), "utf8");
const iconD = logoSource.match(/const ICON_D = "([^"]+)"/)[1];
const wordD = logoSource.match(/const WORDMARK_D = "([^"]+)"/)[1];

function photoSource(key) {
  if (manifest.images[key]) return { file: path.join(publicDir, manifest.images[key].out) };
  if (manifest.videos[key]) return { file: path.join(root, manifest.videos[key].poster) };
  throw new Error(`og: foto desconhecida "${key}"`);
}

for (const [key, og] of Object.entries(manifest.og)) {
  const { file } = photoSource(og.photo);
  const out = await prepare(og.out);
  if (await isFresh(out, file)) continue;

  const W = 1200;
  const H = 630;
  const photoW = 470;
  const photo = await sharp(file).resize(photoW, H, { fit: "cover", position: "attention" }).toBuffer();
  const t = "translate(0,1500) scale(0.1,-0.1)";
  // Símbolo sobre o wordmark, centralizados na área livre à esquerda.
  const logo = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W - photoW}" height="${H}">
      <g fill="${og.ink}">
        <svg x="${(W - photoW) / 2 - 70}" y="170" width="140" height="132" viewBox="462 322 598 565">
          <path transform="${t}" d="${iconD}"/>
        </svg>
        <svg x="${(W - photoW) / 2 - 190}" y="350" width="380" height="47" viewBox="302 983 930 116">
          <path transform="${t}" d="${wordD}"/>
        </svg>
      </g>
    </svg>`);

  await sharp({ create: { width: W, height: H, channels: 3, background: og.background } })
    .composite([
      { input: logo, left: 0, top: 0 },
      { input: photo, left: W - photoW, top: 0 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
  console.log(`media: og ${key} -> ${og.out}`);
}
