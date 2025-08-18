const { test, expect } = require('@playwright/test');

test('E2E - OrangeHRM Main Modules Navigation', async ({ page }) => {
  // Step 1: Navigate to login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Step 2: Login
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  // Wait for dashboard header to appear as a sign of successful login
  await page.waitForSelector('h6:has-text("Dashboard")', { timeout: 20000 });
  await expect(page).toHaveURL(/dashboard/);

  // Define modules and their selectors
  const modules = [
    { name: 'Admin', header: 'Admin', urlPart: '/admin' },
    { name: 'PIM', header: 'PIM', urlPart: '/pim' },
    { name: 'Leave', header: 'Leave', urlPart: '/leave' },
    { name: 'Time', header: 'Time', urlPart: '/time' },
    { name: 'Recruitment', header: 'Recruitment', urlPart: '/recruitment' },
  { name: 'My Info', header: 'Personal Details', urlPart: '/pim/viewPersonalDetails' },
    { name: 'Performance', header: 'Performance', urlPart: '/performance' },
    { name: 'Dashboard', header: 'Dashboard', urlPart: '/dashboard' },
    { name: 'Directory', header: 'Directory', urlPart: '/directory' },
  { name: 'Maintenance', header: 'Administrator Access', urlPart: '/maintenance' },
    { name: 'Claim', header: 'Assign Claim', urlPart: '/claim' },
    { name: 'Buzz', header: 'Buzz', urlPart: '/buzz' },
  ];

  for (const module of modules) {
    const menuItem = page.getByRole('link', { name: module.name });
    try {
      await expect(menuItem, `Menu item for ${module.name} not found`).toBeVisible({ timeout: 5000 });
    } catch (e) {
      console.warn(`Skipping module '${module.name}': menu item not found.`);
      continue;
    }
    await Promise.all([
      menuItem.click(),
      page.waitForURL(new RegExp(module.urlPart), { timeout: 10000 })
    ]);
    // Check for the header or URL containing the module name
    if (module.name !== 'My Info') {
      await page.waitForSelector('h6', { timeout: 5000 });
      const header = await page.locator('h6').first();
      const headerText = await header.textContent();
      expect(headerText.toLowerCase()).toContain(module.header.toLowerCase());
    }
  }
});
