import {derived, writable} from "svelte/store";

const initialState = false;

export const isWindowModeSet = writable<boolean>(initialState);

export const isWindowModeAllowed = writable<boolean>(initialState);

export const isWindowMode = derived([isWindowModeSet, isWindowModeAllowed], ([$isWindowModeSet, $isWindowModeAllowed]) => $isWindowModeSet &&
  $isWindowModeAllowed);
