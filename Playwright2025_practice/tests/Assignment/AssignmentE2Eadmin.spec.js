import { test, expect } from '@playwright/test';

test('E2E test for Admin module - Add Job Title', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('Admin').click();
  await page.getByText('Job ').click();
  await page.getByText('Job Titles').click();
  await page.getByRole('button', { name: ' Add ' }).click();
  await page.getByRole('heading', { name: 'Add Job Title' }).waitFor();
  await page.locator('input[placeholder="Type here"]').first().fill('Automation Tester');
  await page.getByLabel('Job Description').fill('Tests automated scripts');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Automation Tester')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});