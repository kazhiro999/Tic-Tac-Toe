import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 19H0V0H19V19ZM1 18H18V1H1V18Z" fill="#3498DB" />
    <path d="M24 24H5V5H24V24ZM6 23H23V6H6V23Z" fill="#3498DB" />
  </svg>
);

export const SidemenuSpacesIcon = styled(Component)``;
