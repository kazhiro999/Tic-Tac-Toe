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
  const { hour, isAMPMNotation, changeHourValue, hideTimePicker } =
    useInputTimeContext();

  const inputRef = useRef<HTMLInputElement>(null);
  useFocus('HOUR', inputRef);

  const { changeFocus } = useChangeFocus();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maxRange = isAMPMNotation ? '11' : '23';
    if (value.match(/^\d+$/)) {
      let zeroPaddingValue = ('0' + value).slice(-2);
      if (zeroPaddingValue > maxRange)
        zeroPaddingValue = '0' + zeroPaddingValue.slice(-1);
      changeHourValue(zeroPaddingValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const maxRange = isAMPMNotation ? '11' : '23';
    if (isArrowUpKey(e)) {
      let inclementNumber = makeCalculatedValue(hour, 1);
      if (inclementNumber > maxRange) inclementNumber = '00';
      changeHourValue(inclementNumber);
      e.preventDefault();
    }
    if (isArrowDownKey(e)) {
      let decrementNumber = makeCalculatedValue(hour, -1);
      if (decrementNumber < '00') decrementNumber = maxRange;
      changeHourValue(decrementNumber);
      e.preventDefault();
    }
    if (isArrowRightKey(e)) {
      changeFocus('MINUTE');
      e.preventDefault();
    }
    if (isArrowLeftKey(e)) {
      e.preventDefault();
    }
    if (isHomeKey(e)) {
      changeHourValue('00');
      e.preventDefault();
    }
    if (isEndKey(e)) {
      changeHourValue(maxRange);
      e.preventDefault();
    }
    if (isEnterKey(e)) {
      changeFocus('MINUTE');
      e.preventDefault();
    }
    if (isBackspaceKey(e)) {
      changeHourValue('00');
      e.preventDefault();
    }

    // InputTimeコンポーネントからフォーカスアウトするときにTimePickerを閉じる
    if (e.shiftKey && isTabKey(e)) {
      hideTimePicker();
    }
  };

  return (
    <StyledComponent
      {...props}
      inputRef={inputRef}
      value={hour}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
    />
  );
};

export const Hour = Container;
