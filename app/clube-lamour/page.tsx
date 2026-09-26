import { ClubeCTA } from "@/components/clube/ClubeCTA";
import { ClubeGrupo } from "@/components/clube/ClubeGrupo";
import { ClubeHero } from "@/components/clube/ClubeHero";
import { ClubeSteps } from "@/components/clube/ClubeSteps";
import { ClubeValor } from "@/components/clube/ClubeValor";
import { ClubeVideoStage } from "@/components/clube/ClubeVideoStage";
import { Depoimento } from "@/components/home/Depoimento";
import { video } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Clube L'Amour",
  description:
    "Assinatura anual de cuidados com a pele: avaliação completa, protocolo do ano, 25% de desconto sobre o valor total e acompanhamento do início ao fim. Lages/SC.",
  path: "/clube-lamour",
  og: "clube",
});

export default function ClubePage() {
  return (
    <>
      <ClubeHero />
      <ClubeVideoStage source={video("fundadora")} />
      <ClubeSteps />
      <ClubeValor />
      <Depoimento />
      <ClubeGrupo />
      <ClubeCTA />
    </>
  );
}
