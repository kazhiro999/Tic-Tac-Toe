import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" />
    <circle cx="16" cy="16" r="7" />
  </svg>
);

export const UserSelectOtherIcon = styled(Component)`
  fill: none;

  & rect {
    fill: #717272;
  }

  & circle {
    fill: #e3e7e7;
  }
`;
