import * as React from 'react';
import { useCallback, useState } from 'react';
import { assert } from '../../functions/asserts/assert';
import { assertExists } from '../../functions/asserts/assertExists';
import {
  isArrowDownKey,
  isArrowUpKey,
  isEndKey,
  isEnterKey,
  isEscKey,
  isHomeKey,
  isTabKey
} from '../../functions/key';
import { IdentifiedComboboxOption } from './modules/types';

export const useComboboxState = <T extends string>(
  options: Array<IdentifiedComboboxOption<T>>,
  selectedOption: IdentifiedComboboxOption<T>,
  changeValue: (value: T) => void
): [
  React.RefObject<HTMLButtonElement>,
  boolean,
  string,
  (menuItemId: string) => void,
  boolean,
  () => void,
  React.KeyboardEventHandler<HTMLInputElement>,
  boolean,
  (isFocusedKeyDown: boolean) => void,
  string,
  (text: string) => void,
  () => void,
  Array<IdentifiedComboboxOption<T>>,
  () => void,
  (event: MouseEvent) => boolean,
  (option: IdentifiedComboboxOption<T>) => void,
  () => void,
  () => void,
  boolean
] => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popupShown, setPopupShown] = useState(false);
  // インプットにフォーカス移動が必要か管理する。
  // インプットをマウントした直後に、インプットにフォーカスされないための仕組み。
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  // インプットにフォーカスする際に、全選択が必要か管理する。
  const [shouldSelectInput, setShouldSelectInput] = useState(false);
  // Comboboxに入力されたテキストを管理する
  const [searchText, setSearchText] = useState(selectedOption.label);
  // 絞り込まれた項目のリストを管理する
  const [filteredOptions, setFilteredOptions] = useState(options);
  // ハイライトされているメニューポップアップ項目のIDを管理する
  const [highlightedMenuItemId, setHighlightedMenuItemId] = useState(
    selectedOption.id
  );
  // ListboxOptionがキーボード操作によってフォーカスされたかどうかの状態を管理する。
  // キーボード操作によるフォーカス処理とMouseEnterなどのイベントによるフォーカス処理の競合を解消するための仕組み。
  const [listboxOptionFocusedKeyDown, setListboxOptionFocusedKeydown] =
    useState(false);

  const highlightPrevItem = useCallback(() => {
    assert(highlightedMenuItemId);
    const index = findHighlightedMenuItemIndex(
      filteredOptions,
      highlightedMenuItemId
    );
    const prevIndex = index === 0 ? filteredOptions.length - 1 : index - 1;
    setHighlightedMenuItemId(filteredOptions[prevIndex].id);
  }, [highlightedMenuItemId, filteredOptions]);

  const highlightNextItem = useCallback(() => {
    assert(highlightedMenuItemId);
    const index = findHighlightedMenuItemIndex(
      filteredOptions,
      highlightedMenuItemId
    );
    const nextIndex = index === filteredOptions.length - 1 ? 0 : index + 1;
    setHighlightedMenuItemId(filteredOptions[nextIndex].id);
  }, [highlightedMenuItemId, filteredOptions]);

  const highlightFirstItem = useCallback(() => {
    setHighlightedMenuItemId(filteredOptions[0].id);
  }, [filteredOptions]);

  const highlightLastItem = useCallback(() => {
    setHighlightedMenuItemId(filteredOptions[filteredOptions.length - 1].id);
  }, [filteredOptions]);

  const clearShouldFocusInput = useCallback(() => {
    setShouldFocusInput(false);
  }, []);

  const showPopup = useCallback(() => {
    setHighlightedMenuItemId(selectedOption.id);
    setPopupShown(true);
    setShouldSelectInput(true);
  }, [selectedOption.id]);

  const hidePopup = useCallback(
    (focusToInput: boolean = false) => {
      setPopupShown(false);
      // ポップアップを閉じたときに、初期化する
      setShouldSelectInput(false);
      // ポップアップを閉じたときに、絞り込まれた項目のリストを初期化する
      setFilteredOptions(options);

      if (focusToInput) {
        // マウスでポップアップを閉じたときは、インプットにフォーカスを移動する
        setShouldFocusInput(true);
      }
    },
    [options]
  );

  const togglePopup = useCallback(
    () => (popupShown ? hidePopup() : showPopup()),
    [hidePopup, popupShown, showPopup]
  );

  const handleKeyDownInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isTabKey(e)) {
        // ListboxPopupがOpenの時はCloseする
        popupShown && hidePopup();
      }

      if (isEnterKey(e)) {
        if (!popupShown) return;
        // ActiveなListboxOptionがある場合
        if (
          isHighlightedOptionInFiltered(filteredOptions, highlightedMenuItemId)
        ) {
          const highlightedOption = findHighlightedOption(
            filteredOptions,
            highlightedMenuItemId
          );
          changeValue(highlightedOption.value);
          setSearchText(highlightedOption.label);
        }
        // ActiveなListboxOptionがない場合
        else {
          // すでに選択している項目をセットする
          // TODO: 挙動が不自然なので見直す（ActiveではないのだからEnterを押してもなにもしなくて良いのでは）
          setSearchText(selectedOption.label);
        }
        hidePopup(true);
      }

      if (isEscKey(e)) {
        e.preventDefault();
        hidePopup();
      }

      if (isArrowUpKey(e)) {
        // 表示できる項目が存在する場合のみポップアップを表示
        if (filteredOptions.length !== 0) {
          setListboxOptionFocusedKeydown(true);
          if (!popupShown) {
            showPopup();
          } else {
            // 既存の選択肢が候補に存在しない場合候補の一番下にハイライトを当てるようにする
            isHighlightedOptionInFiltered(
              filteredOptions,
              highlightedMenuItemId
            )
              ? highlightPrevItem()
              : highlightLastItem();
          }
        }
        // 画面全体がスクロールしないようにデフォルトの挙動を止める
        e.preventDefault();
      }

      if (isArrowDownKey(e)) {
        // 表示できる項目が存在する場合のみポップアップを表示
        if (filteredOptions.length !== 0) {
          setListboxOptionFocusedKeydown(true);
          if (!popupShown) {
            showPopup();
          } else {
            // 既存の選択肢が候補に存在しない場合候補の一番上のにハイライトを当てるようにする
            isHighlightedOptionInFiltered(
              filteredOptions,
              highlightedMenuItemId
            )
              ? highlightNextItem()
              : highlightFirstItem();
          }
        }
        // 画面全体がスクロールしないようにデフォルトの挙動を止める
        e.preventDefault();
      }

      if (isHomeKey(e)) {
        // 表示できる項目が存在する場合且つポップアップが表示されている場合
        if (filterOptions.length !== 0 && popupShown) {
          setListboxOptionFocusedKeydown(true);
          highlightFirstItem();
          // 画面全体がスクロールしないようにデフォルトの挙動を止める
          e.preventDefault();
        }
      }

      if (isEndKey(e)) {
        // 表示できる項目が存在する場合且つポップアップが表示されている場合
        if (filterOptions.length !== 0 && popupShown) {
          setListboxOptionFocusedKeydown(true);
          highlightLastItem();
          // 画面全体がスクロールしないようにデフォルトの挙動を止める
          e.preventDefault();
        }
      }
    },
    [
      popupShown,
      hidePopup,
      filteredOptions,
      highlightedMenuItemId,
      changeValue,
      selectedOption.label,
      showPopup,
      highlightPrevItem,
      highlightLastItem,
      highlightNextItem,
      highlightFirstItem
    ]
  );

  const handleClickInput = useCallback(() => {
    // 表示できる項目が存在する場合のみポップアップを表示
    if (filteredOptions.length !== 0) {
      togglePopup();
      // 全選択させるために、明示的にフォーカスをインプットに当てる
      setShouldFocusInput(true);
    }
  }, [filteredOptions.length, togglePopup]);

  const handleClickButton = useCallback(() => {
    // ListboxPopupをこれから閉じるとき
    if (popupShown) {
      // Searchboxの値と候補を初期化する;
      setSearchText(selectedOption.label);
      setFilteredOptions(options);
    }
    // ListboxPopupをこれから開くとき
    else {
      // ボタンでクリックした時は、明示的にフォーカスをインプットに当てる必要がある
      setShouldFocusInput(true);
    }
    togglePopup();
  }, [popupShown, togglePopup, selectedOption.label, options]);

  const handleClickOutsideMenuPopup = useCallback(() => {
    // Searchboxからフォーカスが外れると入力値と候補が初期化される
    setSearchText(selectedOption.label);
    setFilteredOptions(options);
    // 領域外クリックでListboxPopupをCloseにする時は、Searchboxにフォーカスしない
    hidePopup();
  }, [hidePopup, options, selectedOption.label]);

  const shouldNotFireClosePopup = useCallback((event: MouseEvent) => {
    if (!buttonRef.current) return false;
    return buttonRef.current.contains(event.target as Node);
  }, []);

  const handleClickMenuItem = useCallback(
    (option: IdentifiedComboboxOption<T>) => {
      changeValue(option.value);
      setSearchText(option.label);
      setHighlightedMenuItemId(option.id);
      // マウスクリックでポップアップを閉じる時は、インプットに明示的にフォーカスする必要がある
      hidePopup(true);
    },
    [changeValue, hidePopup]
  );

  const handleBlurInput = useCallback(() => {
    // ListboxOptionをクリックするとonClickがonBlurと処理がバッティングしてしまうので
    // ListboxPopupがClose状態の時のみ適用する
    if (!popupShown) {
      // Searchboxからフォーカスが外れると、入力値と候補が初期化される
      setSearchText(selectedOption.label);
      setFilteredOptions(options);
    }
  }, [options, popupShown, selectedOption.label]);

  const changeSearchText = useCallback(
    (text: string) => {
      setSearchText(text);

      const newFilteredOptions = filterOptions(options, text);
      setFilteredOptions(newFilteredOptions);

      if (newFilteredOptions.length === 0) {
        // 候補が0件ならポップアップを閉じる
        setPopupShown(false);
      } else {
        setPopupShown(true);
      }
    },
    [options]
  );

  return [
    buttonRef,
    popupShown,
    highlightedMenuItemId,
    setHighlightedMenuItemId,
    shouldFocusInput,
    clearShouldFocusInput,
    handleKeyDownInput,
    listboxOptionFocusedKeyDown,
    setListboxOptionFocusedKeydown,
    searchText,
    changeSearchText,
    handleClickInput,
    filteredOptions,
    handleClickOutsideMenuPopup,
    shouldNotFireClosePopup,
    handleClickMenuItem,
    handleBlurInput,
    handleClickButton,
    shouldSelectInput
  ];
};

