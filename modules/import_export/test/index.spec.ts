import { test, expect } from '@playwright/test';
import sh from 'shelljs';
import fs from 'fs';
import Home from './home-page';

test.describe('Import Export', () => {
  test.afterEach(async () => {
    const result = sh.exec('pos-cli data clean --auto-confirm');
    expect(result.code).toBe(0);
  });

  test('Import empty file', async ({ page }) => {
    const importResult = sh.exec('pos-cli data import -p ./modules/import_export/test/fixtures/empty_json.json');
    expect(importResult.code).toBe(0);

    await page.goto('/import_export');
    const home = new Home(page);
    const results = JSON.parse(await home.results.innerText());
    expect(results.models.total_entries).toBe(0);
  });

  test('Import data file and export back', async ({ page }) => {
    const importResult = sh.exec('pos-cli data import -p ./modules/import_export/test/fixtures/data.json');
    expect(importResult.code).toBe(0);

    await page.goto('/import_export');
    const home = new Home(page);
    const results = JSON.parse(await home.results.innerText());
    expect(results.models.total_entries).toBe(3);
    expect(results.users.total_entries).toBe(2);

    const filename = 'modules/import_export/test/fixtures/data-exported.json';
    const exportResult = sh.exec(`pos-cli data export -p ${filename}`);
    expect(exportResult.code).toBe(0);

    const exportedData = JSON.parse(fs.readFileSync(filename, 'utf8'));
    sh.exec(`rm ${filename}`);
    expect(exportedData.users).toHaveLength(2);
    expect(exportedData.models).toHaveLength(3);
  });
});
