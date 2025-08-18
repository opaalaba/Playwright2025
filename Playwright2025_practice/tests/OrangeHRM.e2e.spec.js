// OrangeHRM E2E Test Suite for 12 Modules
// Author: GitHub Copilot
// Each test logs in at the start and logs out at the end
// Test data: Username: Admin, Password: admin123

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const USERNAME = 'Admin';
const PASSWORD = 'admin123';

async function login(page) {
  await page.goto(BASE_URL);
  await page.fill('input[name="username"]', USERNAME);
  await page.fill('input[name="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  // Wait for dashboard heading as a reliable indicator of successful login
  await page.waitForSelector('h6:has-text("Dashboard")', { timeout: 20000 });
}

async function logout(page) {
  await page.click('span.oxd-userdropdown-tab');
  await page.click('a:has-text("Logout")');
  await page.waitForSelector('input[name="username"]');
}

test.describe('OrangeHRM E2E Test Suite', () => {
  // TC-001: Admin – Manage Job Titles
  test('TC-001: Admin – Manage Job Titles', async ({ page }) => {
    // Preconditions: User has valid OrangeHRM login credentials.
    // Steps:
  await login(page);
  await page.locator('a:has-text("Admin")').first().click();
  await page.locator('span:has-text("Job")').click();
  await page.locator('a:has-text("Job Titles")').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('input[name="jobTitle[jobTitle]"]').fill('Automation Tester');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Automation Tester')).toBeVisible();
  await logout(page);
  });

  // TC-002: PIM – Add New Employee
  test('TC-002: PIM – Add New Employee', async ({ page }) => {
  await login(page);
  await page.locator('a:has-text("PIM")').first().click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('input[name="firstName"]').fill('John');
  await page.locator('input[name="lastName"]').fill('Doe');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Personal Details')).toBeVisible();
  await logout(page);
  });

  // TC-003: Leave – Apply Leave
  test('TC-003: Leave – Apply Leave', async ({ page }) => {
  await login(page);
  await page.locator('a:has-text("Leave")').first().click();
  await page.locator('a:has-text("Apply")').click();
  // Select leave type (first dropdown)
  await page.locator('.oxd-select-text').first().click();
  await page.locator('div[role="option"]').nth(1).click();
  // Fill From and To dates
  const today = new Date().toISOString().slice(0, 10);
  await page.getByPlaceholder('yyyy-mm-dd').first().fill(today);
  await page.getByPlaceholder('yyyy-mm-dd').nth(1).fill(today);
  await page.getByRole('textbox').last().fill('Vacation leave');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByText('Pending Approval')).toBeVisible();
  await logout(page);
  });

  // TC-004: Time – View My Timesheet
  test('TC-004: Time – View My Timesheet', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("Time")');
    await page.click('a:has-text("My Timesheet")');
    await page.click('input[placeholder="yyyy-mm-dd"]');
    await page.click('button:has-text("View")');
    await expect(page.locator('h6:has-text("Timesheet")')).toBeVisible();
    await logout(page);
  });

  // TC-005: Recruitment – Add Vacancy
  test('TC-005: Recruitment – Add Vacancy', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("Recruitment")');
    await page.click('a:has-text("Vacancies")');
    await page.click('button:has-text("Add")');
    await page.click('div.oxd-select-text');
    await page.click('div[role="option"]:nth-child(2)');
    await page.fill('input[placeholder="Vacancy Name"]', 'QA Engineer');
    await page.fill('input[placeholder="Hiring Manager"]', 'Linda Anderson');
    await page.click('button:has-text("Save")');
    await expect(page.locator('div.oxd-table-cell:has-text("QA Engineer")')).toBeVisible();
    await logout(page);
  });

  // TC-006: My Info – Update Contact Details
  test('TC-006: My Info – Update Contact Details', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("My Info")');
    await page.click('a:has-text("Contact Details")');
    await page.click('button:has-text("Edit")');
    await page.fill('input[placeholder="Mobile"]', '1234567890');
    await page.click('button:has-text("Save")');
    await expect(page.locator('input[placeholder="Mobile"]').first()).toHaveValue('1234567890');
    await logout(page);
  });

  // TC-007: Performance – View KPIs
  test('TC-007: Performance – View KPIs', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("Performance")');
    await page.click('span:has-text("Configure")');
    await page.click('a:has-text("KPIs")');
    await expect(page.locator('h6:has-text("Key Performance Indicators")')).toBeVisible();
    await logout(page);
  });

  // TC-008: Dashboard – View Widgets
  test('TC-008: Dashboard – View Widgets', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("Dashboard")');
    await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator('div.orangehrm-dashboard-widget')).toBeVisible();
    await logout(page);
  });

  // TC-009: Directory – Search Employee
  test('TC-009: Directory – Search Employee', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("Directory")');
    await page.fill('input[placeholder="Type for hints..."]', 'Linda');
    await page.click('button:has-text("Search")');
    await expect(page.locator('div.oxd-table-cell:has-text("Linda")')).toBeVisible();
    await logout(page);
  });

  // TC-010: Maintenance – Access Records
  test('TC-010: Maintenance – Access Records', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("Maintenance")');
    if (await page.isVisible('input[type="password"]')) {
      await page.fill('input[type="password"]', PASSWORD);
      await page.click('button:has-text("Confirm")');
    }
    await expect(page.locator('h6')).toContainText(['Purge Records', 'Access Records']);
    await logout(page);
  });

  // TC-011: Claim – Create New Claim
  test('TC-011: Claim – Create New Claim', async ({ page }) => {
    await login(page);
    await page.click('a:has-text("Claim")');
    await page.click('a:has-text("Submit Claim")');
    await page.click('div.oxd-select-text');
    await page.click('div[role="option"]:nth-child(2)');
    await page.click('div.oxd-select-text').nth(1);
    await page.click('div[role="option"]:nth-child(2)');
    await page.fill('input[placeholder="Amount"]', '100');
    await page.fill('textarea', 'Travel expense');
    await page.click('button:has-text("Save")');
    await expect(page.locator('div.oxd-table-cell:has-text("Travel expense")')).toBeVisible();
    await logout(page);
  });

  // TC-012: Buzz – Post Status Update
  test('TC-012: Buzz – Post Status Update', async ({ page }) => {
  await login(page);
  await page.click('a:has-text("Buzz")');
  await page.fill("textarea[placeholder=\"What\\'s on your mind?\"]", 'Automation status update!');
  await page.click('button:has-text("Post")');
  await expect(page.locator('div.orangehrm-buzz-post:has-text("Automation status update!")')).toBeVisible();
  await logout(page);
  });
});
