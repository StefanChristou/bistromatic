<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import leftClickOnly from '../helpers/left-click-only.js';

	export let title = '';

	const dispatch = createEventDispatcher();

	function dispatchClose(): void {
		dispatch('close');
	}

	function dispatchMaximise(): void {
		dispatch('maximise');
	}

	function dispatchOpen(): void {
		dispatch('open');
	}
</script>

<div class="wrapper">
	<h3 data-testid="minimised-window-title">{title}</h3>
	<div class="control-container">
		<button on:click={leftClickOnly(dispatchOpen)}>_</button>
		<button on:click={leftClickOnly(dispatchMaximise)}>[ ]</button>
		<button on:click={leftClickOnly(dispatchClose)}>X</button>
	</div>
</div>

<style>
	.wrapper {
		background-color: black;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: flex;
		justify-content: space-between;
		align-items: center;
		pointer-events: initial;
		gap: 8px;
		padding: 2px 2px 2px 8px;
		transform: rotate(180deg);
		transform-origin: center;
		color: #fafafa;
		font-size: 0.85rem;
		font-weight: 200;
	}

	h3 {
		font-size: 1rem;
		font-weight: 400;
		margin: 0;
	}
</style>
