import React from 'react';
import styled from 'styled-components';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  const id = useComponentId();
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#${id})`}>
        <path
          d="M25 24H0V19.2C0 17.76 0.84 16.44 2.15 15.85L7.74 13.32C6.05 11.91 5.06 9.79999 5.06 7.51999C5.06 3.06999 8.89 -0.480006 13.4 0.049994C16.8 0.459994 19.53 3.23999 19.9 6.66999C20.18 9.23999 19.17 11.71 17.25 13.31L22.85 15.84C24.15 16.43 25 17.74 25 19.19V23.99V24ZM1 23H24V19.2C24 18.15 23.39 17.19 22.44 16.76L15.23 13.5L16 13C18.06 11.66 19.18 9.26999 18.91 6.77999C18.59 3.80999 16.23 1.38999 13.29 1.03999C9.39 0.569994 6.06 3.65999 6.06 7.50999C6.06 9.74999 7.16 11.8 9 13L9.77 13.5L2.57 16.76C1.62 17.19 1.01 18.14 1.01 19.19V22.99L1 23Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="25" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SidemenuPeopleSelectedIcon = styled(Component)``;
