import { test as base } from '@playwright/test';
import ContatoPage from '../pages/ContatoPage';
import FaqPage from '../pages/FaqPage';
import HomePage from '../pages/HomePage';

type Pages = {
  homePage: HomePage;
  faqPage: FaqPage;
  contatoPage: ContatoPage;
};

/**
 * Fixtures que entregam os Page Objects prontos para cada teste.
 * https://playwright.dev/docs/test-fixtures#creating-a-fixture
 */
export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.dismissCookieBannerWhenVisible();
    await use(homePage);
  },
  faqPage: async ({ page }, use) => {
    const faqPage = new FaqPage(page);
    await faqPage.dismissCookieBannerWhenVisible();
    await use(faqPage);
  },
  contatoPage: async ({ page }, use) => {
    const contatoPage = new ContatoPage(page);
    await contatoPage.dismissCookieBannerWhenVisible();
    await contatoPage.blockFormSubmission();
    await use(contatoPage);
  }
});

export { expect } from '@playwright/test';
