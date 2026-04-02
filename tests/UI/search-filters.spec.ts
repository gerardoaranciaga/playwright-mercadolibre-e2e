import { test , expect } from '../../fixtures/pages';

test.describe('Filtros de búsqueda', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('debería poder filtrar por condición Nuevo', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.filterByNew();
        await searchPage.assertHasResults();
        await searchPage.assertUrl(/nuevo|ITEM_CONDITION/i);
    });

    test('debería poder filtrar por condición Usado', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.filterByUsed();
        await searchPage.assertHasResults();
        await searchPage.assertUrl(/usado|ITEM_CONDITION/i);
    });

    test('debería poder filtrar por envío gratis', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.filterByFreeShipping();
        await searchPage.assertHasResults();
        await searchPage.assertUrl(/gratis|free/i);
    });

    test('debería poder filtrar por rango de precio', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.filterByPriceRange('100000', '500000');
        await searchPage.assertHasResults();
        await searchPage.assertUrl(/price|precio/i);
    });

    test('debería poder ordenar por menor precio', async ({ homePage, searchPage, page }) => {
        await homePage.searchFor('notebook');
        await searchPage.sortBy('price_asc');
        await searchPage.assertHasResults();
        // ML no refleja el orden en la URL, verificamos el dropdown
        await expect(page.locator('.andes-dropdown__display-values')).toHaveText('Menor precio');
    });


    test.skip('debería poder ir a la siguiente página', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.goToNextPage();
        await searchPage.assertUrl(/_Desde_\d+/);
        // SKIP: MercadoLibre bloquea la navegación de paginación en modo automatizado
    });

   
});