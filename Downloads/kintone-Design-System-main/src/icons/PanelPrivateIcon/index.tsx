import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    width="42"
    height="52"
    viewBox="0 0 42 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.0811 20H30.9189C30.5848 15.916 29.2485 12.4301 27.4613 9.97268C25.3845 7.11712 23.0257 6 21 6C18.9743 6 16.6155 7.11712 14.5387 9.97268C12.7515 12.4301 11.4152 15.916 11.0811 20ZM5.06523 20H0V52H42V20H36.9348C36.1999 8.787 29.3462 0 21 0C12.6538 0 5.8001 8.787 5.06523 20Z"
      fill="#A8A8A8"
    />
    <circle cx="21" cy="33" r="5" fill="#D9D9D9" />
    <line x1="21" y1="33" x2="21" y2="45" stroke="#D9D9D9" strokeWidth="4" />
  </svg>
);

export const PanelPrivateIcon = styled(Component)``;
