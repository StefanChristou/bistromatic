<script>
  import NavigationBar from "../NavigationBar.svelte";
  import PageHeading from "../shared/PageHeading.svelte";
  import {createEventDispatcher} from "svelte";
  import LinkyCard from "../shared/LinkyCard.svelte";

  export let links = {};
  const dispatch = createEventDispatcher();
  const works = [
    {
      text: "Comic Sans Ultralight",
      path: "Comic Sans Ultralight",
      image: {src: "images/comic-sans-ultralight.jpg", alt: "Thumbnail image showing Comic Sans Ultralight font"}
    },
    {
      text: "Boomi Data-vis",
      path: "Boomi data-visualisation",
      image: {src: "images/boomi-data-vis.png", alt: "Thumbnail showing screenshot of Boomi data visualisation"}
    },
    {
      text: "NGS Site Build",
      path: "National Garden Scheme Site build",
      image: {src: "images/ngs-in-situ.jpg", alt: "Thumbnail showing National Garden Scheme website"}
    },
  ];

  function emitLinkClick(path) {
    dispatch("linkClick", {path});
  }

</script>

<NavigationBar {links} on:linkClick={(e) => emitLinkClick(e.detail.path)}/>

<PageHeading>Work</PageHeading>

<div class="flex-container">
  {#each works as {text, path, image}}
    <button on:click={() => emitLinkClick(path)} class="un-styled-button">
      <LinkyCard {image} {text} />
    </button>
  {/each}
</div>

