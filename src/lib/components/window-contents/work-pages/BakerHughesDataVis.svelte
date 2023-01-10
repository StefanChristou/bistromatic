<script>
	import PageHeading from '../../shared/PageHeading.svelte';
	import Paragraph from '../../shared/Paragraph.svelte';
</script>

<PageHeading>Baker Hughes - net zero data visualisation</PageHeading>
<Paragraph
	>Created in partnership with the Financial Times, this data visualisation allows users to explore
	data around the envegy transition to net zero CO2 emissions.</Paragraph
>
<Paragraph
	>It was created in React and uses D3's force collide features to create groups of moving bubbles
	that visualise how prepared companies are for net zero.</Paragraph
>
<Paragraph>The project uses typescript with react and is hosted on AWS Amplify.</Paragraph>
<iframe
	title="Baker Hughes - net zero data visualisation"
	width="100%"
	height="700px"
	src="https://main.d1s81q7pptf75g.amplifyapp.com/"
/>

<style>
	iframe {
		margin-bottom: 1rem;
		border: 1px solid black;
		padding: 6px;
		box-shadow: 3px 3px black;
	}
</style>
