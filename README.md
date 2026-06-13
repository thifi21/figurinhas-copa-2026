# 🏆 Figurinhas Copa 2026 — Álbum Digital Panini

> Álbum de figurinhas digital interativo da Copa do Mundo FIFA 2026. Gerencie sua coleção, marque repetidas, busque jogadores e sincronize na nuvem — tudo com visual fiel ao álbum oficial Panini.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com)

---

## ✨ Funcionalidades

| Feature | Descrição |
|---------|-----------|
| 🖼️ **Imagens reais** | Figurinhas com fotos oficiais Panini via CDN |
| 🎨 **Visual realista** | Design fiel ao álbum físico: páginas, slots, cores das seleções |
| 🌍 **980 figurinhas** | 48 seleções + seção FIFA + museu histórico |
| 🔍 **Busca global** | Encontre jogadores por nome, seleção ou posição |
| 🏷️ **Controle de repetidas** | Registre quantas repetidas tem de cada figurinha |
| 🔄 **Filtros rápidos** | Veja só as que faltam ou só as repetidas por seção |
| 📊 **Estatísticas** | Painel com coladas, faltando, repetidas e seções 100% |
| 📤 **Exportar trocas** | Gera lista formatada para compartilhar no WhatsApp |
| 🖨️ **Checklist PDF** | Impressão otimizada para A4 com todas as seções |
| ☁️ **Sync na nuvem** | Coleção sincronizada via Supabase (opcional) |
| 📱 **Offline-first** | Funciona sem internet; sincroniza quando voltar online |
| ♿ **Acessível** | `aria-label` em todos os elementos interativos |

---

## 🛠️ Tecnologias

- **Frontend:** React 19 + TypeScript 6
- **Bundler:** Vite 8
- **Estilos:** Tailwind CSS 3 (tema customizado Panini)
- **Banco de dados:** Supabase (PostgreSQL + RLS)
- **Ícones:** Lucide React
- **Deploy:** Vercel

---

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- npm 8+

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/figurinhas-copa-2026.git
cd figurinhas-copa-2026

# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`.

### Scripts disponíveis

```bash
npm run dev       # Servidor de desenvolvimento com HMR
npm run build     # Build de produção (TypeScript + Vite)
npm run preview   # Preview do build de produção
npm run lint      # Lint com ESLint
```

---

## ☁️ Configuração do Supabase (opcional)

O app funciona **100% offline** usando `localStorage`. Para ativar a sincronização na nuvem:

### 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Crie um novo projeto

### 2. Aplicar as migrations

Execute os arquivos na ordem no **SQL Editor** do Supabase (`supabase/migrations/`):

| Arquivo | Descrição |
|---------|-----------|
| `001_init.sql` | Schema completo (tabelas, índices, RLS inicial) |
| `002_fix_rls.sql` | Ajuste de política RLS |
| `003_fix_rls_anon.sql` | **Obrigatório** — fix para acesso anônimo por `device_id` |

> ⚠️ **Importante:** A migration `003_fix_rls_anon.sql` é necessária para que o sync funcione. Sem ela, os upserts falham silenciosamente (a policy anterior usava `auth.uid()` que é NULL para usuários anônimos).

### 3. Configurar variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

Edite `.env` com suas credenciais (encontradas em **Project Settings → API**):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

### 4. Popular o banco (seed)

Execute `supabase/seed.sql` no SQL Editor para inserir os dados de seções e figurinhas.

---

## 🏗️ Arquitetura

### Estrutura de arquivos

```
figurinhas-copa-2026/
├── src/
│   ├── components/
│   │   ├── AlbumPages.tsx       # Grid de figurinhas por seção + filtros
│   │   ├── ExportModal.tsx      # Modal de exportação de trocas (WhatsApp)
│   │   ├── PrintableChecklist.tsx  # Checklist otimizado para impressão A4
│   │   ├── SearchBar.tsx        # Barra de busca global
│   │   ├── Sidebar.tsx          # Navegação entre seções com progresso
│   │   ├── StickerCard.tsx      # Card individual de figurinha (coletada/vazia)
│   │   ├── StickerModal.tsx     # Modal de detalhes e ações da figurinha
│   │   └── StatsPanel.tsx       # Painel dropdown de estatísticas
│   ├── data/
│   │   ├── initialCollection.ts # Coleção inicial pré-populada
│   │   ├── sections.ts          # Dados das 48+ seleções (id, nome, bandeira, cores)
│   │   ├── stickerImage.ts      # Utilitário de resolução de URL de imagem
│   │   ├── stickerImages.ts     # Mapa stickerId → URL CDN (imagens reais)
│   │   └── stickers.ts          # Nomes e posições dos 980 jogadores
│   ├── hooks/
│   │   └── useCollection.ts     # Estado global + sync Supabase + keep-alive
│   ├── lib/
│   │   └── supabase.ts          # Cliente Supabase + keep-alive ping
│   ├── App.tsx                  # Componente raiz + layout + roteamento de views
│   ├── index.css                # Estilos globais + tema Panini customizado
│   └── main.tsx                 # Entry point React
├── supabase/
│   ├── migrations/
│   │   ├── 001_init.sql         # Schema inicial (collections, sections, stickers)
│   │   ├── 002_fix_rls.sql      # Ajuste RLS v2
│   │   └── 003_fix_rls_anon.sql # Fix RLS para acesso anônimo ← OBRIGATÓRIO
│   └── seed.sql                 # Dados iniciais das seções
├── public/                      # Assets estáticos
├── .env.example                 # Template de variáveis de ambiente
├── vercel.json                  # Configuração de deploy Vercel (SPA redirect)
├── tailwind.config.js           # Tema Panini (cores, sombras, fontes)
└── vite.config.ts               # Configuração Vite
```

