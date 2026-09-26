"use client";

import { useAnimate } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { LogoIcon } from "@/components/brand/Logo";
import { useLenis } from "@/components/motion/SmoothScroll";
import { prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { setTransitioning } from "@/lib/page-ready";

type TransitionContextValue = { navigate: (href: string) => void };

const TransitionContext = createContext<TransitionContextValue>({ navigate: () => {} });

export const usePageTransition = () => useContext(TransitionContext);

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Transição entre páginas: uma cortina navy com o símbolo sobe, a rota troca
 * por baixo dela e a cortina continua subindo para revelar a nova página —
 * uma troca de contexto clara, sem cortes secos.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inFlight = useRef(false);
  const pendingHash = useRef("");
  const [covering, setCovering] = useState(false);

  const scrollToTarget = useCallback(
    (hash: string) => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (lenis) lenis.scrollTo(target ?? 0, { offset: 0 });
      else if (target) target.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [lenis],
  );

  const navigate = useCallback(
    async (href: string) => {
      if (inFlight.current) return;
      const url = new URL(href, window.location.href);

      if (url.pathname === window.location.pathname) {
        scrollToTarget(url.hash);
        return;
      }

      if (prefersReducedMotion() || !scope.current) {
        router.push(href);
        return;
      }

      inFlight.current = true;
      pendingHash.current = url.hash;
      setTransitioning(true);
      lenis?.stop();
      setCovering(true);
      const curtain = scope.current;
      await animate(
        curtain,
        { clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] },
        { duration: 0.8, ease: EASE },
      );
      await animate(curtain.querySelector("[data-curtain-mark]")!, { opacity: [0, 1] }, { duration: 0.3 });
      router.push(href, { scroll: false });
    },
    [animate, lenis, router, scope, scrollToTarget],
  );

  // A nova rota montou por baixo da cortina: reposiciona o scroll e levanta.
  useEffect(() => {
    if (!inFlight.current || !scope.current) return;
    const curtain = scope.current;
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.start();

    const frame = requestAnimationFrame(async () => {
      ScrollTrigger.refresh();
      // Link com âncora para outra página: posiciona na seção ainda coberto.
      const target = pendingHash.current ? document.querySelector<HTMLElement>(pendingHash.current) : null;
      pendingHash.current = "";
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top);
        lenis?.scrollTo(top, { immediate: true, force: true });
        ScrollTrigger.update();
      }
      setTransitioning(false);
      await animate(
        curtain.querySelector("[data-curtain-mark]")!,
        { opacity: 0 },
        { duration: 0.25 },
      );
      await animate(
        curtain,
        { clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"] },
        { duration: 0.9, ease: EASE },
      );
      setCovering(false);
      inFlight.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, animate, lenis, scope]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={scope}
        aria-hidden
        className={`fixed inset-0 z-[100] grid place-items-center bg-navy-950 text-linho ${
          covering ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <LogoIcon data-curtain-mark className="h-14 w-auto opacity-0" />
      </div>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = ComponentProps<typeof Link>;

/** next/link com a transição de página. Cliques com modificadores seguem o padrão do navegador. */
export function TransitionLink({ href, onClick, target, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (target && target !== "_self")
    ) {
      return;
    }
    event.preventDefault();
    navigate(typeof href === "string" ? href : (href.pathname ?? "/"));
  }

  return <Link href={href} target={target} onClick={handleClick} {...props} />;
}
