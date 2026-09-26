import { ClubeCTA } from "@/components/clube/ClubeCTA";
import { ClubeHero } from "@/components/clube/ClubeHero";
import { ClubeSteps } from "@/components/clube/ClubeSteps";
import { ClubeVideoStage } from "@/components/clube/ClubeVideoStage";
import { Depoimento } from "@/components/home/Depoimento";
import { video } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Clube L'Amour",
  description:
    "Assinatura anual: avaliação completa, protocolo personalizado de 1 ano, acompanhamento contínuo e 25% de desconto no valor total. Lages/SC.",
  path: "/clube-lamour",
  og: "clube",
});

export default function ClubePage() {
  return (
    <>
      <ClubeHero />
      <ClubeVideoStage source={video("fundadora")} />
      <ClubeSteps />
      <Depoimento />
      <ClubeCTA />
    </>
  );
}
