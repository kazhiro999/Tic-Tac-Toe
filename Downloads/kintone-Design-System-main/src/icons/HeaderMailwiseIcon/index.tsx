import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
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
      className={`${className}__circle`}
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
    />
    <path
      className={`${className}__icon`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 8.17627C6 8.17627 10.775 12.8883 12.077 14.1913C13.456 12.8123 18.0002 8.17627 18.0002 8.17627V16.9999H6L6 8.17627Z"
    />
    <path
      className={`${className}__icon`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.12402 7H17.906L12.077 12.829L6.12402 7Z"
    />
  </svg>
);

export const HeaderMailwiseIcon = styled(Component)`
  fill: none;

  &__circle {
    fill: ${designTokens.colors.snow};
  }

  // 製品アイコンなのでデザイントークンは使用しない
  &__icon {
    fill: #ea7e90;
  }
`;
