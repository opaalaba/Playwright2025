import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Job' }).click();
  await page.getByRole('menuitem', { name: 'Pay Grades' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.locator('form').getByRole('textbox').click();
  await page.locator('form').getByRole('textbox').fill('Grade A*');
  await page.locator('form').getByRole('textbox').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/payGrade/6');
});