<script lang="ts">
	import Figure from '../lib/components/shared/Figure.svelte';
</script>

<svelte:head>
	<title>stefanchristou.com</title>
	<meta name="description" content="Stefan Christou's personal website" />
</svelte:head>

<section class="title-area">
	<h1>Stefan Christou's website</h1>
</section>
<section>
	<Figure
		src="images/nature.jpg"
		alt="Not a picture of Stefan Christou. A pile of logs"
		caption="A logpile house, Waltham Forrest. © Stefan Christou 2021"
	/>
</section>

<style>
	.title-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		text-align: left;
		font-size: 3.5rem;
		font-style: italic;
		font-weight: 300;
	}
</style>
