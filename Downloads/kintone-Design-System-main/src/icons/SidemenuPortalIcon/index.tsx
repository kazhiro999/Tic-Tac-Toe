import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25 25H0V0H25V25ZM1 24H24V1H1V24Z" fill="#3498DB" />
  </svg>
);

export const SidemenuPortalIcon = styled(Component)``;
