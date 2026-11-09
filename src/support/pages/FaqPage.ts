import { Page, expect } from '@playwright/test';
import FaqElements from '../elements/FaqElements';
import BasePage from './BasePage';

export default class FaqPage extends BasePage<FaqElements> {
  constructor(page: Page) {
    super(page, new FaqElements(page));
  }

  async openFaq(): Promise<void> {
    await this.open('/faq.php');
  }

  async search(term: string): Promise<void> {
    await this.elements.getSearchField().fill(term);
  }

  async verifyOnlyQuestion(question: string): Promise<void> {
    await expect(this.elements.getVisibleQuestions()).toHaveText([question]);
  }

  async verifyQuestionExpanded(question: string): Promise<void> {
    await expect(this.elements.getQuestion(question)).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  }

  async verifyNoResults(): Promise<void> {
    await expect(this.elements.getVisibleQuestions()).toHaveCount(0);
    await expect(this.elements.getEmptyMessage()).toBeVisible();
    await expect(this.elements.getEmptyMessage()).toContainText(
      'Nenhuma pergunta encontrada'
    );
  }
}
