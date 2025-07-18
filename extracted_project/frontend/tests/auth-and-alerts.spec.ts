import { test, expect } from '@playwright/test';

test.describe('E2E Auth + Alerts Flow', () => {
  test('User login, create sensor, trigger alert', async ({ page }) => {
    await page.goto('http://localhost');
    await page.fill('input[name="email"]', 'test@farm.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button:has-text("Connexion")');
    await expect(page).toHaveURL(/dashboard/);

    // Create sensor
    await page.click('a:has-text("Capteurs")');
    await page.click('button:has-text("Ajouter")');
    await page.fill('input[name="name"]', 'Test Sensor');
    await page.selectOption('select[name="type"]', 'soil-moisture');
    await page.fill('input[name="location"]', 'Zone 1');
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('text=Test Sensor')).toBeVisible();
  });
});