import { test, expect } from '@playwright/test';

test('Screenshot all tabs', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:8083');

  // Wait for the app to load
  await page.waitForTimeout(5000);

  // Take screenshot of home tab
  await page.screenshot({ path: 'screenshots/01-home.png', fullPage: true });
  console.log('✓ Home tab screenshot saved');

  // Click on Library tab
  const libraryTab = page.locator('text=Bibliotecă').or(page.locator('[aria-label*="Bibliotecă"]')).or(page.getByRole('button', { name: /bibliotec/i })).first();
  if (await libraryTab.count() > 0) {
    await libraryTab.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/02-library.png', fullPage: true });
    console.log('✓ Library tab screenshot saved');
  }

  // Click on Cursuri tab
  const cursuriTab = page.locator('text=Cursuri').or(page.locator('[aria-label*="Cursuri"]')).or(page.getByRole('button', { name: /cursuri/i })).first();
  if (await cursuriTab.count() > 0) {
    await cursuriTab.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/03-cursuri.png', fullPage: true });
    console.log('✓ Cursuri tab screenshot saved');
  }

  // Click on Settings/Search tab
  const settingsTab = page.locator('text=Setări').or(page.locator('[aria-label*="Setări"]')).or(page.getByRole('button', { name: /setări/i })).first();
  if (await settingsTab.count() > 0) {
    await settingsTab.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/04-settings.png', fullPage: true });
    console.log('✓ Settings tab screenshot saved');
  }

  // Go back to home
  const homeTab = page.locator('text=Acasă').or(page.locator('[aria-label*="Acasă"]')).or(page.getByRole('button', { name: /acas/i })).first();
  if (await homeTab.count() > 0) {
    await homeTab.click();
    await page.waitForTimeout(2000);
  }

  console.log('\n✓ All screenshots captured!');
});
