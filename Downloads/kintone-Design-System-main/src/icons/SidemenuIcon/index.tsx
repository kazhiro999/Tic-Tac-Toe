import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H24V3.13043H0V0ZM0 10.4348H24V13.5652H0V10.4348ZM24 20.8696H0V24H24V20.8696Z"
    />
  </svg>
);

export const SidemenuIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.gray};
  }
`;
