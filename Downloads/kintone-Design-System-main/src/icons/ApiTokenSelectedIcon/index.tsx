import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="15"
    height="13"
    viewBox="0 0 15 13"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 7.22222L2.04545 4.33333L6.13636 7.94444L12.9545 0L15 2.16667L6.13636 12.2778L0 7.22222Z"
    />
  </svg>
);

export const ApiTokenSelectedIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
