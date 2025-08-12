import { test, expect } from '@playwright/test';

test('E2E test for Performance module - Add KPI', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('Performance').click();
  await page.getByText('Configure').click();
  await page.getByText('KPIs').click();
  await page.getByRole('button', { name: ' Add ' }).click();
  await page.getByLabel('Key Performance Indicator').fill('Test KPI');
  await page.getByLabel('Job Title').selectOption({ label: 'Software Engineer' });
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Test KPI')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});