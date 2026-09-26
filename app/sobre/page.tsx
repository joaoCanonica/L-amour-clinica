import { Equipe } from "@/components/sobre/Equipe";
import { Localizacao } from "@/components/sobre/Localizacao";
import { Principios } from "@/components/sobre/Principios";
import { SobreHero } from "@/components/sobre/SobreHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "A L'Amour reúne estética avançada, ozonioterapia, harmonização orofacial, massoterapia e podologia no Centro de Lages/SC — sempre a partir de uma avaliação individual.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <SobreHero />
      <Principios />
      <Equipe />
      <Localizacao />
    </>
  );
}
