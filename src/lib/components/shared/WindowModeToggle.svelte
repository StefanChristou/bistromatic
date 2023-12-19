<script lang="ts">
  import Switch from "./Switch.svelte";
  import {isWindowMode} from "../../../ui-store.ts";
  import {onMount} from "svelte";
  import {setSearchParam, getSearchParam} from "../../helpers/uri-param-helpers.ts";

  onMount(() => {
    const windowParam = getSearchParam('window-mode');
    // Yes, I could have used == undefined as a shorthand for both null and undefined,
    // but I wanted to be explicit to the reader about my intent here, otherwise the
    // loose equality could be made strictly equal by a well-meaning developer in error
    if (windowParam === undefined || windowParam === null || windowParam === 'true') {
      isWindowMode.set(true);
    } else {
      isWindowMode.set(false);
    }

    isWindowMode.subscribe(isWindowMode => {
      setSearchParam('window-mode', isWindowMode.toString());
    });
  });

</script>

<span class="smaller">
  <Switch bind:checked={$isWindowMode} label="Window mode"/>
</span>

<style>
  .smaller {
    font-size: 0.875em;
  }
</style>