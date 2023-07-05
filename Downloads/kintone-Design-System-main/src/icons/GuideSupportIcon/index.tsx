import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="23" y="11" width="15" height="11" fill="#428C7D" />
    <rect x="33" y="1" width="21" height="15" fill="#01B6B8" />
    <rect x="23" y="25" width="8" height="6" fill="#428C7D" />
    <rect x="36" y="28" width="9" height="12" fill="#01B6B8" />
    <rect x="5" y="6" width="14" height="19" fill="#01B6B8" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 33.8286H10.1001L34.4858 47.6953H51.7354C53.0851 47.6953 54.1792 48.7894 54.1792 50.1391C54.1792 51.378 53.2521 52.4209 52.0217 52.5661L28.8267 55.3027L9.1001 47.6953H2V33.8286Z"
      fill="#F1C40F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.91357 33.7812H19.0976L33.0172 41.731C34.9437 42.8312 35.5684 45.313 34.3924 47.1942C33.2833 48.9682 30.9734 49.5536 29.1533 48.5218L20.7305 43.7471"
      fill="#F1C40F"
    />
    <path
      d="M4.91357 33.7812H19.0976L33.0172 41.731C34.9437 42.8312 35.5684 45.313 34.3924 47.1942V47.1942C33.2833 48.9682 30.9734 49.5536 29.1533 48.5218L20.7305 43.7471"
      stroke="white"
      strokeWidth="2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M42 5V11.9216L46.0156 8.46078L42 5Z"
      fill="white"
    />
    <rect x="7" y="9" width="10" height="1" fill="white" />
    <rect x="7" y="15" width="6" height="1" fill="white" />
    <rect x="7" y="12" width="10" height="1" fill="white" />
  </svg>
);

export const GuideSupportIcon = styled(Component)``;
