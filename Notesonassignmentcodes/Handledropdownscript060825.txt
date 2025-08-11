import { test, expect } from '@playwright/test';

test('Handle dropdowns on Dummy Ticket site', async ({ page }) => {
  // 1. Navigate to the base URL
  await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

  // -----------------------------------
  // 🔽 1. Handle "Purpose of Dummy Ticket"
  // -----------------------------------
  // Use Playwright's getByLabel or locator with role 'combobox'
await page.getByPlaceholder('Proof of return at airport').click();
await page.getByText('Proof of return at airport').click();
  await page.waitForTimeout(5000); // Wait for dropdown to settle

  // ✅ Assert selected option
  const purposeValue = await page.$eval('#traveltype', el => el.value);
  expect(purposeValue).toBe('Proof of return at the airport');

  // -----------------------------------
  // 🌏 2. Handle Country Dropdown
  // -----------------------------------
  await page.waitForSelector('#country');
  await page.selectOption('#country', { label: 'Australia' });

  // ✅ Assert selected country (value should be "AU")
  const countryValue = await page.$eval('#country', el => el.value);
  expect(countryValue).toBe('AU');

  // -----------------------------------
  // 🏛️ 3. Handle State Dropdown
  // -----------------------------------
  await page.waitForTimeout(3000); // Wait for state dropdown to load after country selection

  const stateOptions = await page.$$('#state option');

  if (stateOptions.length > 1) {
    const stateValue = await stateOptions[1].getAttribute('value'); // Skip default option
    await page.selectOption('#state', stateValue);

    // ✅ Assert state selected correctly
    const selectedState = await page.$eval('#state', el => el.value);
    expect(selectedState).toBe(stateValue);
  } else {
    test.skip(true, 'No states available in dropdown after country selection.');
  }

  // Wait for a few seconds so user can observe
  await page.waitForTimeout(5000);
});
