import { Locator } from '@playwright/test';
import BaseElements from './BaseElements';

export default class FaqElements extends BaseElements {
  getSearchField(): Locator {
    return this.page.getByRole('searchbox', { name: 'Buscar pergunta' });
  }

  getQuestion(name: string | RegExp): Locator {
    return this.page.getByRole('button', { name });
  }

  getVisibleQuestions(): Locator {
    return this.page.locator('[data-faq-groups] .disc__btn').filter({
      visible: true
    });
  }

  getEmptyMessage(): Locator {
    return this.page.locator('[data-faq-empty]');
  }
}
