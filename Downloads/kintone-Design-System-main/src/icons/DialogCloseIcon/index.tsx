import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="44"
    height="44"
    viewBox="0 0 44 44"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`${className}__circle`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 38C30.8366 38 38 30.8366 38 22C38 13.1634 30.8366 6 22 6C13.1634 6 6 13.1634 6 22C6 30.8366 13.1634 38 22 38Z"
    />
    <path
      className={`${className}__x`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.7367 21.9357L26.5047 18.1193L26.8731 17.7462L26.1364 17L25.768 17.3731L22 21.1895L18.232 17.3731L17.8637 17L17.127 17.7462L17.4953 18.1193L21.2633 21.9357L17.3683 25.8807L17 26.2538L17.7367 27L18.105 26.6269L22 22.6819L25.895 26.6269L26.2633 27L27 26.2538L26.6317 25.8807L22.7367 21.9357Z"
    />
  </svg>
);

export const DialogCloseIcon = styled(Component)`
  fill: none;
  &__circle {
    fill: ${designTokens.colors.aquaHaze};
  }
  &__x {
    fill: ${designTokens.colors.gray};
  }
`;
