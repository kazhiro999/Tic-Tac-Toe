import { useCallback, useState } from 'react';
import * as React from 'react';
import { assert } from '../../functions/asserts/assert';
import { assertExists } from '../../functions/asserts/assertExists';
import {
  isArrowDownKey,
  isArrowUpKey,
  isSpaceKey,
  isEndKey,
  isHomeKey
} from '../../functions/key';
import { IdentifiedMultipleSelectOption } from './MultipleSelectItem';

export const useMultipleSelectState = (
  options: IdentifiedMultipleSelectOption[],
  toggleValue: (string: string) => void
): [
  boolean,
  (focused: boolean) => void,
  string | null,
  (itemId: string | null) => void,
  React.KeyboardEventHandler<HTMLUListElement>,
  boolean,
  (isFocusedKeyDown: boolean) => void
] => {
  const [focused, setFocused] = useState(false);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(
    null
  );
  // ListboxOptionがキーボード操作によってフォーカスされたかどうかの状態を管理する。
  // キーボード操作によるフォーカス処理とMouseEnterなどのイベントによるフォーカス処理の競合を解消するための仕組み。
  const [listboxOptionFocusedKeyDown, setListboxOptionFocusedKeydown] =
    useState(false);

  const firstIndex = 0;
  const lastIndex = options.length - 1;

  // 次の項目をハイライトする
  const highlightNextItem = useCallback(() => {
    assertExists(highlightedItemId);
    const index = findHighlightedItemIndex(options, highlightedItemId);
    const nextIndex = index === firstIndex ? lastIndex : index - 1;
    setHighlightedItemId(options[nextIndex].id);
  }, [highlightedItemId, lastIndex, options]);

  // 前の項目をハイライトする
  const highlightPrevItem = useCallback(() => {
    assertExists(highlightedItemId);
    const index = findHighlightedItemIndex(options, highlightedItemId);
    const prevIndex = index === lastIndex ? firstIndex : index + 1;
    setHighlightedItemId(options[prevIndex].id);
  }, [highlightedItemId, lastIndex, options]);

  // 最初の項目をハイライトする
  const highlightFirstItem = useCallback(() => {
    setHighlightedItemId(options[0].id);
  }, [options]);

  // 最後の項目をハイライトする
  const highlightLastItem = useCallback(() => {
    setHighlightedItemId(options[options.length - 1].id);
  }, [options]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (isArrowUpKey(e)) {
        setListboxOptionFocusedKeydown(true);
        highlightNextItem();
        e.preventDefault();
      }

      if (isArrowDownKey(e)) {
        setListboxOptionFocusedKeydown(true);
        highlightPrevItem();
        e.preventDefault();
      }

      if (isSpaceKey(e)) {
        assertExists(highlightedItemId);
        const highlightedOption = findHighlightedOption(
          options,
          highlightedItemId
        );
        toggleValue(highlightedOption.value);
      }

      if (isEndKey(e)) {
        setListboxOptionFocusedKeydown(true);
        highlightLastItem();
        e.preventDefault();
      }

      if (isHomeKey(e)) {
        setListboxOptionFocusedKeydown(true);
        highlightFirstItem();
        e.preventDefault();
      }
    },
    [
      highlightNextItem,
      highlightPrevItem,
      highlightedItemId,
      options,
      toggleValue,
      highlightFirstItem,
      highlightLastItem
    ]
  );

  return [
    focused,
    setFocused,
    highlightedItemId,
    setHighlightedItemId,
    handleKeyDown,
    listboxOptionFocusedKeyDown,
    setListboxOptionFocusedKeydown
  ];
};

const findHighlightedItemIndex = (
  options: IdentifiedMultipleSelectOption[],
  highlightedItemId: string
) => {
  const index = options.findIndex((option) => option.id === highlightedItemId);
  assert(index !== -1);
  return index;
};

const findHighlightedOption = (
  options: IdentifiedMultipleSelectOption[],
  highlightedItemId: string
) => {
  const highlightedOption = options.find(
    (option) => option.id === highlightedItemId
  );
  assertExists(highlightedOption);
  return highlightedOption;
};
