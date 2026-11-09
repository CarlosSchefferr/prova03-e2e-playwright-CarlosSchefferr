import { Page, expect } from '@playwright/test';
import HomeElements from '../elements/HomeElements';
import BasePage from './BasePage';

export default class HomePage extends BasePage<HomeElements> {
  constructor(page: Page) {
    super(page, new HomeElements(page));
  }

  async openHome(): Promise<void> {
    await this.open('/');
  }

  async verifyMainMenu(items: string[]): Promise<void> {
    for (const item of items) {
      await expect(this.elements.getMainNavLink(item)).toBeVisible();
    }
  }
}
