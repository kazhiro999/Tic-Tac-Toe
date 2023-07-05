import * as React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
  width: number;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children
}) => {
  return <div className={className}>{children}</div>;
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => `${width}px`};
  height: 100%;
`;

export const Pane = StyledComponent;
