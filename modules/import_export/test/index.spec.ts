import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import Home from './home-page';

test.describe('Import Export', () => {
  test.afterEach(async () => {
    execSync('pos-cli data clean --auto-confirm', { stdio: 'inherit' });
  });

  test('Import empty file', async ({ page }) => {
    execSync('pos-cli data import -p ./modules/import_export/test/fixtures/empty_json.json', { stdio: 'inherit' });

    await page.goto('/import_export');
    const home = new Home(page);
    const results = JSON.parse(await home.results.innerText());
    expect(results.models.total_entries).toBe(0);
  });

  test('Import data file and export back', async ({ page }) => {
    execSync('pos-cli data import -p ./modules/import_export/test/fixtures/data.json', { stdio: 'inherit' });

    await page.goto('/import_export');
    const home = new Home(page);
    const results = JSON.parse(await home.results.innerText());
    expect(results.models.total_entries).toBe(3);
    expect(results.users.total_entries).toBe(2);

    const filename = 'modules/import_export/test/fixtures/data-exported.json';
    execSync(`pos-cli data export -p ${filename}`, { stdio: 'inherit' });

    const exportedData = JSON.parse(fs.readFileSync(filename, 'utf8'));
    fs.unlinkSync(filename);
    expect(exportedData.users).toHaveLength(2);
    expect(exportedData.models).toHaveLength(3);
  });
});
