import { test, expect } from '@playwright/test';

let baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
let username = 'Admin';
let password = 'admin123';

test.beforeAll(async () => {
    console.log("Starting test suite for OrangeHRM menu validation.");
});

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);

    // Login
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Ensure dashboard is loaded
    await expect(page.locator('h6')).toHaveText('Dashboard');
});

test.afterEach(async ({ page }) => {
    // Logout
    await page.locator('p.oxd-userdropdown-name').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    // Confirm logout page
    await expect(page).toHaveURL(baseURL);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test.afterAll(async () => {
    console.log("Completed test suite.");
});

// --- 12 Test Cases for Each Menu Option ---

test('Validate Admin menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page).toHaveURL(/.*admin/);
});

test('Validate PIM menu', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page).toHaveURL(/.*pim/);
});

test('Validate Leave menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Leave' }).click();
    await expect(page).toHaveURL(/.*leave/);
});

test('Validate Time menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Time' }).click();
    await expect(page).toHaveURL(/.*time/);
});

test('Validate Recruitment menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await expect(page).toHaveURL(/.*recruitment/);
});

test('Validate My Info menu', async ({ page }) => {
    await page.getByRole('link', { name: 'My Info' }).click();
    await expect(page).toHaveURL(/.*viewPersonalDetails/);
});

test('Validate Performance menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Performance' }).click();
    await expect(page).toHaveURL(/.*performance/);
});

test('Validate Dashboard menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
});

test('Validate Directory menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Directory' }).click();
    await expect(page).toHaveURL(/.*directory/);
});

test('Validate Maintenance menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Maintenance' }).click();
    await expect(page).toHaveURL(/.*maintenance/);
});

test('Validate Claim menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Claim' }).click();
    await expect(page).toHaveURL(/.*claim/);
});

test('Validate Buzz menu', async ({ page }) => {
    await page.getByRole('link', { name: 'Buzz' }).click();
    await expect(page).toHaveURL(/.*buzz/);
});
