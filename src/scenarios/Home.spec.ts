import { test } from '../support/fixtures/pages';

test.describe('Web Brain - Home', () => {
  test('CT01 - deve carregar a home e navegar até a página de contato pelo menu', async ({
    homePage
  }) => {
    await test.step('Acessar a home', async () => {
      await homePage.openHome();
      await homePage.verifyTitle(/Web Brain/);
      await homePage.verifyMainHeading('Sistemas para prefeituras');
    });

    await test.step('Validar os itens do menu principal', async () => {
      await homePage.verifyMainMenu(['Clientes', 'Conteúdos', 'Contato']);
    });

    await test.step('Navegar para Contato pelo menu', async () => {
      await homePage.goToMenu('Contato');
      await homePage.verifyUrl(/\/contato\.php/);
      await homePage.verifyTitle(/Fale com a Web Brain/);
    });
  });
});
