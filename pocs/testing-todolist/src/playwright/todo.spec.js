import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('starts with zero items left', async ({ page }) => {
  await expect(page.getByText('0 item(s) left')).toBeVisible();
});

test('adds a new todo', async ({ page }) => {
  await page.getByLabel('New todo').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Buy milk')).toBeVisible();
  await expect(page.getByText('1 item(s) left')).toBeVisible();
});

test('does not add an empty todo', async ({ page }) => {
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(0);
});

test('toggles a todo as done', async ({ page }) => {
  await page.getByLabel('New todo').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('checkbox').check();
  await expect(page.getByText('0 item(s) left')).toBeVisible();
});

test('deletes a todo', async ({ page }) => {
  await page.getByLabel('New todo').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('button', { name: 'Delete Buy milk' }).click();
  await expect(page.getByText('Buy milk')).toHaveCount(0);
});
