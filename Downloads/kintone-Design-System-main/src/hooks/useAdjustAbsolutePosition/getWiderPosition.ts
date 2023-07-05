import { getWindowInnerHeight } from '../../functions/window/getWindowInnerHeight';
import { getWindowInnerWidth } from '../../functions/window/getWindowInnerWidth';
import { type Placement } from '../../models/placement';

/**
 * 特定の位置を基準にした場合に、画面上で左上・右上・左下・右下のうちどれが広いかを判別する
 */
export const getWiderPosition = (x: number, y: number): Placement => {
  const isLeftWider = x > getWindowInnerWidth() / 2;
  const isUpperWider = y > getWindowInnerHeight() / 2;
  if (isUpperWider) {
    return isLeftWider ? 'top-end' : 'top-start';
    // eslint-disable-next-line no-else-return
  } else {
    return isLeftWider ? 'bottom-end' : 'bottom-start';
  }
};
