import { test } from '../support/fixtures/pages';

test.describe('Web Brain - Contato', () => {
  test('CT03 - deve validar campos obrigatórios e aplicar máscara de telefone', async ({
    contatoPage
  }) => {
    let initialProgress = 0;

    await test.step('Acessar a página de contato', async () => {
      await contatoPage.openContato();
      await contatoPage.verifyMainHeading('Sua próxima conexão');
      initialProgress = await contatoPage.getProgressPercent();
    });

    await test.step('Enviar vazio e focar no primeiro campo obrigatório', async () => {
      await contatoPage.submit();
      await contatoPage.verifyRequiredFieldFocused();
      await contatoPage.verifyUrl(/\/contato\.php$/);
    });

    await test.step('Preencher nome e telefone e atualizar o progresso', async () => {
      await contatoPage.fillName('Carlos Teste E2E');
      await contatoPage.typePhone('48999998888');
      await contatoPage.verifyPhone('(48) 99999-8888');
      await contatoPage.verifyProgressGreaterThan(initialProgress);
    });
  });
});
