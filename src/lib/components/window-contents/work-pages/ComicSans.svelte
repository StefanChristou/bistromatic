<script>
	import Figure from '../../shared/Figure.svelte';
	import Paragraph from '../../shared/Paragraph.svelte';
	import PageHeading from '../../shared/PageHeading.svelte';
</script>

<div>
	<PageHeading>Comic Sans Ultralight</PageHeading>
	<Figure src="images/comic-sans-ultralight.jpg" alt="Sexy?" />
	<Paragraph>The font the web has been waiting for!!!!!!!!!!!!!!!!!!!!!!!!!!!</Paragraph>
	<Paragraph
		>Ever since its release in 1994, Comic Sans has been a staple of good sensible design the world
		over.</Paragraph
	>
	<Paragraph
		>Barely a successful Resume has been submitted to an employer without the forceful curves,
		dynamic attitude and self-starting-attention-to-detail-displaying business-like-acumen of this
		classic font.
	</Paragraph>
	<Paragraph
		>Now celebrating its 20th year, this once great font is beginning to show its age. In a world of
		high-resolution screens and ultra-light everything, a font like Comic Sans must be brought
		up-to-date with global trend vectors and put on a slimline skinny-latte diet of soy beans, sweat
		and .1mm felt-tip pens.
	</Paragraph>
	<Paragraph
		>So, internet… so you might never miss out on that key middle-management sales position that
		requires knowledge of
		smartphone-based-openGL-silicone-bumper-peripheral-vision-synapse-upselling-downsloap-upstream-ski-divisions,
		I give you……..!!!……….!!!!!!!!!!!!!!!!!!!!!!!!!………… <span class="huge"
			>Comic Sans UltraLight!!!!!</span
		></Paragraph
	>
	<Paragraph
		>Comic Sans UltraLight is in no way endorsed by, linked to, or Facebook friends with Microsoft
		Corporation or any of its subsidiary companies, derivatives or amino-acids. As a derivative
		work, please make sure you are in possession of a licence for Comic Sans MS before using this
		font.
	</Paragraph>
	<Paragraph>All rights reserved.</Paragraph>
	<Paragraph
		>May your cat videos be super-high-resolution and your RAM impervious to retroviral infection.</Paragraph
	>
	<Paragraph>Available soon</Paragraph>
</div>

<style>
	@font-face {
		font-family: 'comic_sans_ultralightultraLt';
		src: url('webfonts/abc123-webfont.eot');
		src: url('webfonts/abc123-webfont.eot?#iefix') format('embedded-opentype'),
			url('webfonts/abc123-webfont.woff') format('woff'),
			url('webfonts/abc123-webfont.ttf') format('truetype'),
			url('webfonts/abc123-webfont.svg#comic_sans_ultralightultraLt') format('svg');
		font-weight: normal;
		font-style: normal;
	}

	div {
		font-family: 'comic_sans_ultralightultraLt', cursive;
	}
</style>
