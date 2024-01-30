import { test, expect } from '@playwright/test';

test('should move the window using the title bar', async ({ page }) => {
	// Open window component
	await page.goto('');
	const secondButton = await page.locator('.buttonContainer button>>nth=1');
	await secondButton.click();

	// Get initial coordinates
	const window = await page.locator('.window');
	const initialBox = await window.boundingBox();

	if (!initialBox) {
		throw new Error('Could not get initial box');
	}

	// Simulate the move action
	const moveHandle = await page.locator('.title-bar');
	await moveHandle.hover();
	await page.mouse.down();
	await page.mouse.move(initialBox.x + initialBox.width + 100, initialBox.y + 100);
	await page.mouse.up();

	// Get new position coordinates
	const newBox = await window.boundingBox();

	if (!newBox) {
		throw new Error('Could not get new box');
	}

	// Assert the position coordinates have changed
	expect(newBox.x).toBeGreaterThan(initialBox.x);
	expect(newBox.y).toBeGreaterThan(initialBox.y);
});

test('should NOT move the window using the title bar if the window is maximised', async ({
	page
}) => {
	// Open window component
	await page.goto('');
	const secondButton = await page.locator('.buttonContainer button>>nth=1');
	await secondButton.click();

	// Get initial coordinates
	const window = await page.locator('.window');
	const initialBox = await window.boundingBox();

	if (!initialBox) {
		throw new Error('Could not get initial box');
	}

	// // Maximise the window
	const maximiseButton = await page.getByTestId('window-maximise-button');
	await maximiseButton.click();

	// Simulate the move action
	const moveHandle = await page.locator('.title-bar');
	await moveHandle.hover();
	await page.mouse.down();
	await page.mouse.move(initialBox.x + initialBox.width + 100, initialBox.y + 100);
	await page.mouse.up();

	// Minimise the window
	await maximiseButton.click();

	// Get new position coordinates
	const newBox = await window.boundingBox();

	if (!newBox) {
		throw new Error('Could not get new box');
	}

	// Assert the position coordinates have changed
	expect(newBox.x).toEqual(initialBox.x);
	expect(newBox.y).toEqual(initialBox.y);
});

test('should resize the window from the bottom right corner', async ({ page }) => {
	// Open window component
	await page.goto('');
	const secondButton = await page.locator('.buttonContainer button>>nth=1');
	await secondButton.click();

	// Get initial dimensions
	const window = await page.locator('.window');
	const initialBox = await window.boundingBox();

	if (!initialBox) {
		throw new Error('Could not get initial box');
	}

	// Simulate the resize action
	const resizeHandle = await page.locator('.resize-top-left');
	await resizeHandle.hover();
	await page.mouse.down();
	await page.mouse.move(initialBox.x - 100, initialBox.y - 100);
	await page.mouse.up();

	// Get new dimensions
	const newBox = await window.boundingBox();

	if (!newBox) {
		throw new Error('Could not get new box');
	}

	// Assert the dimensions changed
	expect(newBox.width).toBeGreaterThan(initialBox.width);
	expect(newBox.height).toBeGreaterThan(initialBox.height);
});

test('should resize the window from the top right corner', async ({ page }) => {
	// Open window component
	await page.goto('');
	const secondButton = await page.locator('.buttonContainer button>>nth=1');
	await secondButton.click();

	// Get initial dimensions
	const window = await page.locator('.window');
	const initialBox = await window.boundingBox();

	if (!initialBox) {
		throw new Error('Could not get initial box');
	}

	// Simulate the resize action
	const resizeHandle = await page.locator('.resize-top-right');
	await resizeHandle.hover();
	await page.mouse.down();
	await page.mouse.move(initialBox.x + initialBox.width + 100, initialBox.y - 100);
	await page.mouse.up();

	// Get new dimensions
	const newBox = await window.boundingBox();

	if (!newBox) {
		throw new Error('Could not get new box');
	}

	// Assert the dimensions changed
	expect(newBox.width).toBeGreaterThan(initialBox.width);
	expect(newBox.height).toBeGreaterThan(initialBox.height);
});

test('should resize the window from the bottom left corner', async ({ page }) => {
	// Open window component
	await page.goto('');
	const secondButton = await page.locator('.buttonContainer button>>nth=1');
	await secondButton.click();

	// Get initial dimensions
	const window = await page.locator('.window');
	const initialBox = await window.boundingBox();

	if (!initialBox) {
		throw new Error('Could not get initial box');
	}

	// Simulate the resize action
	const resizeHandle = await page.locator('.resize-bottom-left');
	await resizeHandle.hover();
	await page.mouse.down();
	await page.mouse.move(initialBox.x - 100, initialBox.y + initialBox.height + 100);
	await page.mouse.up();

	// Get new dimensions
	const newBox = await window.boundingBox();

	if (!newBox) {
		throw new Error('Could not get new box');
	}

	// Assert the dimensions changed
	expect(newBox.width).toBeGreaterThan(initialBox.width);
	expect(newBox.height).toBeGreaterThan(initialBox.height);
});

test('should resize the window from the top left corner', async ({ page }) => {
	// Open window component
	await page.goto('');
	const secondButton = await page.locator('.buttonContainer button>>nth=1');
	await secondButton.click();

	// Get initial dimensions
	const window = await page.locator('.window');
	const initialBox = await window.boundingBox();

	if (!initialBox) {
		throw new Error('Could not get initial box');
	}

	// Simulate the resize action
	const resizeHandle = await page.locator('.resize-top-left');
	await resizeHandle.hover();
	await page.mouse.down();
	await page.mouse.move(initialBox.x - 100, initialBox.y - 100);
	await page.mouse.up();

	// Get new dimensions
	const newBox = await window.boundingBox();

	if (!newBox) {
		throw new Error('Could not get new box');
	}

	// Assert the dimensions changed
	expect(newBox.width).toBeGreaterThan(initialBox.width);
	expect(newBox.height).toBeGreaterThan(initialBox.height);
});
