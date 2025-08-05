import { test, expect } from '@playwright/test';

let baseURL = "https://www.dummyticket.com/dummy-ticket-for-visa-application/";

test('Radio Buttons', async ({ page }) => {
  await page.goto(baseURL);

  // Accept cookies if necessary (common on this site)
  const acceptCookies = page.locator('#ez-accept-all');
  if (await acceptCookies.isVisible()) {
    await acceptCookies.click();
  }

  // Scroll to radio buttons section
  await page.locator('label[for="deliverymethod_eTicket"]', { hasText: 'E-ticket' }).scrollIntoViewIfNeeded();

  // Radio buttons
  const radioEticket = page.locator('#deliverymethod_eTicket');
  const radioDownload = page.locator('#deliverymethod_download');

  // Select E-ticket
  await radioEticket.check();
  await expect(radioEticket).toBeChecked();
  await expect(radioDownload).not.toBeChecked();

  // Select Download
  await radioDownload.check();
  await expect(radioDownload).toBeChecked();
  await expect(radioEticket).not.toBeChecked();
});
