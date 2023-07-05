/**
 * @fileoverview 新デザインのドロップダウンコンポーネント
 */
import React, { useEffect, AriaAttributes } from 'react';
import styled from 'styled-components';
import { DropdownButton } from './DropdownButton';
import { DropdownMenuPopup } from './DropdownMenuPopup';
import { useDropdownState } from './useDropdownState';
import { useComponentId } from '../../hooks/useComponentId';
import { DropdownOption, IdentifiedDropdownOption } from './modules/types';
import {
  createIdentifiedOptions,
  getSelectedOption,
  getWidth
} from './modules/functions';
import { type Placement } from '../../models/placement';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props<T extends string> = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  options: Array<IdentifiedDropdownOption<T>>;
  selectedOption: IdentifiedDropdownOption<T>;
  dropdownButtonMenuItemId: string;
  changeValue: (value: T) => void;
  focusedMenuItemId: string;
  focusMenuItemId: (menuItemId: string) => void;
  shouldFocusButton: boolean;
  clearShouldFocusButton: () => void;
  onKeyDownButton: React.KeyboardEventHandler<HTMLButtonElement>;
  onKeyDownMenuItem: React.KeyboardEventHandler<HTMLLIElement>;
  popupShown: boolean;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
  togglePopup: () => void;
  hidePopup: () => void;
  shouldNotFireClosePopup: (event: MouseEvent) => boolean;
  disabled: boolean;
  width?: number | '100%';
  maxWidth?: number | '100%';
  isMenuPopupSameWidth?: boolean;
  valid?: boolean;
  dropdownTitle?: string;
  placement?: Placement;
  // @deprecated inputのheightを統一する際に、既存UIに影響させないための暫定フラグ(see:https://github.com/kintone-private/kintone-Design-System/issues/1073)
  isLegacyHeight?: boolean;
} & Pick<AriaAttributes, 'aria-labelledby' | 'aria-required'> &
  PropsForDataTestId;

const Component = <T extends string>({
  className,
  buttonRef,
  'data-testid': dataTestId,
  options,
  selectedOption,
  dropdownButtonMenuItemId,
  changeValue,
  focusedMenuItemId,
  focusMenuItemId,
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
  disabled,
  width,
  maxWidth,
  isMenuPopupSameWidth,
  valid,
  dropdownTitle,
  placement,
  'aria-labelledby': ariaLabelledby,
  'aria-required': ariaRequired,
  isLegacyHeight
}: Props<T> & PropsForStyled) => (
  <div className={className} data-testid={dataTestId}>
    <DropdownButton
      buttonRef={buttonRef}
      selectedOption={selectedOption}
      dropdownButtonMenuItemId={dropdownButtonMenuItemId}
      popupShown={popupShown}
      togglePopup={togglePopup}
      onKeyDown={onKeyDownButton}
      shouldFocusButton={shouldFocusButton}
      clearShouldFocusButton={clearShouldFocusButton}
      disabled={disabled}
      aria-labelledby={ariaLabelledby}
      valid={valid}
      title={dropdownTitle}
      isLegacyHeight={isLegacyHeight}
    />
    {popupShown && (
      <DropdownMenuPopup
        options={options}
        selectedValue={selectedOption.value}
        changeValue={changeValue}
        focusedMenuItemId={focusedMenuItemId}
        focusMenuItemId={focusMenuItemId}
        onKeyDownMenuItem={onKeyDownMenuItem}
        hidePopup={hidePopup}
        listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
        setListboxOptionFocusedKeyDown={setListboxOptionFocusedKeyDown}
        shouldNotFireClosePopup={shouldNotFireClosePopup}
        aria-required={ariaRequired}
        isMenuPopupSameWidth={isMenuPopupSameWidth}
        width={width}
        maxWidth={maxWidth}
        placement={placement}
      />
    )}
  </div>
);

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  position: relative;
  display: inline-block;
  width: ${({ width }) => (width !== undefined ? getWidth(width) : 'auto')};
  max-width: ${({ maxWidth }) =>
    maxWidth !== undefined ? getWidth(maxWidth) : 'unset'};
  height: min-content;
`;

type OuterProps<T extends string> = {
  options: Array<DropdownOption<T>>;
  value: T;
  changeValue: (value: T) => void;
  disabled?: boolean;
  width?: number | '100%';
  maxWidth?: number | '100%';
  isMenuPopupSameWidth?: boolean;
  valid?: boolean;
  dropdownTitle?: string;
  placement?: Placement;
  onChangePopupShown?: (popupShown: boolean) => void;
  // @deprecated inputのheightを統一する際に、既存UIに影響させないための暫定フラグ(see:https://github.com/kintone-private/kintone-Design-System/issues/1073)
  isLegacyHeight?: boolean;
} & Pick<AriaAttributes, 'aria-labelledby' | 'aria-required'> &
  PropsForDataTestId;

export type DropdownProps<T extends string> = OuterProps<T>;

const Container = <T extends string>({
  options,
  value,
  changeValue,
  disabled = false,
  width,
  maxWidth,
  isMenuPopupSameWidth,
  valid,
  'aria-labelledby': ariaLabelledby,
  'aria-required': ariaRequired,
  'data-testid': dataTestId,
  dropdownTitle,
  placement,
  onChangePopupShown,
  isLegacyHeight
}: OuterProps<T>): JSX.Element => {
  const id = useComponentId();
  const identifiedOptions = createIdentifiedOptions<T>(options, id);
  const dropdownButtonMenuItemId = `${id}-DropdownButtonMenuItem`;
  const selectedOption = getSelectedOption(identifiedOptions, value);

  const [
    buttonRef,
    shouldNotFireClosePopup,
    popupShown,
    hidePopup,
    togglePopup,
    focusedMenuItemId,
    focusMenuItemId,
    shouldFocusButton,
    clearShouldFocusButton,
    handleKeyDownButton,
    handleKeyDownMenuItem,
    listboxOptionFocusedKeyDown,
    setListboxOptionFocusedKeyDown
  ] = useDropdownState(identifiedOptions, selectedOption, changeValue);

  useEffect(() => {
    if (onChangePopupShown) {
      onChangePopupShown(popupShown);
    }
  }, [onChangePopupShown, popupShown]);
  return (
    <StyledComponent
      buttonRef={buttonRef}
      options={identifiedOptions}
      selectedOption={selectedOption}
      dropdownButtonMenuItemId={dropdownButtonMenuItemId}
      focusedMenuItemId={focusedMenuItemId}
      focusMenuItemId={focusMenuItemId}
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
      disabled={disabled}
      width={width}
      maxWidth={maxWidth}
      isMenuPopupSameWidth={isMenuPopupSameWidth}
      valid={valid}
      aria-labelledby={ariaLabelledby}
      aria-required={ariaRequired}
      data-testid={dataTestId}
      dropdownTitle={dropdownTitle}
      placement={placement}
      isLegacyHeight={isLegacyHeight}
    />
  );
};

export const Dropdown = Container;
