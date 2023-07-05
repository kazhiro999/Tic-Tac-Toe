import { getWindowInnerHeight } from '../window/getWindowInnerHeight';

/**
 * 要素の上下の位置をもとに、画面外にはみ出ているかを判定し、かつ画面内に収まる高さを算出する
 */
export const getShrinkedHeight = (
  rect: Pick<DOMRect, 'top' | 'bottom'>
): { isOverflow: boolean; height: number } => {
  const innerHeight = getWindowInnerHeight();

  const isOverflowTop = rect.top < 0;
  const isOverflowBottom = innerHeight < rect.bottom;

  const top = isOverflowTop ? 0 : rect.top;
  const bottom = isOverflowBottom ? innerHeight : rect.bottom;

  return {
    isOverflow: isOverflowTop || isOverflowBottom,
    height: bottom - top
  };
};
