import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
    // ─── Locators — Cards ────────────────────────────────────────────
    readonly resultCards: Locator;
    readonly resultTitles: Locator;
    readonly resultPrices: Locator;

    // ─── Locators — Filtros ──────────────────────────────────────────
    readonly filterSection: Locator;
    readonly filterConditionNew: Locator;
    readonly filterConditionUsed: Locator;
    readonly filterFreeShipping: Locator;
    readonly priceMinInput: Locator;
    readonly priceMaxInput: Locator;
    readonly priceSubmitButton: Locator;

    // ─── Locators — Ordenar ──────────────────────────────────────────
    readonly sortDropdown: Locator;

    // ─── Locators — Paginación ───────────────────────────────────────
    readonly nextPageButton: Locator;

    constructor(page: Page) {
        super(page);

        // Cards
        this.resultCards = page.locator('.poly-card');
        this.resultTitles = page.locator('.poly-component__title');
        this.resultPrices = page.locator('.poly-price__current .andes-money-amount__fraction');

        // Filtros — usamos getByRole con aria-label que vimos en el HTML
        this.filterSection = page.locator('.ui-search-filter-groups');
        this.filterConditionNew = page.getByRole('link', { name: 'Nuevo' });
        this.filterConditionUsed = page.getByRole('link', { name: 'Usado' });
        this.filterFreeShipping = page.locator('.ui-search-filter-dl').filter({ hasText: 'Costo de envío' }).getByRole('link', { name: 'Gratis', exact: true });
        
        // Filtro por precio — tienen data-testid!
        // Reemplazá estos tres locators
        this.priceMinInput = page.getByTestId('Minimum-price');
        this.priceMaxInput = page.getByTestId('Maximum-price');
        this.priceSubmitButton = page.getByTestId('ui-search-range-filter__text-submit-test');

        // Ordenar
        this.sortDropdown = page.locator('.andes-dropdown__trigger');

        // Paginación
        this.nextPageButton = page.locator('[data-andes-pagination-control="next"]');
    }

    // ─── Acciones — Cards ────────────────────────────────────────────
    async getResultCount(): Promise<number> {
        return this.resultCards.count();
    }

    async getFirstProductTitle(): Promise<string> {
        return (await this.resultTitles.first().textContent()) ?? '';
    }

    async clickFirstResult(): Promise<void> {
        await this.resultCards.first().click();
        await this.waitForPageLoad();
    }

    async clickResultByIndex(index: number): Promise<void> {
        await this.resultCards.nth(index).click();
        await this.waitForPageLoad();
    }

    // ─── Acciones — Filtros ──────────────────────────────────────────
    async filterByNew(): Promise<void> {
        await this.filterConditionNew.click();
        await this.waitForPageLoad();
    }

    async filterByUsed(): Promise<void> {
        await this.filterConditionUsed.click();
        await this.waitForPageLoad();
    }

    async filterByFreeShipping(): Promise<void> {
        await this.filterFreeShipping.click();
        await this.waitForPageLoad();
    }

    async filterByPriceRange(min: string, max: string): Promise<void> {
        await this.priceMinInput.click();
        await this.priceMinInput.clear();
        await this.priceMinInput.pressSequentially(min, { delay: 100 });
        await this.priceMaxInput.click();
        await this.priceMaxInput.clear();
        await this.priceMaxInput.pressSequentially(max, { delay: 100 });
        await this.priceMaxInput.press('Tab');
        await this.priceMinInput.locator('xpath=ancestor::form').getByRole('button', { name: 'Aplicar' }).click();
        await this.waitForPageLoad();
    }

    // ─── Acciones — Ordenar ──────────────────────────────────────────
    async sortBy(option: 'relevance' | 'price_asc' | 'price_desc'): Promise<void> {
        if (option === 'relevance') return;
        const currentUrl = this.page.url();
        const cleanUrl = currentUrl.split('#')[0];
        const sortSegment = option === 'price_asc' 
            ? '_OrderId_PRICE_NoIndex_True'
            : '_OrderId_PRICE_DESC_NoIndex_True';

        const finalUrl = cleanUrl.replace(
            /\/notebook$/,
            `/notebook${sortSegment}`
        );
        await this.page.goto(finalUrl);
        await this.waitForPageLoad();
    }

    // ─── Acciones — Paginación ───────────────────────────────────────
    async goToNextPage(): Promise<void> {
        await this.waitForElement(this.nextPageButton);
        await this.scrollToElement(this.nextPageButton);
        await this.nextPageButton.click();
        await this.waitForPageLoad();
    }

    // ─── Assertions ──────────────────────────────────────────────────
    async assertHasResults(): Promise<void> {
        await this.assertVisible(this.resultCards.first());
    }

    async assertResultCountGreaterThan(min: number): Promise<void> {
        const count = await this.getResultCount();
        if (count <= min) throw new Error(`Esperaba más de ${min} resultados, encontró ${count}`);
    }

    async assertFilterSectionVisible(): Promise<void> {
        await this.assertVisible(this.filterSection);
    }
}