import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../../designTokens';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  children?: React.ReactNode;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children
}) => {
  return <div className={className}>{children}</div>;
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 56px;
  padding: 0 32px;
  border-bottom: 1px solid ${designTokens.colors.porcelain};
  box-sizing: border-box;
`;

export const PaneActionBar = StyledComponent;
