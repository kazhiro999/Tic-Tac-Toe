import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2122 1L12 1.56724L6.73318 8H5.26682L0 1.56724L0.787803 1L5.76504 7.02409H6.23496L11.2122 1Z"
    />
  </svg>
);

export const DropdownArrowDownIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
