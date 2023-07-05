import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../designTokens';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className
}) => <div className={className}>{children}</div>;

const StyledComponent: React.VFC<Props> = styled(Component)`
  background-color: ${designTokens.colors.snow};
  border-top: 1px solid ${designTokens.colors.porcelain};
  border-bottom: 1px solid ${designTokens.colors.porcelain};
`;

export const PickerDialogBody = StyledComponent;
