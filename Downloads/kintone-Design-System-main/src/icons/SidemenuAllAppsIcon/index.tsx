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
    <rect x="0.5" y="0.5" width="5" height="5" stroke="#3498DB" />
    <rect x="9.5" y="0.5" width="5" height="5" stroke="#3498DB" />
    <rect x="18.5" y="0.5" width="5" height="5" stroke="#3498DB" />
    <rect x="0.5" y="9.5" width="5" height="5" stroke="#3498DB" />
    <rect x="9.5" y="9.5" width="5" height="5" stroke="#3498DB" />
    <rect x="18.5" y="9.5" width="5" height="5" stroke="#3498DB" />
    <rect x="0.5" y="18.5" width="5" height="5" stroke="#3498DB" />
    <rect x="9.5" y="18.5" width="5" height="5" stroke="#3498DB" />
    <rect x="18.5" y="18.5" width="5" height="5" stroke="#3498DB" />
  </svg>
);

export const SidemenuAllAppsIcon = styled(Component)``;
