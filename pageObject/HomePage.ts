import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    // ─── Locators ────────────────────────────────────────────────────
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly logo: Locator;
    readonly loginLink: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByRole('combobox', { name: 'Ingresá lo que quieras' });
        this.searchButton = page.getByRole('button', { name: /buscar/i });
        this.logo = page.getByRole('link', { name: /mercado libre/i });
        this.loginLink = page.getByRole('link', { name: /ingresá/i });
    }

    // ─── Acciones ────────────────────────────────────────────────────
    async open(): Promise<void> {
        await this.navigate('/');
    }

    async searchFor(term: string): Promise<void> {
        await this.searchInput.clear();
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.waitForPageLoad();
    }

    async searchWithEnter(term: string): Promise<void> {
        await this.searchInput.clear();
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
        await this.waitForPageLoad();
    }

    // ─── Assertions ──────────────────────────────────────────────────
    async assertLoaded(): Promise<void> {
        await this.assertVisible(this.searchInput);
        await this.assertVisible(this.logo);
    }
}