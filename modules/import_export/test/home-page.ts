import { Page, Locator } from '@playwright/test';

export default class Home {
  readonly results: Locator;

  constructor(page: Page) {
    this.results = page.locator('div[id="results"]');
  }
}
