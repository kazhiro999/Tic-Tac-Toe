import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="13"
    viewBox="0 0 16 13"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`${className}__yellow`}
      d="M7.43489 0.302325C7.68605 -0.100776 8.31395 -0.100775 8.56511 0.302326L15.9116 12.093C16.1628 12.4961 15.8488 13 15.3465 13H0.653511C0.151187 13 -0.162765 12.4961 0.0883972 12.093L7.43489 0.302325Z"
    />
    <path className={`${className}__gray`} d="M7 4H9L8.5 8H7.5L7 4Z" />
    <rect
      className={`${className}__gray`}
      x="7"
      y="9"
      width="2"
      height="2"
      rx="1"
    />
  </svg>
);

export const AppWarningIcon = styled(Component)`
  fill: none;

  &__yellow {
    fill: #ffcc00;
  }

  &__gray {
    fill: ${designTokens.colors.doveGray};
  }
`;
