# Arquitetura

## Visão geral
O frontend é uma SPA em React + TypeScript, construída com Vite e estilizada com Tailwind CSS. A aplicação consome uma API REST para posts, upload de imagens e interações sociais.

## Camadas
- **UI Components**: componentes reutilizáveis em src/components.
- **Hooks**: regras de negócio e side effects em src/hooks.
- **Types**: contratos TypeScript em src/types.

## Fluxo de dados
- UI chama hooks.
- Hooks chamam API (Axios) e atualizam estado local.
- UI reage ao estado e renderiza.
