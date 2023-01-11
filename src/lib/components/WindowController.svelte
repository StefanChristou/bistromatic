<script>
  import {onMount} from 'svelte';
  import NavigationBar from './NavigationBar.svelte';
  import Window from './Window.svelte';
  import {mainLinks, allLinks} from './WindowControllerLinks';








	let openWindows = new Map();
	let open;

	let selected = '';

	function openWindow(path) {
		const length = openWindows.size;
		selected = path;

		openWindows = new Map([
			...openWindows,
			[
				path,
				{
					...allLinks[path],
					initX: 50 + 10 * (length + 1),
					initY: 50 + 10 * (length + 1)
				}
			]
		]);
	}

	onMount(() => {
		open = new URL(window.location.href).searchParams.get('open')?.split(',') || [];

		open.forEach((id) => {
			if (id) {
				openWindow(id);
			}
		});
	});

	function addStringsToQueryParam() {
		const newUrl = new URL(window.location.href);
		if (openWindows.size) {
			newUrl.searchParams.set('open', [...openWindows.keys()].join(','));
		} else {
			newUrl.searchParams.delete('open');
		}
		window.history.pushState({}, '', newUrl);
	}

	function handleLinkClick(event) {
		openWindow(event.detail.path || '');
		addStringsToQueryParam();
	}

	function handleWindowClose(path) {
		selected = '';
		openWindows.delete(path);
		addStringsToQueryParam();

		const previousWindowKey = [...openWindows.keys()][openWindows.size - 1];
		if (previousWindowKey) {
			handleMakeActive(previousWindowKey);
		}
	}

	function handleMakeActive(path) {
		selected = path;
		const highestZIndex = Math.max(...[...openWindows.values()].map((w) => w.zIndex), 0);
		const window = {
			...openWindows.get(path),
			zIndex: highestZIndex + 1
		};

		openWindows.delete(path);
		openWindows.set(path, window);
	}

	function handleMakeInactive(path) {
		selected = '';
		openWindows.set(path, {
			...openWindows.get(path),
			zIndex: 0
		});
	}
</script>

<NavigationBar links={mainLinks} {selected} on:linkClick={handleLinkClick} />

<section class="window">
	{#each [...openWindows.entries()] as [path, { text, component, zIndex, initX, initY, initWidth, initHeight, links }], i (path)}
		<Window
			{...{ initX, initY, text, zIndex: i, initWidth, initHeight, active: path === selected }}
			on:close={() => handleWindowClose(path)}
			on:active={() => handleMakeActive(path)}
			on:inactive={() => handleMakeInactive(path)}
		>
			<svelte:component this={component} {links} on:linkClick={handleLinkClick} />
		</Window>
	{/each}
</section>

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
