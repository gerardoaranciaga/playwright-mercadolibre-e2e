import { test as base } from '@playwright/test';
import { HomePage } from '../pageObject/HomePage';
import { LoginPage } from '../pageObject/LoginPage';
import { SearchResultsPage } from '../pageObject/SearchResultsPage';
import { ProductPage } from '../pageObject/ProductPage';

type PageFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    searchPage: SearchResultsPage;
    productPage: ProductPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    searchPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
});

export { expect } from '@playwright/test';