import { test, expect } from '@playwright/test';

test('E2E test for Recruitment module - Add Candidate', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('Recruitment').click();
  await page.getByRole('button', { name: ' Add ' }).click();
  await page.getByLabel('First Name').fill('Alex');
  await page.getByLabel('Last Name').fill('Smith');
  await page.getByLabel('Email').fill('alex@example.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Alex Smith')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});