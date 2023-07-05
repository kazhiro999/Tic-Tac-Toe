import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    width="54"
    height="48"
    viewBox="0 0 54 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 16.5L27 0L54 19L27 35L7 21.2963V37.5351C8.1956 38.2267 9 39.5194 9 41C9 43.2091 7.20914 45 5 45C2.79086 45 1 43.2091 1 41C1 39.5194 1.8044 38.2267 3 37.5351V18.5556L0 16.5Z"
      fill="#88A95D"
    />
    <path
      d="M10 27L27 39L45 28V38C45 38 37.5 48 26.5 48C15.5 48 10 37 10 37V27Z"
      fill="#88A95D"
    />
  </svg>
);

export const GuideTutorialUsIcon = styled(Component)``;
