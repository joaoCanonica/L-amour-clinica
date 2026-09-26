import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import type { MediaImage } from "@/lib/media";

type MediaFrameProps = {
  /** Foto real. Sem ela, o quadro vira um placeholder tipográfico. */
  image?: MediaImage;
  /** Letra (ou numeral) que ocupa o placeholder. */
  initial: string;
  /** Proporção fixa do quadro, ex.: "4 / 5". */
  aspect?: string;
  sizes: string;
  objectPosition?: string;
  className?: string;
};

/**
 * Quadro de mídia com proporção fixa — pronto para receber foto ou vídeo.
 * Enquanto o asset real não existe, mostra uma composição tipográfica
 * (inicial em Playfair itálico sobre papel texturizado), para a página já
 * ficar apresentável sem parecer "imagem faltando".
 */
export function MediaFrame({
  image,
  initial,
  aspect = "4 / 5",
  sizes,
  objectPosition,
  className = "",
}: MediaFrameProps) {
  if (image) {
    return (
      <div className={className}>
        <RevealImage
          image={image}
          sizes={sizes}
          objectPosition={objectPosition}
          className="w-full"
          style={{ aspectRatio: aspect }}
        />
      </div>
    );
  }

  return (
    // TODO: substituir por asset real (foto ou vídeo do procedimento).
    <Reveal className={className} y={32}>
      <div
        aria-hidden
        className="relative overflow-hidden bg-areia"
        style={{ aspectRatio: aspect }}
      >
        <div className="grain absolute inset-0" />
        <span className="absolute -bottom-[0.18em] -right-[0.04em] select-none font-serif text-[clamp(16rem,10rem+22vw,34rem)] italic leading-none text-navy-800/[0.09]">
          {initial}
        </span>
        <span className="absolute left-5 top-5 h-px w-10 bg-navy-950/25" />
      </div>
    </Reveal>
  );
}
