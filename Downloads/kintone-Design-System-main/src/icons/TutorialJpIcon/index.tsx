import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`${className}__yellow`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 16V2L4 0L11 7V24L2 16Z"
    />
    <path
      className={`${className}__green`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 16V2L20 0L13 7V24L22 16Z"
    />
  </svg>
);

export const TutorialJpIcon = styled(Component)`
  fill: none;

  &__yellow {
    fill: #f1c40f;
  }

  &__green {
    fill: #7ca34d;
  }
`;
