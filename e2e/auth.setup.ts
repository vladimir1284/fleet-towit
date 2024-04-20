import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
	await page.goto('http://localhost:5173/signin');
	await page.getByRole('button', { name: 'Sign in with Google' }).click();
	await page.getByLabel('Email or phone').fill('vladimir.rdguez');
	await page.getByRole('button', { name: 'Next' }).click();

	// Alternatively, you can wait until the page reaches a state where all cookies are set.
	await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

	// End of authentication steps.

	await page.context().storageState({ path: authFile });
});
