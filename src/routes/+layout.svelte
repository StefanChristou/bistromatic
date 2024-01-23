<script lang="ts">
	import './styles.css';
	import WindowController from '../lib/components/WindowController.svelte';
</script>

<div class="app">
	<WindowController />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://github.com/StefanChristou/bistromatic">github.com/StefanChristou/bistromatic</a></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		height: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	footer p {
		margin: 0;
	}

	@media (min-width: 480px) {
		footer {
			padding: 26px 0;
		}
	}
</style>
