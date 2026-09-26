"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoIcon, LogoWordmark } from "@/components/brand/Logo";
import { useLenis } from "@/components/motion/SmoothScroll";
import { TransitionLink } from "@/components/transition/PageTransition";
import { nav, site, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Tons de seção: cada <section data-tone="..."> declara o fundo que ocupa.
 * O cabeçalho lê o tom da seção logo abaixo dele e usa as mesmas cores —
 * fica sempre legível, sem "flutuar" com transparência.
 */
type Tone = "light" | "dark" | "cacau" | "prog" | "creme";

const TONES: Record<Tone, { ink: string; bg: string }> = {
  light: { ink: "var(--color-navy-950)", bg: "var(--color-linho)" },
  dark: { ink: "var(--color-linho)", bg: "var(--color-navy-950)" },
  cacau: { ink: "var(--color-creme)", bg: "var(--color-cacau)" },
  prog: { ink: "var(--color-cacau)", bg: "var(--color-bege-prog)" },
  creme: { ink: "var(--color-cacau)", bg: "var(--color-creme)" },
};

/**
 * Cabeçalho fixo: acompanha a rolagem para a navegação estar sempre à mão.
 * No topo é transparente; ao rolar ganha fundo sólido no tom da seção e
 * fica mais baixo.
 */
export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<Tone>("light");
  const menuButton = useRef<HTMLButtonElement>(null);

  const readTone = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    const y = header.offsetHeight / 2;
    for (const el of document.elementsFromPoint(window.innerWidth / 2, y)) {
      if (header.contains(el)) continue;
      const section = el.closest<HTMLElement>("[data-tone]");
      if (section?.dataset.tone && section.dataset.tone in TONES) {
        setTone(section.dataset.tone as Tone);
        return;
      }
    }
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        readTone();
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [readTone]);

  // Nova rota: relê o tom depois que a página pintou.
  useEffect(() => {
    const t = window.setTimeout(readTone, 80);
    return () => window.clearTimeout(t);
  }, [pathname, readTone]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.dataset.menuOpen = menuOpen ? "true" : "false";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, lenis]);

  const colors = menuOpen ? TONES.dark : TONES[tone];
  const solid = scrolled && !menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
        style={{ color: colors.ink }}
      >
        <div
          aria-hidden
          className="absolute inset-0 border-b transition-opacity duration-500"
          style={{
            background: colors.bg,
            borderColor: "color-mix(in srgb, currentColor 12%, transparent)",
            opacity: solid ? 1 : 0,
          }}
        />
        <div
          className={`shell relative flex items-center justify-between gap-8 transition-[height] duration-500 ease-expo ${
            solid ? "h-[64px] lg:h-[72px]" : "h-[76px] lg:h-[92px]"
          }`}
        >
          <TransitionLink href="/" aria-label={`${site.shortName} — página inicial`} className="flex items-center gap-3.5">
            <LogoIcon className="h-9 w-auto lg:h-10" />
            <LogoWordmark className="hidden h-[11px] w-auto xs:block lg:h-3" />
          </TransitionLink>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[0.875rem] font-medium transition-opacity duration-300 ${
                        active ? "opacity-100" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <a
              href={whatsappLink(whatsappMessages.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[0.875rem] font-medium link-quiet sm:inline"
            >
              Agendar
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="flex h-10 items-center gap-3 text-[0.875rem] font-medium lg:hidden"
            >
              <span>{menuOpen ? "Fechar" : "Menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-6">
                <span
                  className="absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-expo"
                  style={{ transform: menuOpen ? "translateY(5px) rotate(20deg)" : "none" }}
                />
                <span
                  className="absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-expo"
                  style={{ transform: menuOpen ? "translateY(-4px) rotate(-20deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onNavigate={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

function MobileMenu({ open, onNavigate, pathname }: { open: boolean; onNavigate: () => void; pathname: string }) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => firstLink.current?.focus(), 350);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[45] flex flex-col bg-navy-950 text-linho lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <nav aria-label="Menu" className="shell flex flex-1 flex-col justify-center pt-24">
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } }}
                    transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.05 }}
                  >
                    <TransitionLink
                      ref={i === 0 ? firstLink : undefined}
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="block py-1 font-serif text-[clamp(2.3rem,10vw,3.5rem)] font-medium leading-[1.05] aria-[current=page]:italic"
                    >
                      {item.label}
                    </TransitionLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="shell flex flex-col gap-6 border-t border-linho/15 py-8 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <p className="type-small text-nevoa">
              {site.address.street} · {site.address.district}, {site.address.city}
              <br />
              {site.schedulingNote}
            </p>
            <a
              href={whatsappLink(whatsappMessages.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.95rem] font-medium link-quiet"
            >
              Agendar pelo WhatsApp
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
