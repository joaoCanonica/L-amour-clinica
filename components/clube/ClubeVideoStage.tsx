"use client";

import { useRef } from "react";
import { VideoFeature } from "@/components/media/VideoFeature";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { MediaVideo } from "@/lib/media";

/**
 * O vídeo da fundadora é o pitch inteiro do Clube: ocupa a altura da tela e
 * "chega" crescendo enquanto a seção entra — o olhar é levado para ele.
 */
export function ClubeVideoStage({ source }: { source: MediaVideo }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stage.current || !section.current || prefersReducedMotion()) return;
      gsap.fromTo(
        stage.current,
        { scale: 0.8, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top bottom", end: "top 10%", scrub: 0.6 },
        },
      );
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="video"
      data-tone="dark"
      className="relative overflow-hidden bg-navy-950 py-20 text-linho lg:py-24"
    >
      <div className="shell grid-12 items-center gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <p className="type-label text-nevoa">Como funciona</p>
          <p className="mt-6 font-serif text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] italic leading-[1.12]">
            O Clube explicado por quem o criou.
          </p>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-6">
          <div ref={stage} className="w-full max-w-[min(88vw,calc(86svh*9/16))] origin-center will-change-transform">
            <VideoFeature
              sources={[source]}
              cta="Como funciona"
              label="Vídeo: a fundadora da L'Amour explica como funciona o Clube L'Amour"
              sizes="(min-width: 1024px) 480px, 88vw"
            />
          </div>
        </div>

        <div className="col-span-12 type-small text-nevoa lg:col-span-3 lg:text-right">
          <p>Vídeo com legendas.</p>
          <p className="mt-1">Da avaliação ao acompanhamento — e como funciona o desconto.</p>
        </div>
      </div>
    </section>
  );
}
