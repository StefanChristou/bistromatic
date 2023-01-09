<script>
  import NavigationBar from "./NavigationBar.svelte";
  import Window from "./Window.svelte";
  import Words from "./window-contents/Words.svelte";
  import Work from "./window-contents/Work.svelte";
  import Who from "./window-contents/Who.svelte";
  import {onMount} from "svelte";
  import BoomiDataVis from "./window-contents/work-pages/BoomiDataVis.svelte";
  import ComicSans from "./window-contents/work-pages/ComicSans.svelte";
  import NGSBuild from "./window-contents/work-pages/NGSBuild.svelte";
  import ElSayHPark from "./window-contents/work-pages/ElSayHPark .svelte";
  import MerchantGourmet from "./window-contents/work-pages/MerchantGourmet.svelte";
  import BakerHughesDataVis from "./window-contents/work-pages/BakerHughesDataVis.svelte";
  import {mainPaths, workPaths} from "../../routes/site-paths.ts";

  const workLinks = {
    [workPaths.boomi]: {
      text: "Boomi", component: BoomiDataVis, initWidth: 1200, initHeight: 900,
    },
    [workPaths.comicUltraLight]: {
      text: "CS Ultralight", component: ComicSans, initWidth: 800, initHeight: 900,
    },
    [workPaths.ngs]: {
      text: "NGS", component: NGSBuild, initWidth: 800, initHeight: 900,
    },
    [workPaths.elPark]: {
      text: "El Say h’ Park", component: ElSayHPark, initWidth: 800, initHeight: 900,
    },
    [workPaths.merchantGourmet]: {
      text: "Merchant Gourmet", component: MerchantGourmet, initWidth: 800, initHeight: 900,
    },
    [workPaths.bakerHughes]: {
      text: "Baker Hughes", component: BakerHughesDataVis, initWidth: 800, initHeight: 900,
    },
  };

  const mainLinks = {
    [mainPaths.words]: {text: "words", component: Words, initWidth: 1200, initHeight: 900},
    [mainPaths.work]: {text: "work", component: Work, initWidth: 1200, initHeight: 900, links: workLinks},
    [mainPaths.who]: {text: "who", component: Who, initWidth: 800, initHeight: 800},
  };

  const allLinks = {
    ...mainLinks,
    ...workLinks
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
        ...allLinks[path],
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
    links={mainLinks}
    {selected}
    on:linkClick={handleLinkClick}
/>

<section
    class="window"
>
  {#each Object.entries(openWindows) as [path, {
    text,
    component,
    zIndex,
    initX,
    initY,
    initWidth,
    initHeight,
    links
  }], i (path)}
    <Window
        {...{initX, initY, text, zIndex, initWidth, initHeight, active: path === selected}}
        on:close={() => handleWindowClose(path)}
        on:active={() => handleMakeActive(path)}
        on:inactive={() => handleMakeInactive(path)}
    >
      <svelte:component this={component} {links} on:linkClick={handleLinkClick}/>
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