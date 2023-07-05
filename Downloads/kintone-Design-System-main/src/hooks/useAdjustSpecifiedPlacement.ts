import { setScrollEnabled } from '../functions/setScrollEnabled';
import { repositionElement } from '../functions/repositionElement';
import React, { useLayoutEffect } from 'react';
import { type Placement } from '../models/placement';

export const useAdjustSpecifiedPlacement = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  option: {
    enableScrollIfNeeded?: boolean;
    placement: Placement;
  }
) => {
  const enableScrollIfNeeded = option?.enableScrollIfNeeded || false;

  // 画面描画時に非同期で高さを計算すると、画面がガタついたりスクロール位置がずれるので、
  // useEffectではなくuseLayoutEffectを使って同期的に計算する
  useLayoutEffect(() => {
    const el = ref.current;
    if (el) {
      repositionElement(el, option.placement);
      setScrollEnabled(el, enableScrollIfNeeded);
    }
  }, [ref, enableScrollIfNeeded, option.placement]);

  return [option.placement];
};
