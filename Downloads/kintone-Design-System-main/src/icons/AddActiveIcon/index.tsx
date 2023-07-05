import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`${className}__circle`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
    />
    <path
      className={`${className}__plus`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 24H17L17 8H15L15 24Z"
    />
    <path
      className={`${className}__plus`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 17V15L24 15V17L8 17Z"
    />
  </svg>
);

export const AddActiveIcon = styled(Component)`
  fill: none;

  &__circle {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }

  &__plus {
    fill: ${designTokens.colors.snow};
  }
`;
