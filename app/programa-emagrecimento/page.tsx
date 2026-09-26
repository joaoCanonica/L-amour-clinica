import { DoencaCronica } from "@/components/programa/DoencaCronica";
import { DraLeticia } from "@/components/programa/DraLeticia";
import { Metabolismo } from "@/components/programa/Metabolismo";
import { Pilares } from "@/components/programa/Pilares";
import { ProgramaHero } from "@/components/programa/ProgramaHero";
import { Resumindo } from "@/components/programa/Resumindo";
import { pageMetadata } from "@/lib/seo";
import { doctor, doctorCredentials } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Programa de Emagrecimento",
  description: `Nem toda obesidade é alimentação. Protocolo de emagrecimento individualizado conduzido pela ${doctor.name} (${doctorCredentials(", ")}), em Lages/SC.`,
  path: "/programa-emagrecimento",
  og: "programa",
});

export const viewport = { themeColor: "#542b0b" };

export default function ProgramaEmagrecimentoPage() {
  return (
    <>
      <ProgramaHero />
      <Metabolismo />
      <DoencaCronica />
      <Pilares />
      <DraLeticia />
      <Resumindo />
    </>
  );
}
