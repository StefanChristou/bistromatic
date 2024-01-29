import {expect, test} from '@playwright/test';

test('should render navigation buttons when the screen width is greater than 767px and $windowMode is true', async ({page}) => {
  await page.goto('');
  await page.setViewportSize({
    width: 768,
    height: 700
  });
  const buttonExists = await page.locator('nav button >> nth=2').isVisible();
  expect(buttonExists).toBe(true);
});

test('should render navigation anchors when the screen width is greater than 767px and $windowMode is false', async ({page}) => {
  await page.goto('');

  // Set viewport width to 768px
  await page.setViewportSize({
    width: 768,
    height: 700
  });

  // Set window mode to false
  const toggle = await page.getByText('Window mode');
  await toggle.click();

  const anchorExists = await page.locator('nav a >> nth=1').isVisible();
  expect(anchorExists).toBe(true);
});

test('should render navigation anchors when the screen width is less than 768px', async ({page}) => {
  await page.goto('');
  await page.setViewportSize({
    width: 700,
    height: 700
  });
  const anchorExists = await page.locator('nav a >> nth=1').isVisible();
  expect(anchorExists).toBe(true);
});
