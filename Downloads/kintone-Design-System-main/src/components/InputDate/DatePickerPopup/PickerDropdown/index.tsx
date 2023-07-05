/**
 * @fileoverview 日付ピッカーのドロップダウン
 */
import * as React from 'react';
import styled from 'styled-components';
import { PickerDropdownButton } from './PickerDropdownButton';
import { useDropdownState } from './useDropdownState';
import { DropdownMenuPopup } from './DropdownMenuPopup';
import { assertExists } from '../../../../functions/asserts/assertExists';
import type { DropdownOption } from '../../modules/types';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  shouldNotFireClosePopup: (event: MouseEvent) => boolean;
  options: DropdownOption[];
  selectedOption: DropdownOption;
  changeValue: (value: string) => void;
  focusedValue: string;
  focusValue: (value: string) => void;
  shouldFocusButton: boolean;
  clearShouldFocusButton: () => void;
  onKeyDownButton: React.KeyboardEventHandler<HTMLButtonElement>;
  onKeyDownMenuItem: React.KeyboardEventHandler<HTMLLIElement>;
  popupShown: boolean;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
  togglePopup: () => void;
  hidePopup: () => void;
  width?: number;
  'data-testid'?: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonRef,
  options,
  selectedOption,
  changeValue,
  focusedValue,
  focusValue,
  shouldFocusButton,
  clearShouldFocusButton,
  onKeyDownButton,
  onKeyDownMenuItem,
  popupShown,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeyDown,
  togglePopup,
  hidePopup,
  shouldNotFireClosePopup,
  'data-testid': dataTestId
}) => (
  <div className={className} data-testid={dataTestId}>
    <PickerDropdownButton
      buttonRef={buttonRef}
      selectedOption={selectedOption}
      popupShown={popupShown}
      togglePopup={togglePopup}
      onKeyDown={onKeyDownButton}
      shouldFocusButton={shouldFocusButton}
      clearShouldFocusButton={clearShouldFocusButton}
    />
    {popupShown && (
      <DropdownMenuPopup
        options={options}
        selectedValue={selectedOption.value}
        changeValue={changeValue}
        focusedValue={focusedValue}
        focusValue={focusValue}
        onKeyDownMenuItem={onKeyDownMenuItem}
        hidePopup={hidePopup}
        listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
        setListboxOptionFocusedKeyDown={setListboxOptionFocusedKeyDown}
        shouldNotFireClosePopup={shouldNotFireClosePopup}
      />
    )}
  </div>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  position: relative;
  display: inline-block;
`;

type OuterProps = {
  options: DropdownOption[];
  value: string;
  changeValue: (value: string) => void;
  'data-testid'?: string;
};

const getSelectedOption = (options: DropdownOption[], value: string) => {
  const selectedOption = options.find((option) => option.value === value);
  assertExists(selectedOption);
  return selectedOption;
};

const Container: React.VFC<OuterProps> = ({
  options,
  value,
  changeValue,
  'data-testid': dataTestId
}) => {
  const selectedOption = getSelectedOption(options, value);

  const [
    buttonRef,
    shouldNotFireClosePopup,
    popupShown,
    hidePopup,
    togglePopup,
    focusedValue,
    focusValue,
    shouldFocusButton,
    clearShouldFocusButton,
    handleKeyDownButton,
    handleKeyDownMenuItem,
    listboxOptionFocusedKeyDown,
    setListboxOptionFocusedKeyDown
  ] = useDropdownState(options, selectedOption, changeValue);

  return (
    <StyledComponent
      buttonRef={buttonRef}
      options={options}
      selectedOption={selectedOption}
      focusedValue={focusedValue}
      focusValue={focusValue}
      changeValue={changeValue}
      shouldFocusButton={shouldFocusButton}
      clearShouldFocusButton={clearShouldFocusButton}
      onKeyDownButton={handleKeyDownButton}
      onKeyDownMenuItem={handleKeyDownMenuItem}
      popupShown={popupShown}
      listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
      setListboxOptionFocusedKeyDown={setListboxOptionFocusedKeyDown}
      togglePopup={togglePopup}
      hidePopup={hidePopup}
      shouldNotFireClosePopup={shouldNotFireClosePopup}
      data-testid={dataTestId}
    />
  );
};

export const PickerDropdown = Container;
