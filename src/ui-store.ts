import {writable} from "svelte/store";

const initialState = false;

export const windowMode = writable<boolean>(initialState);