import { test, expect } from '@playwright/test';

test('E2E test for Maintenance module - Access Verification', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('Maintenance').click();
  await page.getByPlaceholder('Administrator Password').fill('admin123');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Purge Employee Records')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});