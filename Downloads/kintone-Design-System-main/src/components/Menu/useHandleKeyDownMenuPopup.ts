import React, { useCallback } from 'react';
import {
  isArrowDownKey,
  isArrowUpKey,
  isHomeKey,
  isEscKey,
  isTabKey,
  isEndKey
} from '../../functions/key';
import { useFocusContext } from './context/useFocusContext';
import { useMenuPopupContext } from './context/useMenuPopupContext';

/**
 * メニューポップアップで以下のキー操作やフォーカス移動を実現するためのカスタムhooks
 * - その状態で上下矢印キーを押したら、メニューポップアップの最初/最後のメニュー項目にフォーカスが移動
 * - メニュー項目上で上下キーを押すと、前後のメニュー項目に移動
 * - メニュー項目上でEscキーを押すと、メニューポップアップを閉じて、メニューボタンにフォーカスが移動
 * - メニュー項目上でTabキーを押すと、メニューポップアップを閉じて、メニューボタンの前後にフォーカスが移動
 * - メニュー項目上でHomeキーを押すと、最初のメニュー項目に移動
 * - メニュー項目上でEndキーを押すと、最後のメニュー項目に移動
 * 関連: src/hooks/useHandleKeyDownMenuButton.ts
 */
export const useHandleKeyDownMenuPopup = () => {
  const { focusPrev, focusNext, restoreFocus, focusFirst, focusLast } =
    useFocusContext();
  const { closeMenu } = useMenuPopupContext();

  return useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      // Escキーが押されたら、ポップアップを閉じて、元の要素にフォーカスを移動する
      if (isEscKey(e)) {
        e.preventDefault(); // Safariの画面最大化を実行しないようにイベントを止める
        restoreFocus();
        closeMenu();
      }

      // Tabキーが押されたら、ポップアップを閉じて、元の要素の前後に移動する
      if (isTabKey(e)) {
        closeMenu();
      }

      // 下矢印キーが押されたら、次のフォーカス対象のindexに移動
      if (isArrowDownKey(e)) {
        e.preventDefault();
        focusNext();
      }

      // 上矢印キーが押されたら、前のフォーカス対象のindexに移動
      if (isArrowUpKey(e)) {
        e.preventDefault();
        focusPrev();
      }

      if (isHomeKey(e)) {
        e.preventDefault();
        focusFirst();
      }

      if (isEndKey(e)) {
        e.preventDefault();
        focusLast();
      }
    },
    [closeMenu, focusFirst, focusLast, focusNext, focusPrev, restoreFocus]
  );
};
