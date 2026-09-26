import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceBlock } from "@/components/servicos/ServiceBlock";
import { ServicesNext } from "@/components/servicos/ServicesNext";
import { ServicesTOC } from "@/components/servicos/ServicesTOC";
import { services } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Serviços",
  description:
    "Estética avançada facial e corporal, ozonioterapia, harmonização orofacial, massoterapia (inclusive pós-cirúrgica) e podologia com tratamento integral, em Lages/SC.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Cinco frentes, <em>um só</em> cuidado.
          </>
        }
        intro="Cada tratamento parte de uma avaliação e se integra ao plano de cuidado de cada paciente."
      >
        <ServicesTOC />
      </PageHeader>
      {services.map((service, i) => (
        <ServiceBlock key={service.slug} service={service} index={i} />
      ))}
      <ServicesNext />
    </>
  );
}
