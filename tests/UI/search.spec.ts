import { test } from '../../fixtures/pages';

test.describe('Búsqueda de productos', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('debería mostrar resultados al buscar un producto válido', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.assertHasResults();
    });

    test('debería mostrar resultados al buscar con la tecla Enter', async ({ homePage, searchPage }) => {
        await homePage.searchWithEnter('notebook');
        await searchPage.assertHasResults();
    });

    test('debería mostrar más de 10 resultados', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.assertResultCountGreaterThan(10);
    });

    test('debería contener el término buscado en la URL', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.assertUrl(/notebook/i);
    });

    test('debería mostrar el panel de filtros', async ({ homePage, searchPage }) => {
        await homePage.searchFor('notebook');
        await searchPage.assertFilterSectionVisible();
    });

});