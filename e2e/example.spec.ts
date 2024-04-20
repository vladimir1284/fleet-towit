import { test, expect } from '@playwright/test';

test('has login', async ({ page }) => {
	await page.goto('http://localhost:5173/dashboard');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);
});
// test('has title', async ({ page }) => {
// 	await page.goto('https://playwright.dev/');

// 	// Expect a title "to contain" a substring.
// 	await expect(page).toHaveTitle(/Playwright/);
// 	// page.pause()
// });
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
