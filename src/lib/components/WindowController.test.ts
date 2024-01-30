import { test, expect } from '@playwright/test';
import type { Page } from 'playwright';

async function openWindow(page: Page): Promise<string> {
	await page.goto('');
	// Open window component
	const windowOpenButton = await page.locator('.buttonContainer button>>nth=1');
	await windowOpenButton.click();
	const buttonText = (await windowOpenButton.textContent()) || '';
	return buttonText;
}

async function openSecondWindow(page: Page): Promise<string> {
	// Open window component
	const windowOpenButton = await page.locator('.buttonContainer button>>nth=2');
	await windowOpenButton.click();
	const buttonText = (await windowOpenButton.textContent()) || '';
	return buttonText;
}

test('should open a new window when the first button in the nav-bar is clicked', async ({
	page
}) => {
	await openWindow(page);
	expect(await page.locator('.window').isVisible()).toBe(true);
});

test('should close a new window when window close button is clicked', async ({ page }) => {
	await openWindow(page);
	expect(await page.locator('.window').isVisible()).toBe(true);

	// Close window component
	const closeButton = await page.getByTestId('window-close-button');
	await closeButton.click();
	expect(await page.locator('.window').isVisible()).toBe(false);
});

test('should minimise an open window when the minimised button is clicked', async ({ page }) => {
	await openWindow(page);
	expect(await page.locator('.window').isVisible()).toBe(true);
	const minimiseButton = await page.getByTestId('window-minimise-button');
	await minimiseButton.click();
	expect(await page.locator('.window').isVisible()).toBe(false);
	expect(await page.getByTestId('minimised-window-title').isVisible()).toBe(true);
});

test('should show consistent window titles when minimising a window', async ({ page }) => {
	await openWindow(page);

	// Get window title
	const windowTitle = await page.getByTestId('window-title');
	const windowTitleText = await windowTitle.innerText();

	// Minimise window
	const minimiseButton = await page.getByTestId('window-minimise-button');
	await minimiseButton.click();

	// Get minimised window title
	const minimisedWindowTitle = await page.getByTestId('minimised-window-title');
	const minimisedWindowTitleText = await minimisedWindowTitle.innerText();

	expect(minimisedWindowTitleText).toEqual(windowTitleText);
});

test('should maximise an open window when the maximise button is clicked', async ({ page }) => {
	await openWindow(page);
	const maximiseButton = await page.getByTestId('window-maximise-button');
	await maximiseButton.click();

	await expect(await page.locator('.window')).toHaveClass(/maximise/);
});

test('should remove maximised state when maximise button is clicked the second time', async ({
	page
}) => {
	await openWindow(page);
	const maximiseButton = await page.getByTestId('window-maximise-button');
	await maximiseButton.click();
	await maximiseButton.click();

	await expect(await page.locator('.window')).not.toHaveClass(/maximise/);
});

test('should make a newly opened window active', async ({ page }) => {
	await openWindow(page);
	const fistWindow = await page.locator('.window');
	await expect(fistWindow).toHaveClass(/active/);
});

test('should make make the newly opened window active when second window is opened', async ({
	page
}) => {
	await openWindow(page);
	const secondWindowTitle = await openSecondWindow(page);
	const secondWindow = await page.locator('.window').filter({ hasText: secondWindowTitle });
	await expect(await secondWindow.isVisible()).toBe(true);
	await expect(secondWindow).toHaveClass(/active/);
});

test('should make make the current window not active when a new window is opened', async ({
	page
}) => {
	const windowTitle = await openWindow(page);
	const fistWindow = await page.locator('.window');
	await expect(fistWindow).toHaveClass(/active/);

	await openSecondWindow(page);
	const updatedWindow = await page.locator('.window').filter({ hasText: windowTitle });
	await expect(await updatedWindow.isVisible()).toBe(true);
	await expect(updatedWindow).not.toHaveClass(/active/);
});

test('should make make the previously active window active when the current active window is minimised', async ({
	page
}) => {
	const firstWindowTitle = await openWindow(page);
	const fistWindow = await page.locator('.window');
	await expect(fistWindow).toHaveClass(/active/);

	const secondWindowTitle = await openSecondWindow(page);
	const secondWindow = await page.locator('.window').filter({ hasText: secondWindowTitle });
	const minimiseButton = await secondWindow.getByTestId('window-minimise-button');
	await minimiseButton.click();
	const updatedWindow = await page.locator('.window').filter({ hasText: firstWindowTitle });
	await expect(await updatedWindow.isVisible()).toBe(true);
	await expect(updatedWindow).toHaveClass(/active/);
});

test('should make make the previously active window active when the previously active window is clicked', async ({
	page
}) => {
	// Open window and assert it is active
	const firstWindowTitle = await openWindow(page);
	let firstWindow = await page.locator('.window');
	await expect(firstWindow).toHaveClass(/active/);

	// Open second window
	await openSecondWindow(page);

	// Assert first window is no longer active
	firstWindow = await page.locator('.window').filter({ hasText: firstWindowTitle });
	await expect(firstWindow).not.toHaveClass(/active/);

	// Click on first window
	const boundingBox = await firstWindow.boundingBox();

	if (!boundingBox) {
		throw new Error('Could not get bounding box for first window');
	}

	await page.mouse.move(boundingBox.x + 850, boundingBox.y + 20);
	await page.mouse.down();
	await page.mouse.up();

	firstWindow = await page.locator('.window').filter({ hasText: firstWindowTitle });
	await expect(firstWindow).toHaveClass(/active/, { timeout: 100 });
});

test('should make make the previously active window active when the current active window is closed', async ({
	page
}) => {
	const firstWindowTitle = await openWindow(page);
	const fistWindow = await page.locator('.window');
	await expect(fistWindow).toHaveClass(/active/);

	const secondWindowTitle = await openSecondWindow(page);
	const secondWindow = await page.locator('.window').filter({ hasText: secondWindowTitle });
	const minimiseButton = await secondWindow.getByTestId('window-close-button');
	await minimiseButton.click();
	const updatedWindow = await page.locator('.window').filter({ hasText: firstWindowTitle });
	await expect(await updatedWindow.isVisible()).toBe(true);
	await expect(updatedWindow).toHaveClass(/active/);
});
