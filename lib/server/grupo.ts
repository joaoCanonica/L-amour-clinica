import "server-only";
import { createHash } from "node:crypto";

/**
 * Cadastro do grupo do Clube no Supabase (projeto "L-amour-clinica").
 *
 * O site só chama a função `solicitar_entrada_grupo` (RPC), que valida os
 * dados, limita abusos, grava o pedido e devolve o convite guardado na tabela
 * privada `clube_config`. As tabelas não são legíveis pela chave pública —
 * por isso ela pode ficar aqui como padrão (é pública por definição).
 * Para trocar o link: atualizar `clube_config.grupo_whatsapp_url` (hoje aponta
 * para o Linktree da clínica, que reúne o grupo e os demais canais).
 */
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://kcvsnzarnozwojfcodix.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_iL8V3F-ipidB4wd_u45Yrg_Sh7wOBJQ";

type Solicitacao = {
  nome: string;
  whatsapp: string;
  cidade: string;
  politicaVersao: string;
  ipHash: string | null;
};

export class GrupoError extends Error {
  constructor(public code: "limite" | "invalido" | "indisponivel") {
    super(code);
  }
}

export function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "lamour-clinica";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/** Grava o pedido e devolve o convite do grupo. */
export async function registrarSolicitacao(dados: Solicitacao): Promise<string> {
  const headers: Record<string, string> = {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    "Content-Type": "application/json",
  };
  // Chaves JWT legadas também vão no Authorization; as novas (sb_…) não.
  if (SUPABASE_PUBLISHABLE_KEY.startsWith("eyJ")) headers.Authorization = `Bearer ${SUPABASE_PUBLISHABLE_KEY}`;

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/solicitar_entrada_grupo`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        p_nome: dados.nome,
        p_whatsapp: dados.whatsapp,
        p_cidade: dados.cidade,
        p_politica_versao: dados.politicaVersao,
        p_ip_hash: dados.ipHash,
      }),
      cache: "no-store",
    });
  } catch {
    throw new GrupoError("indisponivel");
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    const message = body?.message ?? "";
    if (message.includes("limite_excedido")) throw new GrupoError("limite");
    if (/_invalid[oa]$/.test(message)) throw new GrupoError("invalido");
    console.error("[grupo-clube]", res.status, message);
    throw new GrupoError("indisponivel");
  }

  const link = (await res.json()) as unknown;
  // Só destinos conhecidos: convite de grupo do WhatsApp ou o Linktree da clínica.
  if (
    typeof link !== "string" ||
    !/^https:\/\/(chat\.whatsapp\.com\/[A-Za-z0-9]+|linktr\.ee\/[A-Za-z0-9_.]+)$/.test(link)
  ) {
    console.error("[grupo-clube] convite ausente ou inválido em clube_config");
    throw new GrupoError("indisponivel");
  }
  return link;
}
