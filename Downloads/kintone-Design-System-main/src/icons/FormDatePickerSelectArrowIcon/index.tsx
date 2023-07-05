import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0.5V1.2764L6 7.5L12 1.2764V0.5L6 6.5L0 0.5Z"
    />
  </svg>
);

export const FormDatePickerSelectArrowIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.gray};
  }
`;
