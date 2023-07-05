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
    <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" />
    <rect x="4" y="7.5" width="8" height="1" />
  </svg>
);

export const ActionDeleteActiveIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.cinnabar};
  }

  & rect {
    fill: ${designTokens.colors.snow};
  }
`;