### Fluxo de dados

```
┌─────────────────────────────────────────┐
│               App.tsx                   │
│  (estado global de view e navegação)    │
└────────────┬────────────────────────────┘
             │ useCollection()
             ▼
┌─────────────────────────────────────────┐
│           useCollection.ts              │
│  ┌──────────────────────────────────┐   │
│  │  Estado: collected + repeated    │   │
│  │  Persistência: localStorage      │   │
│  │  Sync: Supabase (debounce 1.5s)  │   │
│  │  Keep-alive: ping cada 5 min     │   │
│  └──────────────────────────────────┘   │
└────────┬──────────────────┬─────────────┘
         │                  │
         ▼                  ▼
   localStorage         Supabase DB
   (offline-first)     (sync na nuvem)
```

### Estratégia de sincronização

1. **Carregamento:** `localStorage` tem prioridade sobre o servidor (evita perda de dados)
2. **Mutações:** Salvas **imediatamente** no `localStorage` + enviadas ao Supabase com **debounce de 1.5s**
3. **Keep-alive:** Ping leve (`SELECT ... LIMIT 1`) a cada **5 minutos** para evitar pausa do projeto free-tier
4. **Fechamento de aba:** `beforeunload` tenta um sync final via `fetch` com `keepalive: true`
5. **Erro de sync:** UI exibe ícone ⚠️ vermelho no header (dados locais sempre preservados)

---

## 🗄️ Schema do Banco de Dados

```sql
-- Coleção de figurinhas por dispositivo
CREATE TABLE collections (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id    UUID NOT NULL,              -- ID anônimo do dispositivo
  sticker_id   TEXT NOT NULL,              -- Ex: "BRA 5", "ARG 1"
  collected    BOOLEAN NOT NULL DEFAULT false,
  repeated_count INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(device_id, sticker_id)
);

-- RLS: qualquer usuário anônimo pode gerenciar seus registros
CREATE POLICY "Anon users manage collections"
  ON collections FOR ALL TO anon
  USING (true) WITH CHECK (true);
```

---

## 🚢 Deploy na Vercel

1. Faça push do repositório para o GitHub
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório
3. Adicione as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Clique em **Deploy** — o CI/CD automático está configurado!

O arquivo `vercel.json` já configura o redirect SPA para suporte a rotas.

---

## 🧩 Componentes principais

### `useCollection` — Hook de estado global

```typescript
const {
  collected,        // Set<string> — IDs das figurinhas coletadas
  repeated,         // Record<string, number> — quantidade de repetidas
  toggleCollected,  // (id) => void — colar/descolar figurinha
  addRepeated,      // (id) => void — incrementar repetida
  removeRepeated,   // (id) => void — decrementar repetida
  syncing,          // boolean — sync em andamento
  syncError,        // boolean — falha no último sync
  totalCollected,   // number — total de figurinhas coletadas
} = useCollection();
```

### `ExportModal` — Exportar trocas

Gera texto formatado para WhatsApp com todas as repetidas agrupadas por seleção:

```
🔄 *Tenho para trocar — Copa 2026*

🇧🇷 *Brasil* (BRA): 3, 7(x2), 15
🇦🇷 *Argentina* (ARG): 5, 11

📦 Total de repetidas: 5
```

### `StatsPanel` — Estatísticas

Dropdown com 4 métricas em tempo real:
- 🏆 Figurinhas coladas
- ⭐ Figurinhas faltando
- 📚 Total de repetidas
- 📊 Seções completadas (100%)

### `AlbumPages` — Filtros por status

```typescript
type FilterMode = 'all' | 'missing' | 'repeated';
// Filtra as figurinhas da seção ativa sem navegação extra
```

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Commit: `git commit -m "feat: adiciona minha feature"`
4. Push: `git push origin feat/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

MIT © 2026 — Projeto pessoal, não afiliado à Panini ou FIFA.
