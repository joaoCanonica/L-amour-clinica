import { Localizacao } from "@/components/sobre/Localizacao";
import { Pessoas } from "@/components/sobre/Pessoas";
import { SobreHero } from "@/components/sobre/SobreHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "Na L'Amour, a pele é acompanhada com constância, a partir de uma avaliação individual. Estética avançada, ozonioterapia, HOF, massoterapia e podologia no Centro de Lages/SC.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <SobreHero />
      <Pessoas />
      <Localizacao />
    </>
  );
}
