import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="22"
    height="24"
    viewBox="0 0 22 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="21" height="23" rx="2.5" />
    <path d="M11.0002 19L8.11341 14L13.8869 14L11.0002 19Z" />
    <path d="M11.0001 4.99963L13.8868 9.99963H8.11333L11.0001 4.99963Z" />
  </svg>
);

export const AppDragArrowIcon = styled(Component)`
  fill: none;

  rect {
    fill: ${designTokens.colors.aquaHaze};
    stroke: ${designTokens.colors.iron};
  }

  path {
    fill: ${designTokens.colors.gray};
  }
`;
