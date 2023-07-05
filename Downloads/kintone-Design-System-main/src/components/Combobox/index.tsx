/**
 * @fileoverview 新デザインのドロップダウンコンポーネント
 */
import * as React from 'react';
import { AriaAttributes } from 'react';
import styled from 'styled-components';
import { ComboboxMenuPopup } from './ComboboxMenuPopup';
import { useComboboxState } from './useComboboxState';
import { useComponentId } from '../../hooks/useComponentId';
import { ComboboxOption, IdentifiedComboboxOption } from './modules/types';
import {
  createIdentifiedOptions,
  getSelectedOption
} from './modules/functions';
import { SearchBox } from './SearchBox';
import { designTokens } from '../../designTokens';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props<T extends string> = {
  options: Array<IdentifiedComboboxOption<T>>;
  menuPopupId: string;
  selectedOption: IdentifiedComboboxOption<T>;
  searchText: string;
  changeSearchText: (value: string) => void;
  highlightedMenuItemId: string;
  highlightMenuItemId: (menuItemId: string) => void;
  shouldFocusInput: boolean;
  clearShouldFocusInput: () => void;
  onKeyDownInput: React.KeyboardEventHandler<HTMLInputElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  popupShown: boolean;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
  width?: number;
  onClickInput: React.MouseEventHandler<HTMLInputElement>;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickOutsideMenuPopup: () => void;
  shouldNotFireClosePopup: (event: MouseEvent) => boolean;
  onBlurInput: React.FocusEventHandler<HTMLInputElement>;
  onClickMenuItem: (option: IdentifiedComboboxOption<T>) => void;
  shouldSelectInput: boolean;
  arrowDownButtonLabel: string;
} & Pick<AriaAttributes, 'aria-labelledby' | 'aria-required'> &
  PropsForDataTestId;

const Component = <T extends string>({
  className,
  'data-testid': dataTestId,
  options,
  menuPopupId,
  selectedOption,
  searchText,
  changeSearchText,
  highlightedMenuItemId,
  highlightMenuItemId,
  shouldFocusInput,
  clearShouldFocusInput,
  onKeyDownInput,
  buttonRef,
  popupShown,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeyDown,
  onClickInput,
  onClickButton,
  onClickOutsideMenuPopup,
  shouldNotFireClosePopup,
  onBlurInput,
  onClickMenuItem,
  shouldSelectInput,
  'aria-labelledby': ariaLabelledby,
  'aria-required': ariaRequired,
  arrowDownButtonLabel
}: Props<T> & PropsForStyled) => {
  return (
    <div className={className} data-testid={dataTestId}>
      <SearchBox
        menuPopupId={menuPopupId}
        onClickInput={onClickInput}
        onClickButton={onClickButton}
        searchText={searchText}
        shouldFocusInput={shouldFocusInput}
        clearShouldFocusInput={clearShouldFocusInput}
        changeSearchText={changeSearchText}
        onKeyDownInput={onKeyDownInput}
        onBlurInput={onBlurInput}
        buttonRef={buttonRef}
        popupShown={popupShown}
        highlightedMenuItemId={highlightedMenuItemId}
        shouldSelectInput={shouldSelectInput}
        aria-labelledby={ariaLabelledby}
        aria-required={ariaRequired}
        arrowDownButtonLabel={arrowDownButtonLabel}
      />
      {popupShown && (
        <ComboboxMenuPopup
          id={menuPopupId}
          options={options}
          selectedValue={selectedOption.value}
          highlightedMenuItemId={highlightedMenuItemId}
          highlightMenuItemId={highlightMenuItemId}
          onClickMenuItem={onClickMenuItem}
          onClickOutsideMenuPopup={onClickOutsideMenuPopup}
          listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
          setListboxOptionFocusedKeyDown={setListboxOptionFocusedKeyDown}
          shouldNotFireClosePopup={shouldNotFireClosePopup}
        />
      )}
    </div>
  );
};

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  position: relative;
  display: inline-block;
  width: ${({ width }) => (width !== undefined ? `${width}px` : '168px')};
  height: min-content;

  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }

  color: ${designTokens.colors.mineShaft};
  font-size: ${designTokens.fonts.size[5]};
  line-height: 1.5;
`;

type OuterProps<T extends string> = {
  options: Array<ComboboxOption<T>>;
  value: T;
  changeValue: (value: T) => void;
  width?: number;
  arrowDownButtonLabel: string;
} & Pick<AriaAttributes, 'aria-labelledby' | 'aria-required'> &
  PropsForDataTestId;

export type ComboboxProps<T extends string> = OuterProps<T>;

const Container = <T extends string>({
  'data-testid': dataTestId,
  options,
  value,
  changeValue,
  width,
  'aria-labelledby': ariaLabelledby,
  'aria-required': ariaRequired,
  arrowDownButtonLabel
}: OuterProps<T>): JSX.Element => {
  const id = useComponentId();
  const identifiedOptions = createIdentifiedOptions(options, id);
  const selectedOption = getSelectedOption(identifiedOptions, value);
  const menuPopupId = `${id}-menuPopup`;

  const [
    buttonRef,
    popupShown,
    highlightedMenuItemId,
    highlightMenuItemId,
    shouldFocusInput,
    clearShouldFocusInput,
    handleKeyDownInput,
    listboxOptionFocusedKeyDown,
    setListboxOptionFocusedKeyDown,
    searchText,
    changeSearchTest,
    onClickInput,
    filteredOptions,
    onClickOutsideMenuPopup,
    shouldNotFireClosePopup,
    onClickMenuItem,
    onBlurInput,
    onClickButton,
    shouldSelectInput
  ] = useComboboxState(identifiedOptions, selectedOption, changeValue);

  return (
    <StyledComponent
      data-testid={dataTestId}
      menuPopupId={menuPopupId}
      options={filteredOptions}
      selectedOption={selectedOption}
      highlightedMenuItemId={highlightedMenuItemId}
      highlightMenuItemId={highlightMenuItemId}
      searchText={searchText}
      changeSearchText={changeSearchTest}
      shouldFocusInput={shouldFocusInput}
      clearShouldFocusInput={clearShouldFocusInput}
      onKeyDownInput={handleKeyDownInput}
      buttonRef={buttonRef}
      popupShown={popupShown}
      listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
      setListboxOptionFocusedKeyDown={setListboxOptionFocusedKeyDown}
      onClickInput={onClickInput}
      onClickButton={onClickButton}
      aria-labelledby={ariaLabelledby}
      width={width}
      aria-required={ariaRequired}
      onClickOutsideMenuPopup={onClickOutsideMenuPopup}
      shouldNotFireClosePopup={shouldNotFireClosePopup}
      onBlurInput={onBlurInput}
      onClickMenuItem={onClickMenuItem}
      shouldSelectInput={shouldSelectInput}
      arrowDownButtonLabel={arrowDownButtonLabel}
    />
  );
};

export const Combobox = Container;
