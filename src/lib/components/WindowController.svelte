<script lang="ts">
  import {onMount} from 'svelte';
  import NavigationBar from './NavigationBar.svelte';
  import Window from './Window.svelte';
  import {mainLinks, allLinks} from './window-controller-links';
  import {isWindowMode} from "../../ui-store.ts";
  import WindowModeToggle from "./shared/WindowModeToggle.svelte";
  import {goto} from "$app/navigation";
  import PageHeading from "./shared/PageHeading.svelte";
  import LinkLikeButton from "./shared/LinkLikeButton.svelte";

  let openWindows = new Map();
  let paths;
  let selected = '';
  let mounted = false;

  function openWindow(path) {
    const length = openWindows.size;
    selected = path;

    openWindows.set(
      path,
      {
        ...allLinks[path],
        initX: 40 + 12 * (length + 1),
        initY: 40 + 12 * ((length % 6) + 1)
      }
    );
  }

  function openAllWindows(paths = []) {
    paths.filter(Boolean).forEach(path => openWindow(path));
  }

  function navigateToTopPath(paths, replaceState = true) {
    const topPath = paths[paths.length - 1] || '';
    if (isPathValid(topPath)) {
      goto(topPath, {replaceState});
    }
  }

  $: if (mounted) {
    if ($isWindowMode) {
      openAllWindows(getWindowPathsArray());
      navigateToTopPath(["/"]);
      // addOpenWindowsToQueryParam();
    } else {
      navigateToTopPath(getWindowPathsArray());
    }
  }

  // afterNavigate(event => {
  //   const path = event.to.route.id;
  //   if (isNotForwardSlash(path)) {
  //     if (openWindows.has(path)) {
  //       handleMakeActive(path);
  //     } else {
  //       openWindow(path);
  //     }
  //   }
  // });

  function isNotForwardSlash(path) {
    return path !== '/';
  }

  function isPathValid(path) {
    return path === '/' || Boolean(allLinks[path]);
  }

  onMount(() => {
    mounted = true;
    paths = new URL(window.location.href).searchParams.get('open')?.split(',') || [];

    if ($isWindowMode) {
      openAllWindows(paths);
    } else {
      navigateToTopPath(paths);
    }
  });

  function getWindowPathsArray() {
    return [...openWindows.keys()];
  }

  function addOpenWindowsToQueryParam() {
    // const newUrl = new URL(window.location.href);
    // if (openWindows.size) {
    //   newUrl.searchParams.set('open', [...openWindows.keys()].join(','));
    // } else {
    //   newUrl.searchParams.delete('open');
    // }
    // window.history.replaceState(newUrl, '', newUrl);
  }

  function handleLinkClick(event) {
    const path = event.detail.path;
    if (openWindows.has(path)) {
      handleMakeActive(path);
      // addOpenWindowsToQueryParam();
    } else {
      openWindow(path);
      // addOpenWindowsToQueryParam();
    }
  }

  function handleWindowClose(path) {
    selected = '';
    openWindows.delete(path);
    // addOpenWindowsToQueryParam();

    const previousWindowKey = [...openWindows.keys()][openWindows.size - 1];

    if (previousWindowKey) {
      handleMakeActive(previousWindowKey);
    }
  }

  function handleMakeActive(path) {
    if (!path) {
      return;
    }
    selected = path;
    const highestZIndex = Math.max(...[...openWindows.values()].map((w) => w.zIndex), 0);
    const window = {
      ...openWindows.get(path),
      zIndex: highestZIndex + 1
    };

    openWindows.delete(path);
    openWindows.set(path, window);
  }

  function handleMakeInactive(path) {
    selected = '';
    openWindows.set(path, {
      ...openWindows.get(path),
      zIndex: 0
    });
  }

  function handleHomeClick() {
    selected = '';
    openWindows = new Map();
    // addOpenWindowsToQueryParam();
    goto('/', {replaceState: true});
  }

</script>

<NavigationBar links={mainLinks} {selected} on:linkClick={handleLinkClick}>
  <span slot="first-button"><LinkLikeButton on:click={handleHomeClick}>Home</LinkLikeButton></span>
  <WindowModeToggle/>
</NavigationBar>

{#if $isWindowMode}
  <section class="window">
    {#each [...openWindows.entries()] as [path, {
      text,
      component,
      zIndex,
      initX,
      initY,
      initWidth,
      initHeight,
      links,
    }], i (path)}
      <Window
        {...{initX, initY, text, zIndex: i, initWidth, initHeight, active: path === selected}}
        on:close={() => handleWindowClose(path)}
        on:active={() => handleMakeActive(path)}
        on:inactive={() => handleMakeInactive(path)}
      >
        {#if component}
          <svelte:component this={component} {links} on:linkClick={handleLinkClick}/>
        {:else}
          <PageHeading>404 – Page not found</PageHeading>
        {/if}
      </Window>
    {/each}
  </section>
{/if}

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
