import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');

  // Expect the page to contain the main heading
  await expect(page.locator('h1')).toBeVisible();

  // Expect the health check endpoint to be accessible
  const response = await page.request.get('/api/health');
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty('status', 'ok');
});

test('navigation works correctly', async ({ page }) => {
  await page.goto('/');

  // Check that the page has a proper title
  await expect(page).toHaveTitle(/Starlight Stream/);

  // Check for basic responsive behavior
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('body')).toBeVisible();

  await page.setViewportSize({ width: 1200, height: 800 });
  await expect(page.locator('body')).toBeVisible();
});
