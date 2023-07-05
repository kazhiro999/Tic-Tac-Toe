import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="7" y="3" width="2" height="10" />
    <rect x="3" y="7" width="10" height="2" />
  </svg>
);

export const PlusActiveIcon = styled(Component)`
  fill: none;

  & rect {
    fill: ${designTokens.colors.darkenCuriousBlue10};
  }
`;
