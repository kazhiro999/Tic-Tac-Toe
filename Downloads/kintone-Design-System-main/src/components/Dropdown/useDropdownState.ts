import React, { useCallback, useRef, useState } from 'react';
import { assert } from '../../functions/asserts/assert';
import { assertExists } from '../../functions/asserts/assertExists';
import {
  isArrowDownKey,
  isArrowUpKey,
  isHomeKey,
  isEndKey,
  isEnterKey,
  isEscKey,
  isTabKey
} from '../../functions/key';
import { IdentifiedDropdownOption } from './modules/types';

export const useDropdownState = <T extends string>(
  options: Array<IdentifiedDropdownOption<T>>,
  selectedOption: IdentifiedDropdownOption<T>,
  changeValue: (value: T) => void
): [
  React.RefObject<HTMLButtonElement>,
  (event: MouseEvent) => boolean,
  boolean,
  () => void,
  () => void,
  string,
  (menuItemId: string) => void,
  boolean,
  () => void,
  React.KeyboardEventHandler<HTMLButtonElement>,
  React.KeyboardEventHandler<HTMLLIElement>,
  boolean,
  (isFocusedKeyDown: boolean) => void
] => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupShown, setPopupShown] = useState(false);
  // ドロップダウンボタンにフォーカス移動が必要か管理する。
  // ドロップダウンをマウントした直後に、ボタンにフォーカスされないための仕組み。
  const [shouldFocusButton, setShouldFocusButton] = useState(false);

  // フォーカスされているメニューポップアップ項目のID
  const [focusedMenuItemId, setFocusedMenuItemId] = useState(selectedOption.id);

  // ListboxOptionがキーボード操作によってフォーカスされたかどうかの状態を管理する。
  // キーボード操作によるフォーカス処理とMouseEnterなどのイベントによるフォーカス処理の競合を解消するための仕組み。
  const [listboxOptionFocusedKeyDown, setListboxOptionFocusedKeydown] =
    useState(false);

  const shouldNotFireClosePopup = useCallback((event: MouseEvent) => {
    if (!buttonRef.current) return false;
    return buttonRef.current.contains(event.target as Node);
  }, []);

  const focusPrevItem = useCallback(() => {
    const index = findFocusedMenuItemIndex(options, focusedMenuItemId);
    const prevIndex = index === 0 ? options.length - 1 : index - 1;
    setFocusedMenuItemId(options[prevIndex].id);
  }, [focusedMenuItemId, options]);

  const focusNextItem = useCallback(() => {
    const index = findFocusedMenuItemIndex(options, focusedMenuItemId);
    const nextIndex = index === options.length - 1 ? 0 : index + 1;
    setFocusedMenuItemId(options[nextIndex].id);
  }, [focusedMenuItemId, options]);

  const focusFirstItem = useCallback(() => {
    setFocusedMenuItemId(options[0].id);
  }, [options]);

  const focusLastItem = useCallback(() => {
    setFocusedMenuItemId(options[options.length - 1].id);
  }, [options]);

  const clearShouldFocusButton = useCallback(() => {
    setShouldFocusButton(false);
  }, []);

  const showPopup = useCallback(() => {
    // ポップアップ表示直後は、選択済みのメニュー項目がフォーカスされる
    setFocusedMenuItemId(selectedOption.id);
    setPopupShown(true);
  }, [selectedOption.id]);

  const hidePopup = useCallback((focusToButton: boolean = true) => {
    setPopupShown(false);
    if (focusToButton) {
      // マウスやキー操作でポップアップを閉じたときは、ボタンにフォーカスを移動する
      setShouldFocusButton(true);
    }
  }, []);

  const togglePopup = useCallback(
    () => (popupShown ? hidePopup() : showPopup()),
    [hidePopup, popupShown, showPopup]
  );

  const handleKeyDownButton = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // ポップアップは非表示のはず
      assert(!popupShown);

      if (isArrowUpKey(e) || isArrowDownKey(e)) {
        showPopup();
        e.preventDefault();
      }
    },
    [popupShown, showPopup]
  );

  const handleKeyDownMenuItem = useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>) => {
      // ポップアップは表示されているはず
      assert(popupShown);

      if (isArrowUpKey(e)) {
        setListboxOptionFocusedKeydown(true);
        focusPrevItem();
        e.preventDefault();
      }

      if (isArrowDownKey(e)) {
        setListboxOptionFocusedKeydown(true);
        focusNextItem();
        e.preventDefault();
      }

      if (isTabKey(e)) {
        // タブキーの場合はフォーカスをボタンに戻さない
        hidePopup(false);
      }

      if (isEscKey(e)) {
        e.preventDefault();
        hidePopup();
      }

      if (isEnterKey(e)) {
        const focusedOption = findFocusedOption(options, focusedMenuItemId);
        changeValue(focusedOption.value);
        hidePopup();
      }

      if (isHomeKey(e)) {
        setListboxOptionFocusedKeydown(true);
        e.preventDefault();
        focusFirstItem();
      }

      if (isEndKey(e)) {
        setListboxOptionFocusedKeydown(true);
        e.preventDefault();
        focusLastItem();
      }
    },
    [
      popupShown,
      focusPrevItem,
      focusNextItem,
      hidePopup,
      options,
      focusedMenuItemId,
      changeValue,
      focusFirstItem,
      focusLastItem
    ]
  );

  return [
    buttonRef,
    shouldNotFireClosePopup,
    popupShown,
    hidePopup,
    togglePopup,
    focusedMenuItemId,
    setFocusedMenuItemId,
    shouldFocusButton,
    clearShouldFocusButton,
    handleKeyDownButton,
    handleKeyDownMenuItem,
    listboxOptionFocusedKeyDown,
    setListboxOptionFocusedKeydown
  ];
};

const findFocusedMenuItemIndex = <T extends string>(
  options: Array<IdentifiedDropdownOption<T>>,
  focusedMenuItemId: string
) => {
  const index = options.findIndex((option) => option.id === focusedMenuItemId);
  assert(index !== -1);
  return index;
};

const findFocusedOption = <T extends string>(
  options: Array<IdentifiedDropdownOption<T>>,
  focusedMenuItemId: string
) => {
  const focusedOption = options.find(
    (option) => option.id === focusedMenuItemId
  );
  assertExists(focusedOption);
  return focusedOption;
};
