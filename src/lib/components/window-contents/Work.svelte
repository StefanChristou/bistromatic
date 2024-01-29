<script lang="ts">
	import NavigationBar from '../NavigationBar.svelte';
	import PageHeading from '../shared/PageHeading.svelte';
	import { createEventDispatcher } from 'svelte';
	import LinkyCard from '../shared/LinkyCard.svelte';
	import Paragraph from '../shared/Paragraph.svelte';
	import { workPaths } from '../../../routes/site-paths';
	import { isWindowMode } from '../../../ui-store';
	import type { Image } from '../../../types/Image.type';

	type Work = {
		text: string;
		path: string;
		image: Image;
	};

	export let links = {};

	const dispatch = createEventDispatcher();

	const works: Work[] = [
		{
			text: 'Comic Sans Ultralight',
			path: workPaths.comicUltraLight,
			image: {
				src: '/images/comic-sans-ultralight.jpg',
				alt: 'Thumbnail image showing Comic Sans Ultralight font. The quick brown fox jumps over the lazy dog. There is a gaudy background of starts and a tree on a hill.'
			}
		},
		{
			text: 'Boomi Data-vis',
			path: workPaths.boomi,
			image: {
				src: '/images/boomi-data-vis.png',
				alt: 'Thumbnail showing screenshot of Boomi data visualisation. Orange and blue circles are arranged in a bar chart.'
			}
		},
		{
			text: 'NGS Site Build',
			path: workPaths.ngs,
			image: {
				src: '/images/ngs-in-situ.jpg',
				alt: 'Thumbnail showing National Garden Scheme website. It has a yellow and black colour scheme.'
			}
		},
		{
			text: 'El Say h’ Park',
			path: workPaths.elPark,
			image: {
				src: '/images/el-s-park-icon.jpg',
				alt: 'Thumbnail showing the laser cut edge of an art book. The words el say h’ park are formed into the edge.'
			}
		},
		{
			text: 'Merchant Gourmet site build',
			path: workPaths.merchantGourmet,
			image: {
				src: '/images/merchant-gourmet-icon.png',
				alt: 'Thumbnail screenshot of the Merchant Gourmet website'
			}
		},
		{
			text: 'Baker Hughes Data-vis',
			path: workPaths.bakerHughes,
			image: {
				src: '/images/baker-hughes-screenshot.png',
				alt: 'Thumbnail showing screenshot of Baker Hughes data visualisation. Bubbles representing data are coloured in shades of green to represent how prepared companies in different regions and sectors are prepared to meet their net zero CO2 targets.'
			}
		}
	];

	function emitLinkClick(path: string) {
		dispatch('linkClick', { path });
	}
</script>

<NavigationBar {links} on:linkClick={(e) => emitLinkClick(e.detail.path)} />

<PageHeading>Work</PageHeading>
<Paragraph>
	The links on this page are a small selection of my professional works over the past few years.
	Many of the projects I have worked on are internal tools or are strictly behind a paywall. I'll
	try to include as much as I can about those projects in the near future.
</Paragraph>

<div class="flex-container">
	{#if $isWindowMode}
		{#each works as { text, path, image }}
			<button on:click={() => emitLinkClick(path)} class="un-styled-button">
				<LinkyCard {image} {text} />
			</button>
		{/each}
	{:else}
		{#each works as { text, path, image }}
			<a href={path} title={text} class="un-styled-button">
				<LinkyCard {image} {text} />
			</a>
		{/each}
	{/if}
</div>
