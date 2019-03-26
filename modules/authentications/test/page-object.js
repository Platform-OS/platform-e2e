import { Selector, t } from 'testcafe';
import { getBtAlertText } from '@platform-os/testcafe-helpers';

export default class Users {
  constructor() {
    this.link = {
      login: Selector('a').withText('Log in'),
    };

    this.alerts = {
      success: 'You have signed up successfully.',
    };

    this.button = {
      submit: Selector('.btn.btn-primary'),
      logout: Selector('button').withText('Log Out')
    };

    this.input = {
      email: Selector('[type="email"]'),
      password: Selector('[type="password"]')
    };

    this.text = {
      login: 'Session was successfully created.',
      logout: 'You have been logged out'
    };
  }

  async login(username, password) {
    await t.navigateTo('/authentications/sign-in');

    await t
      .typeText(this.input.email, username, { replace: true })
      .typeText(this.input.password, password, { replace: true })
      .click(this.button.submit);
  }

  async register(username, password) {
    await t.navigateTo('/authentications/sign-up');

    await t
      .typeText(this.input.email, username)
      .typeText(this.input.password, password)
      .click(this.button.submit);

    await t.expect(await getBtAlertText({ Selector })).contains(this.alerts.success);
  }

  async logout(t) {
    await t.click(this.button.logout);
  }
}
