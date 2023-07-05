import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  isArrowDownKey,
  isArrowLeftKey,
  isArrowRightKey,
  isArrowUpKey,
  isBackspaceKey,
  isEndKey,
  isEnterKey,
  isHomeKey,
  isTabKey
} from '../../../functions/key';
import { useChangeFocus, useFocus } from '../FocusContext';
import { useInputTimeContext } from '../hooks/useInputTimeContext';
import { makeCalculatedValue, moveCaretPosition } from '../modules/functions';
import { designTokens } from '../../../designTokens';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  handleChange: React.ChangeEventHandler;
  handleKeyDown: React.KeyboardEventHandler;
  ariaLabel: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  inputRef,
  value,
  handleChange,
  handleKeyDown,
  ariaLabel
}) => {
  return (
    <input
      ref={inputRef}
      type="text"
      className={className}
      value={value}
      role="spinbutton"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onClick={(e) => moveCaretPosition(e.currentTarget)}
      onFocus={(e) => moveCaretPosition(e.currentTarget)}
      aria-label={ariaLabel}
      aria-valuenow={Number(value)}
      aria-valuetext={value}
    />
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  color: inherit;
  border: 0;
  padding: 0;
  width: 2ch;
  font-family: inherit;
  font-size: ${designTokens.fonts.size[4]};
  outline: none;
  background-color: transparent;
  caret-color: transparent;
  user-select: none;

  &:focus {
    background: ${designTokens.colors.lightenCuriousBlue24};
  }
`;

const Container: React.VFC<
  Omit<Props, 'inputRef' | 'value' | 'handleChange' | 'handleKeyDown'>
> = (props) => {
  const { isAMPMNotation, minute, changeMinuteValue, hideTimePicker } =
    useInputTimeContext();
  const inputRef = useRef<HTMLInputElement>(null);
  useFocus('MINUTE', inputRef);

  const { changeFocus } = useChangeFocus();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maxRange = '60';
    if (value.match(/^\d+$/)) {
      let zeroPaddingValue = ('0' + value).slice(-2);
      if (zeroPaddingValue >= maxRange)
        zeroPaddingValue = '0' + zeroPaddingValue.slice(-1);
      changeMinuteValue(zeroPaddingValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const maxRange = '59';
    if (isArrowUpKey(e)) {
      let incrementNumber = makeCalculatedValue(minute, 1);
      if (incrementNumber > maxRange) incrementNumber = '00';
      changeMinuteValue(incrementNumber);
      e.preventDefault();
    }
    if (isArrowDownKey(e)) {
      let decrementNumber = makeCalculatedValue(minute, -1);
      if (decrementNumber < '00') decrementNumber = maxRange;
      changeMinuteValue(decrementNumber);
      e.preventDefault();
    }
    if (isArrowRightKey(e)) {
      changeFocus('AMPM');
      e.preventDefault();
    }
    if (isArrowLeftKey(e)) {
      changeFocus('HOUR');
      e.preventDefault();
    }
    if (isHomeKey(e)) {
      changeMinuteValue('00');
      e.preventDefault();
    }
    if (isEndKey(e)) {
      changeMinuteValue(maxRange);
      e.preventDefault();
    }
    if (isEnterKey(e)) {
      changeFocus('AMPM');
      e.preventDefault();
    }
    if (isBackspaceKey(e)) {
      changeMinuteValue('00');
      e.preventDefault();
    }
    // InputTimeコンポーネントからフォーカスアウトするときにTimePickerを閉じる
    if (isTabKey(e) && e.shiftKey === false && !isAMPMNotation) {
      hideTimePicker();
    }
  };

  return (
    <StyledComponent
      {...props}
      inputRef={inputRef}
      value={minute}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
    />
  );
};

export const Minute = Container;
