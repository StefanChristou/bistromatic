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

  let width = initWidth;
  let height = initHeight;

  let x = 0;
  let y = 0;

  const bottomRightMoveBuffer = 30; // px
  const leftMoveBuffer = 100; // px

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
  // Tell the parent that the window should be active
  function dispatchActive() {
    dispatch("active", name);
  }

  // Tel the parent that the window should be inactive
  function dispatchInactive() {
    dispatch("inactive", name);
  }

  // Handle user clicks //

  // Close
  function handleCloseClick() {
    dispatch("close", name);
  }

  // Minimise
  function handleMinimiseToggleClick() {
    minimised = !minimised;

    if (minimised) {
      dispatchInactive()
      maximised = false;
    } else {
      dispatchActive();
    }
  }

  // Maximise
  function handleMaximiseToggleClick() {
    maximised = !maximised;

    if (maximised) {
      minimised = false;
    }
    dispatchActive();
  }

  // Change window properties //
  // Move Y
  function moveWindowY({clientY}) {
    const newY = y + clientY - eventMousePosition.y;

    if (newY >= 0 && newY <= window.innerHeight - bottomRightMoveBuffer) {
      y += clientY - eventMousePosition.y;
      eventMousePosition = {...eventMousePosition, y: clientY};
    } else if (newY < 0) {
      y = 0;
    } else if (newY > window.innerHeight) {
      y = window.innerHeight - bottomRightMoveBuffer;
    }
  }

  // Move X
  function moveWindowX({clientX}) {
    const newX = x + clientX - eventMousePosition.x;

    if (newX >= -(width - leftMoveBuffer) && newX <= window.innerWidth - bottomRightMoveBuffer) {
      x += clientX - eventMousePosition.x;
      eventMousePosition = {...eventMousePosition, x: clientX};
    } else if (newX < -(width - leftMoveBuffer)) {
      x = -(width - leftMoveBuffer);
    } else if (newX > window.innerWidth) {
      x = window.innerWidth - bottomRightMoveBuffer;
    }
  }

  // Move XY
  function moveWindow({clientX, clientY}) {
    moveWindowY({clientY});
    moveWindowX({clientX});
  }

  // Resize Y from bottom
  function resizeWindowHeight({clientY}) {
    const newHeight = height + (clientY - eventMousePosition.y);

    if (newHeight > 100) {
      height = newHeight;
      eventMousePosition = {...eventMousePosition, y: clientY};
    }
  }

  // Resize X from right
  function resizeWindowWidth({clientX}) {
    const newWidth = width + (clientX - eventMousePosition.x);

    if (newWidth > 200) {
      width = newWidth;
      eventMousePosition = {...eventMousePosition, x: clientX};
    }
  }

  // Resize from bottom right
  function resizeWindowFromBottomRight({clientX, clientY}) {
    resizeWindowHeight({clientY});
    resizeWindowWidth({clientX});
  }

  // Resize from bottom left
  function resizeWindowFromBottomLeft({clientX, clientY}) {
    resizeWindowHeight({clientY});
    resizeWindowWidthFromLeft({clientX});
    moveWindowX({clientX});
  }

  // Resize from top left
  function resizeWindowFromTopLeft({clientX, clientY}) {
    resizeWindowHeightFromTop({clientY});
    resizeWindowWidthFromLeft({clientX});
    moveWindow({clientX, clientY});
  }

  // Resize Y from top
  function resizeWindowHeightFromTop({clientY}) {
    const newHeight = height - (clientY - eventMousePosition.y);

    if (newHeight > 100) {
      height = newHeight;
    }
  }

  // Resize X from left
  function resizeWindowWidthFromLeft({clientX}) {
    const newWidth = width - (clientX - eventMousePosition.x);

    if (newWidth > 200) {
      width = newWidth;
    }
  }

  // Resize from top
  function resizeFromTop({clientY}) {
    resizeWindowHeightFromTop({clientY});
    moveWindowY({clientY});
  }

  // Resize from bottom
  function resizeFromBottom({clientY}) {
    resizeWindowFromBottomRight({clientY});
  }

  // Resize from left
  function resizeFromLeft({clientX}) {
    resizeWindowWidthFromLeft({clientX});
    moveWindowX({clientX});
  }

  // Resize from top right
  function resizeFromTopRight({clientY, clientX}) {
    resizeWindowHeightFromTop({clientY});
    resizeWindowWidth({clientX});
    moveWindowY({clientY});
  }


  // Setup resize/move //

  // Set mouse position start point
  function setResizeMousePosition({clientX, clientY}) {
    eventMousePosition = {x: clientX, y: clientY};
  }

  // Set mouse position start point and dispatch window as active
  function setupMouseAndMakeWindowActive({clientX, clientY}) {
    setResizeMousePosition({clientX, clientY});
    dispatchActive();
  }

  // Add/remove event listeners for resizing/moving
  // Add
  function addMoveAndUpEventListeners(moveCallback) {
    window.onmousemove = moveCallback;
    window.onmouseup = removeMoveAndUpEventListeners;
  }

  // Remove
  function removeMoveAndUpEventListeners() {
    window.onmousemove = null;
    window.onmouseup = null;
  }


  // Handlers for the window controls //
  // Move //
  function handleMoveStart(event) {
    if (minimised) {
      dispatchActive();
      return;
    }
    eventMousePosition = {x: event.clientX, y: event.clientY};
    addMoveAndUpEventListeners(moveWindow);
    dispatchActive();
  }

  // Resize from edges
  // Top
  function handleResizeTopStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeFromTop);
  }

  // Right
  function handleResizeRightStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeWindowWidth);
  }

  // Bottom
  function handleResizeBottomStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeFromBottom);
  }

  // Left
  function handleResizeLeftStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeFromLeft);
  }

  // Resize from corners //
  // Top right
  function handleResizeTopRightStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeFromTopRight);
  }

  // Bottom right
  function handleResizeBottomRightStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeWindowFromBottomRight);
  }

  // Bottom left
  function handleResizeBottomLeftStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeWindowFromBottomLeft);
  }

  // Top left
  function handleResizeTopLeftStart({clientX, clientY}) {
    setupMouseAndMakeWindowActive({clientX, clientY});
    addMoveAndUpEventListeners(resizeWindowFromTopLeft);
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
    class="resize-top"
    on:mousedown={leftClickOnly(handleResizeTopStart)}>
  </button>
  <button
    class="resize-right"
    on:mousedown={leftClickOnly(handleResizeRightStart)}>
  </button>
  <button
    class="resize-bottom"
    on:mousedown={leftClickOnly(handleResizeBottomStart)}>
  </button>
  <button
    class="resize-left"
    on:mousedown={leftClickOnly(handleResizeLeftStart)}>
  </button>
  <button
    class="resize-top-right"
    on:mousedown={leftClickOnly(handleResizeTopRightStart)}
  ></button>
  <button
    class="resize-bottom-right"
    on:mousedown={leftClickOnly(handleResizeBottomRightStart)}
  >R
  </button>
  <button
    class="resize-bottom-left"
    on:mousedown={leftClickOnly(handleResizeBottomLeftStart)}
  ></button>
  <button
    class="resize-top-left"
    on:mousedown={leftClickOnly(handleResizeTopLeftStart)}
  ></button>

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
    cursor: move;
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

  .resize-left {
    position: absolute;
    bottom: 0;
    left: -2px;
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

  .resize-top {
    position: absolute;
    top: -2px;
    right: 0;
    left: 0;
    height: 4px;
    font-size: 0.5rem;
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    cursor: ns-resize;
  }

  .resize-bottom {
    position: absolute;
    bottom: -2px;
    right: 0;
    left: 0;
    height: 4px;
    font-size: 0.5rem;
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    cursor: ns-resize;
  }

  .resize-top-right {
    position: absolute;
    top: -3px;
    right: -3px;
    height: 6px;
    width: 6px;
    font-size: 0.5rem;
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    cursor: nesw-resize;
  }

  .resize-bottom-right {
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

  .resize-bottom-left {
    position: absolute;
    bottom: -3px;
    left: -3px;
    height: 6px;
    width: 6px;
    font-size: 0.5rem;
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    cursor: nesw-resize;
  }

  .resize-top-left {
    position: absolute;
    top: -3px;
    left: -3px;
    height: 6px;
    width: 6px;
    font-size: 0.5rem;
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    cursor: nwse-resize;
  }

  .inner.minimised {
    display: none;
  }
</style>