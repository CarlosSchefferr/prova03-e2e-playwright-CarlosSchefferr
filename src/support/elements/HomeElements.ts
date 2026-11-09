import { Locator } from '@playwright/test';
import BaseElements from './BaseElements';

export default class HomeElements extends BaseElements {
  getHeroContactButton(): Locator {
    return this.page.locator('a[href="contato.php?origem=home-hero#form"]');
  }
}
