"use server";

import { headers } from "next/headers";
import { hashIp, pedidosRecentes, registrarSolicitacao } from "@/lib/server/grupo";
import { legal } from "@/lib/site";

export type GrupoState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fields?: Partial<Record<"nome" | "whatsapp" | "cidade" | "aceite", string>>;
      /** Devolvidos para o formulário não perder o que foi digitado. */
      values?: { nome: string; cidade: string; aceite: boolean };
    }
  | { status: "ok"; nome: string; link: string };

const clean = (v: FormDataEntryValue | null) => String(v ?? "").replace(/\s+/g, " ").trim();

function normalizarWhatsapp(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return /^[1-9]{2}9?[0-9]{8}$/.test(digits) ? `55${digits}` : null;
}

export async function solicitarEntradaGrupo(_prev: GrupoState, form: FormData): Promise<GrupoState> {
  // Armadilhas para robôs: campo invisível preenchido ou envio instantâneo.
  if (clean(form.get("empresa"))) return { status: "error", message: "Não foi possível enviar." };
  const nome = clean(form.get("nome"));
  const cidade = clean(form.get("cidade"));
  const whatsapp = normalizarWhatsapp(clean(form.get("whatsapp")));
  const aceite = form.get("aceite") === "on";
  const values = { nome, cidade, aceite };

  const startedAt = Number(form.get("inicio") ?? 0);
  if (!startedAt || Date.now() - startedAt < 2500) {
    return { status: "error", message: "Confira os dados e envie novamente.", values };
  }

  const fields: NonNullable<Extract<GrupoState, { status: "error" }>["fields"]> = {};
  if (nome.length < 3 || nome.length > 80 || !/^[\p{L}' .-]+$/u.test(nome)) fields.nome = "Informe seu nome completo.";
  if (!whatsapp) fields.whatsapp = "Informe um WhatsApp com DDD, ex.: (49) 99999-9999.";
  if (cidade.length < 2 || cidade.length > 60) fields.cidade = "Informe sua cidade.";
  if (!aceite) fields.aceite = "É preciso concordar com o uso dos dados para enviar.";
  if (Object.keys(fields).length) return { status: "error", message: "Revise os campos destacados.", fields, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip");
  const ipHash = hashIp(ip ?? null);

  try {
    if ((await pedidosRecentes(ipHash)) >= 5) {
      return { status: "error", message: "Muitos pedidos em sequência. Tente novamente mais tarde.", values };
    }
    const link = await registrarSolicitacao({
      nome,
      whatsapp: whatsapp!,
      cidade,
      consentimentoEm: new Date().toISOString(),
      politicaVersao: legal.policyVersion,
      ipHash,
    });
    return { status: "ok", nome: nome.split(" ")[0], link };
  } catch (error) {
    console.error("[grupo-clube]", error instanceof Error ? error.message : error);
    return {
      status: "error",
      message: "O cadastro está indisponível no momento. Fale com a clínica pelo WhatsApp para entrar no grupo.",
      values,
    };
  }
}
