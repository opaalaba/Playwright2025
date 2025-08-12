import { test, expect } from '@playwright/test';

test('E2E test for Buzz module - Post Update', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByText('Buzz').click();
  await page.getByPlaceholder("What's on your mind?").fill('Test post');
  await page.getByRole('button', { name: 'Post' }).click();
  await expect(page.getByText('Test post')).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /eshal Davies/i }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(/auth\/login/);
});