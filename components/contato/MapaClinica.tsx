"use client";

import { saveConsent, useConsent } from "@/lib/consent";
import { site } from "@/lib/site";

/**
 * Google Maps embutido, tratado para a paleta (tons de cinza sob véu areia,
 * moldura com fio, cantos retos). O iframe grava cookies do Google, por isso
 * só é carregado com consentimento; antes disso, um quadro com o endereço e
 * o botão para carregar.
 */
export function MapaClinica({ className = "" }: { className?: string }) {
  const consent = useConsent();
  const allowed = consent?.maps === true;

  return (
    <figure className={className}>
      <div className="relative aspect-[4/5] overflow-hidden border border-navy-950/10 bg-areia sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
        {allowed ? (
          <>
            <iframe
              src={site.address.embedUrl}
              title={`Mapa: ${site.address.street}, ${site.address.district}, ${site.address.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(0.92)_brightness(1.04)]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-areia mix-blend-multiply opacity-60" />
          </>
        ) : (
          <div className="grain absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p className="max-w-xs type-small text-navy-950/80">
              O mapa é fornecido pelo Google e pode gravar cookies de terceiros. Ele só é carregado com a sua
              permissão.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => saveConsent(true)}
                className="h-11 rounded-full border border-navy-950/30 px-5 text-[0.875rem] font-medium text-navy-950 transition-colors hover:border-navy-950 hover:bg-navy-950 hover:text-linho"
              >
                Carregar mapa
              </button>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center px-2 text-[0.875rem] font-medium text-navy-950 link-quiet"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute left-4 top-4 border border-navy-950/10 bg-linho px-4 py-3 text-navy-950">
          <p className="text-[0.8125rem] font-medium">L&apos;Amour</p>
          <p className="mt-0.5 type-small">{site.address.street}</p>
        </div>
      </div>
      <figcaption className="mt-4 type-small text-pedra-escuro">
        {site.address.district}, {site.address.city} – {site.address.state} · {site.address.postalCode}
      </figcaption>
    </figure>
  );
}
