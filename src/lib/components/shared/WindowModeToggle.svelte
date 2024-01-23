<script lang="ts">
	import Switch from './Switch.svelte';
	import { isWindowModeAllowed, isWindowModeSet } from '../../../ui-store';
	import { onMount } from 'svelte';
	import { setSearchParam, getSearchParam } from '../../helpers/uri-param-helpers';
	import { isDesktopWidth } from '../../helpers/isDesktopWidth';

	let innerWidth = 0;
	$: isWindowModeAllowed.set(isDesktopWidth(innerWidth));

	onMount(() => {
		const windowParam = getSearchParam('window-mode');
		// Yes, I could have used == undefined as a shorthand for both null and undefined,
		// but I wanted to be explicit to the reader about my intent here, otherwise the
		// loose equality could be made strictly equal by a well-meaning developer in error
		if (windowParam === undefined || windowParam === null || windowParam === 'true') {
			isWindowModeSet.set(true);
		} else {
			isWindowModeSet.set(false);
		}

		isWindowModeSet.subscribe((isWindowMode) => {
			setSearchParam('window-mode', isWindowMode.toString());
		});
	});
</script>

<svelte:window bind:innerWidth />

{#if $isWindowModeAllowed}
	<span class="smaller">
		<Switch bind:checked={$isWindowModeSet} label="Window mode" />
	</span>
{/if}

<style>
	.smaller {
		font-size: 0.875em;
	}
</style>
