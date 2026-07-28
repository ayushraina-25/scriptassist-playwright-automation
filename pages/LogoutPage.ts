import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LogoutPage extends BasePage {
  readonly chevronDownIcon: Locator;
  readonly signOutMenuItem: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.chevronDownIcon = page.locator('svg.tabler-icon-chevron-down');
    this.signOutMenuItem = page.getByRole('menuitem', { name: 'Sign out' });
    this.signOutButton = page.getByRole('button', { name: 'Sign out' });
  }

  async openUserMenu(): Promise<void> {
    await this.click(this.chevronDownIcon);
  }

  async clickSignOutMenuItem(): Promise<void> {
    await this.click(this.signOutMenuItem);
  }

  async clickSignOutButton(): Promise<void> {
    await this.click(this.signOutButton);
  }

  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.clickSignOutMenuItem();
    await this.clickSignOutButton();
  }
}
