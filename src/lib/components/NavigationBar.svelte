<script>
	import { createEventDispatcher } from 'svelte';

	export let links = {};
	export let selected = [];

	const dispatch = createEventDispatcher();

	function handleLinkClick(path) {
		return function () {
			dispatch('linkClick', { path });
		};
	}
</script>

<nav>
	{#each Object.entries(links) as [path, { text }]}
		<button on:click={handleLinkClick(path)} class:active={path === selected}>{text}</button>
	{/each}
</nav>

<style>
	nav {
		margin: 0.5rem;
	}

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

	button.active {
		text-decoration: underline;
	}
</style>
