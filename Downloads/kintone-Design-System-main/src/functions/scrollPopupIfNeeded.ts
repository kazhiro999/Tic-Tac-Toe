/**
 * 指定した項目が表示される位置にポップアップをスクロールする。
 */
export const scrollPopupIfNeeded = (
  popupEl: HTMLElement,
  itemEl: HTMLElement,
  offsetPx: number
) => {
  const popupClientRect = popupEl.getBoundingClientRect();
  const itemClientRect = itemEl.getBoundingClientRect();

  // 選択済みの項目の上側が、ポップアップのスクロール位置により見えないとき
  if (itemClientRect.top < popupClientRect.top + offsetPx) {
    // はみ出した項目がすべて見える位置まで、ポップアップを上にスクロールする
    popupEl.scrollTop -= popupClientRect.top + offsetPx - itemClientRect.top;
  }

  // 選択済みの項目の下側が、ポップアップのスクロール位置により見えないとき
  if (popupClientRect.bottom - offsetPx < itemClientRect.bottom) {
    // はみ出した項目がすべて見える位置まで、ポップアップを下にスクロールする
    popupEl.scrollTop +=
      itemClientRect.bottom - (popupClientRect.bottom - offsetPx);
  }
};
