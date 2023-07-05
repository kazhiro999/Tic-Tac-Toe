import { setScrollEnabled } from '../../functions/setScrollEnabled';
import React, { useLayoutEffect, useState } from 'react';
import { repositionElement } from '../../functions/repositionElement';
import { getWiderPosition } from './getWiderPosition';
import { Placement } from '../../models/placement';

/**
 * 指定要素の表示位置を画面の高さに応じて調整するためのhooks。
 *
 * - 該当要素が position: absolute であることを前提として動作する
 * - position: absolute で初期描画される位置を基準に調整される
 *
 * @param ref 位置を調整する要素への参照
 * @param option オプション
 *  - enableScrollIfNeeded: 画面外にはみ出る場合に要素をスクロール可能にするよう調整するかどうか
 */
// TODO: このhooksを各コンポーネントに直接実装するかどうか、他のデザインシステム等を参考にしながら検討する
export const useAdjustAbsolutePosition = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  option?: {
    enableScrollIfNeeded?: boolean;
  }
) => {
  const [position, setPosition] = useState<Placement>('bottom-end');

  const enableScrollIfNeeded = option?.enableScrollIfNeeded || false;

  // 画面描画時に非同期で高さを計算すると、画面がガタついたりスクロール位置がずれるので、
  // useEffectではなくuseLayoutEffectを使って同期的に計算する
  useLayoutEffect(() => {
    const el = ref.current;
    if (el) {
      const newPosition = getWiderPosition(
        // 現行のuseAdjustAbsolutePositionは2回以上呼ばれることを想定していない
        // しかし、React18では2回以上呼ばれる可能性がある
        // el要素はポップアップの高さや幅を含んでいるため、2回以上呼ばれたとき、判定位置が変わり、戻り値のPlacementが初回と異なることがありうる
        // 複数回呼ばれても同じPlacementを返すために、可能な場合ポップアップの親要素で判定する
        // See: https://github.com/kintone-private/kintone-Design-System/pull/810#discussion_r1002638119
        // See: https://github.com/kintone-private/kintone-Design-System/pull/810#discussion_r1043978509
        (el.parentElement || el).getBoundingClientRect().left,
        (el.parentElement || el).getBoundingClientRect().top
      );
      setPosition(newPosition);
      repositionElement(el, newPosition);
      setScrollEnabled(el, enableScrollIfNeeded);
    }
  }, [ref, enableScrollIfNeeded]);

  return [position];
};
