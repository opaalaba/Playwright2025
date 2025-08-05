import { test, expect } from '@playwright/test';

test.describe('UI Controls - Radio Buttons and Checkboxes', () => {
  
  test('Handle all radio buttons on Dummy Ticket site', async ({ page }) => {
    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

    await page.waitForSelector('input[type="radio"]');

    const radioGroups = await page.$$eval('input[type="radio"]', radios => {
      const grouped = {};
      radios.forEach(radio => {
        if (!grouped[radio.name]) {
          grouped[radio.name] = [];
        }
        grouped[radio.name].push(radio.value);
      });
      return grouped;
    });

    for (const [name, values] of Object.entries(radioGroups)) {
      for (const val of values) {
        const selector = `input[type="radio"][name="${name}"][value="${val}"]`;
        const isVisible = await page.isVisible(selector);
        if (isVisible) {
          await page.click(selector);
          const isChecked = await page.isChecked(selector);
          expect(isChecked).toBe(true);
        }
      }
    }
  });

  test('Handle all checkboxes on Automation Practice site', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForTimeout(3000);

    await page.evaluate(() => window.scrollBy(0, 600));

    const checkboxes = await page.$$('input[type="checkbox"]');

    for (const checkbox of checkboxes) {
      const isChecked = await checkbox.isChecked();
      if (!isChecked) {
        await checkbox.check();
        expect(await checkbox.isChecked()).toBe(true);
      }
    }
  });

});
