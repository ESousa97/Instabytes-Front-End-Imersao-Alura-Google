<div align="center">

# InstaBytes

[![CI](https://img.shields.io/github/actions/workflow/status/ESousa97/Instabytes-Front-End-Imersao-Alura-Google/ci.yml?style=flat&logo=github-actions&logoColor=white)](https://github.com/ESousa97/Instabytes-Front-End-Imersao-Alura-Google/actions/workflows/ci.yml)
[![Quality](https://img.shields.io/github/actions/workflow/status/ESousa97/Instabytes-Front-End-Imersao-Alura-Google/quality.yml?style=flat&logo=github-actions&logoColor=white&label=Quality)](https://github.com/ESousa97/Instabytes-Front-End-Imersao-Alura-Google/actions/workflows/quality.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/ESousa97/Instabytes-Front-End-Imersao-Alura-Google/codeql.yml?style=flat&logo=github-actions&logoColor=white&label=CodeQL)](https://github.com/ESousa97/Instabytes-Front-End-Imersao-Alura-Google/actions/workflows/codeql.yml)
[![Coverage](https://img.shields.io/codecov/c/gh/ESousa97/Instabytes-Front-End-Imersao-Alura-Google?style=flat&logo=codecov&logoColor=white)](https://codecov.io/gh/ESousa97/Instabytes-Front-End-Imersao-Alura-Google)
[![CodeFactor](https://img.shields.io/codefactor/grade/github/ESousa97/Instabytes-Front-End-Imersao-Alura-Google?style=flat&logo=codefactor&logoColor=white)](https://www.codefactor.io/repository/github/esousa97/instabytes-front-end-imersao-alura-google)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Archived-lightgrey.svg?style=flat&logo=archive&logoColor=white)](#)

**Plataforma social de compartilhamento de imagens com geração automática de legendas via Google Gemini — React 18, TypeScript, Tailwind CSS, Vite e Node.js/Express no backend.**

[Demo](https://instabytes-front-end.vercel.app/)

</div>

---

> **⚠️ Projeto Arquivado**
> Este projeto não recebe mais atualizações ou correções. O código permanece disponível como referência e pode ser utilizado livremente sob a licença MIT. Fique à vontade para fazer fork caso deseje continuar o desenvolvimento.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Uso Local](#uso-local)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Qualidade e Governança](#qualidade-e-governança)
- [Deploy](#deploy)
- [FAQ](#faq)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre o Projeto

Este projeto é o frontend de uma plataforma social de compartilhamento de imagens que integra inteligência artificial (Google Gemini) para gerar automaticamente descrições criativas e contextualmente relevantes. Desenvolvido com React 18, TypeScript e Tailwind CSS, oferece upload com drag & drop, feed interativo com curtidas e comentários, dark mode e design mobile-first.

O repositório prioriza:

- **Geração de legendas via IA** — Google Gemini analisa o conteúdo visual e gera descrições em tempo real
- **React 18 + TypeScript** — Tipagem estática, hooks customizados (`useTheme`, `usePosts`, `useNotification`) e componentes modulares
- **Tailwind CSS** — Design system utility-first com paleta gradiente (purple → pink → orange) e dark mode
- **Vite** — HMR ultrarrápido, ESM nativo e builds de produção otimizados
- **Arquitetura modular** — Separação clara entre componentes, hooks e tipos com responsabilidade única
- **Acessibilidade** — Suporte a screen readers, navegação por teclado e contraste adequado em ambos os temas

### Por que React + TypeScript + Tailwind?

A combinação representa o estado da arte em desenvolvimento frontend: React 18 com concurrent features para responsividade, TypeScript para eliminar categorias inteiras de bugs em compilação, e Tailwind para desenvolvimento ágil com bundle size otimizado. Vite completa a stack com feedback instantâneo durante desenvolvimento.

---

## Funcionalidades

- **Upload inteligente com IA** — Drag & drop ou seleção de arquivo com processamento Google Gemini em tempo real
- **Geração automática de legendas** — Descrições criativas e contextuais geradas por análise visual da IA
- **Feed interativo** — Curtidas com animações fluidas, comentários e compartilhamento via Web Share API
- **Modal de visualização** — Visualização imersiva expandida com interações sociais completas
- **Edição in-line** — Edição de descrições diretamente no post sem recarregar página
- **Dark mode** — Alternância claro/escuro com persistência local e detecção de preferência do sistema
- **Design mobile-first** — Breakpoints otimizados com experiência touch e responsividade completa
- **Feed infinito** — Lazy loading com scroll infinito para carregamento sob demanda
- **Notificações toast** — Sistema de notificações com auto-dismiss e fila de mensagens

---

## Tecnologias

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

### Backend e Serviços

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat&logo=google&logoColor=white)

### Ferramentas de Desenvolvimento

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

**Requisitos mínimos:**

- Node.js 18+ e npm 8+
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

---

## Arquitetura do Sistema

A aplicação segue uma arquitetura de separação frontend/backend com integração de serviços de IA:

```
Usuário
  → React Frontend (TypeScript + Tailwind + Vite)
    → Node.js Backend (Express + API REST)
      ├── Google Gemini (análise de imagem → geração de descrição)
      ├── Cloud Storage (armazenamento de imagens)
      └── Banco de Dados (posts, comentários, curtidas)
```

### Fluxo de Upload com IA

```
Usuário seleciona imagem (drag & drop / file picker)
  → Frontend valida formato e tamanho (max 5MB)
    → Backend recebe e armazena imagem
      → Google Gemini analisa conteúdo visual
        → Descrição gerada retorna ao frontend
          → Post publicado com legenda automática
```

### Componentes Principais

| Componente              | Arquivo                 | Responsabilidade                                           |
| ----------------------- | ----------------------- | ---------------------------------------------------------- |
| **App**                 | `App.tsx`               | Orquestrador principal, estado global e routing lógico     |
| **Header**              | `Header.tsx`            | Navegação, toggle de tema e botão de upload                |
| **UploadArea**          | `UploadArea.tsx`        | Drag & drop, validação e feedback de processamento IA      |
| **PostCard**            | `PostCard.tsx`          | Card com curtidas, comentários, compartilhamento e edição  |
| **PostModal**           | `PostModal.tsx`         | Visualização imersiva expandida                            |
| **useTheme**            | `hooks/useTheme.ts`    | Gerenciamento de tema com persistência local               |
| **usePosts**            | `hooks/usePosts.ts`    | State management para posts e chamadas à API               |
| **useNotification**     | `hooks/useNotification.ts` | Sistema de notificações com fila e auto-hide           |

---

## Estrutura do Projeto

```
Instabytes-Front-End/
├── src/
│   ├── main.tsx                   # Entry point com Error Boundary
│   ├── App.tsx                    # Componente principal
│   ├── index.css                  # Estilos globais, animações, dark/light
│   ├── components/
│   │   ├── Header.tsx             # Navegação e toggle de tema
│   │   ├── UploadArea.tsx         # Upload com drag & drop e feedback IA
│   │   ├── PostCard.tsx           # Card de post com interações sociais
│   │   ├── PostModal.tsx          # Modal de visualização expandida
│   │   ├── Notification.tsx       # Toast notifications
│   │   ├── LoadingSpinner.tsx     # Indicadores de progresso
│   │   ├── EmptyState.tsx         # Estado vazio com CTA
│   │   ├── ScrollToTopButton.tsx  # Botão de scroll suave
│   │   └── ConfirmationModal.tsx  # Confirmação para ações destrutivas
│   ├── hooks/
│   │   ├── useTheme.ts            # Tema com persistência e detecção do sistema
│   │   ├── usePosts.ts            # State management e API calls
│   │   └── useNotification.ts     # Fila de notificações com auto-hide
│   ├── types/
│   │   └── index.ts               # Interfaces e type definitions
│   └── assets/
│       └── react.svg              # Ícones da aplicação
├── public/
│   ├── vite.svg                   # Favicon
│   └── manifest.json              # Manifest PWA
├── index.html                     # HTML principal com meta tags e SEO
├── tailwind.config.js             # Tema customizado e animações
├── vite.config.ts                 # Configuração Vite
├── tsconfig.json                  # TypeScript strict mode
├── eslint.config.js               # Rules ESLint customizadas
├── vercel.json                    # Configuração de deploy
├── package.json                   # Dependências e scripts
└── LICENSE                        # Licença MIT
```

---

## Começando

### Pré-requisitos

```bash
node --version  # v18 ou superior
npm --version   # v8 ou superior
```

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/ESousa97/Instabytes-Front-End-Imersao-Alura-Google.git
cd Instabytes-Front-End-Imersao-Alura-Google
```

2. **Instale as dependências**

```bash
npm install
```

### Configuração

Crie o arquivo `.env.local` na raiz do projeto:

```bash
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=InstaBytes
VITE_MAX_FILE_SIZE=5242880
```

### Uso Local

**Modo desenvolvimento:**

```bash
npm run dev
```

Acesse: `http://localhost:8000/`

**Build de produção:**

```bash
npm run build
npm run preview
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento com HMR
npm run dev

# Build de produção
npm run build

# Preview do build local
npm run preview

# Lint
npm run lint

# Testes
npm test

# Testes com cobertura
npm run test:coverage
```

---

## Qualidade e Governança

O projeto adota práticas de governança para manter a qualidade do código:

- **CI** — Pipeline com lint, testes, build e cobertura via GitHub Actions
- **Quality** — Pipeline separado para análise de qualidade de código
- **Security** — Análise CodeQL semanal e em cada push/PR
- **Coverage** — Relatórios integrados ao Codecov
- **Type Safety** — TypeScript em strict mode com verificação rigorosa

---

## Deploy

### Vercel (Produção)

Deploy contínuo automatizado via integração GitHub. Cada push na branch `main` aciona build e deploy. Pull Requests geram URLs de preview automáticas.

O `vercel.json` configura otimizações específicas para a SPA React.

---

## FAQ

<details>
<summary><strong>Como funciona a geração de legendas por IA?</strong></summary>

Ao fazer upload de uma imagem, ela é enviada para a API do Google Gemini que analisa o conteúdo visual — objetos, cenários, emoções e contexto — e gera uma descrição textual criativa. O processo acontece em tempo real, geralmente em poucos segundos.
</details>

<details>
<summary><strong>Quais formatos de imagem são suportados?</strong></summary>

JPEG, PNG, GIF e WEBP com tamanho máximo de 5MB por arquivo para garantir upload rápido e processamento eficiente pela IA.
</details>

<details>
<summary><strong>A aplicação funciona offline?</strong></summary>

A interface principal funciona offline após o primeiro carregamento, mas funcionalidades que dependem de API (upload, geração de IA, sincronização de posts) requerem conexão.
</details>

<details>
<summary><strong>É necessário configurar o backend separadamente?</strong></summary>

Sim. Este repositório contém apenas o frontend. O backend (Node.js/Express) deve ser configurado em repositório separado com a integração Google Gemini e banco de dados.
</details>

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License - você pode usar, copiar, modificar e distribuir este código.
```

---

## Contato

**José Enoque Costa de Sousa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/ESousa97)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat&logo=todoist&logoColor=white)](https://enoquesousa.vercel.app)

---

<div align="center">

**[⬆ Voltar ao topo](#instabytes)**

Feito com ❤️ por [José Enoque](https://github.com/ESousa97)

**Status do Projeto:** Archived — Sem novas atualizações

</div>
