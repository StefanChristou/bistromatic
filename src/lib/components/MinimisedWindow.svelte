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
	<h3>{title}</h3>
	<div class="control-container">
		<button on:click={leftClickOnly(dispatchOpen)}>_</button>
		<button on:click={leftClickOnly(dispatchMaximise)}>[ ]</button>
		<button on:click={leftClickOnly(dispatchClose)}>X</button>
	</div>
</div>

<style>
	.wrapper {
		color: white;
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
	}

	h3 {
		font-weight: 200;
		font-size: 1rem;
		margin: 0;
	}
</style>
