import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="11"
    height="16"
    viewBox="0 0 11 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.58878 0L10.2476 0.714054L1.7401 8L10.2476 15.2859L9.58878 16L0.247559 8L9.58878 0Z"
    />
  </svg>
);

export const PageActionBarLeftArrowIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
