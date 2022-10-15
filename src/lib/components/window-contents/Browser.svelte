<script>
  export let startUrl = 'https://www.github.com/StefanChristou';

  let history = [startUrl];
  let historyIndex = 0;
  let iframeExists = true;
  let iframeReference;
  $: historyValue = history[historyIndex];
  let inputValue = history[historyIndex];

  function back() {
    historyIndex = Math.max(historyIndex - 1, 0);
    inputValue = historyValue;
  }

  function forward() {
    historyIndex = Math.min(historyIndex + 1, history.length - 1);
    inputValue = historyValue;
  }

  function reload() {
    iframeExists = false;
    iframeExists = true;
  }

  function stop() {
    if (iframeReference) {
      if (navigator.appName == 'Microsoft Internet Explorer') {
        iframeReference.document.execCommand('Stop');
      } else {
        iframeReference.stop();
      }
    }
  }

  function go(event) {
    if (event.keyCode === 13) {
      history = history.slice(0, historyIndex + 1);
      history = [...history, inputValue];
      historyIndex++;
    }
  }

</script>

<nav>
  <input bind:value={inputValue} on:keydown={go}>
  <button on:click={back}> Back </button>
  <button on:click={forward}> Forward </button>
  <button on:click={reload}> Reload </button>
  <button on:click={stop}> Close </button>
</nav>

{#if iframeExists}
  <iframe
      bind:this={iframeReference}
      src={history[historyIndex]}
      style:width="100%"
      style:height="100%"
  ></iframe>
{/if}
