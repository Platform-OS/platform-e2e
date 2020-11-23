import { Selector } from 'testcafe';
import faker from 'faker';
import Users from './page-object';
import OAuth from './oauth-page';

const users = new Users();
const oauth = new OAuth();

const { user, google } = {
  user: {
    email: faker.internet.exampleEmail().toLowerCase(),
    password: faker.internet.password()
  },
  google: {
    email: process.env.GOOGLE_EMAIL,
    password: process.env.GOOGLE_PASSWORD
  }
};

fixture('OAuth authentications').page(`${process.env.MP_URL}/authentications`);

// test('Connect existing user', async t => {
//   await users.register(user.email, user.password);
//   await users.login(user.email, user.password);
//   await t.navigateTo('/authentications');

//   await t.expect(oauth.currentUser.email.innerText).eql(`current_user: ${user.email}`);
//   await t.expect(oauth.currentUser.authentications.innerText).eql('authentications:');
//   await t.expect(oauth.providers.google.connect.exists).ok();
//   await oauth.connectWith(t, 'google');
  // await t
  //   .typeText(oauth.google.email, google.email)
  //   .click(oauth.google.next)
  //   .typeText(oauth.google.password, google.password)
  //   .click(oauth.google.passwordNext);
  // await t.expect(oauth.main.innerText).eql('You hoo! You are connected.');

  // await t.navigateTo('/authentications');
  // await t.expect(oauth.currentUser.authentications.innerText).eql('authentications: google');
  // await oauth.disconnectFrom(t, 'google');
  // await t.expect(oauth.currentUser.authentications.innerText).eql('authentications:');
// });

// test('signup without existing user', async t => {
//   await t.navigateTo('/authentications');

//   await t.expect(oauth.currentUser.authentications.innerText).eql('authentications:');
//   await t.expect(oauth.providers.google.connect.exists).ok();
//   await oauth.connectWith(t, 'google');
//   await t.expect(oauth.google.email.exists).ok();

//   // TODO: login to google account as a bot
// });
