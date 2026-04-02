import { test, expect } from '../../fixtures/pages';
 
test.describe.skip('Login - Mercado Libre', () => {
 
    test('login exitoso y guarda sesión', async ({ page, loginPage }) => {
        const email    = process.env.ML_EMAIL    ?? '';
        const password = process.env.ML_PASSWORD ?? '';
 
        await loginPage.open();
        await loginPage.assertLoginPageLoaded();
 
        await loginPage.fillEmail(email);
        await loginPage.assertPasswordStepVisible();
 
        await loginPage.fillPassword(password);
 
        await expect(page).not.toHaveURL(/login/i);
        await expect(page).toHaveURL(/mercadolibre\.com/i);
 
        await page.context().storageState({ path: 'auth.json' });
    });
 
});
