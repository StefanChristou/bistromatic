<script>
  import Switch from "./Switch.svelte";
  import {windowMode} from "../../../ui-store.ts";
  import {onMount} from "svelte";
  import {setSearchParam, getSearchParam} from "../../helpers/uri-param-helpers.ts";

  const label = "Window mode";

  onMount(() => {
    const windowParam = getSearchParam('window-mode');
    // Yes, I could have used == undefined as a shorthand for both null and undefined,
    // but I wanted to be explicit to the reader about my intent here, otherwise the
    // loose equality could be made strictly equal by a well-meaning developer in error
    if (windowParam === undefined || windowParam === null || windowParam === 'true') {
      windowMode.set(true);
    } else {
      windowMode.set(false);
    }

    windowMode.subscribe(open => {
      setSearchParam('window-mode', open);
    });
  });

</script>

<span class="smaller">
  <Switch bind:checked={$windowMode} {label}/>
</span>

<style>
  .smaller {
    font-size: 0.875em;
  }
</style>