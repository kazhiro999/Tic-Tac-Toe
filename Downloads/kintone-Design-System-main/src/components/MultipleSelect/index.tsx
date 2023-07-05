import clsx from 'clsx';
import * as React from 'react';
import styled from 'styled-components';
import { assert } from '../../functions/asserts/assert';
import {
  IdentifiedMultipleSelectOption,
  MULTIPLE_SELECT_ITEM_HEIGHT_FOR_CSS_CALC,
  MultipleSelectItem
} from './MultipleSelectItem';
import { useMultipleSelectState } from './useMultipleSelectState';
import { useComponentId } from '../../hooks/useComponentId';
import { MultipleSelectOption } from './modules/types';
import { designTokens } from '../../designTokens';
import { useRef } from 'react';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  options: IdentifiedMultipleSelectOption[];
  values: string[];
  toggleValue: (value: string) => void;
  focused: boolean;
  setFocused: (focused: boolean) => void;
  highlightedItemId: string | null;
  setHighlightedItemId: (id: string | null) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLUListElement>;
  disabled: boolean;
  'aria-labelledby'?: string;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeydown: (isFocusedKeyDown: boolean) => void;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  options,
  values,
  toggleValue,
  focused,
  setFocused,
  highlightedItemId,
  setHighlightedItemId,
  onKeyDown,
  disabled,
  'aria-labelledby': ariaLabelledBy,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeydown
}) => {
  assert(options.length > 0);
  const popupElRef = useRef(null);

  const firstItemId = options[0].id;

  const handleFocus = () => {
    // 複数選択がフォーカスされていない状態で項目をクリックすると、クリックした項目からハイライトが外れて先頭の項目がハイライトされてしまう。
    // それを防ぐため、項目がハイライトされていない場合にのみ先頭の項目にハイライトする。
    if (highlightedItemId === null) {
      setHighlightedItemId(firstItemId);
    }
    setFocused(true);
  };

  const handleBlur = () => {
    setHighlightedItemId(null);
    setFocused(false);
  };

  // ハイライトされている項目がない場合は指定しない。
  const ariaActivedescendant =
    highlightedItemId !== null ? highlightedItemId : undefined;

  return (
    // 選択が無効になっているときは tabindex も aria-activedescendant も付与されない。eslint がそこまで推測してくれないので disable-next-lint を付けている。。
    // eslint-disable-next-line jsx-a11y/aria-activedescendant-has-tabindex
    <ul
      ref={popupElRef}
      className={clsx(className, { [`${className}__disabled`]: disabled })}
      role="listbox"
      tabIndex={!disabled ? 0 : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={!disabled ? onKeyDown : undefined}
      aria-labelledby={ariaLabelledBy}
      aria-activedescendant={ariaActivedescendant}
      aria-disabled={disabled}
      aria-multiselectable
    >
      {options.map((option) => (
        <MultipleSelectItem
          popupElRef={popupElRef}
          key={`${option.value}`}
          {...option}
          selected={values.includes(option.value)}
          onClick={() => toggleValue(option.value)}
          focused={focused}
          highlighted={option.id === highlightedItemId}
          setHighlightedItemId={setHighlightedItemId}
          disabled={disabled}
          listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
          setListboxOptionFocusedKeydown={setListboxOptionFocusedKeydown}
        />
      ))}
    </ul>
  );
};

export const BORDER_SIZE_PX = 1;

const MAX_SHOWN_ITEM_COUNT = 5;

const StyledComponent: React.VFC<Props> = styled(Component)`
  box-shadow: 1px 1px 12px ${designTokens.colors.wildSand} inset,
    -1px -1px 12px ${designTokens.colors.wildSand} inset;
  max-height: calc(
    (${MULTIPLE_SELECT_ITEM_HEIGHT_FOR_CSS_CALC} * ${MAX_SHOWN_ITEM_COUNT})
  );
  width: 100%;
  min-width: 100px;
  padding: 6px 0;
  border: ${BORDER_SIZE_PX}px solid ${designTokens.colors.porcelain};
  background-color: ${designTokens.colors.snow};
  overflow-y: auto;
  list-style: none;
  margin: 0;

  &__disabled {
    background-color: ${designTokens.colors.iron};
    box-shadow: none;
    cursor: not-allowed;
  }
`;

type OuterProps = {
  options: MultipleSelectOption[];
  values: string[];
  changeValues: (values: string[]) => void;
  disabled?: boolean;
  'aria-labelledby'?: string;
};

const Container: React.VFC<OuterProps> = ({
  options,
  values,
  changeValues,
  disabled = false,
  'aria-labelledby': ariaLabelledBy
}) => {
  const toggleValue = (value: string) => {
    if (!values.includes(value)) {
      changeValues([...values, value]);
    } else {
      changeValues(values.filter((selectedValue) => selectedValue !== value));
    }
  };

  const id = useComponentId();
  const optionsWithId = options.map((option, index) => ({
    id: `${id}-MultipleSelectItem-${index}`,
    ...option
  }));

  const [
    focused,
    setFocused,
    highlightedItemId,
    setHighlightedItemId,
    onKeyDown,
    listboxOptionFocusedKeyDown,
    setListboxOptionFocusedKeydown
  ] = useMultipleSelectState(optionsWithId, toggleValue);

  return (
    <StyledComponent
      options={optionsWithId}
      values={values}
      toggleValue={toggleValue}
      focused={focused}
      setFocused={setFocused}
      highlightedItemId={highlightedItemId}
      setHighlightedItemId={setHighlightedItemId}
      onKeyDown={onKeyDown}
      disabled={disabled}
      aria-labelledby={ariaLabelledBy}
      listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
      setListboxOptionFocusedKeydown={setListboxOptionFocusedKeydown}
    />
  );
};

export type MultipleSelectProps = OuterProps;
export const MultipleSelect = Container;
