import { test, expect } from '@playwright/test';

test('should open a new window when the first button in the nav-bar is clicked', async ({ page }) => {
  await page.goto('');
  // Open window component
  await page.goto('');
  const secondButton = await page.locator('.buttonContainer button>>nth=1');
  await secondButton.click();
  expect(await page.locator('.window').isVisible({timeout: 500})).toBe(true);
});

