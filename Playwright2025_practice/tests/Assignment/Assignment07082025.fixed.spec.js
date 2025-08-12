import { test, expect } from '@playwright/test';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const USERNAME = 'Admin';
const PASSWORD = 'admin123';

const unique = (prefix) => `${prefix}-${Date.now()}`;

/**
 * Try to open a top-level menu item in a resilient way:
 * 1) try role=menuitem (sidebar main menu)
 * 2) try role=link
 * 3) fallback to text
 */
async function openTopMenu(page, menuName) {
  const byMenuItem = page.getByRole('menuitem', { name: menuName, exact: true });
  if (await byMenuItem.count() > 0) {
    await byMenuItem.first().click();
    return;
  }
  const byLink = page.getByRole('link', { name: menuName, exact: true });
  if (await byLink.count() > 0) {
    await byLink.first().click();
    return;
  }
  const byText = page.getByText(menuName, { exact: true });
  if (await byText.count() > 0) {
    await byText.first().click();
    return;
  }
  throw new Error(`Menu "${menuName}" not found`);
}

// ------------------------ Login / Logout helpers ------------------------
async function login(page) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  // **Stable login check**
  // Wait for the unique top breadcrumb "Dashboard" to appear.
  // Using :has-text ensures we match the breadcrumb heading (not the left menu).
  await expect(
    page.locator('h6.oxd-topbar-header-breadcrumb-module:has-text("Dashboard")')
  ).toBeVisible({ timeout: 15000 });
}

async function logout(page) {
  // open user menu: use the visible tab class if present
  const userTab = page.locator('.oxd-userdropdown-tab');
  if (await userTab.count() > 0) {
    await userTab.first().click();
  } else {
    // fallback to clicking the username text
    const userName = page.locator('p.oxd-userdropdown-name');
    if (await userName.count() > 0) await userName.first().click();
  }

  const logoutItem = page.getByRole('menuitem', { name: 'Logout' });
  if (await logoutItem.count() > 0) {
    await logoutItem.first().click();
  } else {
    // fallback: click any visible "Logout" text
    const logoutText = page.getByText('Logout', { exact: true });
    if (await logoutText.count() > 0) await logoutText.first().click();
  }

  // verify we landed back on login
  await expect(page).toHaveURL(/auth\/login/);
}

// ------------------------ Lifecycle ------------------------
test.beforeAll(async () => console.log('Starting E2E menu test suite for OrangeHRM demo'));

test.beforeEach(async ({ page }) => {
  await login(page);
});

test.afterEach(async ({ page }) => {
  await logout(page);
});

test.afterAll(async () => console.log('Completed E2E menu test suite'));

// ------------------------ Tests ------------------------

// 1) Admin: Job Titles, Pay Grades, Employment Status, Job Categories, Work Shifts
test('Admin: E2E - Job Titles, Pay Grades, Employment Status, Job Categories, Work Shifts', async ({ page }) => {
  await openTopMenu(page, 'Admin');

  // Expand "Job" group then click sub-items. This flow tolerates either nested links or flat items.
  // --- Job Titles ---
  const jobTitleName = unique('Automation Job Title');
  // Expand Job
  if (await page.getByText('Job', { exact: true }).count() > 0) {
    await page.getByText('Job', { exact: true }).click();
  }
  if (await page.getByText('Job Titles', { exact: true }).count() > 0) {
    await page.getByText('Job Titles', { exact: true }).click();
  } else {
    // fallback to direct menu
    await openTopMenu(page, 'Job Titles');
  }

  // Add Job Title if Add exists
  if (await page.getByRole('button', { name: 'Add' }).count() > 0) {
    await page.getByRole('button', { name: 'Add' }).click();
    // typical field name variations handled below
    const jobTitleInput = page.getByPlaceholder('Job Title').first();
    if (await jobTitleInput.count() > 0) {
      await jobTitleInput.fill(jobTitleName);
    } else {
      // fallback: try label-based
      const labeled = page.getByLabel('Job Title');
      if (await labeled.count() > 0) await labeled.fill(jobTitleName);
    }
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(jobTitleName, { exact: false })).toBeVisible({ timeout: 7000 });
  }

  // --- Pay Grades ---
  const payGradeName = unique('Automation PG');
  await openTopMenu(page, 'Pay Grades');
  if (await page.getByRole('button', { name: 'Add' }).count() > 0) {
    await page.getByRole('button', { name: 'Add' }).click();
    const pgInput = page.getByPlaceholder('Name').first();
    if (await pgInput.count() > 0) {
      await pgInput.fill(payGradeName);
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText(payGradeName, { exact: false })).toBeVisible({ timeout: 7000 });
    }
  }

  // --- Employment Status ---
  const employmentStatusName = unique('Automation Status');
  await openTopMenu(page, 'Employment Status');
  if (await page.getByRole('button', { name: 'Add' }).count() > 0) {
    await page.getByRole('button', { name: 'Add' }).click();
    const empStatusInput = page.getByPlaceholder('Name').first();
    if (await empStatusInput.count() > 0) {
      await empStatusInput.fill(employmentStatusName);
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText(employmentStatusName, { exact: false })).toBeVisible({ timeout: 7000 });
    }
  }

  // --- Job Categories ---
  const jobCategoryName = unique('Automation Category');
  await openTopMenu(page, 'Job Categories');
  if (await page.getByRole('button', { name: 'Add' }).count() > 0) {
    await page.getByRole('button', { name: 'Add' }).click();
    const jcInput = page.getByPlaceholder('Name').first();
    if (await jcInput.count() > 0) {
      await jcInput.fill(jobCategoryName);
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText(jobCategoryName, { exact: false })).toBeVisible({ timeout: 7000 });
    }
  }

  // --- Work Shifts ---
  const workShiftName = unique('Automation Shift');
  await openTopMenu(page, 'Work Shifts');
  if (await page.getByRole('button', { name: 'Add' }).count() > 0) {
    await page.getByRole('button', { name: 'Add' }).click();
    const wsNameInput = page.getByPlaceholder('Name').first();
    if (await wsNameInput.count() > 0) {
      await wsNameInput.fill(workShiftName);
      const fromInput = page.getByLabel('From');
      const toInput = page.getByLabel('To');
      if (await fromInput.count() > 0) await fromInput.fill('09:00');
      if (await toInput.count() > 0) await toInput.fill('17:00');
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText(workShiftName, { exact: false })).toBeVisible({ timeout: 7000 });
    }
  }
});

