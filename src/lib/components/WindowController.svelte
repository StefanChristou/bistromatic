<script>
  import NavigationBar from "./NavigationBar.svelte";
  import Window from "./Window.svelte";
  import Words from "./window-contents/Words.svelte";
  import Work from "./window-contents/Work.svelte";
  import Who from "./window-contents/Who.svelte";

  const links = {
    "words": {text: "words", component: Words},
    "work": {text: "work", component: Work},
    "who": {text: "who", component: Who},
  };

  let openWindows = {};

  let selected = "all";

  function handleLinkClick(event) {
    event.preventDefault();
    selected = event.detail.path || "";

    const highestZIndex = Math.max(...Object.values(openWindows).map(w => w.zIndex), 0);
    const length = Object.keys(openWindows).length;

    openWindows = {
      ...openWindows,
      [selected]: {
        ...links[selected],
        zIndex: highestZIndex + 1,
        initX: 50 + 10 * (length + 1),
        initY: 50 + 10 * (length + 1),
      }
    };
  }

  function handleWindowClose(path) {
    openWindows = Object.fromEntries(
      Object.entries(openWindows).filter(([key]) => key !== path)
    );
  }

  function handleMakeActive(path) {
    selected = path;
    const highestZIndex = Math.max(...Object.values(openWindows).map(w => w.zIndex), 0);

    openWindows = {
      ...openWindows,
      [path]: {
        ...openWindows[path],
        zIndex: highestZIndex + 1,
      }
    };
  }

  function handleMakeInactive(path) {
    selected = "";
    openWindows = {
      ...openWindows,
      [path]: {
        ...openWindows[path],
        zIndex: 0,
      }
    };
  }

</script>

<NavigationBar
    {links}
    {selected}
    on:linkClick={handleLinkClick}
/>

<section
    class="window"
>
  {#each Object.entries(openWindows) as [name, {component, zIndex, initX, initY}], i (name)}
    <Window
        {...{initX, initY, name, zIndex, active: name === selected}}
        on:close={() => handleWindowClose(name)}
        on:active={() => handleMakeActive(name)}
        on:inactive={() => handleMakeInactive(name)}
    >
      <svelte:component this={component} />
    </Window>
  {/each}
</section>

<style>
  .window {
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    pointer-events: none;
  }
</style>