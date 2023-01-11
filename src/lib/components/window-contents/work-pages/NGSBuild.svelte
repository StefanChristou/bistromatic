<script>
	import Figure from '../../shared/Figure.svelte';
	import Paragraph from '../../shared/Paragraph.svelte';
	import PageHeading from '../../shared/PageHeading.svelte';
</script>

<PageHeading>National Garden Scheme site build</PageHeading>
<Figure
	src="/images/ngs-in-situ.jpg"
	alt="Image of the National Garden Scheme website displayed on a laptop"
/>
<Paragraph
	>The <a href="https://www.ngs.org.uk/">National Garden Scheme</a> has operated since early 1900s
	providing funding and support for Nursing and Healthcare charities. As part of their re-brand,
	carried out by west-London agency <a href="https://www.bigfish.co.uk/">BigFish</a>, they needed a
	new website.</Paragraph
>

<Paragraph
	>I worked closely with BigFish’s designers and developers to build the Front End of the site. The
	site was built on Wordpress with a theme built from scratch. Woo-Commerce and a custom API for
	querying a database of gardens were used. The site also has a members area for volunteers and an
	events section. More than 40 page/post templates were created, along with several custom post
	types for a variety of content.
</Paragraph>

<Paragraph
	>The most challenging aspect of the build was the Front End of the garden search. A JSON API was
	created by the backend team at BigFish which in turn queries NGS’ own API. However this was only
	ready a week and a half before the launch date. With the backend team on holiday the week before
	launch (!). Because of limited back-end resources there wasn’t time to implement React + Redux.
	Instead the search functionality was built using jQuery. This meant writing &gt; 1000 lines of
	JavaScript to make Ajax requests, build results in a card layout and on a Google map, and manage
	state, pagination, a gallery view, advanced search filters, favouriting, and searching from both
	within the search-page and the front page. This meant lots of hand-coding, lots of moving parts
	and little time to test.</Paragraph
>

<Paragraph
	>Despite these challenges the site was delivered on time within a total of 9 weeks and with a very
	satisfied client. The search functions very well, with only a few API and UI tweaks needed as the
	site matures.</Paragraph
>
