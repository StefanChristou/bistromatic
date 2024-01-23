<script lang="ts">
	import PageHeading from './PageHeading.svelte';
	import type {Image} from "../../types/Image.type";

	export let image = {} as Image;
	export let text = '';

	const padding = Math.random() * 2 + 'rem';
</script>

<div class="card" style:padding>
	<img src={image.src} alt={image.alt} />
	<div
		class="text-container"
		style:top={padding}
		style:bottom={padding}
		style:left={padding}
		style:right={padding}
	>
		<PageHeading>{text}</PageHeading>
	</div>
</div>

<style>
	.card {
		display: inline-block;
		width: 300px;
		background: lightgray;
		position: relative;
		box-sizing: content-box;
		margin: 0 1rem 1rem 0;
	}

	img {
		width: 100%;
	}

	.text-container {
		padding: 1rem;
		position: absolute;
		display: none;
	}

	.card:hover {
		box-shadow: 5px 5px black;
	}

	.card:hover .text-container {
		display: block;
	}
</style>
