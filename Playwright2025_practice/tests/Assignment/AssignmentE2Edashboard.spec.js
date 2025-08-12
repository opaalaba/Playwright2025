import { test, expect } from '@playwright/test';

test('E2E test for Dashboard module - Verify Widgets', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Dashboard')).toBeVisible();
  await expect(page.getByText('Time at Work')).toBeVisible();
  await expect(page.getByText('Quick Launch')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});