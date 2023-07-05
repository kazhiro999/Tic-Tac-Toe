import * as React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { designTokens } from '../../../../designTokens';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  children?: React.ReactNode;
  position: 'left' | 'right';
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children,
  position
}) => {
  return (
    <div
      className={clsx(className, {
        [`${className}__divider`]: position === 'right'
      })}
    >
      {children}
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  flex: 1;
  overflow-y: auto;

  &__divider {
    box-sizing: border-box;
    border-left: 1px solid ${designTokens.colors.porcelain};
  }
`;

export const PaneContent = StyledComponent;
