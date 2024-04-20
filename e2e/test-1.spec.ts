import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard');
  await page.goto('http://localhost:5173/signin');
  await page.getByRole('button', { name: 'Sign in with Google' }).click();
  await page.getByLabel('Email or phone').fill('vladimir.rdguez');
  await page.getByRole('button', { name: 'Next' }).click();
});