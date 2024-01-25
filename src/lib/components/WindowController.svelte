<script lang="ts">
	import { onMount } from 'svelte';
	import NavigationBar from './NavigationBar.svelte';
	import Window from './Window.svelte';
	import { mainLinks, allLinks } from './window-controller-links';
	import { isWindowMode } from '../../ui-store';
	import WindowModeToggle from './shared/WindowModeToggle.svelte';
	import { goto } from '$app/navigation';
	import PageHeading from './shared/PageHeading.svelte';
	import LinkLikeButton from './shared/LinkLikeButton.svelte';
	import type { ContentWindow } from '../../types/ContentWindow.type';

	let openWindows = new Map<string, Partial<ContentWindow>>();
	let paths;
	let selected = '';
	let mounted = false;

	function openWindow(path: string) {
		const length = openWindows.size;
		selected = path;

		openWindows.set(path, {
			...allLinks[path],
			initX: 40 + 12 * (length + 1),
			initY: 40 + 12 * ((length % 6) + 1),
			minimised: false
		});
	}

	function openAllWindows(paths = [] as string[]) {
		paths.filter(Boolean).forEach((path) => openWindow(path));
	}

	function navigateToTopPath(paths: string[], replaceState = true) {
		const topPath = paths[paths.length - 1] || '';
		if (isPathValid(topPath)) {
			goto(topPath, { replaceState });
		}
	}

	$: if (mounted) {
		if ($isWindowMode) {
			openAllWindows(getWindowPathsArray());
			navigateToTopPath(['/']);
		} else {
			navigateToTopPath(getWindowPathsArray());
		}
	}

	function isPathValid(path: string) {
		return path === '/' || Boolean(allLinks[path]);
	}

	onMount(() => {
		mounted = true;
		paths = new URL(window.location.href).searchParams.get('open')?.split(',') || [];

		if ($isWindowMode) {
			openAllWindows(paths);
		} else {
			navigateToTopPath(paths);
		}
	});

	function getWindowPathsArray() {
		return [...openWindows].filter(([_, val]) => !val.minimised).map(([key]) => key) as string[];
	}

	function handleLinkClick(event: CustomEvent<{ path: string }>) {
		const path = event.detail.path;
		if (openWindows.has(path)) {
			handleMakeActive(path);
		} else {
			openWindow(path);
		}
	}

	function makePreviousWindowActive(path: string = selected) {
		const windows = [...openWindows].filter(([key, val]) => key !== path && !val.minimised);
		const previousWindowKey = windows[windows.length - 1]?.[0];
		if (previousWindowKey) {
			handleMakeActive(previousWindowKey);
		}
	}

	function handleWindowClose(path: string) {
		selected = '';
		makePreviousWindowActive();
		openWindows.delete(path);
	}

	function handleMakeActive(path: string) {
		if (!path) {
			return;
		}
		selected = path;
		const highestZIndex = Math.max(...[...openWindows.values()].map((w) => w.zIndex || 0), 0);
		const window = {
			...openWindows.get(path),
			zIndex: highestZIndex + 1,
			minimised: false
		};

		openWindows.delete(path);
		openWindows.set(path, window);
	}

	function handleMakeMinimised(path: string) {
		selected = '';
		openWindows.set(path, {
			...openWindows.get(path),
			zIndex: 0,
			minimised: true
		});
		makePreviousWindowActive(path);
	}

	function handleHomeClick() {
		selected = '';
		openWindows = new Map();
		goto('/', { replaceState: true });
	}
</script>

<NavigationBar links={mainLinks} {selected} on:linkClick={handleLinkClick}>
	<span slot="first-button"><LinkLikeButton on:click={handleHomeClick}>Home</LinkLikeButton></span>
	<WindowModeToggle />
</NavigationBar>

{#if $isWindowMode}
	<section class="window">
		{#each [...openWindows.entries()] as [path, { text, component, initX, initY, initWidth, initHeight, links, minimised }], i (path)}
			<Window
				{...{
					initX,
					initY,
					text,
					zIndex: i,
					initWidth,
					initHeight,
					active: path === selected,
					minimised
				}}
				on:close={() => handleWindowClose(path)}
				on:active={() => handleMakeActive(path)}
				on:minimised={() => handleMakeMinimised(path)}
			>
				{#if component}
					<svelte:component this={component} {links} on:linkClick={handleLinkClick} />
				{:else}
					<PageHeading>404 – Page not found</PageHeading>
				{/if}
			</Window>
		{/each}
	</section>
{/if}

<style>
	.window {
		position: absolute;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		pointer-events: none;
	}
</style>
