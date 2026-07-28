import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  readonly settingsLink: Locator;
  readonly profileName: Locator;
  readonly profileEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.profileName = page.locator('div.mantine-Stack-root [data-size="lg"]');
    this.profileEmail = page.locator('div.mantine-Group-root div.mantine-Stack-root div[data-size="sm"]');
  }

  async openSettings(): Promise<void> {
    await this.click(this.settingsLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectProfileDetails(firstName: string, lastName: string, email: string): Promise<void> {
    await this.profileName.waitFor({ state: 'visible', timeout: 15000 });
    await this.profileEmail.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('body').waitFor({ state: 'visible', timeout: 15000 });
  }

  async assertProfileDetails(firstName: string, lastName: string, email: string): Promise<void> {
    await expect(this.profileName).toContainText(`${firstName} ${lastName}`);
    await expect(this.profileEmail).toContainText(email);
  }
}
