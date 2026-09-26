-- O acesso ao grupo passa a ser pelo Linktree da clínica (que reúne o grupo e os demais canais).
update public.clube_config
set valor = 'https://linktr.ee/clinica_lamour', atualizado_em = now()
where chave = 'grupo_whatsapp_url';
