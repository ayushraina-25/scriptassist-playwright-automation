import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
  readonly signupLink: Locator;
  readonly titleDropdown: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly nextButton: Locator;
  readonly sexAtBirthDropdown: Locator;
  readonly dayInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly emailPrefToggle: Locator;
  readonly alertsPrefToggle: Locator;
  readonly marketingPrefToggle: Locator;
  readonly termsCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLink = page.getByRole('link', { name: /sign up/i });
    this.titleDropdown = page.getByRole('textbox', { name: 'Select a title' });
    this.firstNameInput = page.locator('input[name="firstName"], input[placeholder*="first name" i]');
    this.lastNameInput = page.locator('input[name="lastName"], input[placeholder*="last name" i]');
    this.emailInput = page.locator('input[type="email"], input[name="email"]');
    this.phoneInput = page.locator('input[type="tel"], input[name="phone"], input[placeholder*="phone" i]');
    this.nextButton = page.getByRole('button', { name: /next/i });
    this.sexAtBirthDropdown = page.locator('select[name="sex"], input[placeholder*="Sex at Birth" i]');
    this.dayInput = page.getByPlaceholder('Day');
    this.monthInput = page.getByPlaceholder('Month');
    this.yearInput = page.getByPlaceholder('Year');
    this.passwordInput = page.locator('input[type="password"][placeholder*="Password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"][placeholder*="Confirm" i]');
    this.emailPrefToggle = page.locator('input[type="checkbox"][name*="email" i]').first();
    this.alertsPrefToggle = page.locator('input[type="checkbox"][name*="alert" i], input[type="checkbox"][name*="app" i]').first();
    this.marketingPrefToggle = page.locator('input[type="checkbox"][name*="marketing" i]').first();
    this.termsCheckbox = page.locator('span.mantine-Accordion-label input[type="checkbox"]');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.accountCreatedMessage = page.locator("//*[contains(text(),'Your account has been created successfully. Please sign in to continue.')]" );
  }

  async goto(): Promise<void> {
    await this.navigate('/signup');
  }

  async fillSignupStep1(
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<void> {
    await this.click(this.titleDropdown);
    await this.page.getByRole('option', { name: 'Mr.' }).click();
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.emailInput, email);
    await this.fill(this.phoneInput, phone);
    await this.click(this.nextButton);
  }

  async fillSignupStep2(
    sexAtBirth: string,
    password: string,
    emailPref: boolean,
    alertsPref: boolean,
    marketingPref: boolean,
    day: string = '15',
    month: string = 'Jan',
    year: string = '1990'
  ): Promise<void> {
    await this.click(this.sexAtBirthDropdown);
    await this.page.locator("div[value='MALE']").click();
    
    // Fill date fields and select from dropdown
    await this.fill(this.dayInput, day);
    await this.page.locator('div[value="15"]').first().click();
    
    await this.fill(this.monthInput, month.substring(0, 3));
    await this.page.locator('//div[@role="option"]//span[contains(text(),"Jan")]').first().click();
    
    await this.fill(this.yearInput, year);
    await this.page.locator('div[value="1990"]').first().click();
    
    await this.fill(this.passwordInput, password);
    await this.fill(this.confirmPasswordInput, password);

    // Handle toggles/checkboxes for communication preferences
    // if (emailPref) {
    //   await this.emailPrefToggle.check({ force: true });
    // }
    // if (alertsPref) {
    //   await this.alertsPrefToggle.check({ force: true });
    // }
    // if (marketingPref) {
    //   await this.marketingPrefToggle.check({ force: true });
    // }

    // Check terms agreement
    await this.termsCheckbox.click();

    // Click create account and wait for the success confirmation before continuing
    await this.click(this.createAccountButton);
    await this.accountCreatedMessage.waitFor({ state: 'visible', timeout: 30000 });
    await this.page.waitForLoadState('networkidle');
  }

  async signup(
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    sexAtBirth: string,
    password: string,
    emailPref: boolean = true,
    alertsPref: boolean = false,
    marketingPref: boolean = false,
    day: string = '15',
    month: string = 'Jan',
    year: string = '1990'
  ): Promise<void> {
    await this.fillSignupStep1(title, firstName, lastName, email, phone);
    await this.fillSignupStep2(sexAtBirth, password, emailPref, alertsPref, marketingPref, day, month, year);
  }
}
