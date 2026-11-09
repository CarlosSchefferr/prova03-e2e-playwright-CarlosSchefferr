import { Page, expect } from '@playwright/test';
import BaseElements from '../elements/BaseElements';

/**
 * Ações comuns a todas as páginas. As URLs são relativas ao `baseURL`
 * definido em `playwright.config.ts`.
 */
export default abstract class BasePage<E extends BaseElements> {
  constructor(
    readonly page: Page,
    readonly elements: E
  ) {}

  /**
   * Fecha o banner de cookies sempre que ele aparecer e bloquear uma ação.
   * https://playwright.dev/docs/api/class-page#page-add-locator-handler
   */
  async dismissCookieBannerWhenVisible(): Promise<void> {
    await this.page.addLocatorHandler(
      this.elements.getCookieButton(),
      async button => {
        await button.click();
      }
    );
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async verifyTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async verifyUrl(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  async verifyMainHeading(text: string | RegExp): Promise<void> {
    await expect(this.elements.getMainHeading()).toContainText(text);
  }

  async goToMenu(name: string): Promise<void> {
    await this.elements.getMainNavLink(name).click();
  }
}
