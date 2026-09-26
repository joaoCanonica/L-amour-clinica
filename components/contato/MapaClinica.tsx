import { site } from "@/lib/site";

/**
 * Google Maps embutido, tratado para a paleta: mapa em tons de cinza sob um
 * véu areia (multiply), moldura com fio e cantos retos, etiqueta própria.
 * O iframe só carrega quando se aproxima da viewport (loading="lazy").
 */
export function MapaClinica({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="relative aspect-[4/5] overflow-hidden border hairline bg-areia sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
        <iframe
          src={site.address.embedUrl}
          title={`Mapa: ${site.address.street}, ${site.address.district}, ${site.address.city}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(0.92)_brightness(1.04)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-areia mix-blend-multiply opacity-60" />
        <div className="pointer-events-none absolute left-4 top-4 border hairline bg-linho px-4 py-3 text-navy-950">
          <p className="type-label">L&apos;Amour</p>
          <p className="mt-1 type-small">{site.address.street}</p>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 type-small text-pedra-escuro">
        <span>
          {site.address.district}, {site.address.city} – {site.address.state} · {site.address.postalCode}
        </span>
        <a
          href={site.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="type-label text-navy-950 underline decoration-navy-950/25 underline-offset-[6px] hover:decoration-navy-950"
        >
          Abrir no Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
