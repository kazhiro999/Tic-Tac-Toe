import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="23"
    height="22"
    viewBox="0 0 23 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="6.78333" width="4.4" height="8.43333" />
    <rect x="6.6001" y="6.78333" width="7.51667" height="8.43333" />
    <path d="M22.9165 11L13.0165 20.5263L13.0165 1.47372L22.9165 11Z" />
  </svg>
);

export const ActionArrowRightIcon = styled(Component)`
  fill: none;

  & rect,
  & path {
    fill: #a8a8a8;
  }
`;
