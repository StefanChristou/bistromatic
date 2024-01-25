import type { ComponentType } from 'svelte';

export type ContentWindow = {
  text: string;
  component: ComponentType;
  initX: number;
  initY: number;
  initWidth: number;
  initHeight: number;
  minimised: boolean;
  zIndex: number;
  links?: Links;
};

export type Links = {
  [link: string]: Partial<ContentWindow>;
}