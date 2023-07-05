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
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.3439 0L24.0011 9.6L12.3439 17.8286L3.15536 9.42439V18.8316C3.73163 19.1962 4.11429 19.8391 4.11429 20.5714C4.11429 21.7076 3.19327 22.6286 2.05714 22.6286C0.921014 22.6286 0 21.7076 0 20.5714C0 19.7816 0.445131 19.0957 1.09821 18.751V7.54286L12.3439 0Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.4845 13.0276V16.3281H5.48854C5.48626 16.4044 5.48511 16.4809 5.48511 16.5577C5.48511 20.7235 8.86216 24.1006 13.028 24.1006C17.1938 24.1006 20.5708 20.7235 20.5708 16.5577C20.5708 16.4809 20.5697 16.4044 20.5674 16.3281H20.5702V13.4937L12.3433 19.3009L5.4845 13.0276Z"
      fill="white"
    />
  </svg>
);

export const TutorialUsIcon = styled(Component)``;
