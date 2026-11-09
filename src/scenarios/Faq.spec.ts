import { test } from '../support/fixtures/pages';

const LGPD_QUESTION =
  'Como os sistemas tratam a proteção de dados pessoais (LGPD)?';

test.describe('Web Brain - Perguntas frequentes', () => {
  test('CT02 - deve filtrar as perguntas do FAQ pela busca', async ({
    faqPage
  }) => {
    await test.step('Acessar a página de perguntas frequentes', async () => {
      await faqPage.openFaq();
      await faqPage.verifyTitle(/Perguntas frequentes/);
    });

    await test.step('Buscar por "LGPD" e exibir apenas a pergunta relacionada', async () => {
      await faqPage.search('LGPD');
      await faqPage.verifyOnlyQuestion(LGPD_QUESTION);
      await faqPage.verifyQuestionExpanded(LGPD_QUESTION);
    });

    await test.step('Buscar termo inexistente e exibir mensagem de vazio', async () => {
      await faqPage.search('termo-que-nao-existe-xyz');
      await faqPage.verifyNoResults();
    });
  });
});
