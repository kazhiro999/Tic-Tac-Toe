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
      className={`${className}__branch`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.200012 0.5H2.00317V8.66581H5.15868V10.7H0.200012V0.5Z"
    />
    <path
      className={`${className}__add`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.15 15.9C13.3257 15.9 15.9 13.3257 15.9 10.15C15.9 6.97439 13.3257 4.40002 10.15 4.40002C6.97439 4.40002 4.40002 6.97439 4.40002 10.15C4.40002 13.3257 6.97439 15.9 10.15 15.9ZM13.0505 10.5095V9.7907H10.5095V7.24954H9.7907V9.7907H7.24943L7.24943 10.5095H9.7907V13.0506H10.5095V10.5095H13.0505Z"
    />
  </svg>
);

export const CategoryAddSubCategoryIcon = styled(Component)`
  fill: none;

  &__branch {
    fill: ${designTokens.colors.doveGray};
  }

  &__add {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
