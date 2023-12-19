<script lang="ts">
  export let checked = false;
  export let label = '';
</script>

<label>
  <span class="label-text">{label}:</span>
  <span class="switch" class:checked>
    <span class="slider"></span>
    <input type=checkbox bind:checked>
  </span>
</label>

<style>
  label {
    display: inline-flex;
    align-items: center;
  }

  .label-text {
    font-size: 0.875em;
    font-family: "Comic Sans MS", cursive;
    font-style: italic;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 2.5em;
    height: 2em;
    margin: 0 1.4em;
  }

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0.625em;
    left: 0;
    right: 0;
    bottom: 0.625em;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 2em;
  }

  .slider:before {
    content: "";
    position: absolute;
    height: 1.375em;
    width: 1.375em;
    left: 0.25em;
    top: -0.25em;
    transition: .4s;
    border-radius: 50%;
    box-shadow: #666 1px 1px 0.25em;
    background: #fafafa;
  }

  .switch:before {
    content: "off";
    font-family: "Comic Sans Ultralight", "Comic Sans MS", cursive;
    font-size: 0.6em;
    position: absolute;
    height: 1.375em;
    width: 1.375em;
    left: -1.5em;
    top: 0.45em;
    opacity: 1;
    transform: rotate(-50deg);
    transition: .4s;
  }

  .switch.checked:before {
    opacity: 0.6;
  }

  .switch:after {
    content: "on";
    font-family: "Comic Sans Ultralight", "Comic Sans MS", cursive;
    font-size: 0.7em;
    top: 0.45em;
    position: absolute;
    height: 1.375em;
    width: 1.375em;
    right: -1.5em;
    opacity: 0.6;
    transform: rotate(50deg);
    transition: .4s;
  }

  .switch.checked:after {
    opacity: 1;
  }

  .checked > .slider {
    background-color: #128542;
  }

  .checked > .slider:before {
    background-color: #013415;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #28E778;
  }

  .checked > .slider:before {
    transform: translateX(0.625em);
  }
</style>