import { createContext, createRef } from 'react';

type MenuPopupContextType = {
  openMenu: VoidFunction;
  closeMenu: VoidFunction;
  toggleMenu: VoidFunction;
  isMenuOpen: boolean;
  menuPopupRef: React.RefObject<HTMLUListElement>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = () => {};

export const MenuPopupContext = createContext<MenuPopupContextType>({
  isMenuOpen: false,
  openMenu: emptyFn,
  closeMenu: emptyFn,
  toggleMenu: emptyFn,
  menuPopupRef: createRef()
});
