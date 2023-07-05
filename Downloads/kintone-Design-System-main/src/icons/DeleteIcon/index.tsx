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
      d="M8.00034 8.70711L10.4752 11.182L11.1823 10.4749L8.70745 8L11.1823 5.52513L10.4752 4.81802L8.00034 7.29289L5.52547 4.81802L4.81836 5.52513L7.29324 8L4.81836 10.4749L5.52547 11.182L8.00034 8.70711Z"
    />
  </svg>
);

export const DeleteIcon = styled(Component)`
  fill: none;

  &__circle {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }

  &__cross {
    fill: ${designTokens.colors.snow};
  }
`;
