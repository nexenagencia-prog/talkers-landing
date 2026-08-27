# Landing Premium + CMS completo

Projeto Next.js preparado para GitHub + Vercel + Supabase.

## O que é editável no /admin
- nome da marca, logo e favicon
- cores globais e raio dos cards
- menus: texto, link, ordem e status
- botão principal do topo
- texto do rodapé
- todas as seções: tipo, ordem, publicação, altura, padding, tema e cores
- eyebrow, títulos, subtítulos e textos
- imagens e posição da imagem
- upload de imagem, vídeo e áudio
- autoplay de vídeo/áudio e poster do vídeo
- todos os botões: texto, link e estilo
- todos os cards: kicker, título, texto, imagem, botão e link
- depoimentos/card lateral
- indicadores e números
- FAQ: cada pergunta e cada resposta
- criação, remoção e reordenação de itens dentro das seções
- criação e exclusão de seções inteiras

Nenhuma edição de conteúdo exige alterar JSON ou código.

## Instalação rápida
1. Crie um projeto no Supabase.
2. Abra SQL Editor e execute `supabase.sql`.
3. Crie um repositório no GitHub e envie todos os arquivos deste projeto.
4. Importe o repositório na Vercel.
5. Configure as variáveis do `.env.example` na Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
6. Faça o deploy.
7. Acesse `/admin` para editar o site.

O bucket `media` aceita arquivos de até 500 MB conforme `supabase.sql`. O limite real também pode depender do plano/configuração da sua conta Supabase/Vercel.


## Login de recuperação
Se `ADMIN_PASSWORD` não estiver configurada na Vercel, o CMS usa automaticamente uma senha de recuperação com hash armazenado apenas no servidor. Para produção, recomenda-se configurar `ADMIN_PASSWORD`; assim a senha de recuperação deixa de ser usada automaticamente.
