-- Pedidos de entrada no grupo do Clube L'Amour (WhatsApp).
-- Aplicada no projeto Supabase "L-amour-clinica" (kcvsnzarnozwojfcodix).
create table if not exists public.clube_grupo_solicitacoes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 3 and 80),
  whatsapp text not null check (whatsapp ~ '^55[1-9]{2}9?[0-9]{8}$'),
  cidade text not null check (char_length(cidade) between 2 and 60),
  consentimento_em timestamptz not null,
  politica_versao text not null check (char_length(politica_versao) <= 20),
  ip_hash text check (ip_hash is null or ip_hash ~ '^[0-9a-f]{64}$')
);

comment on table public.clube_grupo_solicitacoes is
  'Cadastros feitos no site antes de liberar o convite do grupo do Clube. Consentimento LGPD (art. 7, I). Excluídos automaticamente após 12 meses.';

create index if not exists clube_grupo_solicitacoes_ip_idx
  on public.clube_grupo_solicitacoes (ip_hash, created_at);
create index if not exists clube_grupo_solicitacoes_whatsapp_idx
  on public.clube_grupo_solicitacoes (whatsapp, created_at);
create index if not exists clube_grupo_solicitacoes_created_idx
  on public.clube_grupo_solicitacoes (created_at);

-- RLS ligado e nenhuma policy: ninguém lê nem escreve pela API.
alter table public.clube_grupo_solicitacoes enable row level security;
revoke all on table public.clube_grupo_solicitacoes from anon, authenticated;

-- Configuração privada (link do grupo). Só a função abaixo lê.
create table if not exists public.clube_config (
  chave text primary key,
  valor text not null,
  atualizado_em timestamptz not null default now()
);
alter table public.clube_config enable row level security;
revoke all on table public.clube_config from anon, authenticated;

insert into public.clube_config (chave, valor)
values ('grupo_whatsapp_url', 'https://chat.whatsapp.com/J2qGHEpJL7K9sDTLEwLzSx')
on conflict (chave) do update set valor = excluded.valor, atualizado_em = now();

-- Único ponto de entrada público: valida, limita abusos, grava e devolve o convite.
create or replace function public.solicitar_entrada_grupo(
  p_nome text,
  p_whatsapp text,
  p_cidade text,
  p_politica_versao text,
  p_ip_hash text default null
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_nome text := btrim(regexp_replace(coalesce(p_nome, ''), '\s+', ' ', 'g'));
  v_cidade text := btrim(regexp_replace(coalesce(p_cidade, ''), '\s+', ' ', 'g'));
  v_link text;
begin
  if char_length(v_nome) not between 3 and 80 then
    raise exception 'nome_invalido' using errcode = '22023';
  end if;
  if p_whatsapp is null or p_whatsapp !~ '^55[1-9]{2}9?[0-9]{8}$' then
    raise exception 'whatsapp_invalido' using errcode = '22023';
  end if;
  if char_length(v_cidade) not between 2 and 60 then
    raise exception 'cidade_invalida' using errcode = '22023';
  end if;
  if p_politica_versao is null or char_length(p_politica_versao) not between 1 and 20 then
    raise exception 'politica_invalida' using errcode = '22023';
  end if;
  if p_ip_hash is not null and p_ip_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'ip_invalido' using errcode = '22023';
  end if;

  -- Limites contra abuso: 5 pedidos/hora por origem e 120/hora no total.
  if p_ip_hash is not null and (
    select count(*) from public.clube_grupo_solicitacoes
    where ip_hash = p_ip_hash and created_at > now() - interval '1 hour'
  ) >= 5 then
    raise exception 'limite_excedido' using errcode = 'P0001';
  end if;
  if (
    select count(*) from public.clube_grupo_solicitacoes
    where created_at > now() - interval '1 hour'
  ) >= 120 then
    raise exception 'limite_excedido' using errcode = 'P0001';
  end if;

  -- O mesmo número nas últimas 24 h não gera outro registro.
  if not exists (
    select 1 from public.clube_grupo_solicitacoes
    where whatsapp = p_whatsapp and created_at > now() - interval '24 hours'
  ) then
    insert into public.clube_grupo_solicitacoes
      (nome, whatsapp, cidade, consentimento_em, politica_versao, ip_hash)
    values
      (v_nome, p_whatsapp, v_cidade, now(), p_politica_versao, p_ip_hash);
  end if;

  select valor into v_link from public.clube_config where chave = 'grupo_whatsapp_url';
  if v_link is null then
    raise exception 'grupo_indisponivel' using errcode = 'P0001';
  end if;
  return v_link;
end;
$$;

revoke all on function public.solicitar_entrada_grupo(text, text, text, text, text) from public;
grant execute on function public.solicitar_entrada_grupo(text, text, text, text, text) to anon;
