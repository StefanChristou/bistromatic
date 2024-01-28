<script lang="ts">
	import { onMount } from 'svelte';
	import NavigationBar from './NavigationBar.svelte';
	import Window from './Window.svelte';
	import { allLinks, mainLinks } from './window-controller-links';
	import { isWindowMode } from '../../ui-store';
	import WindowModeToggle from './shared/WindowModeToggle.svelte';
	import { goto } from '$app/navigation';
	import PageHeading from './shared/PageHeading.svelte';
	import LinkLikeButton from './shared/LinkLikeButton.svelte';
	import type { ContentWindow } from '../../types/ContentWindow.type';
	import MinimisedWindow from './MinimisedWindow.svelte';

	///////////////
	// Variables //
	///////////////

	let openWindows = new Map<string, Partial<ContentWindow>>();
	let paths;
	let mounted = false;

	$: minimisedWindows = <[string, ContentWindow][]>(
		[...openWindows.entries()].filter(([_, val]) => val.minimised).reverse()
	);

	$: visibleWindows = <[string, ContentWindow][]>(
		[...openWindows.entries()].filter(([_, val]) => !val.minimised)
	);

	$: activeWindowPathName = visibleWindows[visibleWindows.length - 1]?.[0] || '';

	///////////////
	// Functions //
	///////////////

	function openWindow(path: string): void {
		const length = openWindows.size;

		openWindows.set(path, {
			...allLinks[path],
			initX: 40 + 12 * (length + 1),
			initY: 40 + 12 * ((length % 6) + 1),
			minimised: false
		});

		openWindows = new Map(openWindows);
	}

	function openAllWindows(paths = [] as string[]): void {
		paths.filter(Boolean).forEach((path) => openWindow(path));
	}

	function navigateToTopPath(paths: string[], replaceState = true): void {
		const topPath = paths[paths.length - 1] || '';
		if (isPathValid(topPath)) {
			goto(topPath, { replaceState });
		}
	}

	function isPathValid(path: string) {
		return path === '/' || Boolean(allLinks[path]);
	}

	function getWindowPathsArray() {
		return [...openWindows].filter(([_, val]) => !val.minimised).map(([key]) => key) as string[];
	}

	function makePreviousWindowActive(path: string = activeWindowPathName): void {
		const windows = [...openWindows].filter(([key, val]) => key !== path && !val.minimised);
		const previousWindowKey = windows[windows.length - 1]?.[0];
		if (previousWindowKey) {
			handleMakeActive(previousWindowKey);
		}
	}

	/////////////
	// Effects //
	/////////////

	onMount(() => {
		mounted = true;
		paths = new URL(window.location.href).searchParams.get('open')?.split(',') || [];

		if ($isWindowMode) {
			openAllWindows(paths);
		} else {
			navigateToTopPath(paths);
		}
	});

	$: if (mounted) {
		if ($isWindowMode) {
			openAllWindows(getWindowPathsArray());
			navigateToTopPath(['/']);
		} else {
			navigateToTopPath(getWindowPathsArray());
		}
	}

	//////////////
	// Handlers //
	//////////////

	function handleLinkClick(event: CustomEvent<{ path: string }>): void {
		const path = event.detail.path;
		if (openWindows.has(path)) {
			handleMakeActive(path);
		} else {
			openWindow(path);
		}
	}

	function handleWindowClose(path: string): void {
		makePreviousWindowActive(path);
		openWindows.delete(path);
		openWindows = new Map(openWindows);
	}

	function handleMakeActive(path: string): void {
		if (!path) {
			return;
		}
		const highestZIndex = Math.max(...[...openWindows.values()].map((w) => w.zIndex || 0), 0);
		const window = {
			...openWindows.get(path),
			zIndex: highestZIndex + 1,
			minimised: false
		};

		openWindows.delete(path);
		openWindows.set(path, window);
		openWindows = new Map(openWindows);
	}

	function handleToggleMaximised(path: string): void {
		handleMakeActive(path);
		openWindows.set(path, {
			...openWindows.get(path),
			zIndex: 0,
			maximised: !openWindows.get(path)?.maximised,
			minimised: false
		});
		openWindows = new Map(openWindows);
	}

	function handleMakeMinimised(path: string): void {
		openWindows.set(path, {
			...openWindows.get(path),
			zIndex: 0,
			minimised: true,
			maximised: false
		});
		openWindows = new Map(openWindows);
		makePreviousWindowActive(path);
	}

	function handleHomeClick(): void {
		openWindows = new Map();
		goto('/', { replaceState: true });
	}
</script>

<NavigationBar links={mainLinks} selected={activeWindowPathName} on:linkClick={handleLinkClick}>
	<span slot="first-button"><LinkLikeButton on:click={handleHomeClick}>Home</LinkLikeButton></span>
	<WindowModeToggle />
</NavigationBar>

{#if $isWindowMode}
	<section class="window-wrapper">
		{#each openWindows.entries() as [path, { title, component, initX, initY, initWidth, initHeight, links, minimised, maximised }], i (path)}
			<Window
				{...{
					initX,
					initY,
					title,
					zIndex: i,
					initWidth,
					initHeight,
					active: path === activeWindowPathName,
					minimised,
					maximised
				}}
				on:close={() => handleWindowClose(path)}
				on:active={() => handleMakeActive(path)}
				on:minimised={() => handleMakeMinimised(path)}
				on:maximised={() => handleToggleMaximised(path)}
			>
				{#if component}
					<svelte:component this={component} {links} on:linkClick={handleLinkClick} />
				{:else}
					<PageHeading>404 – Page not found</PageHeading>
				{/if}
			</Window>
		{/each}
	</section>

	<section class="minimised-wrapper">
		{#each minimisedWindows as [path, { title }]}
			<MinimisedWindow
				{title}
				on:open={() => handleMakeActive(path)}
				on:close={() => handleWindowClose(path)}
				on:maximise={() => handleToggleMaximised(path)}
			/>
		{/each}
	</section>
{/if}

<style>
	.window-wrapper {
		position: absolute;
		width: 100%;
		height: 100vh;
		pointer-events: none;
		z-index: 1;
	}

	.minimised-wrapper {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		pointer-events: none;
		flex-wrap: wrap;
		gap: 4px;
		z-index: 2;
		transform: rotate(180deg);
		transform-origin: center;
	}
</style>
