import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // ─── Test Discovery ──────────────────────────────────────────────
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  // ─── Ejecución ───────────────────────────────────────────────────
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // ─── Timeouts globales ───────────────────────────────────────────
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },

  // ─── Reporters ───────────────────────────────────────────────────
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  // ─── Configuración global de todos los proyectos ─────────────────
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.mercadolibre.com.ar',

    // Evidencia en fallos
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Timeouts de acciones
    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    // Localización
    locale: 'es-AR',
    timezoneId: 'America/Argentina/Buenos_Aires',
  },

  // ─── Proyectos / Browsers ────────────────────────────────────────
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});