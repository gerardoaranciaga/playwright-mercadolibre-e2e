import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // ─── Locators ────────────────────────────────────────────────────
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly passwordOption: Locator;
    readonly passwordInput: Locator;
    readonly confirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByTestId('user_id');
        this.continueButton = page.getByRole('button', { name: /continuar/i });
        this.passwordOption = page.getByRole('button', { name: /contraseña/i });
        this.passwordInput = page.locator('#password');
        this.confirmButton = page.getByRole('button', { name: /confirmar/i });
    }

    // ─── Acciones ────────────────────────────────────────────────────
    async open(): Promise<void> {
        await this.navigate('/');
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.continueButton.click();
        await this.waitForPageLoad();
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordOption.click();
        await this.passwordInput.fill(password);
        await this.confirmButton.click();
        await this.waitForPageLoad();
    }

    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
    }

    // ─── Assertions ──────────────────────────────────────────────────
    async assertLoginPageLoaded(): Promise<void> {
        await this.assertVisible(this.emailInput);
        await this.assertVisible(this.continueButton);
    }

    async assertPasswordStepVisible(): Promise<void> {
        await this.assertVisible(this.passwordInput);
        await this.assertVisible(this.confirmButton);
    }
}