// ハイライトされた項目が見つからない場合は-1を返す
const findHighlightedMenuItemIndex = <T extends string>(
  options: Array<IdentifiedComboboxOption<T>>,
  highlightedMenuItemId: string
) => {
  const index = options.findIndex(
    (option) => option.id === highlightedMenuItemId
  );
  return index;
};

const findHighlightedOption = <T extends string>(
  options: Array<IdentifiedComboboxOption<T>>,
  highlightedMenuItemId: string
) => {
  const focusedOption = options.find(
    (option) => option.id === highlightedMenuItemId
  );
  assertExists(focusedOption);
  return focusedOption;
};

// filterTextが空文字の時は、optionsをそのまま返す
const filterOptions = <T extends string>(
  options: Array<IdentifiedComboboxOption<T>>,
  filterText: string
) => {
  if (filterText.trim() !== '') {
    return options.filter((option) => {
      // 正規表現のエスケープをする必要がある
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
      const escapePattern = (string: string) => {
        return string.replace(/[.*+?^=!:${}()|[\]/\\]/g, '\\$&');
      };
      const regex = new RegExp(escapePattern(filterText), 'gi');
      return regex.test(option.label);
    });
  }
  return options;
};

const isHighlightedOptionInFiltered = <T extends string>(
  options: Array<IdentifiedComboboxOption<T>>,
  menuItemId: string
) => {
  return findHighlightedMenuItemIndex(options, menuItemId) !== -1;
};
