import Home from './home-page';
import sh from 'shelljs';
const fs = require('fs');
// sh.config.silent = true;

const home = new Home();
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

fixture('Import Export')
  .page(`${process.env.MP_URL}/import_export`)
  .afterEach(async t => {
    let command = sh.exec(`pos-cli data clean --auto-confirm`);
    await t.expect(command.code).eql(0);
  });

test.before(async t => {
  let command = sh.exec(`pos-cli data import -p ./modules/import_export/test/fixtures/empty_json.json`);
  await t.expect(command.code).eql(0);
})('Import empty file', async t => {
  await t.navigateTo('/import_export');
  const results = JSON.parse(await home.results.innerText);
  await t.expect(results.models.total_entries).eql(0);
});

test.before(async t => {
  let command = sh.exec(`pos-cli data import -p ./modules/import_export/test/fixtures/data.json`);
  await t.expect(command.code).eql(0);
})('Import data file and export back', async t => {
  await t.navigateTo('/import_export');
  const results = JSON.parse(await home.results.innerText);

  await t.expect(results.models.total_entries).eql(3);
  await t.expect(results.users.total_entries).eql(2);

  const filename = 'modules/import_export/test/fixtures/data-exported.json';
  let command = sh.exec(`pos-cli data export -p ${filename}`);

  await t.expect(command.code).eql(0);
  const exportedData = JSON.parse(fs.readFileSync(filename, 'utf8'));
  sh.exec(`rm ${filename}`);
  await t.expect(exportedData.users.length).eql(2);
  await t.expect(exportedData.models.length).eql(3);
});
