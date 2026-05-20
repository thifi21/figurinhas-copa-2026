# Figurinhas Copa 2026 - Álbum Panini

Álbum de figurinhas digital inspirado no álbum oficial Panini da Copa do Mundo 2026. Gerencie sua coleção, marque repetidas e acompanhe seu progresso.

## Características

- 🎨 **Visual realista** - Design idêntico ao álbum Panini com páginas, slots e stickers com cores das bandeiras
- 🌍 **48 seleções** + seção especial FIFA = **670 figurinhas**
- 📱 **Responsivo** - funciona perfeitamente em desktop e mobile
- ☁️ **Sincronização Supabase** - sua coleção salva na nuvem (opcional)
- 📦 **Offline-first** - funciona sem internet, sincroniza quando online
- 🏷️ **Controle de repetidas** - marque quantas repetidas de cada figurinha você tem

## Tecnologias

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 3
- Supabase (persistência opcional)
- Lucide React (ícones)
- Deploy via Vercel

## Começando

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview
```

## Supabase (opcional)

Para ativar a sincronização na nuvem:

1. Crie um projeto gratuito em [supabase.com](https://supabase.com)
2. Execute o schema em `supabase/migrations/001_init.sql` no SQL Editor
3. Execute o seed em `supabase/seed.sql` para popular os dados
4. Copie `.env.example` para `.env` e preencha com suas credenciais:
   ```
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon
   ```

## Deploy na Vercel

1. Faça push do repositório para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com/new)
3. Adicione as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
4. Deploy automático ativado!

## Estrutura

```
src/
  components/     # Componentes React
    AlbumPages.tsx    # Páginas do álbum com grid de stickers
    Sidebar.tsx       # Navegação entre seções
    StickerCard.tsx   # Card individual de figurinha
    StickerModal.tsx  # Modal de detalhes da figurinha
  data/
    sections.ts       # Dados das seleções (cores, bandeiras)
  hooks/
    useCollection.ts  # Gerenciamento de estado + sync Supabase
  lib/
    supabase.ts       # Cliente Supabase
  App.tsx             # Componente principal
  index.css           # Estilos globais
supabase/
  migrations/001_init.sql  # Schema do banco
  seed.sql                  # Dados iniciais
```
