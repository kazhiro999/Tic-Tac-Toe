import React, { AriaAttributes } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { IdentifiedDropdownOption } from './modules/types';
import { getDropdownButtonAriaLabelledby } from './modules/functions';
import { useButtonWithFocusControl } from './useButtonWithFocusControl';
import { designTokens } from '../../designTokens';
import { Icon } from '../Icon';
import { DropdownArrowDownIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

const DATA_TESTID = 'shared-forms-Dropdown-DropdownButton';

type Props<T extends string> = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  selectedOption: IdentifiedDropdownOption<T>;
  dropdownButtonMenuItemId: string;
  popupShown: boolean;
  togglePopup: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  disabled: boolean;
  valid?: boolean;
  title?: string;
  // @deprecated inputのheightを統一する際に、既存UIに影響させないための暫定フラグ(see:https://github.com/kintone-private/kintone-Design-System/issues/1073)
  isLegacyHeight?: boolean;
} & Pick<AriaAttributes, 'aria-labelledby'>;

const Component = <T extends string>({
  className,
  buttonRef,
  selectedOption,
  dropdownButtonMenuItemId,
  popupShown,
  togglePopup,
  onKeyDown,
  onBlur,
  disabled,
  valid = true,
  'aria-labelledby': ariaLabelledby,
  title,
  isLegacyHeight = false
}: Props<T> & PropsForStyled) => (
  <button
    className={clsx(className, {
      [`${className}__disabled`]: disabled,
      isLegacyHeight
    })}
    ref={buttonRef}
    type="button"
    aria-expanded={popupShown}
    aria-haspopup="listbox"
    aria-labelledby={getDropdownButtonAriaLabelledby(
      dropdownButtonMenuItemId,
      ariaLabelledby
    )}
    disabled={disabled}
    aria-invalid={!valid ? 'true' : undefined}
    onClick={!disabled ? togglePopup : undefined}
    onKeyDown={!disabled ? onKeyDown : undefined}
    onBlur={onBlur}
    data-testid={DATA_TESTID}
    title={title}
  >
    <span
      className={`${className}__label`}
      id={dropdownButtonMenuItemId}
      data-testid={`${DATA_TESTID}-selectedLabel`}
    >
      {selectedOption.label}
    </span>
    <span className={`${className}__icon`}>
      <Icon
        width={12}
        height={8}
        icon={<DropdownArrowDownIcon />}
        alternativeText=""
      />
    </span>
  </button>
);

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: ${({ isLegacyHeight }) => (isLegacyHeight ? '40px' : '32px')};
  max-width: 100%;
  margin: 0;
  text-align: left;
  border: 1px solid ${designTokens.colors.porcelain};
  background-color: ${designTokens.colors.aquaHaze};
  box-shadow: 1px 1px 1px ${designTokens.colors.snow} inset;
  color: ${designTokens.colors.curiousBlue};
  font-size: ${designTokens.fonts.size[4]};
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
  word-wrap: break-word;
  :lang(en) {
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

  &__disabled {
    background-color: ${designTokens.colors.iron};
    box-shadow: none;
    cursor: not-allowed;
    color: ${designTokens.colors.gray};
  }

  &__label {
    flex: 1;
    display: inline-block;
    padding-left: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ isLegacyHeight }) => (isLegacyHeight ? '38px' : '32px')};
    height: ${({ isLegacyHeight }) => (isLegacyHeight ? '38px' : '32px')};
  }
`;

type OuterProps<T extends string> = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  selectedOption: IdentifiedDropdownOption<T>;
  dropdownButtonMenuItemId: string;
  popupShown: boolean;
  togglePopup: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  shouldFocusButton: boolean;
  clearShouldFocusButton: () => void;
  disabled: boolean;
  valid?: boolean;
  title?: string;
  // @deprecated inputのheightを統一する際に、既存UIに影響させないための暫定フラグ(see:https://github.com/kintone-private/kintone-Design-System/issues/1073)
  isLegacyHeight?: boolean;
} & Pick<AriaAttributes, 'aria-labelledby'>;

const Container = <T extends string>({
  buttonRef,
  shouldFocusButton,
  clearShouldFocusButton,
  ...others
}: OuterProps<T>): JSX.Element => {
  // menuクローズ時にfocusを付与する副作用のために呼び出す
  useButtonWithFocusControl(
    buttonRef,
    others.popupShown,
    shouldFocusButton,
    others.disabled
  );

  return (
    <StyledComponent
      buttonRef={buttonRef}
      {...others}
      onBlur={clearShouldFocusButton}
    />
  );
};

export const DropdownButton = Container;
