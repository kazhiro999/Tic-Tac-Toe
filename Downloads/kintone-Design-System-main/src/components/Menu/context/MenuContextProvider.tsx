import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MenuPopupContext } from './MenuPopupContext';
import { FocusContext } from './FocusContext';

const findIndexOnNodeList = <E extends Node>(
  nodeList: NodeListOf<E>,
  fn: (node: E) => boolean
) => {
  let index: number | undefined;
  nodeList.forEach((n, i) => {
    if (fn(n)) index = i;
  });
  return index;
};

// 【注意】マウント後のメニュー置き換えには対応していない
export const MenuContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPopupRef = useRef<HTMLUListElement>(null);
  // フォーカス可能なメニュー項目のリスト
  const focusableNodeListRef = useRef<NodeListOf<HTMLElement>>();
  const focusIndex = useRef(0);
  const lastFocusedRef = useRef<Element | null>();

  useEffect(() => {
    if (isMenuOpen) {
      lastFocusedRef.current = document.activeElement;

      if (menuPopupRef && menuPopupRef.current) {
        focusableNodeListRef.current =
          menuPopupRef.current.querySelectorAll('[tabindex]');
      }
    }
  }, [isMenuOpen]);
  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  const focusContextValue = useMemo(() => {
    const focusTo = (
      getIndex: (nodeList: NodeListOf<HTMLElement>) => number | void
    ) => {
      if (!focusableNodeListRef.current) return;
      const index = getIndex(focusableNodeListRef.current);
      if (index === undefined) return;
      focusIndex.current = index;
      focusableNodeListRef.current.item(index)?.focus();
    };

    const focusNext = () => {
      focusTo((nodeList) => {
        const listLength = nodeList.length;
        return focusIndex.current >= listLength - 1
          ? 0
          : focusIndex.current + 1;
      });
    };

    const focusPrev = () => {
      focusTo((nodeList) => {
        const listLength = nodeList.length;
        return focusIndex.current <= 0
          ? listLength - 1
          : focusIndex.current - 1;
      });
    };

    const focusById = (id: string) =>
      focusTo((nodeList) => findIndexOnNodeList(nodeList, (n) => n.id === id));

    const restoreFocus = () => {
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };

    const focusFirst = () => focusTo(() => 0);
    const focusLast = () => focusTo((nodeList) => nodeList.length - 1);

    return {
      focusNext,
      focusPrev,
      focusById,
      restoreFocus,
      focusFirst,
      focusLast
    };
  }, []);

  return (
    <MenuPopupContext.Provider
      value={{
        isMenuOpen,
        menuPopupRef,
        openMenu,
        closeMenu,
        toggleMenu
      }}
    >
      <FocusContext.Provider value={focusContextValue}>
        {children}
      </FocusContext.Provider>
    </MenuPopupContext.Provider>
  );
};
