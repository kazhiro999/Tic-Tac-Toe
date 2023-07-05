import React, { useEffect } from 'react';
import { isDropdownButtonFocusable } from './modules/functions';

export const useButtonWithFocusControl = (
  ref: React.RefObject<HTMLButtonElement>,
  popupShown: boolean,
  shouldFocusButton: boolean,
  disabled?: boolean
) => {
  const focusable = isDropdownButtonFocusable(popupShown, disabled);

  useEffect(() => {
    // フォーカス可能でかつフォーカスが必要なときだけフォーカス実行する。
    // shouldFocusButtonの条件は、ドロップダウンのマウント時にフォーカスされるのを防ぐため。
    if (ref.current && focusable && shouldFocusButton) {
      ref.current.focus();
    }
  }, [ref, focusable, shouldFocusButton]);

  return focusable;
};
