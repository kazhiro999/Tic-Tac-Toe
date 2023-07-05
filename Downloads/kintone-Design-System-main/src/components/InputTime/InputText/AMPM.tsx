import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  isArrowDownKey,
  isArrowLeftKey,
  isArrowUpKey,
  isTabKey
} from '../../../functions/key';
import { useChangeFocus, useFocus } from '../FocusContext';
import { useInputTimeContext } from '../hooks/useInputTimeContext';
import { AMPMType } from '../modules/types';
import { designTokens } from '../../../designTokens';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  value: AMPMType;
  handleKeyDown: React.KeyboardEventHandler;
  getAMPMLabel: (value: AMPMType) => string;
};

const getValueNow = (value: AMPMType) => {
  switch (value) {
    case 'AM':
      return 1;
    case 'PM':
      return 2;
    default:
      return undefined;
  }
};

const Component: React.VFC<PropsForStyled & Props> = ({
  className,
  inputRef,
  value,
  handleKeyDown,
  getAMPMLabel
}) => {
  return (
    <input
      ref={inputRef}
      value={value}
      className={className}
      role="spinbutton"
      aria-label={getAMPMLabel(value)}
      aria-valuemin={1}
      aria-valuemax={2}
      aria-valuenow={getValueNow(value)}
      aria-valuetext={value}
      onKeyDown={handleKeyDown}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange={() => {}} // InputなのでonChangeの宣言が必要
    />
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  color: inherit;
  border: 0;
  width: 24px;
  font-family: inherit;
  font-size: ${designTokens.fonts.size[4]};
  outline: none;
  appearance: none;
  margin-left: 4px;
  background-color: transparent;
  caret-color: transparent;
  user-select: none;

  &:focus {
    background: ${designTokens.colors.lightenCuriousBlue24};
  }
`;

const Container: React.VFC<
  Omit<Props, 'inputRef' | 'value' | 'handleKeyDown'>
> = (props) => {
  const { ampm, changeAmpmValue, hideTimePicker } = useInputTimeContext();

  const inputRef = useRef<HTMLInputElement>(null);
  useFocus('AMPM', inputRef);

  const { changeFocus } = useChangeFocus();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'a') {
      changeAmpmValue('AM');
    }

    if (e.key.toLowerCase() === 'p') {
      changeAmpmValue('PM');
    }

    if (isArrowUpKey(e) || isArrowDownKey(e)) {
      changeAmpmValue(ampm === 'AM' ? 'PM' : 'AM');
      e.preventDefault();
    }

    if (isArrowLeftKey(e)) {
      changeFocus('MINUTE');
      e.preventDefault();
    }

    // InputTimeコンポーネントからフォーカスアウトするときにTimePickerを閉じる
    if (isTabKey(e) && e.shiftKey === false) {
      hideTimePicker();
    }
  };

  return (
    <StyledComponent
      {...props}
      inputRef={inputRef}
      value={ampm}
      handleKeyDown={handleKeyDown}
    />
  );
};

export const AMPM = Container;
