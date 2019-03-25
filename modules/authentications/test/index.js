import { Selector } from 'testcafe';
import faker from 'faker';
import Users from './page-object';
import { checkLiquidErrors, getBtAlertText } from '@platform-os/testcafe-helpers';

const users = new Users();

const { user } = {
  user: {
    email: faker.internet.exampleEmail(),
    password: faker.internet.password()
  }
};

fixture('Register as user').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Create user account', async t => {
  await t.navigateTo('/authentications/sign-up');

  await t
    .typeText(users.input.email, user.email)
    .typeText(users.input.password, user.password)
    .click(users.button.submit);

  await t.expect(await getBtAlertText({ Selector })).contains(users.alerts.success);
}).after(async t => {
  // Check if login works. In After hook to not throw off tests when running concurrently

  await users.login(user.email, user.password);
  await t.expect(await getBtAlertText({ Selector })).contains(users.text.login);
});
