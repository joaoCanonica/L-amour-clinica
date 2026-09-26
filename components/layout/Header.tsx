"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoIcon, LogoWordmark } from "@/components/brand/Logo";
import { useLenis } from "@/components/motion/SmoothScroll";
import { TransitionLink } from "@/components/transition/PageTransition";
import { nav, site, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Cabeçalho estático: fica no topo da página e sai de cena com o scroll —
 * não acompanha a leitura. Sobre o Programa (fundo cacau) usa creme.
 */
export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const onCacau = pathname.startsWith("/programa-emagrecimento");

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

  const ink = menuOpen ? "text-linho" : onCacau ? "text-creme" : "text-navy-950";

  return (
    <>
      <header className={`absolute inset-x-0 top-0 z-50 ${ink} ${menuOpen ? "!fixed" : ""}`}>
        <div className="shell flex h-[76px] items-center justify-between gap-8 lg:h-[92px]">
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
          className="fixed inset-0 z-40 flex flex-col bg-navy-950 text-linho lg:hidden"
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
