import { test, expect } from '@playwright/test';

test('E2E test for PIM module - Add Employee', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('PIM').click();
  await page.getByRole('button', { name: ' Add ' }).click();
  await page.getByLabel('First Name').fill('Jane');
  await page.getByLabel('Last Name').fill('Doe');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Jane Doe')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});