import type { ReactNode } from "react";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow, ArrowUpRight } from "./Arrow";

type Tone = "navy" | "linho" | "cacau" | "creme";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  /** Cor do traço/texto. Use "linho" sobre navy e "creme" sobre cacau. */
  tone?: Tone;
  /** Começa preenchido (CTA primário). */
  solid?: boolean;
  size?: "md" | "sm";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

// [cor base, cor sobre o preenchimento]
const TONES: Record<Tone, [string, string]> = {
  navy: ["var(--color-navy-950)", "var(--color-linho)"],
  linho: ["var(--color-linho)", "var(--color-navy-950)"],
  cacau: ["var(--color-cacau)", "var(--color-creme)"],
  creme: ["var(--color-creme)", "var(--color-cacau)"],
};

/**
 * CTA pill. No hover o preenchimento entra pela esquerda e sai pela direita —
 * o gesto acompanha a direção da seta e da leitura.
 */
export function PillLink({
  href,
  children,
  tone = "navy",
  solid = false,
  size = "md",
  external,
  className = "",
  ariaLabel,
}: PillLinkProps) {
  const [base, onFill] = TONES[tone];
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);

  const classes = [
    "group/pill relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border whitespace-nowrap text-[0.875rem] font-medium tracking-[0.01em]",
    "transition-colors duration-500 ease-inout",
    size === "md" ? "h-[50px] gap-4 px-7" : "h-10 gap-3 px-5",
    solid
      ? "border-(--pill-base) bg-(--pill-base) text-(--pill-on) hover:text-(--pill-base)"
      : "border-[color-mix(in_srgb,var(--pill-base)_45%,transparent)] text-(--pill-base) hover:border-(--pill-base) hover:text-(--pill-on)",
    className,
  ].join(" ");

  const content = (
    <>
      <span
        aria-hidden
        className={[
          "absolute inset-0 -z-10 origin-right scale-x-0 transition-transform duration-[650ms] ease-inout",
          "group-hover/pill:origin-left group-hover/pill:scale-x-100 group-focus-visible/pill:origin-left group-focus-visible/pill:scale-x-100",
          solid ? "bg-(--pill-on)" : "bg-(--pill-base)",
        ].join(" ")}
      />
      <span className="relative">{children}</span>
      {isExternal ? (
        <ArrowUpRight className="relative transition-transform duration-500 ease-expo group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5" />
      ) : (
        <Arrow className="relative transition-transform duration-500 ease-expo group-hover/pill:translate-x-1" />
      )}
    </>
  );

  const style = { "--pill-base": base, "--pill-on": onFill } as React.CSSProperties;

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={classes} style={style} aria-label={ariaLabel}>
      {content}
    </TransitionLink>
  );
}
