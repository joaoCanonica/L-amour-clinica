import manifest from "@/media.manifest.json";

type ImageKey = keyof typeof manifest.images;
type VideoKey = keyof typeof manifest.videos;

export type MediaImage = { src: string; width: number; height: number; alt: string };
export type MediaVideo = { src: string; width: number; height: number };

export function image(key: ImageKey): MediaImage {
  const entry = manifest.images[key];
  return {
    src: `/${entry.out}`,
    width: entry.crop.width,
    height: entry.crop.height,
    alt: entry.alt,
  };
}

export function video(key: VideoKey): MediaVideo {
  const entry = manifest.videos[key];
  return { src: `/${entry.out}`, width: entry.width, height: entry.height };
}
