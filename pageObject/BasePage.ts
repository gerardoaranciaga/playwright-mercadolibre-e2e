import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ─── Navegación ──────────────────────────────────────────────────
    async navigate(path: string = ''): Promise<void> {
        await this.page.goto(path);
        await this.waitForPageLoad();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    // ─── URL ─────────────────────────────────────────────────────────
    getCurrentUrl(): string {
        return this.page.url();
    }

    // ─── Elementos ───────────────────────────────────────────────────
    async waitForElement(locator: Locator, timeout = 10_000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async scrollToElement(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    // ─── Assertions ──────────────────────────────────────────────────
    async assertUrl(expected: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(expected);
    }

    async assertTitle(expected: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(expected);
    }

    async assertVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async assertText(locator: Locator, text: string | RegExp): Promise<void> {
        await expect(locator).toContainText(text);
    }
}