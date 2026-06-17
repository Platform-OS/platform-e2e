import { Page, Locator } from '@playwright/test';

export default class OAuth {
  private readonly page: Page;
  readonly currentUserAuthentications: Locator;
  readonly currentUserEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentUserAuthentications = page.locator('p.current-user-authentications');
    this.currentUserEmail = page.locator('p.current-user-email');
  }

  async connectWith(provider: string): Promise<void> {
    await this.page.getByText(`Connect ${provider}`).click();
  }

  async disconnectFrom(provider: string): Promise<void> {
    await this.page.locator(`input[value="Delete ${provider} authentication"]`).click();
  }
}
