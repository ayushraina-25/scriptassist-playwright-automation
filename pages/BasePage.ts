// pages/BasePage.ts

import { Locator, Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string | null> {
        return await locator.textContent();
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `test-results/${name}.png`,
            fullPage: true
        });
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
}