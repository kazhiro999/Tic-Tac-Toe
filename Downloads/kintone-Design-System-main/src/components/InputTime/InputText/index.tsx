import React from 'react';
import styled from 'styled-components';
import { useInputTimeContext } from '../hooks/useInputTimeContext';
import { AMPM as AMPMComponent } from './AMPM';
import { Hour } from './Hour';
import { Minute } from './Minute';
import { designTokens } from '../../../designTokens';
import { AMPMType } from '../modules/types';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  isAMPMNotation: boolean;
  isEmpty: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  hourAriaLabel: string;
  minuteAriaLabel: string;
  getAMPMLabel: (value: AMPMType) => string;
  inputTextAriaLabel: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  isAMPMNotation,
  isEmpty,
  onClick,
  hourAriaLabel,
  minuteAriaLabel,
  getAMPMLabel,
  inputTextAriaLabel
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className={className}
      role="group"
      aria-label={inputTextAriaLabel}
      onClick={onClick}
    >
      <Hour ariaLabel={hourAriaLabel} />
      <span className={`${className}__colon`}>{isEmpty || ':'}</span>
      <Minute ariaLabel={minuteAriaLabel} />
      {isAMPMNotation && <AMPMComponent getAMPMLabel={getAMPMLabel} />}
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: inline-flex;
  align-items: center;
  height: 32px;
  color: ${designTokens.colors.mineShaft};
  border: solid 1px ${designTokens.colors.porcelain};
  box-shadow: 2px 2px 4px ${designTokens.colors.wildSand} inset,
    -2px -2px 4px ${designTokens.colors.wildSand} inset;
  box-sizing: border-box;
  padding: 0 8px;

  &:focus-within {
    background-color: ${designTokens.colors.solitude};
  }

  &__colon {
    width: 4px;
    text-align: center;
  }
`;

const Container: React.VFC<
  Omit<Props, 'isAMPMNotation' | 'isEmpty' | 'onClick'>
> = (props) => {
  const { isEmpty, isAMPMNotation, showTimePicker } = useInputTimeContext();

  const handleClick = () => {
    showTimePicker();
  };

  return (
    <StyledComponent
      {...props}
      isAMPMNotation={isAMPMNotation}
      isEmpty={isEmpty}
      onClick={handleClick}
    />
  );
};

export const InputText = Container;
