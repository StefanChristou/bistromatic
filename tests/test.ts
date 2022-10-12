import { expect, test } from '@playwright/test';

test('h1 should contain the text "Stefan Christou\'s website"', async ({ page }) => {
	await page.goto('');
	expect(await page.textContent('h1')).toBe("Stefan Christou's website");
});
