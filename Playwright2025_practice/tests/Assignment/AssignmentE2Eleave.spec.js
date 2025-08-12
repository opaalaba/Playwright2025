import { test, expect } from '@playwright/test';

test('E2E test for Leave module - Apply Leave', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('Leave').click();
  await page.getByText('Apply').click();
  await page.getByLabel('Leave Type').selectOption({ label: 'US - Personal' });
  await page.getByLabel('From Date').fill('2025-08-15');
  await page.getByLabel('To Date').fill('2025-08-16');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByText('Successfully Saved')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});