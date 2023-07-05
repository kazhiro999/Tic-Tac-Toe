import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children
}) => <div className={className}>{children}</div>;

const animation = keyframes`
  from {
    transform: scale(0.4);
  }

  to {
    transform: scale(1);
  }
`;

const StyledComponent: React.VFC<Props> = styled(Component)`
  animation: ${animation} 0.1s;
`;

export const Scale = StyledComponent;
