<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isWindowMode } from '../../ui-store';
	import type {Links} from "./window-controller-links";

	export let links = {} as Links;
	export let selected = '';

	const dispatch = createEventDispatcher();

	function handleLinkClick(path: string) {
		return function () {
			dispatch('linkClick', { path });
		};
	}
</script>

<nav>
	<div class="buttonContainer">
		<slot name="first-button" />
		{#if $isWindowMode}
			{#each Object.entries(links) as [path, { text }]}
				<button on:click={handleLinkClick(path)} class:active={path === selected}>{text}</button>
			{/each}
		{:else}
			{#each Object.entries(links) as [path, { text }]}
				<a href={path} class:active={path === selected} on:click={handleLinkClick(path)}>{text}</a>
			{/each}
		{/if}
	</div>
	<slot />
</nav>

<style>
	nav {
		margin: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	a,
	button {
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		font: inherit;
		display: inline-block;
		line-height: normal;
		overflow: visible;
		padding: 0;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		margin: 0.5em;
	}

	button:hover {
		text-decoration: underline;
	}

	a.active,
	button.active {
		text-decoration: underline;
	}
</style>
