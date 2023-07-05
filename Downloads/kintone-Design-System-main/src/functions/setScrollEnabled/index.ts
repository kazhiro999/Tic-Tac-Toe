import { getShrinkedHeight } from './getShrinkedHeight';

export const setScrollEnabled = <T extends HTMLElement>(
  el: T,
  enableScrollIfNeeded: boolean
) => {
  if (enableScrollIfNeeded) {
    el.style.height = 'auto';
    const shrinkedHeight = getShrinkedHeight(el.getBoundingClientRect());
    if (shrinkedHeight.isOverflow) {
      el.style.height = `${shrinkedHeight.height}px`;
    }
  }
};
