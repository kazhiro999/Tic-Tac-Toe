import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`${className}__circle`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z"
      fillOpacity="0.1"
    />
    <path
      className={`${className}__cross`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.4765 23.7071L28.1229 20.0607L28.4765 19.7071L27.7694 19L27.4158 19.3536L23.7694 23L20.1229 19.3536L19.7694 19L19.0623 19.7071L19.4158 20.0607L23.0623 23.7071L19.3536 27.4158L19 27.7694L19.7071 28.4765L20.0607 28.1229L23.7694 24.4142L27.4781 28.1229L27.8316 28.4765L28.5387 27.7694L28.1852 27.4158L24.4765 23.7071Z"
    />
  </svg>
);

export const NotifierCloseIcon = styled(Component)`
  fill: none;

  &__circle {
    fill: ${designTokens.colors.black};
  }

  &__cross {
    fill: ${designTokens.colors.snow};
  }
`;
