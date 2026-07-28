import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const baseUrl = process.env.BASE_URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

test.describe('UI - Login', () => {
  test('should allow a user to log in successfully', async ({ page }) => {
    test.skip(!baseUrl || !email || !password, 'Set BASE_URL, EMAIL, and PASSWORD in your .env file to run this test.');

    const loginPage = new LoginPage(page);
    await page.goto(`${baseUrl}/login`);

    await loginPage.login(email, password);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`${baseUrl}/tasks`);
  });
});
