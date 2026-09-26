import manifest from "@/media.manifest.json";

type ImageKey = keyof typeof manifest.images;
type VideoKey = keyof typeof manifest.videos;
type OgKey = keyof typeof manifest.og;

export type MediaImage = { src: string; width: number; height: number; alt: string };
export type MediaVideo = {
  src: string;
  width: number;
  height: number;
  poster: string;
  /** Fim do conteúdo, antes do card final com o logo. */
  contentEnd: number;
};

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
  return {
    src: `/${entry.out}`,
    width: entry.width,
    height: entry.height,
    poster: `/${entry.posterOut}`,
    contentEnd: entry.contentEnd,
  };
}

export function ogImage(key: OgKey) {
  return { url: `/${manifest.og[key].out}`, width: 1200, height: 630 };
}
