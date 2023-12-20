import {writable} from "svelte/store";

const initialState = false;

export const isWindowMode = writable<boolean>(initialState);