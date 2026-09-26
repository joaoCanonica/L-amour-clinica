-- Pedidos de entrada no grupo do Clube L'Amour (WhatsApp).
-- Acesso somente pelo servidor do site (chave secreta / service role): RLS
-- ligado e nenhuma policy — anon e authenticated não leem nem escrevem.
create table if not exists public.clube_grupo_solicitacoes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 3 and 80),
  whatsapp text not null check (whatsapp ~ '^55[0-9]{10,11}$'),
  cidade text not null check (char_length(cidade) between 2 and 60),
  consentimento_em timestamptz not null,
  politica_versao text not null,
  -- hash (SHA-256 com sal) do IP, só para limitar abusos; o IP não é guardado.
  ip_hash text
);

alter table public.clube_grupo_solicitacoes enable row level security;
revoke all on table public.clube_grupo_solicitacoes from anon, authenticated;

create index if not exists clube_grupo_solicitacoes_ip_idx
  on public.clube_grupo_solicitacoes (ip_hash, created_at);
create index if not exists clube_grupo_solicitacoes_whatsapp_idx
  on public.clube_grupo_solicitacoes (whatsapp);
