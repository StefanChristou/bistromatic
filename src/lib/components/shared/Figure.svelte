<script>
  export let src = "";
  export let alt = "";
  export let caption = "";
</script>

{#if src}
  <figure>
    <img {src} {alt}/>
    {#if caption}
      <figcaption>{caption}</figcaption>
    {/if}
  </figure>
{/if}

<style>
  figure {
    width: 100%;
    max-width: 500px;
    display: block;
    padding: 2rem;
  }

  img {
    width: 100%;
  }

  figcaption {
    font-size: 0.7rem;
  }
</style>