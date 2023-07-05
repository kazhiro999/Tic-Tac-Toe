import React from 'react';
import styled from 'styled-components';
import { DatePickerActionButton } from './DatePickerActionButton';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  onClickToday: () => void;
  onClickClear: () => void;
  onClearButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  todayButtonLabel: string;
  noneButtonLabel: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  onClickToday,
  onClickClear,
  onClearButtonKeyDown,
  todayButtonLabel,
  noneButtonLabel
}) => (
  <div className={className}>
    <DatePickerActionButton onClick={onClickToday}>
      {todayButtonLabel}
    </DatePickerActionButton>
    <DatePickerActionButton
      onClick={onClickClear}
      onKeyDown={onClearButtonKeyDown}
    >
      {noneButtonLabel}
    </DatePickerActionButton>
  </div>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const DatePickerActions = StyledComponent;
