import { test, expect } from '@playwright/test';
import { NewUser } from '../../pages/NewUser';
import { loadEnvFile } from '../../utils/loadEnv';

loadEnvFile();

const baseUrl = process.env.BASE_URL?.replace(/\/$/, '') || '';

test.describe('UI - Logout', () => {
  test('should allow a user to log out after signing up and logging in', async ({ page }) => {
    test.skip(!baseUrl, 'Set BASE_URL in your .env file to run this test.');

    const newUser = new NewUser(page, baseUrl);
    await newUser.createAccountAndLogin();

    // Verify successful login
    await expect(page).toHaveURL('/tasks');
    await expect(page.locator('//div[contains(text(),"updated our legal documents")]')).toBeVisible();

    // Click on agreement switches
    await page.locator('span.mantine-Switch-trackLabel').nth(0).click(); // I agree to the Terms of Use
    await page.locator('span.mantine-Switch-trackLabel').nth(1).click(); // I agree to the EULA

    await page.waitForLoadState('domcontentloaded');
    // Click Continue button
    await page.locator('button span.mantine-Button-label').click();

    // Now perform logout using the shared helper
    await newUser.logout();

    // Verify redirected to login page
    await expect(page).toHaveURL(/\/login/);
  });
});
