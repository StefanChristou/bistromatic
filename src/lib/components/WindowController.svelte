<script>
  import NavigationBar from "./NavigationBar.svelte";
  import Window from "./Window.svelte";
  import Words from "./window-contents/Words.svelte";
  import Work from "./window-contents/Work.svelte";
  import Who from "./window-contents/Who.svelte";
  import {onMount} from "svelte";

  const links = {
    "words": {text: "words", component: Words, initWidth: 1200, initHeight: 900},
    "work": {text: "work", component: Work, initWidth: 1200, initHeight: 900},
    "who": {text: "who", component: Who, initWidth: 800, initHeight: 800},
  };

  let openWindows = {};
  let open;

  let selected = "";

  function openWindow(path) {
    const highestZIndex = Math.max(...Object.values(openWindows).map(w => w.zIndex), 0);
    const length = Object.keys(openWindows).length;
    selected = path;

    openWindows = {
      ...openWindows,
      [path]: {
        ...links[path],
        zIndex: highestZIndex + 1,
        initX: 50 + 10 * (length + 1),
        initY: 50 + 10 * (length + 1),
      }
    };
  }

  onMount(() => {
    open = new URL(window.location.href).searchParams.get("open").split(",");

    open.forEach(id => {
      if (id) {
        openWindow(id);
      }
    });
  });

  function addStringsToQueryParam() {
    const newUrl = new URL(window.location.href);
    if (Object.keys(openWindows).length) {
      newUrl.searchParams.set("open", Object.keys(openWindows).join(","));
    } else {
      newUrl.searchParams.delete("open");
    }
    window.history.pushState({}, "", newUrl);
  }

  function handleLinkClick(event) {
    openWindow(event.detail.path || "");
    addStringsToQueryParam();
  }

  function handleWindowClose(path) {
    selected = "";
    openWindows = Object.fromEntries(
      Object.entries(openWindows).filter(([key]) => key !== path)
    );
    addStringsToQueryParam();
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
  {#each Object.entries(openWindows) as [name, {component, zIndex, initX, initY, initWidth, initHeight}], i (name)}
    <Window
        {...{initX, initY, name, zIndex, initWidth, initHeight, active: name === selected}}
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