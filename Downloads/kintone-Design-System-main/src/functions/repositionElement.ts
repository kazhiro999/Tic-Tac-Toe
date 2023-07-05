import { type Placement } from '../models/placement';

export const repositionElement = <T extends HTMLElement>(
  el: T,
  newPosition: Placement
) => {
  switch (newPosition) {
    case 'top-start':
      el.style.bottom = '100%';
      el.style.left = '0';
      break;
    case 'top-end':
      el.style.bottom = '100%';
      el.style.right = '0';
      break;
    case 'bottom-start':
      el.style.top = '100%';
      el.style.left = '0';
      break;
    case 'bottom-end':
      el.style.top = '100%';
      el.style.right = '0';
      break;
  }
};
