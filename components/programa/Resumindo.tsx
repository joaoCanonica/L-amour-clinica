import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Credentials } from "@/components/ui/Credentials";
import { PillLink } from "@/components/ui/PillLink";
import { programa } from "@/lib/content";
import { doctor, whatsappLink, whatsappMessages } from "@/lib/site";

/** Fechamento — reproduz a peça "Resumindo" do carrossel como componente nativo. */
export function Resumindo() {
  const { closing } = programa;
  return (
    <section
      data-tone="cacau"
      className="relative isolate overflow-hidden bg-cacau-profundo text-creme"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(75%_60%_at_50%_12%,#5a391d_0%,#3f2511_48%,#2e1a0c_100%)]"
      />
      <div className="shell flex min-h-[100svh] flex-col items-center justify-center py-32 text-center">
        <p className="type-label text-ouro">{closing.label}</p>
        <RevealText className="mt-10 font-serif text-[clamp(2.75rem,1.4rem+5.2vw,6.25rem)] italic leading-[1.02] tracking-[-0.02em]">
          {closing.headline[0]}
          <br />
          {closing.headline[1]}
        </RevealText>
        <Reveal>
          <p className="mx-auto mt-10 max-w-[28ch] font-sans text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-[1.5] text-creme/85">
            {closing.sub}
          </p>
        </Reveal>
        <DrawLine axis="x" className="mt-14 h-px w-[72px] bg-ouro" />
        <Reveal className="mt-14">
          <PillLink href={whatsappLink(whatsappMessages.programa)} tone="creme">
            Agende uma consulta
          </PillLink>
        </Reveal>
        <div className="mt-24 max-w-xl space-y-3 type-small text-creme/65">
          <p>{programa.disclaimer}</p>
          <p className="type-label !tracking-[0.18em]">
            {doctor.name} — <Credentials />
          </p>
        </div>
      </div>
    </section>
  );
}
