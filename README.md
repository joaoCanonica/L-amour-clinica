# L'Amour — Clínica de Estética e Ozonioterapia

Site institucional (Lages/SC). Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 ·
Motion (Framer Motion) · GSAP + ScrollTrigger + SplitText · Lenis.

```bash
npm install
npm run dev        # gera /public/media e sobe em localhost:3000
npm run build      # build de produção (também gera /public/media)
npm run lint && npm run typecheck
```

## Mídia

`lamour-assets-organizados/` é a fonte da verdade. `scripts/prepare-media.mjs` (roda
automaticamente em `predev`/`prebuild`) lê `media.manifest.json`, recorta as fotos
(remove setas, paginação e textos das capturas de carrossel) e copia os vídeos para
`public/media/` — pasta gerada, fora do git. Para trocar uma foto, ajuste o `crop` no
manifesto.

Vídeos: o poster (quadro de capa) de cada vídeo fica em
`lamour-assets-organizados/_gerados/posters/`, gerado por `scripts/extract-posters.mjs`
(`FFMPEG_PATH=/caminho/ffmpeg node scripts/extract-posters.mjs`). `contentEnd` no manifesto
marca onde começa o card final branco com o logo — o player termina ali e a prévia em loop
nunca mostra o card. Imagens de compartilhamento (OG 1200×630) também são geradas no build.

Os logos vetoriais (`logo-lamour-vetorizado/`) viram `components/brand/Logo.tsx`
(`fill="currentColor"`) e `app/icon.svg`.

## Design system

**Marca principal** — `navy-950 #0E1A2B` · `navy-800 #1E3563` · `navy-600 #3B5285` ·
`areia #E8D9C3` · `linho #F5F0E8` · `papel #FBF9F5` · `pedra #8C8175` (decorativo) ·
`pedra-escuro #6F665C` (texto secundário) · `nevoa #A99F93` (secundário sobre navy).

**Sub-marca Programa de Emagrecimento** — `cacau #542B0B` · `cacau-profundo #2E1A0C` ·
`terracota #6E3F1F` · `argila #B08463` · `ouro #C9A36B` · `bege-prog #D9C8B6` ·
`creme #EFE6DC`.

**Tipografia** — Cormorant Garamond 500 (títulos, itálico nos destaques) + Manrope 400/500
(texto e interface). Cormorant nunca abaixo de ~20px. Escala em `app/globals.css`:
`type-display`, `type-h1`, `type-h2`, `type-h3`, `type-numeral`, `type-lead`, `type-body`,
`type-small`, `type-label`.

**Tons de seção** — toda `<section>` declara `data-tone` (`light`, `dark`, `cacau`, `prog`,
`creme`); o header lê o tom da seção abaixo dele e ajusta cor e fundo.

**Movimento** — `RevealText` (linhas por máscara), `RevealImage` (cortina + parallax),
`Reveal`, `ScrubWords`, `DrawLine`, `ContextShift`, transição de página com cortina
(`components/transition`). Tudo respeita `prefers-reduced-motion`.

## Páginas

`/` · `/programa-emagrecimento` · `/servicos` · `/clube-lamour` · `/sobre` · `/contato` ·
404. SEO por página em `lib/seo.ts` (title, description, canonical, Open Graph, Twitter);
`sitemap.xml` e `robots.txt` gerados. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final.

Serviços sem foto usam `MediaFrame` (proporção fixa, placeholder tipográfico) — para trocar
por foto real, adicione a imagem ao `media.manifest.json` e aponte `image` no serviço em
`lib/content.ts`. Procure `TODO: substituir por asset real`.

## Entrada da Home

`components/intro/IntroSplash.tsx`: o símbolo "floresce" (molduras, hastes, pétalas, nome) e
a cortina sobe revelando o hero. Roda só na Home, uma vez por sessão, nunca com movimento
reduzido; tem "Pular introdução" e rede de segurança de 6 s (`lib/intro.ts`).

## Grupo do Clube (cadastro antes do convite)

O convite do grupo **nunca** está no código da página. O formulário (`/clube-lamour#grupo`)
envia nome, WhatsApp e cidade para uma Server Action, que chama a função
`solicitar_entrada_grupo` no Supabase (projeto **L-amour-clinica**). A função valida os dados,
limita abusos (5 pedidos/hora por origem, 120/hora no total), grava o pedido e devolve o
convite, guardado na tabela privada `clube_config`. As tabelas têm RLS e não são legíveis pela
API; um job diário (pg_cron) exclui cadastros com mais de 12 meses. SQL em `supabase/migrations/`.

- **Ver os cadastros:** Supabase → Table Editor → `clube_grupo_solicitacoes`.
- **Link liberado:** hoje é o Linktree da clínica (`https://linktr.ee/clinica_lamour`), que
  reúne o grupo e os demais canais. Para trocar: editar `clube_config` → `grupo_whatsapp_url`
  (sem novo deploy). O servidor só aceita convites `chat.whatsapp.com` ou `linktr.ee`.
- **Opcional, no WhatsApp:** ligar **Aprovar novos participantes** no grupo para conferir nome
  e número na lista antes de aprovar — é o que barra quem recebe o link repassado.

## Privacidade (LGPD)

Sem cookies próprios, de métricas ou de publicidade. O único conteúdo de terceiros é o mapa
do Google em `/contato`, que só carrega com permissão (`lib/consent.ts`, `ConsentBanner`).
Política em `/privacidade`; preferências reabertas pelo rodapé. Ao mudar a política, altere
`legal.policyVersion` em `lib/site.ts` — o aviso volta a ser exibido.

## Compliance (pendências)

Procure `TODO(compliance)` no código: RQE da Dra. Letícia (`lib/site.ts`), responsável
técnico da clínica (footer), CRO do(a) profissional de HOF e redação do pilar 11
(`lib/content.ts`), autorização do depoimento em vídeo (`components/home/Depoimento.tsx`), profissional e
indicações da ozonioterapia (`lib/content.ts`). Conteúdo pendente: `TODO(conteudo)` (nome da
fundadora, história da clínica, equipe, horários, regras do Clube, CNPJ e e-mail do
encarregado de dados).
