"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { useConsent } from "@/lib/consent";
import { whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Agendamento sempre à mão: aparece depois do hero (quando o CTA do topo sai
 * de vista) e se recolhe no rodapé, onde o contato já está visível.
 */
export function FloatingCTA() {
  const pathname = usePathname();
  const [scrolledPast, setScrolledPast] = useState(false);
  const consent = useConsent();
  // Não disputa espaço com o aviso de privacidade enquanto ele está aberto.
  const visible = scrolledPast && consent !== null && consent !== undefined;
  const message = pathname.startsWith("/programa-emagrecimento")
    ? whatsappMessages.programa
    : pathname.startsWith("/clube-lamour")
      ? whatsappMessages.clube
      : whatsappMessages.default;

  useEffect(() => {
    let footerInView = false;
    const footer = document.getElementById("site-footer");
    const observer = new IntersectionObserver(([entry]) => {
      footerInView = entry.isIntersecting;
      update();
    });
    if (footer) observer.observe(footer);

    function update() {
      const menuOpen = document.documentElement.dataset.menuOpen === "true";
      setScrolledPast(window.scrollY > window.innerHeight * 0.85 && !footerInView && !menuOpen);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  const isPrograma = pathname.startsWith("/programa-emagrecimento");

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        "group fixed bottom-5 right-5 z-40 flex h-12 items-center gap-3 rounded-full pl-6 pr-5 text-[0.875rem] font-medium sm:bottom-8 sm:right-8",
        "shadow-[0_10px_40px_-12px_rgba(14,26,43,0.45)] transition-[transform,opacity] duration-700 ease-expo",
        isPrograma ? "bg-cacau text-creme" : "bg-navy-950 text-linho",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      ].join(" ")}
    >
      <span>Agendar pelo WhatsApp</span>
      <ArrowUpRight className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
