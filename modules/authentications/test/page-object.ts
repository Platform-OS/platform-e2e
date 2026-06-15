import { Page, Locator } from '@playwright/test';

export default class Users {
  private readonly page: Page;
  readonly submitButton: Locator;
  readonly logoutButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator('.btn.btn-primary');
    this.logoutButton = page.getByText('Log Out');
    this.emailInput = page.locator('[type="email"]');
    this.passwordInput = page.locator('[type="password"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.goto('/authentications/sign-in');
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async register(username: string, password: string): Promise<void> {
    await this.page.goto('/authentications/sign-up');
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
