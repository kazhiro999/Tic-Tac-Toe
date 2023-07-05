import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="9"
    height="14"
    viewBox="0 0 9 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.47048 6.53034L0.000806716 12L1.06147 13.0607L7.5918 6.53034L1.06147 1.01076e-05L0.000805759 1.06067L5.47048 6.53034Z"
    />
  </svg>
);

export const GroupWhiteIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.snow};
  }
`;
