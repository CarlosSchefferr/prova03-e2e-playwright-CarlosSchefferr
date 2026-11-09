import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright.
 * Documentação: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/scenarios',
  outputDir: './artifacts/media',
  timeout: 60_000,
  expect: {
    timeout: 15_000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'artifacts/report', open: 'never' }]
  ],
  use: {
    baseURL: 'https://www.webbrain.com.br',
    locale: 'pt-BR',
    // O site mostra um aviso de privacidade 2,5 s após carregar. Ele só
    // informa, então começamos com o aviso já marcado como lido para não
    // interferir no foco dos campos.
    // https://playwright.dev/docs/api/class-testoptions#test-options-storage-state
    storageState: {
      cookies: [],
      origins: [
        {
          origin: 'https://www.webbrain.com.br',
          localStorage: [{ name: 'wb_cookie', value: '1' }]
        }
      ]
    },
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
