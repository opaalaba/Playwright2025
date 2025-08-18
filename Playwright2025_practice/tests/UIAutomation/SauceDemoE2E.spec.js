const { test, expect } = require('@playwright/test');

test('E2E: SauceDemo purchase flow', async ({ page }) => {
  // 1. Navigate to the site
  await page.goto('https://www.saucedemo.com/');

  // 2. Enter valid credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Add any item to the cart (let's pick the first one)
  const firstItem = page.locator('.inventory_item').first();
  const productName = await firstItem.locator('.inventory_item_name').innerText();
  const productPrice = await firstItem.locator('.inventory_item_price').innerText();
  await firstItem.locator('button:has-text("Add to cart")').click();

  // 4. Go to cart
  await page.click('.shopping_cart_link');
  // Validate product in cart
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(productName);
  await expect(page.locator('.cart_item .inventory_item_price')).toHaveText(productPrice);

  // 5. Checkout
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  // Validate product and price on overview page
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(productName);
  await expect(page.locator('.cart_item .inventory_item_price')).toHaveText(productPrice);

  // Finish purchase
  await page.click('[data-test="finish"]');

  // Validate order completion
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
