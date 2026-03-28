import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    // ─── Locators ────────────────────────────────────────────────────
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly buyNowButton: Locator;
    readonly addToCartButton: Locator;
    readonly sellerName: Locator;
    readonly mainImage: Locator;

    constructor(page: Page) {
        super(page);
        this.productTitle = page.locator('h1.ui-pdp-title');
        this.productPrice = page.locator('.andes-money-amount__fraction').first();
        this.buyNowButton = page.getByRole('button', { name: /comprar ahora/i });
        this.addToCartButton = page.getByRole('button', { name: /agregar al carrito/i });
        this.sellerName = page.locator('#seller');
        this.mainImage = page.locator('.ui-pdp-image.ui-pdp-gallery__figure__image').first();
    }

    // ─── Getters ─────────────────────────────────────────────────────
    async getTitle(): Promise<string> {
        return (await this.productTitle.textContent()) ?? '';
    }

    async getPrice(): Promise<string> {
        return (await this.productPrice.textContent()) ?? '';
    }

    async getSellerName(): Promise<string> {
        return (await this.sellerName.textContent()) ?? '';
    }

    // ─── Acciones ────────────────────────────────────────────────────
    async clickBuyNow(): Promise<void> {
        await this.buyNowButton.click();
        await this.waitForPageLoad();
    }

    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
        await this.waitForPageLoad();
    }

    // ─── Assertions ──────────────────────────────────────────────────
    async assertLoaded(): Promise<void> {
        await this.assertVisible(this.productTitle);
        await this.assertVisible(this.productPrice);
        await this.assertVisible(this.mainImage);
    }

    async assertTitleContains(text: string): Promise<void> {
        await this.assertText(this.productTitle, new RegExp(text, 'i'));
    }

    async assertSellerVisible(): Promise<void> {
        await this.assertVisible(this.sellerName);
    }

    async assertBuyButtonsVisible(): Promise<void> {
        await this.assertVisible(this.buyNowButton.or(this.addToCartButton));
    }
}