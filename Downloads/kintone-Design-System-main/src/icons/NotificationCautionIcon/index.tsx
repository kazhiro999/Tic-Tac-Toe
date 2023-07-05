import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="19"
    viewBox="0 0 18 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`${className}__triangle`}
      d="M8.36425 1.96512C8.6468 1.51163 9.3532 1.51163 9.63575 1.96512L17.9006 15.2297C18.1831 15.6831 17.8299 16.25 17.2648 16.25H0.735199C0.170085 16.25 -0.18311 15.6831 0.0994468 15.2297L8.36425 1.96512Z"
    />
    <path
      className={`${className}__exclamation`}
      d="M7.875 6.125H10.125L9.5625 10.625H8.4375L7.875 6.125Z"
    />
    <rect
      className={`${className}__exclamation`}
      x="7.875"
      y="11.75"
      width="2.25"
      height="2.25"
      rx="1"
    />
  </svg>
);

export const NotificationCautionIcon = styled(Component)`
  fill: none;

  &__exclamation {
    fill: ${designTokens.colors.doveGray};
  }

  &__triangle {
    fill: ${designTokens.colors.iron};
  }
`;
