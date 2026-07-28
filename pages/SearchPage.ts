import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchTasksInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchTasksInput = page.getByRole('textbox', { name: 'Search tasks...' });
  }

  async searchTask(taskName: string): Promise<void> {
    await this.fill(this.searchTasksInput, taskName);
  }

  getTaskElement(ariaLabel: string): Locator {
  return this.page.locator(`[aria-label="${ariaLabel}"]`);
}
}
