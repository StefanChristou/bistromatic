<script lang="ts">
  import NavigationBar from "../NavigationBar.svelte";
  import {createEventDispatcher} from "svelte";

  export let links;

  const dispatch = createEventDispatcher();

  function emitLinkClick(path) {
    dispatch('linkClick', {path});
  }
</script>

{#if links}
  <NavigationBar {links} on:linkClick={(e) => emitLinkClick(e.detail.path)}/>
{/if}

<slot></slot>