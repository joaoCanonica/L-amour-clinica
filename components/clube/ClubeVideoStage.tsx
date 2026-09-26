"use client";

import { useRef } from "react";
import { VideoFeature } from "@/components/media/VideoFeature";
import { quotes } from "@/lib/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { MediaVideo } from "@/lib/media";
import { founderLabel } from "@/lib/site";

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
        { scale: 0.82, opacity: 0.5 },
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
    <section ref={section} id="video" data-tone="dark" className="relative overflow-hidden bg-navy-950 py-20 text-linho lg:py-24">
      <div className="shell grid-12 items-center gap-y-12">
        <blockquote className="col-span-12 lg:col-span-4">
          <p className="font-serif text-[clamp(1.9rem,1.4rem+1.6vw,2.9rem)] font-medium italic leading-[1.12]">
            “{quotes.fundadoraConstancia}”
          </p>
          <footer className="mt-6 type-small text-nevoa">{founderLabel()}</footer>
        </blockquote>

        <div className="col-span-12 flex justify-center lg:col-span-4">
          <div ref={stage} className="w-full max-w-[min(88vw,calc(86svh*9/16))] origin-center will-change-transform">
            <VideoFeature
              sources={[source]}
              cta="Como funciona"
              label="Vídeo: a fundadora da L'Amour explica como funciona o Clube L'Amour"
              sizes="(min-width: 1024px) 480px, 88vw"
            />
          </div>
        </div>

        <p className="col-span-12 type-small text-nevoa lg:col-span-3 lg:col-start-10 lg:text-right">
          Um minuto e meio, com legendas: da avaliação ao acompanhamento — e como funciona o desconto.
        </p>
      </div>
    </section>
  );
}
