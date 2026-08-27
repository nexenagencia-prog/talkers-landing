# Talkers Landing + CMS V8

Versão preparada para substituir os arquivos do projeto GitHub atual `talkers-landing` sem criar um novo projeto Vercel/Supabase.

## O que foi preservado

- Next.js App Router
- Login do CMS em `/admin`
- Supabase já conectado pela Vercel
- Upload para o bucket `media`
- APIs `/api/login`, `/api/logout`, `/api/cms`, `/api/upload`, `/api/health`
- Página `/casting` com card que expande ao clicar

## Nova interface

A home foi reconstruída para a direção aprovada: hero escura cinematográfica, blocos amplos e separados, cards arredondados, tipografia editorial, seção de confiança, depoimentos, faixa de marca, soluções, números, casting, FAQ, CTA e rodapé.

## CMS totalmente editável

O CMS permite editar:

- nome da marca, logo e favicon
- menus, ordem, links e status
- botão do topo
- SEO do site
- e-mail, telefone, cidade e WhatsApp
- Instagram, LinkedIn e YouTube
- textos e títulos do rodapé
- título, descrição, etiqueta, tema, altura e espaçamento de cada seção
- botões e links
- imagens da hero e cards
- benefícios e ícones
- depoimentos, nomes, cargos, estrelas e fotos
- faixa de marca
- cards de soluções
- métricas
- os 14 palestrantes: nome, categoria, cargo, descrição, bio, foto, tags e link
- textos exclusivos da página `/casting`
- FAQ e CTA final

## Migração automática V8

Não é necessário rodar novo SQL no projeto existente. Na primeira abertura da home, `/casting` ou `/admin`, o código verifica `theme_json.ui_version`. Se ainda não for `8`, aplica uma única vez a estrutura visual padrão Talkers e marca a versão como 8. Depois disso, alterações feitas no CMS não são sobrescritas.

As variáveis que já funcionam na Vercel permanecem as mesmas:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`

## Verificação

Execute:

```bash
npm run smoke
npm run build
```