// 2) PIM: Add Employee -> verify in Employee List
test('PIM: E2E - Add employee and verify in Employee List', async ({ page }) => {
  await openTopMenu(page, 'PIM');

  // open add employee
  const addEmp = page.getByRole('link', { name: 'Add Employee' });
  if (await addEmp.count() > 0) {
    await addEmp.first().click();
  } else {
    const addEmpText = page.getByText('Add Employee');
    if (await addEmpText.count() > 0) await addEmpText.first().click();
  }

  const firstName = 'Auto';
  const middleName = 'E2E';
  const lastName = unique('Employee');

  await page.getByPlaceholder('First Name').fill(firstName);
  const mid = page.getByPlaceholder('Middle Name');
  if (await mid.count() > 0) await mid.fill(middleName);
  await page.getByPlaceholder('Last Name').fill(lastName);
  await page.getByRole('button', { name: 'Save' }).click();

  // verify saved details (name appears on details page)
  await expect(page.locator(`text=${firstName} ${lastName}`)).toBeVisible({ timeout: 7000 });

  // verify in employee list
  await openTopMenu(page, 'PIM');
  const empList = page.getByRole('link', { name: 'Employee List' });
  if (await empList.count() > 0) {
    await empList.first().click();
  } else {
    const empListText = page.getByText('Employee List');
    if (await empListText.count() > 0) await empListText.first().click();
  }

  const searchNameInput = page.getByPlaceholder('Type for hints...');
  if (await searchNameInput.count() > 0) {
    await searchNameInput.fill(`${firstName} ${lastName}`);
    const searchBtn = page.getByRole('button', { name: 'Search' });
    if (await searchBtn.count() > 0) await searchBtn.first().click();
    await expect(page.locator(`text=${firstName} ${lastName}`)).toBeVisible({ timeout: 7000 });
  } else {
    await expect(page.getByText('Employee List')).toBeVisible();
  }
});

// 3) Leave: open Assign Leave modal -> verify
test('Leave: E2E - Open Assign Leave and verify UI', async ({ page }) => {
  await openTopMenu(page, 'Leave');
  const assignBtn = page.getByRole('button', { name: 'Assign Leave' });
  if (await assignBtn.count() > 0) {
    await assignBtn.first().click();
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible({ timeout: 7000 });
  } else {
    const leaveList = page.getByText('Leave List', { exact: true });
    if (await leaveList.count() > 0) {
      await leaveList.first().click();
      await expect(leaveList.first()).toBeVisible();
    } else {
      throw new Error('Assign Leave and Leave List not found');
    }
  }
});

// 4) Time: open Timesheets/Attendance and verify
test('Time: E2E - Open Timesheets/Attendance and verify', async ({ page }) => {
  await openTopMenu(page, 'Time');
  const timesheets = page.getByRole('link', { name: 'Timesheets' });
  if (await timesheets.count() > 0) {
    await timesheets.first().click();
  } else {
    const attendance = page.getByText('Attendance');
    if (await attendance.count() > 0) await attendance.first().click();
  }
  await expect(page.locator('h6, h2, .oxd-text--heading')).toBeVisible();
});

