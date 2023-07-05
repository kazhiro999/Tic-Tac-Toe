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
      d="M12.0006 15.1382C13.7333 15.1382 15.1386 13.7331 15.1386 12.0004C15.1386 10.2661 13.7333 8.86097 12.0006 8.86097C10.2671 8.86097 8.86222 10.2661 8.86222 12.0004C8.86222 13.7331 10.2671 15.1382 12.0006 15.1382ZM6 12.0004C6 8.68654 8.68667 6 12.0006 6C15.3137 6 18 8.68654 18 12.0004C18 15.3139 15.3137 18 12.0006 18C8.68667 18 6 15.3139 6 12.0004Z"
    />
  </svg>
);

export const HeaderOfficeIcon = styled(Component)`
  fill: none;

  &__circle {
    fill: ${designTokens.colors.snow};
  }

  // 製品アイコンなのでデザイントークンは使用しない
  &__icon {
    fill: #1a92d4;
  }
`;
