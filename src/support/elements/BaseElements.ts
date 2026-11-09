import { Locator, Page } from '@playwright/test';

/**
 * Elementos comuns a todas as páginas do site (menu principal e banner de cookies).
 */
export default abstract class BaseElements {
  constructor(readonly page: Page) {}

  getMainNav(): Locator {
    return this.page.getByRole('navigation', { name: 'Principal' });
  }

  getMainNavLink(name: string): Locator {
    return this.getMainNav().getByRole('link', { name, exact: true });
  }

  getCookieButton(): Locator {
    return this.page.getByRole('button', { name: 'Entendi' });
  }

  getMainHeading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }
}
