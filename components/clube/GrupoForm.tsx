"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { solicitarEntradaGrupo, type GrupoState } from "@/app/clube-lamour/actions";
import { TransitionLink } from "@/components/transition/PageTransition";
import { whatsappLink, whatsappMessages } from "@/lib/site";

const input =
  "mt-2 block h-12 w-full border-b border-navy-950/25 bg-transparent px-0 text-[1rem] text-navy-950 outline-none transition-colors placeholder:text-navy-950/35 focus:border-navy-950 aria-[invalid=true]:border-[#9b2c2c]";

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Pedido de entrada no grupo do Clube. O convite nunca está no código da
 * página: o servidor só o devolve depois de gravar o cadastro. A entrada no
 * grupo ainda passa pela aprovação da equipe no WhatsApp.
 */
export function GrupoForm() {
  const [state, action, pending] = useActionState<GrupoState, FormData>(solicitarEntradaGrupo, { status: "idle" });
  const [phone, setPhone] = useState("");
  const startedAt = useRef(0);
  const startedField = useRef<HTMLInputElement>(null);

  // Marca quando o formulário apareceu (envios instantâneos são de robôs).
  // O valor vai para o campo oculto no envio, porque o React limpa o
  // formulário depois de cada ação.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  if (state.status === "ok") {
    return (
      <div role="status" className="border-t border-navy-950/15 pt-8">
        <p className="type-h3 text-navy-950">Pedido registrado, {state.nome}.</p>
        <p className="mt-4 max-w-md type-body text-navy-950/80">
          Toque no botão para pedir a entrada no grupo. A equipe confere o seu nome e o seu número antes de aprovar.
        </p>
        <a
          href={state.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-[50px] items-center gap-3 rounded-full bg-navy-950 px-7 text-[0.875rem] font-medium text-linho transition-colors hover:bg-navy-800"
        >
          Entrar no grupo do WhatsApp
          <span aria-hidden>↗</span>
        </a>
      </div>
    );
  }

  const err = state.status === "error" ? state : null;

  return (
    <form
      action={action}
      noValidate
      onSubmit={() => {
        if (startedField.current) startedField.current.value = String(startedAt.current);
      }}
      className="border-t border-navy-950/15 pt-8"
    >
      {/* Armadilhas para robôs */}
      <input ref={startedField} type="hidden" name="inicio" defaultValue="0" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Empresa
          <input type="text" name="empresa" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-[0.875rem] font-medium text-navy-950">Nome completo</span>
          <input
            name="nome"
            defaultValue={err?.values?.nome}
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={!!err?.fields?.nome}
            aria-describedby={err?.fields?.nome ? "erro-nome" : undefined}
            className={input}
          />
          {err?.fields?.nome ? (
            <span id="erro-nome" className="mt-2 block type-small text-[#9b2c2c]">
              {err.fields.nome}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="text-[0.875rem] font-medium text-navy-950">WhatsApp</span>
          <input
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required
            placeholder="(49) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            aria-invalid={!!err?.fields?.whatsapp}
            aria-describedby={err?.fields?.whatsapp ? "erro-whatsapp" : "ajuda-whatsapp"}
            className={input}
          />
          <span id="ajuda-whatsapp" className={`mt-2 block type-small ${err?.fields?.whatsapp ? "text-[#9b2c2c]" : "text-pedra-escuro"}`}>
            {err?.fields?.whatsapp ?? "O mesmo número que vai entrar no grupo."}
          </span>
        </label>

        <label className="block">
          <span className="text-[0.875rem] font-medium text-navy-950">Cidade</span>
          <input
            name="cidade"
            defaultValue={err?.values?.cidade}
            autoComplete="address-level2"
            required
            maxLength={60}
            aria-invalid={!!err?.fields?.cidade}
            aria-describedby={err?.fields?.cidade ? "erro-cidade" : undefined}
            className={input}
          />
          {err?.fields?.cidade ? (
            <span id="erro-cidade" className="mt-2 block type-small text-[#9b2c2c]">
              {err.fields.cidade}
            </span>
          ) : null}
        </label>
      </div>

      <label className="mt-8 flex items-start gap-3">
        <input
          type="checkbox"
          name="aceite"
          defaultChecked={err?.values?.aceite}
          required
          aria-invalid={!!err?.fields?.aceite}
          className="mt-1 size-4 shrink-0 accent-navy-950"
        />
        <span className="type-small text-navy-950/85">
          Concordo que a L&apos;Amour use meu nome, WhatsApp e cidade para analisar a minha entrada no grupo do Clube,
          conforme a{" "}
          <TransitionLink href="/privacidade" className="link-quiet">
            Política de Privacidade
          </TransitionLink>
          . Posso pedir a exclusão a qualquer momento.
          {err?.fields?.aceite ? <span className="mt-1 block text-[#9b2c2c]">{err.fields.aceite}</span> : null}
        </span>
      </label>

      {err && !err.fields ? (
        <p role="alert" className="mt-6 type-small text-[#9b2c2c]">
          {err.message}{" "}
          <a href={whatsappLink(whatsappMessages.clube)} target="_blank" rel="noopener noreferrer" className="link-quiet">
            Abrir WhatsApp
          </a>
        </p>
      ) : err ? (
        <p role="alert" className="sr-only">
          {err.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-10 inline-flex h-[50px] items-center rounded-full bg-navy-950 px-8 text-[0.875rem] font-medium text-linho transition-colors hover:bg-navy-800 disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar e liberar o convite"}
      </button>
    </form>
  );
}
