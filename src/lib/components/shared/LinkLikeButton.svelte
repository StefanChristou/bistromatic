<button on:click>
	<slot />
</button>

<style>
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

	button:active {
		text-decoration: underline;
	}
</style>
