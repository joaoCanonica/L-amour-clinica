"use client";

import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

type Pilar = { text: string; detail?: string };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Os 13 pilares como uma leitura guiada: no desktop, o numeral gigante fica
 * fixo à esquerda e "rola" para o pilar em foco; os demais itens recuam em
 * opacidade. No mobile, cada pilar carrega o próprio numeral.
 */
export function PilaresList({ pilares }: { pilares: Pilar[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const items = root.current?.querySelectorAll<HTMLElement>("[data-pilar]") ?? [];
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 58%",
          end: "bottom 58%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid-12">
      <div aria-hidden className="col-span-5 hidden lg:block">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
          <div className="relative h-[0.86em] overflow-hidden type-numeral !text-[clamp(10rem,6rem+11vw,20rem)] text-papel">
            {pilares.map((_, i) => (
              <span
                key={i}
                className="absolute left-0 top-0 block transition-transform duration-[900ms] ease-expo"
                style={{ transform: `translateY(${(i - active) * 105}%)` }}
              >
                {pad(i + 1)}
              </span>
            ))}
          </div>
          <div className="mt-10 flex max-w-[16rem] items-center gap-4 type-label text-terracota">
            <span>{pad(active + 1)}</span>
            <span className="relative h-px flex-1 bg-cacau/20">
              <span
                className="absolute inset-0 origin-left bg-cacau transition-transform duration-700 ease-expo"
                style={{ transform: `scaleX(${(active + 1) / pilares.length})` }}
              />
            </span>
            <span>{pad(pilares.length)}</span>
          </div>
        </div>
      </div>

      <ol className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pb-[10svh] lg:pt-[22svh]">
        {pilares.map((pilar, i) => (
          <li
            key={pilar.text}
            data-pilar=""
            data-active={i === active}
            className="border-t border-cacau/15 py-10 transition-opacity duration-700 ease-expo lg:flex lg:min-h-[38svh] lg:flex-col lg:justify-center lg:py-14 lg:data-[active=false]:opacity-30"
          >
            <span className="type-numeral mb-2 block !text-[5.5rem] text-papel lg:hidden">
              <span className="sr-only">Pilar </span>
              {pad(i + 1)}
            </span>
            <span className="hidden type-label text-terracota lg:block">Pilar {pad(i + 1)}</span>
            <p className="font-serif lg:mt-4 text-[clamp(1.4rem,1.15rem+1vw,2.1rem)] leading-[1.22] text-cacau">
              {pilar.text}
            </p>
            {pilar.detail ? <p className="mt-3 type-body text-terracota">{pilar.detail}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
