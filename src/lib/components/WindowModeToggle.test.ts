import {expect, test} from '@playwright/test';

test('should render WindowModeToggle component', async ({page}) => {
  await page.goto('');
  const toggleExists = await page.getByText('Window mode').isVisible();
  expect(toggleExists).toBe(true);
});

test('should set a query parameter when the toggle is clicked', async ({page}) => {
  await page.goto('');
  const toggle = await page.getByText('Window mode');
  await toggle.click();
  expect(await page.url()).toContain('window-mode=false');
});

test('should not render the window mode toggle when the screen width is lesser than 768px', async ({page}) => {
  await page.goto('');
  await page.setViewportSize({
    width: 767,
    height: 700
  });
  const toggleExists = await page.getByText('Window mode').isVisible();
  expect(toggleExists).toBe(false);
});