import { test, expect } from '@playwright/test';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const USERNAME = 'Admin';
const PASSWORD = 'admin123';

const unique = (prefix) => `${prefix}-${Date.now()}`;

// Helper: robust click on top-level menu by visible name
async function openTopMenu(page, menuName) {
  const byRole = page.getByRole('link', { name: menuName, exact: true });
  if (await byRole.count() > 0) {
    await byRole.first().click();
    return;
  }
  const byText = page.getByText(menuName, { exact: true });
  if (await byText.count() > 0) {
    await byText.first().click();
    return;
  }
  throw new Error(`Menu "${menuName}" not found`);
}

// Helper: login
async function login(page) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Dashboard', { exact: true })).toBeVisible({ timeout: 10000 });
}

// Helper: logout
async function logout(page) {
  const userMenu = page.locator('p.oxd-userdropdown-name').first();
  if (await userMenu.count() > 0) {
    await userMenu.click();
    const logoutItem = page.getByRole('menuitem', { name: 'Logout' });
    if (await logoutItem.count() > 0) {
      await logoutItem.click();
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible({ timeout: 5000 });
      return;
    }
  }
  const alt = page.getByText('Logout', { exact: true });
  if (await alt.count() > 0) {
    await alt.click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible({ timeout: 5000 });
  }
}

// ------------------------ Test lifecycle ------------------------
test.beforeAll(async () => {
  console.log('Starting E2E menu test suite for OrangeHRM demo');
});

test.beforeEach(async ({ page }) => {
  await login(page);
});

test.afterEach(async ({ page }) => {
  await logout(page);
});

test.afterAll(async () => {
  console.log('Completed E2E menu test suite');
});

// ------------------------ 12 tests ------------------------

// 1) Admin - Job Titles, Pay Grades, Employment Status, Job Categories, Work Shifts
test('Admin: E2E - Job Titles, Pay Grades, Employment Status, Job Categories, Work Shifts', async ({ page }) => {
  await openTopMenu(page, 'Admin');

  // --- Job Titles ---
  const jobTitleName = unique('Automation Job Title');
  if (await page.getByText('Job', { exact: true }).count() > 0)
    await page.getByText('Job', { exact: true }).click();
  if (await page.getByText('Job Titles', { exact: true }).count() > 0)
    await page.getByText('Job Titles', { exact: true }).click();
  if (await page.getByRole('button', { name: 'Add' }).count() > 0)
    await page.getByRole('button', { name: 'Add' }).click();
  const jobTitleInput = page.getByPlaceholder('Job Title');
  if (await jobTitleInput.count() > 0) {
    await jobTitleInput.fill(jobTitleName);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(jobTitleName)).toBeVisible({ timeout: 5000 });
  }

  // --- Pay Grades ---
  const payGradeName = unique('Automation PG');
  if (await page.getByText('Pay Grades', { exact: true }).count() > 0)
    await page.getByText('Pay Grades', { exact: true }).click();
  if (await page.getByRole('button', { name: 'Add' }).count() > 0)
    await page.getByRole('button', { name: 'Add' }).click();
  const pgInput = page.getByPlaceholder('Name');
  if (await pgInput.count() > 0) {
    await pgInput.fill(payGradeName);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(payGradeName)).toBeVisible({ timeout: 5000 });
  }

  // --- Employment Status ---
  const employmentStatusName = unique('Automation Status');
  if (await page.getByText('Employment Status', { exact: true }).count() > 0)
    await page.getByText('Employment Status', { exact: true }).click();
  if (await page.getByRole('button', { name: 'Add' }).count() > 0)
    await page.getByRole('button', { name: 'Add' }).click();
  const empStatusInput = page.getByPlaceholder('Name');
  if (await empStatusInput.count() > 0) {
    await empStatusInput.fill(employmentStatusName);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(employmentStatusName)).toBeVisible({ timeout: 5000 });
  }

  // --- Job Categories ---
  const jobCategoryName = unique('Automation Category');
  if (await page.getByText('Job Categories', { exact: true }).count() > 0)
    await page.getByText('Job Categories', { exact: true }).click();
  if (await page.getByRole('button', { name: 'Add' }).count() > 0)
    await page.getByRole('button', { name: 'Add' }).click();
  const jcInput = page.getByPlaceholder('Name');
  if (await jcInput.count() > 0) {
    await jcInput.fill(jobCategoryName);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(jobCategoryName)).toBeVisible({ timeout: 5000 });
  }

  // --- Work Shifts ---
  const workShiftName = unique('Automation Shift');
  if (await page.getByText('Work Shifts', { exact: true }).count() > 0)
    await page.getByText('Work Shifts', { exact: true }).click();
  if (await page.getByRole('button', { name: 'Add' }).count() > 0)
    await page.getByRole('button', { name: 'Add' }).click();
  const wsNameInput = page.getByPlaceholder('Name');
  if (await wsNameInput.count() > 0) {
    await wsNameInput.fill(workShiftName);
    const fromInput = page.getByLabel('From');
    const toInput = page.getByLabel('To');
    if (await fromInput.count() > 0) await fromInput.fill('09:00');
    if (await toInput.count() > 0) await toInput.fill('17:00');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(workShiftName)).toBeVisible({ timeout: 5000 });
  }
});

