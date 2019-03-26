import { Selector, t } from 'testcafe';
import { getBtAlertText } from '@platform-os/testcafe-helpers';

export default class OAuth {
  constructor() {
    this.currentUser = {
      authentications: Selector('p.current-user-authentications'),
      email: Selector('p.current-user-email'),
    };

    this.providers = {
      google: {
        connect: Selector('a').withText('Connect google'),
        disconnect: Selector('input[value="Delete google authentication"]')
      }
    };

    this.google = {
      email: Selector('input[type="email"]'),
      next: Selector('div[role="button"]'),
      passwordNext: Selector('div[id="passwordNext"]'),
      password: Selector('input[type="password"]'),
    };

    this.text = {
      login: 'Session was successfully created.',
      logout: 'You have been logged out'
    };

    this.main = Selector('main');
  };

  async connectWith(t, provider) {
    await t
      .click(this.providers[provider].connect);
  };
  async disconnectFrom(t, provider) {
    await t
      .click(this.providers[provider].disconnect);
  }
};
