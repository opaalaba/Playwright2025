import { test, expect } from '@playwright/test';

test('E2E test for Claim module - Submit Claim', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('Claim').click();
  await page.getByText('Submit Claim').click();
  await page.getByLabel('Event Name').selectOption({ label: 'Travel' });
  await page.getByLabel('Currency').selectOption({ label: 'USD - United States Dollar' });
  await page.getByLabel('Amount').fill('100');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Successfully Saved')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});