import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';
import { SignupPage } from './SignupPage';

export interface NewUserCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  sexAtBirth: string;
  day: string;
  month: string;
  year: string;
}

export class NewUser {
  constructor(private page: Page, private baseUrl: string) {}

  async createAccount(): Promise<NewUserCredentials> {
    const credentials = this.generateCredentials();
    const signupPage = new SignupPage(this.page);

    await signupPage.goto();
    await signupPage.click(signupPage.signupLink);
    await signupPage.signup(
      credentials.title,
      credentials.firstName,
      credentials.lastName,
      credentials.email,
      credentials.phone,
      credentials.sexAtBirth,
      credentials.password,
      true,
      false,
      false,
      credentials.day,
      credentials.month,
      credentials.year
    );

    return credentials;
  }

  async login(credentials: NewUserCredentials): Promise<void> {
    if (!this.baseUrl) {
      throw new Error('BASE_URL is required to log in a newly created user.');
    }

    await this.page.goto(`${this.baseUrl}/login`);

    const loginPage = new LoginPage(this.page);
    // Wait for the email input to be visible instead of waiting for networkidle.
    await loginPage.emailInput.waitFor({ state: 'visible', timeout: 60000 });
    await loginPage.login(credentials.email, credentials.password);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async createAccountAndLogin(): Promise<NewUserCredentials> {
    const credentials = await this.createAccount();
    await this.login(credentials);
    return credentials;
  }

  async logout(): Promise<void> {
    const logoutPage = new LogoutPage(this.page);
    await logoutPage.logout();
  }

  private generateCredentials(): NewUserCredentials {
    const timestamp = Date.now();

    return {
      email: `test.user.${timestamp}@example.com`,
      password: 'TestPass123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      title: 'Mr',
      phone: '02012345678',
      sexAtBirth: 'Male',
      day: '15',
      month: 'Jan',
      year: '1990'
    };
  }
}
