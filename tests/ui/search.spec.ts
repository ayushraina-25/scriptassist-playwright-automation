import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loadEnvFile } from '../../utils/loadEnv';

loadEnvFile();

const baseUrl = process.env.BASE_URL?.replace(/\/$/, '') || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

test.describe('UI - Search Tasks', () => {
  test('should allow a user to search for a task', async ({ page }) => {
    test.skip(!baseUrl || !email || !password, 'Set BASE_URL, EMAIL, and PASSWORD in your .env file to run this test.');

    // Navigate to login page
    await page.goto(`${baseUrl}/login`);

    // Login with credentials from .env
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await page.waitForLoadState('domcontentloaded');

    // Search for task
    await page.getByRole('textbox', { name: 'Search tasks...' }).fill('Please add your address');

    await page.waitForLoadState('domcontentloaded');

    // Assert that the task is present
    await expect(page.locator('[aria-label="Please add your address. To do. Due No due date."]')).toBeVisible();
  });
});
