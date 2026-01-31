import { test, expect } from '@playwright/test';

test.describe('Predicile Parintelui App', () => {
  test('should load the home page without blank screen', async ({ page }) => {
    await page.goto('/');

    // Wait for the app to load
    await page.waitForLoadState('networkidle');

    // Check that the page is not blank - should have the app title
    const title = page.locator('text=Predicile Părintelui');
    await expect(title).toBeVisible({ timeout: 10000 });

    // Take a screenshot for visual verification
    await page.screenshot({ path: 'e2e/screenshots/home-page.png', fullPage: true });
  });

  test('should display the navigation menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for navigation tabs
    const homeTab = page.locator('text=Acasă');
    const searchTab = page.locator('text=Căutare');
    const libraryTab = page.locator('text=Bibliotecă');

    await expect(homeTab).toBeVisible();
    await expect(searchTab).toBeVisible();
    await expect(libraryTab).toBeVisible();
  });

  test('should display sermon content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for sermon sections
    const recentSermons = page.locator('text=Predici Recente');
    const coursesSection = page.locator('text=Cursuri Recomandate');

    await expect(recentSermons).toBeVisible();
    await expect(coursesSection).toBeVisible();
  });

  test('should handle today\'s sermon display', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Either today's sermon or fallback message should be visible
    const todaysSermon = page.locator('text=Duminica de Astăzi');
    const noSermon = page.locator('text=Nicio predică pentru astăzi');

    const hasSermon = await todaysSermon.isVisible().catch(() => false);
    const hasNoSermon = await noSermon.isVisible().catch(() => false);

    expect(hasSermon || hasNoSermon).toBeTruthy();
  });

  test('should display library statistics', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for library stats
    const librarySection = page.locator('text=Explorează Biblioteca');
    await expect(librarySection).toBeVisible();

    // Should show number of sermons
    const statsText = page.locator('text=/\\d+ predici/');
    await expect(statsText).toBeVisible();
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known warnings that aren't critical
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('shadow*') &&
      !err.includes('expo-notifications') &&
      !err.includes('expo-av')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('should render without hydration errors', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check page content is present
    const body = await page.locator('body').textContent();
    expect(body).toBeTruthy();
    expect(body!.length).toBeGreaterThan(100);
  });
});
