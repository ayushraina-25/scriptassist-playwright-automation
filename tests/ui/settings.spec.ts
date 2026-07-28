import { test, expect } from '@playwright/test';
import { NewUser } from '../../pages/NewUser';
import { SettingsPage } from '../../pages/SettingsPage';
import { loadEnvFile } from '../../utils/loadEnv';

loadEnvFile();

const baseUrl = process.env.BASE_URL?.replace(/\/$/, '') || '';

test.describe('UI - Settings', () => {
  test('should show the logged-in user profile details on the Settings page', async ({ page }) => {
    test.skip(!baseUrl, 'Set BASE_URL in your .env file to run this test.');

    const newUser = new NewUser(page, baseUrl);
    const credentials = await newUser.createAccountAndLogin();

    await expect(page.locator('//div[contains(text(),"updated our legal documents")]')).toBeVisible();
    await page.locator('span.mantine-Switch-trackLabel').nth(0).click();
    await page.locator('span.mantine-Switch-trackLabel').nth(1).click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('button span.mantine-Button-label').click();

    const settingsPage = new SettingsPage(page);
    await settingsPage.openSettings();
    await settingsPage.assertProfileDetails(credentials.firstName, credentials.lastName, credentials.email);

    await expect(settingsPage.profileName).toContainText(`${credentials.firstName} ${credentials.lastName}`);
    await expect(settingsPage.profileEmail).toContainText(credentials.email);
  });
});
