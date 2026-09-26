import "server-only";
import { createHash } from "node:crypto";

type Solicitacao = {
  nome: string;
  whatsapp: string;
  cidade: string;
  consentimentoEm: string;
  politicaVersao: string;
  ipHash: string | null;
};

const TABLE = "clube_grupo_solicitacoes";

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const link = process.env.CLUBE_GRUPO_URL;
  const linkOk = !!link && /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+$/.test(link);
  if (!url || !key || !linkOk) return null;
  return { url, key, link: link! };
}

export function grupoDisponivel() {
  return config() !== null;
}

function headers(key: string, extra: Record<string, string> = {}) {
  // Chaves novas (sb_secret_…) vão só no header apikey; as JWT legadas também
  // no Authorization.
  const base: Record<string, string> = { apikey: key, "Content-Type": "application/json", ...extra };
  if (!key.startsWith("sb_secret_")) base.Authorization = `Bearer ${key}`;
  return base;
}

export function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "lamour";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/** Quantos pedidos este IP fez na última hora (limite contra abuso). */
export async function pedidosRecentes(ipHash: string | null) {
  const cfg = config();
  if (!cfg || !ipHash) return 0;
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const res = await fetch(
    `${cfg.url}/rest/v1/${TABLE}?select=id&ip_hash=eq.${ipHash}&created_at=gte.${encodeURIComponent(since)}`,
    { headers: headers(cfg.key, { Prefer: "count=exact", Range: "0-0" }), cache: "no-store" },
  );
  const range = res.headers.get("content-range");
  return range ? Number(range.split("/")[1] ?? 0) : 0;
}

/** Grava o pedido e devolve o convite do grupo. Lança erro se falhar. */
export async function registrarSolicitacao(dados: Solicitacao) {
  const cfg = config();
  if (!cfg) throw new Error("grupo-indisponivel");
  const res = await fetch(`${cfg.url}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: headers(cfg.key, { Prefer: "return=minimal" }),
    body: JSON.stringify({
      nome: dados.nome,
      whatsapp: dados.whatsapp,
      cidade: dados.cidade,
      consentimento_em: dados.consentimentoEm,
      politica_versao: dados.politicaVersao,
      ip_hash: dados.ipHash,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase-${res.status}`);
  return cfg.link;
}
