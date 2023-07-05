import React, { useCallback } from 'react';
import {
  isArrowDownKey,
  isArrowUpKey,
  isEscKey,
  isTabKey
} from '../../functions/key';
import { useFocusContext } from './context/useFocusContext';
import { useMenuPopupContext } from './context/useMenuPopupContext';

const delay = (ms: number = 10) => new Promise((r) => setTimeout(r, ms));

/**
 * メニューボタンで以下のキーボード操作による挙動を実現するためのカスタムhooks
 * - メニューボタンで上下矢印キーを押すと、メニューポップアップの最初/最後のメニュー項目にフォーカスが移動
 * - メニューボタンでEscキーを押すと、メニューポップアップを閉じる
 * - メニューボタンでTabキーを押すと、メニューポップアップを閉じて、メニューボタンの前後にフォーカスが移動
 * 関連: src/components/MenuPopup/useHandleKeyDownMenuPopup.ts
 */
export const useHandleKeyDownMenuButton = () => {
  const { focusFirst, focusLast } = useFocusContext();
  const { openMenu, closeMenu } = useMenuPopupContext();

  return useCallback(
    async (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // メニューボタンでEscキーを押したらメニューポップアップを閉じる
      if (isEscKey(e)) {
        e.preventDefault(); // Safariの画面最大化を実行しないようにイベントを止める
        closeMenu();
      }

      // メニューボタンでTabキーを押したら、メニューポップアップを閉じる
      if (isTabKey(e)) {
        closeMenu();
      }

      // 下矢印キーが押されたら、メニューポップアップの最初の要素にフォーカスを移動
      if (isArrowDownKey(e)) {
        e.preventDefault();
        openMenu();
        await delay();
        focusFirst();
      }

      // 上矢印キーが押されたら、メニューポップアップの最後の要素にフォーカスを移動
      if (isArrowUpKey(e)) {
        e.preventDefault();
        openMenu();
        await delay();
        focusLast();
      }
    },
    [closeMenu, focusFirst, focusLast, openMenu]
  );
};
