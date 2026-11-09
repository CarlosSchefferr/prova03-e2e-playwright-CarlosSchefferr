import { Page, expect } from '@playwright/test';
import ContatoElements from '../elements/ContatoElements';
import BasePage from './BasePage';

export default class ContatoPage extends BasePage<ContatoElements> {
  constructor(page: Page) {
    super(page, new ContatoElements(page));
  }

  /**
   * Garante que nenhum contato real seja enviado para a empresa durante os
   * testes: qualquer POST do formulário é abortado.
   * https://playwright.dev/docs/network#abort-requests
   */
  async blockFormSubmission(): Promise<void> {
    await this.page.route('**/contato.php*', route =>
      route.request().method() === 'POST' ? route.abort() : route.fallback()
    );
  }

  async openContato(): Promise<void> {
    await this.open('/contato.php');
  }

  async submit(): Promise<void> {
    await this.elements.getSubmitButton().click();
  }

  async verifyRequiredFieldFocused(): Promise<void> {
    const name = this.elements.getNameField();
    await expect(name).toBeFocused();
    expect(
      await name.evaluate(el => (el as HTMLInputElement).validity.valueMissing)
    ).toBe(true);
  }

  async fillName(name: string): Promise<void> {
    await this.elements.getNameField().fill(name);
  }

  async typePhone(digits: string): Promise<void> {
    await this.elements.getPhoneField().pressSequentially(digits);
  }

  async verifyPhone(expected: string): Promise<void> {
    await expect(this.elements.getPhoneField()).toHaveValue(expected);
  }

  async getProgressPercent(): Promise<number> {
    await expect(this.elements.getProgressText()).toHaveText(/\d+% preenchido/);
    const text = await this.elements.getProgressText().innerText();
    return Number(text.replace(/\D/g, ''));
  }

  async verifyProgressGreaterThan(previous: number): Promise<void> {
    await expect
      .poll(() => this.getProgressPercent())
      .toBeGreaterThan(previous);
  }
}
