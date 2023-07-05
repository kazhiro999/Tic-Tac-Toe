import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM13.5399 9.56258V8.43758H9.56258V4.46011H8.43758V8.43759H4.45994V9.56259H8.43758V13.5401H9.56258V9.56258H13.5399Z"
    />
  </svg>
);

export const ActionAddDefaultIcon = styled(Component)`
  fill: none;

  & path {
    fill: #a8a8a8;
  }
`;
