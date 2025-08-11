import { test, expect } from '@playwright/test';

test('Dropdown and Auto Suggestion Dropdown', async ({ page }) => {
    // Step 1: Go to the website
    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

    await page.waitForTimeout(3000); // Wait 3 seconds so you can see the page

    // ---------------------------------------------------------
    // 1. Handle "Purpose of ticket (optional)"
    // ---------------------------------------------------------
    const purposeDropdown = page.locator('#reasondummy');
    await expect(purposeDropdown).toBeVisible();
    await purposeDropdown.selectOption({ label: 'Proof of return at the airport' });
    await page.waitForTimeout(5000); // Wait for the dropdown to settle

    // Assertion: check if correct option is selected
    const selectedPurpose = await purposeDropdown.inputValue();
    if (selectedPurpose === 'Proof of return at the airport') {
        console.log('✅ Purpose of ticket selected correctly.');
    } else {
        console.error('❌ Purpose of ticket selection failed.');
    }

    await page.waitForTimeout(3000); // Let you see the change

    // ---------------------------------------------------------
    // 2. Handle "Country" — auto-suggestion dropdown
    // ---------------------------------------------------------
    const countryInput = page.locator('#billing_country');
    await expect(countryInput).toBeVisible();
    await countryInput.click();
    await countryInput.fill('Australia');
    await page.waitForTimeout(2000); // Wait for the suggestion to appear

    // Select from the suggestion list
    const countryOption = page.locator('li.select2-results__option', { hasText: 'Australia' });
    await expect(countryOption).toBeVisible();
    await countryOption.click();

    // Assertion: Verify country is selected
    const selectedCountry = await page.locator('.select2-selection__rendered').innerText();
    if (selectedCountry.includes('Australia')) {
        console.log('✅ Country selected: Australia');
    } else {
        console.error('❌ Country selection failed.');
    }

    await page.waitForTimeout(3000); // Let you observe the action

    // ---------------------------------------------------------
    // 3. Handle "State" — standard dropdown
    // ---------------------------------------------------------
    const stateDropdown = page.locator('#billing_state');
    await expect(stateDropdown).toBeVisible();

    // Select first visible option (excluding empty default)
    const options = await stateDropdown.locator('option').allTextContents();
    const filteredStates = options.filter(opt => opt.trim() !== '');

    const firstState = filteredStates[0];
    await stateDropdown.selectOption({ label: firstState });

    // Assertion
    const selectedState = await stateDropdown.inputValue();
    if (selectedState) {
        console.log(`✅ State selected: ${firstState}`);
    } else {
        console.error('❌ State selection failed.');
    }

    await page.waitForTimeout(5000); // Final pause to see result before closing
});
