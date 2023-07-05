import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="39" height="39" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 7V14H25V7H15ZM13 5H27V16H21V19H27V21V23H36V34H22V23H25V21H15V23H18V34H4V23H13V21V19H19V16H13V5ZM6 25V32H16V25H6ZM24 32V25H34V32H24Z"
    />
  </svg>
);

export const OrganizationSelectPickerButtonIcon = styled(Component)`
  fill: none;

  & rect {
    fill: ${designTokens.colors.deprecatedIconBlue};
    stroke: ${designTokens.colors.porcelain};
  }

  & path {
    fill: ${designTokens.colors.snow};
  }
`;
