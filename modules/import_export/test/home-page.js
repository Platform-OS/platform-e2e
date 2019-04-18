import { Selector, t } from 'testcafe';
import { getBtAlertText } from '@platform-os/testcafe-helpers';

export default class Home {
  constructor() {
    this.results = Selector('div[id="results"]');
  };
};
