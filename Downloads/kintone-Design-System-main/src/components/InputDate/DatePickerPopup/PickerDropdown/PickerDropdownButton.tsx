import React from 'react';
import styled from 'styled-components';
import { useButtonWithFocusControl } from './useButtonWithFocusControl';
import clsx from 'clsx';
import { designTokens } from '../../../../designTokens';
import { Icon } from '../../../Icon';
import { FormDatePickerSelectArrowIcon } from '../../../../icons';
import type { DropdownOption } from '../../modules/types';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  selectedOption: DropdownOption;
  popupShown: boolean;
  focusable: boolean;
  togglePopup: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onBlur: React.FocusEventHandler<HTMLButtonElement>;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonRef,
  selectedOption,
  popupShown,
  focusable,
  togglePopup,
  onKeyDown,
  onBlur
}) => (
  <button
    className={clsx(className, { [`${className}__active`]: popupShown })}
    ref={buttonRef}
    type="button"
    aria-expanded={popupShown}
    aria-haspopup="listbox"
    onClick={togglePopup}
    onKeyDown={onKeyDown}
    onBlur={onBlur}
    tabIndex={focusable ? 0 : -1}
  >
    <span className={`${className}__label`}>{selectedOption.label}</span>
    <span className={`${className}__icon`}>
      <Icon
        height={8}
        width={12}
        icon={<FormDatePickerSelectArrowIcon />}
        alternativeText=""
      />
    </span>
  </button>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 32px;
  max-width: 100%;
  text-align: left;
  background-color: transparent;
  color: ${designTokens.colors.mineShaft};
  border: 1px solid transparent;
  font-size: ${designTokens.fonts.size[3]};
  font-weight: bold;
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
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
  word-wrap: break-word;

  &__active {
    border: 1px solid ${designTokens.colors.curiousBlue};
  }

  &__label {
    flex: 1;
    display: inline-block;
    padding-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
  }
`;

type OuterProps = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  selectedOption: DropdownOption;
  popupShown: boolean;
  togglePopup: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  shouldFocusButton: boolean;
  clearShouldFocusButton: () => void;
};

const Container: React.VFC<OuterProps> = ({
  buttonRef,
  shouldFocusButton,
  clearShouldFocusButton,
  ...others
}) => {
  const focusable = useButtonWithFocusControl(
    buttonRef,
    others.popupShown,
    shouldFocusButton
  );

  return (
    <StyledComponent
      buttonRef={buttonRef}
      focusable={focusable}
      onBlur={clearShouldFocusButton}
      {...others}
    />
  );
};

export const PickerDropdownButton = Container;
