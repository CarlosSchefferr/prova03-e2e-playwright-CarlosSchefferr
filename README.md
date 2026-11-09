# Prova 03 - Testes E2E com Playwright

> Testes end-to-end (E2E) do site da **[Web Brain](https://www.webbrain.com.br/)**, empresa de sistemas web para prefeituras e órgãos públicos, usando **[MS Playwright](https://playwright.dev/)** com TypeScript.

## GitHub Actions + SonarCloud

[![Build and Tests](https://github.com/CarlosSchefferr/prova03-e2e-playwright-CarlosSchefferr/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/CarlosSchefferr/prova03-e2e-playwright-CarlosSchefferr/actions/workflows/node.js.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=CarlosSchefferr_prova03-e2e-playwright-CarlosSchefferr&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CarlosSchefferr_prova03-e2e-playwright-CarlosSchefferr)

## Sumário

- [Dados da avaliação](#dados-da-avaliação)
- [Casos de teste](#casos-de-teste)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Boas práticas do Playwright aplicadas](#boas-práticas-do-playwright-aplicadas)
- [Pipeline (CI)](#pipeline-ci)
- [Relatórios e evidências](#relatórios-e-evidências)

## Dados da avaliação

| Item | Valor |
|------|-------|
| Site testado | https://www.webbrain.com.br/ |
| Aluno (GitHub) | [CarlosSchefferr](https://github.com/CarlosSchefferr) |
| Ferramenta | Playwright Test `1.56.1` + TypeScript |
| Navegador | Chromium (Desktop Chrome) |

## Casos de teste

Os cenários ficam em `src/scenarios`. Cada teste é dividido em `test.step` para o relatório HTML mostrar cada etapa.

| ID | Arquivo | Cenário | Passos | Resultado esperado |
|----|---------|---------|--------|--------------------|
| CT01 | `Home.spec.ts` | Carregar a home e navegar até Contato pelo menu | 1. Acessar `/`<br>2. Validar os itens do menu principal<br>3. Clicar em **Contato** | Título contém `Web Brain`, `h1` contém "Sistemas para prefeituras", menu mostra *Clientes*, *Conteúdos* e *Contato*, e a navegação abre `contato.php` com o título "Fale com a Web Brain" |
| CT02 | `Faq.spec.ts` | Filtrar as perguntas do FAQ pela busca | 1. Acessar `/faq.php`<br>2. Buscar `LGPD`<br>3. Buscar um termo inexistente | Com `LGPD`, só a pergunta sobre proteção de dados aparece, já expandida (`aria-expanded="true"`). Com um termo inexistente, nenhuma pergunta aparece e a página mostra "Nenhuma pergunta encontrada" |
| CT03 | `Contato.spec.ts` | Validar campos obrigatórios e a máscara de telefone | 1. Acessar `/contato.php`<br>2. Clicar em **Enviar contato** com o formulário vazio<br>3. Preencher nome e telefone | O envio é bloqueado e o foco vai para o campo **Nome** (`valueMissing`). O telefone `48999998888` vira `(48) 99999-8888` e o percentual de preenchimento aumenta |

> **Nenhum contato real é enviado à empresa.** O formulário tem reCAPTCHA e o teste nunca completa os campos obrigatórios. Além disso, a fixture `contatoPage` aborta qualquer `POST` para `contato.php` com [`page.route`](https://playwright.dev/docs/network#abort-requests).

## Tecnologias

- [Node.js](https://nodejs.org/) `>= 22`
- [Playwright Test](https://playwright.dev/docs/intro)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) para padronizar o código
- [GitHub Actions](https://docs.github.com/actions) para o CI
- [SonarCloud](https://sonarcloud.io/) para a análise estática

## Como executar

### Pré-requisitos

- Node.js na versão 22 ou superior
- Git

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/CarlosSchefferr/prova03-e2e-playwright-CarlosSchefferr.git
cd prova03-e2e-playwright-CarlosSchefferr

# 2. Instalar as dependências
npm install

# 3. Instalar o navegador usado pelo Playwright
npx playwright install chromium

# 4. Rodar a suíte completa (limpeza + prettier + typecheck + testes)
npm run ci

# 5. Abrir o relatório HTML
npm run show-report
```

Para rodar um único cenário:

```bash
npx playwright test src/scenarios/Faq.spec.ts
```

## Scripts disponíveis

| Script | O que faz |
|--------|-----------|
| `npm test` | Roda todos os testes |
| `npm run ci` | Limpa os artefatos, checa a formatação e os tipos, e roda os testes |
| `npm run actions` | Roda os testes com 1 worker (usado no GitHub Actions) |
| `npm run ui` | Abre o [UI Mode](https://playwright.dev/docs/test-ui-mode) do Playwright |
| `npm run debug` | Roda com o [Playwright Inspector](https://playwright.dev/docs/debug) |
| `npm run show-report` | Abre o relatório HTML gerado em `artifacts/report` |
| `npm run format` | Formata o código com Prettier |
| `npm run verify` | Só confere a formatação |
| `npm run typecheck` | Checa os tipos com `tsc --noEmit` |
| `npm run clean` | Apaga a pasta `artifacts` |

## Estrutura do projeto

```
.
├── .github/workflows/node.js.yml   # Pipeline: testes E2E + SonarCloud
├── src
│   ├── scenarios                   # Casos de teste (*.spec.ts)
│   │   ├── Home.spec.ts            # CT01
│   │   ├── Faq.spec.ts             # CT02
│   │   └── Contato.spec.ts         # CT03
│   └── support
│       ├── elements                # Mapeamento dos elementos (locators)
│       │   ├── BaseElements.ts
│       │   ├── HomeElements.ts
│       │   ├── FaqElements.ts
│       │   └── ContatoElements.ts
│       ├── pages                   # Page Objects (ações e validações)
│       │   ├── BasePage.ts
│       │   ├── HomePage.ts
│       │   ├── FaqPage.ts
│       │   └── ContatoPage.ts
│       └── fixtures
│           └── pages.ts            # Fixtures que entregam os Page Objects
├── playwright.config.ts            # Configuração do Playwright
├── sonar-project.properties        # Configuração do SonarCloud
├── tsconfig.json
└── package.json
```

O projeto segue o padrão **Page Object Model** do template da disciplina:

- **Elements** só sabem *onde* estão os elementos.
- **Pages** sabem *o que fazer* com eles (ações e `expect`).
- **Scenarios** descrevem *o comportamento esperado* com `test.step`.

## Boas práticas do Playwright aplicadas

| Prática | Onde | Documentação |
|---------|------|--------------|
| Locators por papel acessível (`getByRole`, `getByLabel`) em vez de XPath/CSS frágil | `src/support/elements` | [Locators](https://playwright.dev/docs/locators) |
| Asserções web-first com espera automática (`toHaveURL`, `toHaveText`, `toBeFocused`...) sem `waitForTimeout` | `src/support/pages` | [Assertions](https://playwright.dev/docs/test-assertions) |
| `expect.poll` para valores calculados | `ContatoPage.verifyProgressGreaterThan` | [expect.poll](https://playwright.dev/docs/test-assertions#expectpoll) |
| Fixtures customizadas com `test.extend` | `src/support/fixtures/pages.ts` | [Fixtures](https://playwright.dev/docs/test-fixtures) |
| Page Object Model | `src/support/pages` | [POM](https://playwright.dev/docs/pom) |
| `test.step` para organizar o relatório | `src/scenarios` | [test.step](https://playwright.dev/docs/api/class-test#test-step) |
| `baseURL` e `page.goto('/caminho')` | `playwright.config.ts` | [Test options](https://playwright.dev/docs/test-use-options) |
| `storageState` com o aviso de privacidade já marcado como lido | `playwright.config.ts` | [storageState](https://playwright.dev/docs/api/class-testoptions#test-options-storage-state) |
| `addLocatorHandler` para fechar o aviso de cookies se ele aparecer | `BasePage.ts` | [Locator handler](https://playwright.dev/docs/api/class-page#page-add-locator-handler) |
| Interceptação de rede para não enviar dados reais | `ContatoPage.blockFormSubmission` | [Network](https://playwright.dev/docs/network) |
| `retries`, `forbidOnly` e `workers` diferentes no CI | `playwright.config.ts` | [CI](https://playwright.dev/docs/ci) |
| Trace, screenshot e vídeo guardados quando um teste falha | `playwright.config.ts` | [Trace viewer](https://playwright.dev/docs/trace-viewer) |

## Pipeline (CI)

Arquivo: `.github/workflows/node.js.yml`. Roda em todo `push` e `pull_request` na `master`, todo dia às 12h UTC (`schedule`) e manualmente (`workflow_dispatch`).

| Job | Etapas |
|-----|--------|
| **Run E2E Tests** (`ubuntu-24.04`, versão do Ubuntu suportada pelo Playwright 1.56) | `npm ci` → `npx playwright install --with-deps chromium` → `npm run verify` → `npm run actions` → envia `artifacts/` como artefato `playwright-report` |
| **Run SonarCloud** | Checkout com histórico completo → `SonarSource/sonarqube-scan-action` usando `sonar-project.properties` |

Segredo necessário no repositório: `SONAR_TOKEN` (em *Settings → Secrets and variables → Actions*).

## Relatórios e evidências

Depois de rodar os testes:

- `artifacts/report/index.html`: relatório HTML do Playwright (`npm run show-report`)
- `artifacts/media/`: screenshots, vídeos e traces dos testes que falharam

No GitHub Actions, os mesmos arquivos ficam no artefato **playwright-report** de cada execução.

## Licença

[MIT](LICENSE)