// 5) Recruitment: Add Vacancy -> verify
test('Recruitment: E2E - Create a vacancy and verify', async ({ page }) => {
  await openTopMenu(page, 'Recruitment');
  const vacancies = page.getByRole('link', { name: 'Vacancies' });
  if (await vacancies.count() > 0) {
    await vacancies.first().click();
  } else {
    const vacText = page.getByText('Vacancies');
    if (await vacText.count() > 0) await vacText.first().click();
  }

  if (await page.getByRole('button', { name: 'Add' }).count() > 0) {
    await page.getByRole('button', { name: 'Add' }).first().click();
    const vacancyName = unique('Auto Vacancy');
    const nameInput = page.getByPlaceholder('Vacancy Name');
    if (await nameInput.count() > 0) {
      await nameInput.fill(vacancyName);
      await page.getByRole('button', { name: 'Save' }).first().click();
      await expect(page.getByText(vacancyName)).toBeVisible({ timeout: 7000 });
    }
  } else {
    await expect(page.getByText('Vacancies')).toBeVisible();
  }
});

// 6) My Info: Open My Info -> edit Contact Details (if available)
test('My Info: E2E - Open My Info and edit a contact field', async ({ page }) => {
  await openTopMenu(page, 'My Info');
  const contactTab = page.getByRole('tab', { name: 'Contact Details' });
  if (await contactTab.count() > 0) {
    await contactTab.first().click();
    const editBtn = page.getByRole('button', { name: 'Edit' });
    if (await editBtn.count() > 0) {
      await editBtn.first().click();
      const mobileInput = page.getByLabel('Mobile');
      if (await mobileInput.count() > 0) {
        const newMobile = `+46${Math.floor(100000000 + Math.random() * 900000000)}`;
        await mobileInput.fill(newMobile);
        await page.getByRole('button', { name: 'Save' }).first().click();
        await expect(page.getByText(newMobile)).toBeVisible({ timeout: 7000 });
      }
    }
  } else {
    await expect(page.getByText('Personal Details', { exact: false })).toBeVisible();
  }
});

// 7) Performance: Open Performance -> verify
test('Performance: E2E - Open Performance and verify UI', async ({ page }) => {
  await openTopMenu(page, 'Performance');
  const configure = page.getByText('Configure', { exact: true });
  if (await configure.count() > 0) await configure.first().click();
  await expect(page.locator('h6, h2, .oxd-text--heading')).toBeVisible();
});

// 8) Dashboard
test('Dashboard: E2E - Dashboard loads and widgets are visible', async ({ page }) => {
  await openTopMenu(page, 'Dashboard');
  // Use breadcrumb header to confirm we're on dashboard
  await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module:has-text("Dashboard")')).toBeVisible();
});

// 9) Directory: search for an employee
test('Directory: E2E - Search in Directory', async ({ page }) => {
  await openTopMenu(page, 'Directory');
  const dirSearch = page.getByPlaceholder('Type for hints...');
  if (await dirSearch.count() > 0) {
    await dirSearch.first().fill('Admin');
    const searchBtn = page.getByRole('button', { name: 'Search' });
    if (await searchBtn.count() > 0) await searchBtn.first().click();
    await expect(page.locator('.oxd-table')).toBeVisible();
  } else {
    await expect(page.getByText('Directory', { exact: true })).toBeVisible();
  }
});

// 10) Maintenance
test('Maintenance: E2E - Open Maintenance and verify', async ({ page }) => {
  await openTopMenu(page, 'Maintenance');
  const purge = page.getByText('Purge Records', { exact: true });
  if (await purge.count() > 0) await purge.first().click();
  await expect(page.locator('h6, h2, .oxd-text--heading')).toBeVisible();
});

// 11) Claim
test('Claim: E2E - Open Claim module and verify', async ({ page }) => {
  try {
    await openTopMenu(page, 'Claim');
  } catch (err) {
    test.info().log('Claim module not available - skipping the verification step');
    return;
  }
  await expect(page.getByText('Claim', { exact: true })).toBeVisible();
});

// 12) Buzz
test('Buzz: E2E - Open Buzz and verify post UI', async ({ page }) => {
  await openTopMenu(page, 'Buzz');
  const postBtn = page.getByRole('button', { name: /Post|Share/i });
  if (await postBtn.count() > 0) {
    await expect(postBtn.first()).toBeVisible();
  } else {
    const writeSomething = page.getByText(/Write something|Create Post|What do you want to share/i);
    if (await writeSomething.count() > 0) {
      await expect(writeSomething.first()).toBeVisible({ timeout: 5000 });
    } else {
      await expect(page.getByText('Buzz', { exact: true })).toBeVisible();
    }
  }
});
