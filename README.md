# Website JGrando

Site portfólio pessoal desenvolvido em Angular para apresentação de serviços, competências e contato profissional.

## Tecnologias

- **Angular 17.3** - Framework frontend
- **TypeScript 5.4** - Linguagem de programação
- **RxJS 7.8** - Programação reativa
- **Angular Router** - Navegação entre páginas
- **Angular Reactive Forms** - Formulários reativos
- **SCSS** - Pré-processador CSS

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   └── contact-form/    # Formulário de contato
│   ├── pages/               # Páginas da aplicação
│   │   ├── home/            # Página inicial
│   │   ├── services/        # Página de serviços
│   │   ├── about/           # Página sobre
│   │   └── contact/         # Página de contato
│   ├── services/            # Serviços Angular
│   │   ├── api.service.ts   # Comunicação com API
│   │   └── profile-store.service.ts
│   ├── models/              # Interfaces e tipos TypeScript
│   └── app.routes.ts        # Configuração de rotas
├── assets/                  # Recursos estáticos
└── environments/            # Configurações de ambiente
```

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Angular CLI 17

## Instalação

1. Clone o repositório e navegue até o diretório do frontend:

```bash
cd JGrando-frontend
```

2. Instale as dependências:

```bash
npm install
```

## Execução

### Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200`.

### Build de Produção

Para gerar uma build de produção:

```bash
npm build
```

Os arquivos compilados estarão no diretório `dist/`.

## Configuração

### Variáveis de Ambiente

Edite `src/environments/environment.ts` para configurar as URLs das APIs:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081/api/v1',
  contactApiBaseUrl: 'http://localhost:8081/api'
};
```

### Backend

Este frontend consome a API de contato disponível em `http://localhost:8081/api`. Certifique-se de que o backend está em execução antes de testar o formulário de contato.

## Páginas

- **/** - Página inicial com apresentação pessoal e links sociais
- **/servicos** - Descrição dos serviços oferecidos
- **/sobre** - Informações sobre competências técnicas e experiência
- **/contato** - Formulário para envio de mensagens via API

## Funcionalidades

- Layout responsivo com tema escuro (preto e roxo)
- Animações de fundo com gradientes e efeitos de blur
- Formulário de contato integrado com API backend
- Navegação entre páginas com Angular Router
- Componentes standalone (Angular 17)

## Desenvolvimento

### Linting

Execute o linter do Angular:

```bash
npm run lint
```

## Estrutura de Componentes

Todos os componentes utilizam a arquitetura standalone do Angular 17, permitindo imports diretos sem módulos. Os componentes principais estão organizados em páginas e componentes reutilizáveis na pasta `components/`.

