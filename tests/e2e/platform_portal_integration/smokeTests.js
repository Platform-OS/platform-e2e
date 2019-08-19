import 'testcafe';
import {
  BASE_URL,
  EMAIL_USER_PROD,
  ADMIN_PASS,
} from './environment/environment';
import LoginPage from './page-objects/loginPage';
import Notifications from './page-objects/notifications';
import Navigation from './page-objects/navigation';
import InstancePage from './page-objects/instancePage';
import BasePage from './page-objects/basePage';
import ModulePage from './page-objects/modulePage';

const loginPage = new LoginPage();
const notifications = new Notifications();
const navigation = new Navigation();
const instancePage = new InstancePage();
const basePage = new BasePage();
const modulePage = new ModulePage();

const admin_pass = ADMIN_PASS;
const instanceName = `test+${+new Date()}`;

fixture `pOS - PP - POS-CLI integration tests`.page(BASE_URL);

test('Should let you create instance', async t => {
  await loginPage.login(EMAIL_USER_PROD, admin_pass);
  await t
    .click(navigation.link.instances)
    .click(instancePage.button.newInstance);
  await t
    .typeText(instancePage.input.instanceName, instanceName)
    .click(instancePage.selectEnv)
    .click(instancePage.envOption.withText('STAGING'))
    .click(instancePage.selectSubBillingPlan)
    .click(instancePage.button.create);
  await t.expect(notifications.messageType.noticeForm).ok();
  await t
    .click(navigation.link.instances)
    .wait(10000) //waiting for activate of instance
    .click(instancePage.link.instanceName);
});

test('Should install blog module', async t => {
  await loginPage.login(EMAIL_USER_PROD, admin_pass);
  await basePage.openPage(modulePage.installUAT_blogModule);
  await t
    .click(modulePage.button.addModuleToInstance)
    .click(modulePage.button.selectEnv)
    .click(modulePage.button.confirmationInstallModule)
    .click(modulePage.button.purchase);
  await t
    .click(navigation.link.instances)
    .click(instancePage.link.instanceName)
    .click(modulePage.link.installAvailableModule)
    .click(modulePage.button.deployModule);
});

test('Blog module should be installed on the page', async t => {
  await loginPage.login(EMAIL_USER_PROD, admin_pass);
  await t
    .wait(30000) //waiting for module deploy
    .click(navigation.link.instances)
    .click(instancePage.link.instanceName);
  await t.expect(modulePage.button.uninstallModule.exists).ok();
  await t.click(modulePage.link.blogPage);
  await t.expect(modulePage.element.blogTagLine.innerText).eql('PlatformOS Blog');
});

test('Should let you remove instance', async t => {
  await loginPage.login(EMAIL_USER_PROD, admin_pass);
  await t
    .click(instancePage.link.instanceName)
    .click(instancePage.link.dangerZone)
    .setNativeDialogHandler(() => true)
    .click(instancePage.button.deleteInstance)
    .navigateTo(BASE_URL);
});

test('Instance should be removed', async t => {
  await loginPage.login(EMAIL_USER_PROD, admin_pass);
  await t
    .click(navigation.link.instances)
    .expect(instancePage.link.instanceName.count)
    .eql(0);
});