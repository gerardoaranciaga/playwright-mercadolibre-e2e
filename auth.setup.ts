import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.mercadolibre.com.ar/');
    await page.getByRole('link', { name: 'Ingresá', exact: true }).first().click();
    await page.waitForLoadState('domcontentloaded');

    console.log('Completá el login manualmente en el browser...');
    await page.waitForURL('https://www.mercadolibre.com.ar/', { timeout: 60_000 });

    console.log('Login exitoso, guardando sesión...');
    await context.storageState({ path: 'auth.json' });

    console.log('auth.json guardado!');
    await browser.close();
})();