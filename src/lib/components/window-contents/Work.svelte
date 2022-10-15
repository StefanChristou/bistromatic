<script>
  import NavigationBar from "../NavigationBar.svelte";
  import PageHeading from "../shared/PageHeading.svelte";
  import {createEventDispatcher} from "svelte";
  import LinkyCard from "../shared/LinkyCard.svelte";

  export let links = {};
  const dispatch = createEventDispatcher();
  const works = [
    {text: "Comic Sans Ultralight", path: "Comic Sans Ultralight", image: {src: "images/comic-sans-ultralight.jpg", alt: "Sexy?"}},
  ];

  function emitLinkClick(path) {
    dispatch("linkClick", {path});
  }

</script>

<NavigationBar {links} on:linkClick={(e) => emitLinkClick(e.detail.path)} />

<PageHeading>Work</PageHeading>

{#each works as {text, path, image}}
  <div on:click={() => emitLinkClick(path)}>
    <LinkyCard {image} {text} />
  </div>
{/each}

