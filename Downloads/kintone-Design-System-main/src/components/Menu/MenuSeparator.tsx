import React from 'react';
import styled from 'styled-components';
import { MenuItem } from './MenuItem';
import { designTokens } from '../../designTokens';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = PropsForDataTestId & PropsForStyled;

const Component: React.VFC<Props> = ({
  className,
  'data-testid': dataTestId
}) => (
  <MenuItem>
    <div
      role="separator"
      className={`${className}__separator`}
      data-testid={dataTestId}
    />
  </MenuItem>
);

const StyledComponent: React.VFC = styled(Component)`
  &__separator {
    margin: 8px 0;
    height: 1px;
    background-color: ${designTokens.colors.gallery};
  }
`;

export const MenuSeparator = StyledComponent;
