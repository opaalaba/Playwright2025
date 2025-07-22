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
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('listitem').filter({ hasText: 'User Management' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Users' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option', { name: 'ESS' }).click();
  await page.getByText('-- Select --').click();
  await page.getByText('Enabled').click();
  await page.locator('#app div').filter({ hasText: 'Add UserUser RoleESSEmployee' }).nth(2).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('l');
  await page.getByText('James Butler').click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('test.user02');
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('Test@1234');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('Test@1234');
  await page.getByRole('button', { name: 'Save' }).click();
});