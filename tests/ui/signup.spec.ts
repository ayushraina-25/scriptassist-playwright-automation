import { test, expect } from '@playwright/test';
import { NewUser } from '../../pages/NewUser';
import { loadEnvFile } from '../../utils/loadEnv';

loadEnvFile();

const baseUrl = process.env.BASE_URL?.replace(/\/$/, '') || '';

test.describe('UI - Sign Up', () => {
  test('should allow a user to sign up and then log in with new credentials', async ({ page }) => {
    test.skip(!baseUrl, 'Set BASE_URL in your .env file to run this test.');

    const newUser = new NewUser(page, baseUrl);
    const credentials = await newUser.createAccountAndLogin();

    // Verify successful login by checking URL contains dashboard/tasks
    await expect(page).toHaveURL('/tasks');
    await expect(page.locator('//div[contains(text(),"updated our legal documents")]')).toBeVisible(); // Adjust based on actual dashboard content
    
    // Click on agreement switches
    await page.locator('span.mantine-Switch-trackLabel').nth(0).click(); // I agree to the Terms of Use
    await page.locator('span.mantine-Switch-trackLabel').nth(1).click(); // I agree to the EULA
    
    await page.waitForLoadState('domcontentloaded');
    // Click Continue button
    await page.locator('button span.mantine-Button-label').click();
    
    // Assert that the user profile button contains the firstName and lastName
    await expect(page.locator('button.mantine-UnstyledButton-root div.mantine-focus-auto').first()).toContainText(`${credentials.firstName} ${credentials.lastName}`);
    
  });
});
