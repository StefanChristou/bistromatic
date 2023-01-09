<script>
  import {createEventDispatcher, onMount, afterUpdate} from "svelte";
  import leftClickOnly from "../helpers/leftClickOnly";

  export let zIndex = 1;
  export let text = "";

  export let active = false;
  export let minimised = false;
  export let maximised = false;

  export let initWidth = 1200;
  export let initHeight = 900;

  export let initX = 50;
  export let initY = 50;

  let width = 1200;
  let height = 900;

  let x = 0;
  let y = 0;

  let eventMousePosition = {x: 0, y: 0};

  onMount(() => {
    x = initX;
    y = initY;
    width = initWidth;
    height = initHeight;
  });

  afterUpdate(() => {
    if (active) {
      minimised = false;
    }
  })

  const dispatch = createEventDispatcher();

  function handleCloseClick() {
    dispatch("close", name);
  }

  function dispatchActive() {
    dispatch("active", name);
  }

  function dispatchInactive() {
    dispatch("inactive", name);
  }

  function handleMinimiseToggleClick() {
    minimised = !minimised;

    if (minimised) {
      dispatchInactive()
      maximised = false;
    } else {
      dispatchActive();
    }
  }

  function handleMaximiseToggleClick() {
    maximised = !maximised;

    if (maximised) {
      minimised = false;
    }
    dispatchActive();
  }

  function moveWindow(event) {
    const newX = x + event.clientX - eventMousePosition.x;
    const newY = y + event.clientY - eventMousePosition.y;
    const edgePadding = 30;
    const leftPadding = 100;

    if (newX >= -(width - leftPadding) && newX <= window.innerWidth - edgePadding) {
      x += event.clientX - eventMousePosition.x;
      eventMousePosition = {...eventMousePosition, x: event.clientX};
    } else if (newX < -(width - leftPadding)) {
      x = -(width - leftPadding);
    } else if (newX > window.innerWidth) {
      x = window.innerWidth - edgePadding;
    }
    if (newY >= 0 && newY <= window.innerHeight - edgePadding) {
      y += event.clientY - eventMousePosition.y;
      eventMousePosition = {...eventMousePosition, y: event.clientY};
    } else if (newY < 0) {
      y = 0;
    } else if (newY > window.innerHeight) {
      y = window.innerHeight - edgePadding;
    }
  }

  function handleMoveStart(event) {
    if (minimised) {
      dispatchActive();
      return;
    }
    eventMousePosition = {x: event.clientX, y: event.clientY};
    document.addEventListener("mousemove", moveWindow);
    document.addEventListener("mouseup", handleMoveEnd);
    dispatchActive();
  }

  function handleMoveEnd() {
    document.removeEventListener("mousemove", moveWindow);
    document.removeEventListener("mouseup", handleMoveEnd);
  }

  function resizeWindow({clientX, clientY}) {
    const newWidth = width + (clientX - eventMousePosition.x);
    const newHeight = height + (clientY - eventMousePosition.y);

    if (newWidth > 200) {
      width = newWidth;
      eventMousePosition = {...eventMousePosition, x: clientX};
    }

    if (newHeight > 100) {
      height = newHeight;
      eventMousePosition = {...eventMousePosition, y: clientY};
    }
  }

  function resizeWindowRight({clientX}) {
    const newWidth = width + (clientX - eventMousePosition.x);

    if (newWidth > 200) {
      width = newWidth;
      eventMousePosition = {...eventMousePosition, x: clientX};
    }
  }

  function setResizeMousePosition({clientX, clientY}) {
    eventMousePosition = {x: clientX, y: clientY};
  }

  function handleResizeStart({clientX, clientY}) {
    setResizeMousePosition({clientX, clientY});
    window.addEventListener("mousemove", resizeWindow);
    window.addEventListener("mouseup", handleResizeEnd);
    dispatchActive();
  }

  function handleResizeEnd() {
    window.removeEventListener("mousemove", resizeWindow);
    window.removeEventListener("mouseup", handleResizeEnd);
  }

  function handleResizeRightStart({clientX, clientY}) {
    setResizeMousePosition({clientX, clientY});
    window.addEventListener("mousemove", resizeWindowRight);
    window.addEventListener("mouseup", handleResizeRightEnd);
    dispatchActive();
  }

  function handleResizeRightEnd() {
    window.removeEventListener("mousemove", resizeWindowRight);
    window.removeEventListener("mouseup", handleResizeRightEnd);
  }

</script>

<section
    class="window"
    class:minimised
    class:maximised
    class:active
    style:left={minimised || maximised ? 0 : x + 'px'}
    style:top={minimised || maximised ? 0 : y + 'px'}
    style:width={minimised ? 150 + 'px' : maximised ? '100vw' : width + 'px'}
    style:height={minimised ? 23 + 'px' : maximised ? '100vh' : height + 'px'}
    style:z-index={zIndex}
>
  <div
      class="title-bar"
      on:mousedown|self={leftClickOnly(handleMoveStart)}
  >
    <h2
        on:mousedown|self={leftClickOnly(handleMoveStart)}
    >{text}</h2>
    <div class="control-container">
      <button on:click={leftClickOnly(handleMinimiseToggleClick)}>_</button>
      <button on:click={leftClickOnly(handleMaximiseToggleClick)}>[ ]</button>
      <button on:click={leftClickOnly(handleCloseClick)}>X</button>
    </div>
  </div>
  <div
      class="inner"
      class:minimised
  >
    <slot></slot>
  </div>
  <div
      class="white-out"
      class:active
      on:mousedown={leftClickOnly(handleMoveStart)}
  ></div>
  <button
      class="resize"
      on:mousedown={leftClickOnly(handleResizeStart)}
  >R</button>
  <button
      class="resize-right"
      on:mousedown={leftClickOnly(handleResizeRightStart)}>

  </button>
</section>

<style>
  .window {
    background: white;
    border: 1px solid black;
    position: absolute;
    pointer-events: auto;
  }

  .window:not(.active):not(.minimised) {
    filter: grayscale(100%) brightness(85%);
    border-color: #888;
  }

  .window:not(.active):not(.minimised) > .title-bar {
    background: #444;
  }

  .white-out {
    display: block;
    background: white;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .white-out.active {
    display: none;
  }

  .white-out.minimised {
    display: none;
  }

  .window.minimised {
    position: relative;
    display: inline-block;
    margin-right: 1px;
  }

  .title-bar {
    background: black;
    padding: 0.1rem 0.5rem 0.2rem 3px;
    color: #fafafa;
    font-size: 0.85rem;
    font-weight: 200;
    position: relative;
    user-select: none;
  }

  .control-container {
    position: absolute;
    top: 0;
    right: 0;
    user-select: none;
  }

  h2 {
    margin: 0;
    display: inline-block;
  }

  .inner {
    position: relative;
    width: calc(100% - 6px);
    height: calc(100% - 29px);
    padding: 3px;
    overflow: auto;
  }

  button {
    cursor: pointer;
  }

  .resize {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    font-size: 0.5rem;
    background: white;
    border: 1px solid black;
    border-radius: 0;
    padding: 0;
    margin: 0;
    cursor: nwse-resize;
  }

  .resize-right {
    position: absolute;
    bottom: 0;
    right: -2px;
    top: 0;
    width: 4px;
    font-size: 0.5rem;
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    cursor: ew-resize;
  }

  .inner.minimised {
    display: none;
  }
</style>