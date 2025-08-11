import { test, expect } from "@playwright/test";

const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

// ===== BEFORE EACH =====
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait until the Dashboard breadcrumb heading is visible
  await expect(
    page.locator('h6.oxd-topbar-header-breadcrumb-module', { hasText: 'Dashboard' })
  ).toBeVisible({ timeout: 10000 });
});

// ===== AFTER EACH =====
test.afterEach(async ({ page }) => {
  await page.locator('.oxd-userdropdown-tab').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/auth\/login/);
});

// ===== TEST CASES =====

// 1. Admin – Job Titles, Pay Grades, Employment Status, Job Categories, Work Shifts
test('Admin: E2E - Job Titles, Pay Grades, Employment Status, Job Categories, Work Shifts', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Admin' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Admin');
  // Add steps for Job Titles, Pay Grades, etc...
});

// 2. PIM – Add employee
test('PIM: E2E - Add employee and verify in Employee List', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'PIM' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('PIM');
  // Add employee logic here...
});

// 3. Leave – Apply leave
test('Leave: E2E - Apply Leave and verify UI', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Leave' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Leave');
  // Apply leave steps...
});

// 4. Time – Timesheets
test('Time: E2E - Open Timesheets/Attendance and verify', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Time' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Time');
});

// 5. Recruitment – Vacancy
test('Recruitment: E2E - Create a vacancy and verify', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Recruitment' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Recruitment');
});

// 6. My Info – Edit contact
test('My Info: E2E - Open My Info and edit a contact field', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'My Info' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Personal Details');
});

// 7. Performance – Open Performance
test('Performance: E2E - Open Performance and verify UI', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Performance' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Performance');
});

// 8. Dashboard – Widgets check
test('Dashboard: E2E - Dashboard loads and widgets are visible', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Dashboard' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Dashboard');
});

// 9. Directory – Search
test('Directory: E2E - Search in Directory', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Directory' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Directory');
});

// 10. Maintenance
test('Maintenance: E2E - Open Maintenance and verify', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Maintenance' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Maintenance');
});

// 11. Claim – Claim module
test('Claim: E2E - Open Claim module and verify', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Claim' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Claim');
});

// 12. Buzz – Post UI
test('Buzz: E2E - Open Buzz and verify post UI', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Buzz' }).click();
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toContainText('Buzz');
});
