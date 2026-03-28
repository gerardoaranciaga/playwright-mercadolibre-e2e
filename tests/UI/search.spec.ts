import { test, expect } from '../../fixtures/pages';

test.describe('Búsqueda de productos', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('debería mostrar resultados al buscar un producto válido', async ({homePage, searchPage}) => {

        await homePage.searchFor('notebook');

        await searchPage.assertHasResults();
    });

    test('debería mostrar resultados al buscar con la tecla Enter', async ({homePage, searchPage}) => {

        await homePage.searchWithEnter('notebook');

        await searchPage.assertHasResults();
    });

    test('debería mostrar más de 10 resultados', async ({homePage, searchPage}) => {

        await homePage.searchFor('notebook');

        await searchPage.assertResultCountGreaterThan(10);
    });

    test('debería contener el término buscado en la URL', async ({homePage, searchPage}) => {

        await homePage.searchFor('notebook');

        await searchPage.assertUrl(/notebook/i);
    });

    test('debería mostrar el panel de filtros', async ({homePage, searchPage}) => {

        await homePage.searchFor('notebook');

        await searchPage.assertFilterSectionVisible();
    });

    test('debería poder filtrar por condición Nuevo', async ({homePage, searchPage}) => {

        await homePage.searchFor('notebook');

        await searchPage.filterByNew();

        await searchPage.assertHasResults();
        await searchPage.assertUrl(/nuevo|ITEM_CONDITION/i);
    });

    test('debería poder filtrar por envío gratis', async ({homePage, searchPage}) => {

        await homePage.searchFor('notebook');

        await searchPage.filterByFreeShipping();

        await searchPage.assertHasResults();
        await searchPage.assertUrl(/gratis|free/i);
    });

    test.skip('debería poder ir a la siguiente página', async ({homePage, searchPage}) => {
       
        await homePage.searchFor('notebook');
        
        await searchPage.goToNextPage();

        await searchPage.assertUrl(/_Desde_\d+/);

        // SKIP: MercadoLibre bloquea la navegación de paginación en modo automatizado
    });

});