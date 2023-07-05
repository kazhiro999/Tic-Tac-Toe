/**
 * 特定の領域外をクリックしたときにcallbackを実行するカスタムHooks
 */
import React, { useEffect } from 'react';

export const useOutsideTargetElementOnClick = <E extends HTMLElement>(
  ref: React.RefObject<E>,
  onClick: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const { current: el } = ref;
      el && !el.contains(event.target as Node) && onClick(event);
    };
    document.addEventListener('click', handler, true);
    return () => {
      document.removeEventListener('click', handler, true);
    };
  }, [onClick, ref]);
};
