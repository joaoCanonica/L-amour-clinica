"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { MediaImage } from "@/lib/media";
import { whenPageReady } from "@/lib/page-ready";

type RevealImageProps = {
  image: MediaImage;
  className?: string;
  sizes: string;
  priority?: boolean;
  on?: "mount" | "scroll";
  delay?: number;
  /** Deslocamento de parallax (em % da altura) enquanto a imagem cruza a tela. */
  parallax?: number;
  from?: "bottom" | "top" | "left" | "right";
  objectPosition?: string;
};

const INSETS = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

/**
 * A fotografia é revelada por uma cortina (clip-path) enquanto a imagem
 * interna desacelera de uma escala maior — a foto "assenta" no enquadramento.
 */
export function RevealImage({
  image,
  className = "",
  sizes,
  priority,
  on = "scroll",
  delay = 0,
  parallax = 8,
  from = "bottom",
  objectPosition = "50% 50%",
}: RevealImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = frame.current;
      const img = inner.current;
      if (!el || !img) return;
      el.dataset.revealed = "";
      if (prefersReducedMotion()) return;

      const trigger = on === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined;
      const intro = gsap.timeline({ paused: on === "mount", delay, scrollTrigger: trigger });
      intro
        .fromTo(el, { clipPath: INSETS[from] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
        .fromTo(img, { scale: 1.25 }, { scale: 1.08, duration: 2.2, ease: "expo.out" }, 0);
      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
      if (on === "mount") return whenPageReady(() => intro.restart(true));
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`} data-reveal="">
      <div ref={inner} className="absolute inset-0 will-change-transform">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
