"use client";

import { useSyncExternalStore } from "react";
import { legal } from "@/lib/site";

/**
 * Consentimento de conteúdo de terceiros (LGPD).
 * O site não usa cookies de publicidade nem de métricas. O único conteúdo que
 * pode gravar cookies de terceiros é o mapa do Google (página de contato), e
 * ele só carrega com permissão. A escolha fica no localStorage do próprio
 * navegador (armazenamento necessário) e é pedida de novo se a política mudar.
 */
export type Consent = { maps: boolean; decidedAt: string; version: string };

const KEY = "lamour-consentimento";
const OPEN_EVENT = "lamour:preferencias-privacidade";
const listeners = new Set<() => void>();
let cache: Consent | null | undefined;

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed.version === legal.policyVersion ? parsed : null;
  } catch {
    return null;
  }
}

function snapshot() {
  if (cache === undefined) cache = read();
  return cache;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read();
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveConsent(maps: boolean) {
  const value: Consent = { maps, decidedAt: new Date().toISOString(), version: legal.policyVersion };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
  cache = value;
  listeners.forEach((fn) => fn());
}

/** `undefined` durante o SSR (ainda não se sabe), `null` sem decisão, ou a escolha salva. */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, snapshot, () => undefined);
}

export function openPrivacyPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenPrivacyPreferences(fn: () => void) {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
}
