"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/transition/PageTransition";
import { onOpenPrivacyPreferences, saveConsent, useConsent } from "@/lib/consent";

/**
 * Aviso de privacidade. "Recusar" e "Permitir" têm o mesmo peso visual e a
 * escolha pode ser revista a qualquer momento pelo rodapé.
 */
export function ConsentBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => onOpenPrivacyPreferences(() => setReopened(true)), []);

  const open = consent === null || reopened;

  function choose(maps: boolean) {
    saveConsent(maps);
    setReopened(false);
  }

  const button =
    "h-11 flex-1 rounded-full border border-navy-950/30 px-5 text-[0.875rem] font-medium text-navy-950 transition-colors hover:border-navy-950 hover:bg-navy-950 hover:text-linho";

  return (
    <AnimatePresence>
      {open && consent !== undefined ? (
        <motion.section
          role="region"
          aria-label="Privacidade e cookies"
          className="fixed inset-x-3 bottom-3 z-[90] border border-navy-950/10 bg-papel p-6 text-navy-950 shadow-[0_20px_60px_-30px_rgba(14,26,43,0.5)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-[26rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-2xl font-medium">Privacidade</h2>
          <p className="mt-3 type-small text-navy-950/80">
            Este site não usa cookies de publicidade nem de rastreamento. O único conteúdo de terceiros é o mapa do
            Google, na página de contato — ele só é carregado se você permitir.
          </p>
          {consent ? (
            <p className="mt-3 type-small text-pedra-escuro">
              Sua escolha atual: mapa {consent.maps ? "permitido" : "recusado"}.
            </p>
          ) : null}
          <div className="mt-5 flex gap-3">
            <button type="button" onClick={() => choose(false)} className={button}>
              Recusar
            </button>
            <button type="button" onClick={() => choose(true)} className={button}>
              Permitir mapa
            </button>
          </div>
          <TransitionLink href="/privacidade" className="mt-4 inline-block type-small link-quiet">
            Política de privacidade
          </TransitionLink>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}

export function PrivacyPreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("lamour:preferencias-privacidade"))}
    >
      Preferências de privacidade
    </button>
  );
}
