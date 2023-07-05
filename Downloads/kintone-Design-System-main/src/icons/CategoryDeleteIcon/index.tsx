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
    <path
      className={`${className}__circle`}
      d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
    />
    <path
      className={`${className}__cross`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.0006 8.70721L10.4755 11.1821L11.1826 10.475L8.70771 8.0001L11.1826 5.52523L10.4755 4.81812L8.0006 7.29299L5.52573 4.81812L4.81862 5.52523L7.2935 8.0001L4.81862 10.475L5.52573 11.1821L8.0006 8.70721Z"
    />
  </svg>
);

export const CategoryDeleteIcon = styled(Component)`
  fill: none;

  &__circle {
    fill: ${designTokens.colors.gray};
  }

  &__cross {
    fill: ${designTokens.colors.snow};
  }
`;
