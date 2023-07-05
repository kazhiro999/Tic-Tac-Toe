import React, { useEffect } from 'react';

export const useButtonWithFocusControl = (
  ref: React.RefObject<HTMLButtonElement>,
  popupShown: boolean,
  shouldFocusButton: boolean
) => {
  // ポップアップを開いているときはポップアップの項目にフォーカスが移動するため、
  // ボタンにフォーカス可能なのは、ポップアップが閉じているときだけ
  const focusable = !popupShown;

  useEffect(() => {
    // フォーカス可能でかつフォーカスが必要なときだけフォーカス実行する。
    // shouldFocusButtonの条件は、ドロップダウンのマウント時にフォーカスされるのを防ぐため。
    if (ref.current && focusable && shouldFocusButton) {
      ref.current.focus();
    }
  }, [ref, focusable, shouldFocusButton]);

  return focusable;
};
