import { chromium } from '@playwright/test';

const email = 'gerardoaranciaga60@gmail.com';
const password = 'riverloves';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.mercadolibre.com.ar/');
    await page.getByRole('link', { name: 'Ingresá', exact: true }).first().click();
    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('user_id').fill(email);
    await page.getByRole('button', { name: /continuar/i }).click();
    await page.waitForLoadState('domcontentloaded');

    // Esperamos a ver qué aparece: password directo o selector de método
    await page.waitForTimeout(3000);
    console.log('URL después de email:', page.url());

    const passwordField = page.locator('#password');
    const passwordButton = page.getByRole('button', { name: /contraseña/i });

    if (await passwordButton.isVisible()) {
        console.log('Aparece selector de método');
        await passwordButton.click();
        await page.waitForLoadState('domcontentloaded');
    } else {
        console.log('Password directo');
    }

    await passwordField.fill(password);
    await page.getByRole('button', { name: /confirmar/i }).click();
    await page.waitForLoadState('domcontentloaded');

    await page.waitForTimeout(5000);
    console.log('URL final:', page.url());

    await browser.close();
})();