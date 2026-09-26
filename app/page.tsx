import { ClubeTeaser } from "@/components/home/ClubeTeaser";
import { Depoimento } from "@/components/home/Depoimento";
import { HomeHero } from "@/components/home/HomeHero";
import { Manifesto } from "@/components/home/Manifesto";
import { ProgramaTeaser } from "@/components/home/ProgramaTeaser";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { VisitCTA } from "@/components/home/VisitCTA";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Manifesto />
      <ServicesIndex />
      <ProgramaTeaser />
      <ClubeTeaser />
      <Depoimento />
      <VisitCTA />
    </>
  );
}
