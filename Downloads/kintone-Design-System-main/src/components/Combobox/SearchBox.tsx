import * as React from 'react';
import styled from 'styled-components';
import { IconButton } from '../IconButton';
import { InputText } from '../InputText';
import { designTokens } from '../../designTokens/index';
import { DropdownArrowDownIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  menuPopupId: string;
  searchText: string;
  shouldFocusInput: boolean;
  clearShouldFocusInput: () => void;
  changeSearchText: (value: string) => void;
  onClickInput: React.MouseEventHandler<HTMLInputElement>;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDownInput: React.KeyboardEventHandler<HTMLInputElement>;
  onBlurInput: React.FocusEventHandler<HTMLInputElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  popupShown: boolean;
  highlightedMenuItemId: string;
  shouldSelectInput: boolean;
  arrowDownButtonLabel: string;
} & Pick<React.AriaAttributes, 'aria-labelledby' | 'aria-required'>;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  menuPopupId,
  onClickInput,
  onClickButton,
  searchText,
  shouldFocusInput,
  clearShouldFocusInput,
  changeSearchText,
  onKeyDownInput,
  onBlurInput,
  buttonRef,
  popupShown,
  highlightedMenuItemId,
  shouldSelectInput,
  'aria-labelledby': ariaLabelledby,
  'aria-required': ariaRequired,
  arrowDownButtonLabel
}) => (
  <div className={className}>
    <InputText
      onClick={onClickInput}
      value={searchText}
      onBlur={onBlurInput}
      changeValue={changeSearchText}
      role="combobox"
      onKeyDown={onKeyDownInput}
      shouldFocus={shouldFocusInput}
      clearShouldFocus={clearShouldFocusInput}
      shouldSelect={shouldSelectInput}
      aria-owns={menuPopupId}
      aria-expanded={popupShown}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      aria-labelledby={ariaLabelledby}
      aria-activedescendant={popupShown ? highlightedMenuItemId : undefined}
      aria-required={ariaRequired}
    />
    <div className={`${className}__icon`}>
      <IconButton
        ref={buttonRef}
        alternativeText={arrowDownButtonLabel}
        width={30}
        height={30}
        iconWidth={12}
        iconHeight={8}
        icon={<DropdownArrowDownIcon />}
        tabIndex={-1}
        onClick={onClickButton}
      />
    </div>
  </div>
);

export const StyledComponent: React.VFC<Props> = styled(Component)`
  position: relative;
  display: flex;

  // InputTextに入力した文字列とボタンのアイコンがかぶるため、アイコンの横幅分設定している
  > input {
    padding-right: 40px;
  }

  &__icon {
    position: absolute;
    right: 0;
    top: 1px;
    border-left: 1px solid ${designTokens.colors.porcelain};
  }
`;

export const SearchBox = StyledComponent;
