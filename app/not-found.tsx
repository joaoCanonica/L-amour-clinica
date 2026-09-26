import { LogoIcon } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/transition/PageTransition";
import { Arrow } from "@/components/ui/Arrow";
import { PillLink } from "@/components/ui/PillLink";
import { nav } from "@/lib/site";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <section data-tone="light" className="bg-linho">
      <div className="shell grid-12 min-h-[100svh] items-center gap-y-16 pb-20 pt-40">
        <div className="col-span-12 lg:col-span-7">
          <LogoIcon className="h-12 w-auto text-navy-800" />
          <p className="mt-12 type-label text-pedra-escuro">Erro 404</p>
          <h1 className="mt-6 max-w-[13ch] type-h1 text-navy-950">
            Este endereço <em>não existe</em> — ou mudou de lugar.
          </h1>
          <div className="mt-12">
            <PillLink href="/" solid>
              Voltar ao início
            </PillLink>
          </div>
        </div>
        <nav aria-label="Páginas do site" className="col-span-12 lg:col-span-4 lg:col-start-9">
          <p className="type-label text-pedra-escuro">Talvez você procure</p>
          <ul className="mt-6 border-t hairline">
            {nav.map((item) => (
              <li key={item.href} className="border-b hairline">
                <TransitionLink href={item.href} className="group flex items-center justify-between py-4">
                  <span className="font-serif text-xl text-navy-950 transition-transform duration-700 ease-expo group-hover:translate-x-1 group-hover:italic">
                    {item.label}
                  </span>
                  <Arrow className="text-navy-950 opacity-40 transition-opacity group-hover:opacity-100" />
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