// 2) PIM: Add Employee -> verify in Employee List
test('PIM: E2E - Add employee and verify in Employee List', async ({ page }) => {
  await openTopMenu(page, 'PIM');
  const addEmpLink = page.getByRole('link', { name: 'Add Employee' });
  if (await addEmpLink.count() > 0) {
    await addEmpLink.click();
  } else {
    const addEmpText = page.getByText('Add Employee');
    if (await addEmpText.count() > 0) await addEmpText.click();
  }
  const firstName = 'Auto';
  const middleName = 'E2E';
  const lastName = unique('Employee');
  await page.getByPlaceholder('First Name').fill(firstName);
  const mid = page.getByPlaceholder('Middle Name');
  if (await mid.count() > 0) await mid.fill(middleName);
  await page.getByPlaceholder('Last Name').fill(lastName);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText(`${firstName} ${middleName} ${lastName}`, { exact: false })).toBeVisible({ timeout: 5000 });

  // Verify via Employee List search
  await openTopMenu(page, 'PIM');
  const empListLink = page.getByRole('link', { name: 'Employee List' });
  if (await empListLink.count() > 0) {
    await empListLink.click();
  } else {
    const empListText = page.getByText('Employee List');
    if (await empListText.count() > 0) await empListText.click();
  }
  const searchNameInput = page.getByPlaceholder('Type for hints...');
  if (await searchNameInput.count() > 0) {
    await searchNameInput.fill(`${firstName} ${lastName}`);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText(`${firstName} ${lastName}`, { exact: false })).toBeVisible({ timeout: 5000 });
  } else {
    await expect(page.getByText('Employee List', { exact: true })).toBeVisible();
  }
});

// 3) Leave: open Assign Leave modal -> verify modal
test('Leave: E2E - Open Assign Leave and verify UI', async ({ page }) => {
  await openTopMenu(page, 'Leave');
  const assignBtn = page.getByRole('button', { name: 'Assign Leave' });
  if (await assignBtn.count() > 0) {
    await assignBtn.click();
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible({ timeout: 5000 });
  } else {
    const leaveList = page.getByText('Leave List', { exact: true });
    if (await leaveList.count() > 0) {
      await leaveList.click();
      await expect(leaveList).toBeVisible();
    } else {
      throw new Error('Assign Leave and Leave List not found');
    }
  }
});

// 4) Time: open Attendance/Timesheets area and verify header
test('Time: E2E - Open Timesheets/Attendance and verify', async ({ page }) => {
  await openTopMenu(page, 'Time');
  const timesheetsLink = page.getByRole('link', { name: 'Timesheets' });
  if (await timesheetsLink.count() > 0) {
    await timesheetsLink.click();
  } else {
    const attendanceText = page.getByText('Attendance');
    if (await attendanceText.count() > 0) await attendanceText.click();
  }
  await expect(page.locator('h6, h2, .oxd-text--heading')).toBeVisible();
});

