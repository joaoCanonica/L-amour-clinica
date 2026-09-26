"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoIcon, LogoWordmark } from "@/components/brand/Logo";
import { useLenis } from "@/components/motion/SmoothScroll";
import { TransitionLink } from "@/components/transition/PageTransition";
import { PillLink } from "@/components/ui/PillLink";
import { nav, site, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Tons de seção: cada <section data-tone="..."> declara o fundo que ocupa.
 * O header lê o tom da seção que está logo abaixo dele e ajusta sua cor —
 * ele nunca some contra o fundo, em nenhuma página.
 */
type Tone = "light" | "dark" | "cacau" | "prog" | "creme";

const TONE_STYLES: Record<Tone, { fg: string; bg: string; pill: "navy" | "linho" | "cacau" | "creme" }> = {
  light: { fg: "var(--color-navy-950)", bg: "var(--color-linho)", pill: "navy" },
  dark: { fg: "var(--color-linho)", bg: "var(--color-navy-950)", pill: "linho" },
  cacau: { fg: "var(--color-creme)", bg: "var(--color-cacau)", pill: "creme" },
  prog: { fg: "var(--color-cacau)", bg: "var(--color-bege-prog)", pill: "cacau" },
  creme: { fg: "var(--color-cacau)", bg: "var(--color-creme)", pill: "cacau" },
};

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const headerRef = useRef<HTMLElement>(null);
  const [tone, setTone] = useState<Tone>("light");
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  const readTone = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    const y = header.offsetHeight / 2;
    const stack = document.elementsFromPoint(window.innerWidth / 2, y);
    for (const el of stack) {
      if (header.contains(el)) continue;
      const section = el.closest<HTMLElement>("[data-tone]");
      if (section) {
        setTone(section.dataset.tone as Tone);
        return;
      }
    }
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (Math.abs(delta) > 4) {
          setHidden(delta > 0 && y > 160);
          lastY = y;
        }
        setSolid(y > 40);
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

  // Nova rota: fecha o menu e mostra o header (ajuste de estado no render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  // ...e relê o tom depois que a nova página pintou.
  useEffect(() => {
    const t = window.setTimeout(readTone, 60);
    return () => window.clearTimeout(t);
  }, [pathname, readTone]);

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

  const current = menuOpen ? TONE_STYLES.dark : TONE_STYLES[tone];
  const showBackground = solid && !menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 transition-[transform,color] duration-700 ease-expo"
        style={{
          color: current.fg,
          transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 border-b transition-opacity duration-500 hairline"
          style={{ background: current.bg, opacity: showBackground ? 1 : 0 }}
        />
        <div className="shell relative flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
          <TransitionLink
            href="/"
            aria-label={`${site.shortName} — página inicial`}
            className="flex items-center gap-3.5"
          >
            <LogoIcon className="h-9 w-auto lg:h-10" />
            <LogoWordmark className="hidden h-[11px] w-auto xs:block lg:h-3" />
          </TransitionLink>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group/nav relative type-label inline-block py-2"
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-expo ${
                          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                        }`}
                      />
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <PillLink
              href={whatsappLink(whatsappMessages.default)}
              tone={current.pill}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Agendar
            </PillLink>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="flex h-10 items-center gap-3 type-label lg:hidden"
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

function MobileMenu({
  open,
  onNavigate,
  pathname,
}: {
  open: boolean;
  onNavigate: () => void;
  pathname: string;
}) {
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
          data-tone="dark"
          className="fixed inset-0 z-40 flex flex-col bg-navy-950 text-linho lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <nav aria-label="Menu" className="shell flex flex-1 flex-col justify-center pt-24">
            <ul className="flex flex-col gap-1">
              {[{ href: "/", label: "Início" }, ...nav].map((item, i) => (
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
                      className="flex items-baseline gap-4 py-1.5 font-serif text-[clamp(2rem,9vw,3.25rem)] leading-[1.05] tracking-[-0.015em] aria-[current=page]:italic"
                    >
                      <span className="type-label w-6 shrink-0 text-nevoa">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </TransitionLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="shell grid gap-6 border-t hairline py-8 sm:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="type-small text-nevoa">
              <p>{site.address.street}</p>
              <p>
                {site.address.district}, {site.address.city} – {site.address.state}
              </p>
              <p className="mt-2">{site.schedulingNote}</p>
            </div>
            <div className="flex items-end sm:justify-end">
              <PillLink href={whatsappLink(whatsappMessages.default)} tone="linho">
                Agendar pelo WhatsApp
              </PillLink>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
