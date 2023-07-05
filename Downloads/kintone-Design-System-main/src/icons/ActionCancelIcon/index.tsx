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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.9395 8L2.96978 4.03032L2.43945 3.49999L3.50011 2.43933L4.03044 2.96966L8.0001 6.9393L11.9698 2.96966L12.5001 2.43933L13.5608 3.49999L13.0304 4.03032L9.0608 8L13.0304 11.9697L13.5608 12.5L12.5001 13.5607L11.9698 13.0303L8.0001 9.0607L4.03044 13.0303L3.50011 13.5607L2.43945 12.5L2.96978 11.9697L6.9395 8Z"
    />
  </svg>
);

export const ActionCancelIcon = styled(Component)`
  fill: none;
  & path {
    fill: ${designTokens.colors.gray};
  }
`;