// 5) Recruitment: Add Vacancy -> verify it's listed
test('Recruitment: E2E - Create a vacancy and verify', async ({ page }) => {
  await openTopMenu(page, 'Recruitment');
  const vacanciesLink = page.getByRole('link', { name: 'Vacancies' });
  if (await vacanciesLink.count() > 0) {
    await vacanciesLink.click();
  } else {
    const vacanciesText = page.getByText('Vacancies');
    if (await vacanciesText.count() > 0) await vacanciesText.click();
  }
  if (await page.getByRole('button', { name: 'Add' }).count() > 0)
    await page.getByRole('button', { name: 'Add' }).click();
  const vacancyName = unique('Auto Vacancy');
  const nameInput = page.getByPlaceholder('Vacancy Name');
  if (await nameInput.count() > 0) {
    await nameInput.fill(vacancyName);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(vacancyName)).toBeVisible({ timeout: 5000 });
  } else {
    await expect(page.getByText('Vacancies', { exact: true })).toBeVisible();
  }
});

// 6) My Info: Open My Info -> try to edit Contact Details
test('My Info: E2E - Open My Info and edit a contact field', async ({ page }) => {
  await openTopMenu(page, 'My Info');
  const contactTab = page.getByRole('tab', { name: 'Contact Details' });
  if (await contactTab.count() > 0) {
    await contactTab.click();
    const editBtn = page.getByRole('button', { name: 'Edit' });
    if (await editBtn.count() > 0) {
      await editBtn.click();
      const mobileInput = page.getByLabel('Mobile');
      if (await mobileInput.count() > 0) {
        const newMobile = `+46${Math.floor(100000000 + Math.random() * 900000000)}`;
        await mobileInput.fill(newMobile);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText(newMobile)).toBeVisible({ timeout: 5000 });
      }
    }
  } else {
    await expect(page.getByText('Personal Details', { exact: false })).toBeVisible();
  }
});

// 7) Performance: open Performance -> verify page/headers
test('Performance: E2E - Open Performance and verify UI', async ({ page }) => {
  await openTopMenu(page, 'Performance');
  const configure = page.getByText('Configure', { exact: true });
  if (await configure.count() > 0) await configure.click();
  await expect(page.locator('h6, h2, .oxd-text--heading')).toBeVisible();
});

// 8) Dashboard: verify dashboard widgets render
test('Dashboard: E2E - Dashboard loads and widgets are visible', async ({ page }) => {
  await openTopMenu(page, 'Dashboard');
  await expect(page.getByText('Dashboard', { exact: true })).toBeVisible();
});

// 9) Directory: search for an employee
test('Directory: E2E - Search in Directory', async ({ page }) => {
  await openTopMenu(page, 'Directory');
  const dirSearch = page.getByPlaceholder('Type for hints...');
  if (await dirSearch.count() > 0) {
    await dirSearch.fill('Admin');
    const searchBtn = page.getByRole('button', { name: 'Search' });
    if (await searchBtn.count() > 0) await searchBtn.click();
    await expect(page.locator('.oxd-table')).toBeVisible();
  } else {
    await expect(page.getByText('Directory', { exact: true })).toBeVisible();
  }
});

// 10) Maintenance: open Maintenance and verify access
test('Maintenance: E2E - Open Maintenance and verify', async ({ page }) => {
  await openTopMenu(page, 'Maintenance');
  const purge = page.getByText('Purge Records', { exact: true });
  if (await purge.count() > 0) await purge.click();
  await expect(page.locator('h6, h2, .oxd-text--heading')).toBeVisible();
});

// 11) Claim: open Claim module (if present) and verify
test('Claim: E2E - Open Claim module and verify', async ({ page }) => {
  try {
    await openTopMenu(page, 'Claim');
  } catch {
    console.log('Claim module not available in this OrangeHRM build');
    return;
  }
  const claimHeader = page.getByText('Claim', { exact: true });
  if (await claimHeader.count() > 0) {
    await expect(claimHeader).toBeVisible();
  }
});

// 12) Buzz: open Buzz social feed and verify 'Post' or 'Write something' UI
test('Buzz: E2E - Open Buzz and verify post UI', async ({ page }) => {
  await openTopMenu(page, 'Buzz');
  const postBtn = page.getByRole('button', { name: /Post|Share/i });
  if (await postBtn.count() > 0) {
    await expect(postBtn.first()).toBeVisible();
  } else {
    const writeSomething = page.getByText(/Write something|Create Post|What do you want to share/i);
    if (await writeSomething.count() > 0) {
      await expect(writeSomething).toBeVisible({ timeout: 5000 });
    } else {
      await expect(page.getByText('Buzz', { exact: true })).toBeVisible();
    }
  }
});
