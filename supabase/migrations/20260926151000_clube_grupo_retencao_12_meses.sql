create extension if not exists pg_cron;

-- Retenção (Política de Privacidade): cadastros do grupo são excluídos 12 meses
-- após a data do cadastro. Roda todo dia às 06:00 UTC (03:00 em Brasília).
select cron.schedule(
  'lamour-limpar-solicitacoes-grupo',
  '0 6 * * *',
  $$delete from public.clube_grupo_solicitacoes where created_at < now() - interval '12 months'$$
);
