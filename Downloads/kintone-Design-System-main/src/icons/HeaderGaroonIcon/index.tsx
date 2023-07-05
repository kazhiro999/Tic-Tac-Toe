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
      className={`${className}__circle`}
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
    />
    <path
      className={`${className}__icon`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.574 12.3192C15.565 12.3192 13.591 12.4 12.762 12.2641C12.91 12.9701 12.706 13.4492 12.706 13.4492C12.706 13.4492 14.341 13.4089 14.667 13.4089C14.667 14.1423 14.685 14.2589 14.685 14.6968C14.685 15.1429 14.685 15.6955 14.633 15.9388C14.367 16.1077 13.377 16.217 12.81 16.217C10.232 16.217 8.391 14.2249 8.391 11.784C8.391 8.5564 10.886 6.8618 12.961 6.8618C14.485 6.8618 15.729 7.59986 16.432 8.5206H16.667C16.768 7.99918 16.95 7.47777 17.136 6.95452C15.931 6.37068 14.617 6.00073 12.927 6.00073C8.993 6.00073 6 7.95236 6 11.8547C6 14.9887 8.761 17 12.608 17C13.841 17 15.051 16.6906 16.298 16.5052C16.855 16.4217 17.001 16.0682 17.001 15.8534C17.003 15.5037 17.016 15.0374 17.016 14.6371C17.015 13.8935 17.011 13.4648 17.011 12.8746C17.011 12.6846 17.104 12.3192 16.574 12.3192Z"
    />
  </svg>
);

export const HeaderGaroonIcon = styled(Component)`
  fill: none;

  &__circle {
    fill: ${designTokens.colors.snow};
  }

  // 製品アイコンなのでデザイントークンは使用しない
  &__icon {
    fill: #003399;
  }
`;
