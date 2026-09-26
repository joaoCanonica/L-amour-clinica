// Extrai o quadro de capa (poster) de cada vídeo do media.manifest.json.
// Ferramenta de manutenção — não roda no build. Requer ffmpeg:
//   FFMPEG_PATH=/caminho/ffmpeg node scripts/extract-posters.mjs
// (ou ffmpeg disponível no PATH). Os posters vão para
// lamour-assets-organizados/_gerados/posters/ e são versionados.
import { execFileSync } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ffmpeg = process.env.FFMPEG_PATH ?? "ffmpeg";
const manifest = JSON.parse(await readFile(path.join(root, "media.manifest.json"), "utf8"));

for (const [key, video] of Object.entries(manifest.videos)) {
  const out = path.join(root, video.poster);
  await mkdir(path.dirname(out), { recursive: true });
  execFileSync(ffmpeg, [
    "-v", "error", "-y",
    "-ss", String(video.posterTime),
    "-i", path.join(root, video.src),
    "-frames:v", "1",
    "-q:v", "3",
    out,
  ]);
  console.log(`poster: ${key} @ ${video.posterTime}s -> ${video.poster}`);
}
