import { Locator } from '@playwright/test';
import BaseElements from './BaseElements';

export default class ContatoElements extends BaseElements {
  getForm(): Locator {
    return this.page.locator('form[data-cform]');
  }

  getNameField(): Locator {
    return this.page.getByRole('textbox', { name: 'Nome' });
  }

  getPhoneField(): Locator {
    return this.page.getByLabel('Telefone / WhatsApp');
  }

  getEmailField(): Locator {
    return this.page.getByLabel('E-mail');
  }

  getSubmitButton(): Locator {
    return this.page.getByRole('button', { name: 'Enviar contato' });
  }

  getProgressText(): Locator {
    return this.page.locator('[data-cform-pct]');
  }
}
