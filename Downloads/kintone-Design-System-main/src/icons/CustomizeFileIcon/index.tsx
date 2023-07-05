import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="18"
    viewBox="0 0 20 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 17V1H10.5L16 5.5V17H4Z" strokeWidth="2" />
    <path d="M10 1V6H16" strokeWidth="1.5" />
    <rect x="6.375" y="9.36865" width="7.25" height="0.75" strokeWidth="0.75" />
    <rect x="6.375" y="12.3687" width="4.25" height="0.75" strokeWidth="0.75" />
  </svg>
);

export const CustomizeFileIcon = styled(Component)`
  fill: none;

  & path {
    stroke: ${designTokens.colors.gray};
  }

  & rect {
    stroke: ${designTokens.colors.gray};
    fill: ${designTokens.colors.gray};
  }
`;
