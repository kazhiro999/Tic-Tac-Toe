import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

export type SpinnerProps = {
  altText?: string;
};

const Component: React.VFC<SpinnerProps & PropsForStyled> = ({
  className,
  altText
}) => (
  <svg
    className={className}
    viewBox="0 0 50 50"
    role="img"
    {...(altText ? { 'aria-label': altText } : {})}
    {...(!altText ? { 'aria-hidden': true } : {})}
  >
    <circle r="4" cx="30.43" cy="4.72" opacity="0.3" />
    <circle r="4" cx="39.85" cy="10.15" opacity="0.3" />
    <circle r="4" cx="45.28" cy="19.56" opacity="0.3" />
    <circle r="4" cx="45.28" cy="30.43" opacity="0.3" />
    <circle r="4" cx="39.85" cy="39.85" opacity="0.3" />
    <circle r="4" cx="30.44" cy="45.28" opacity="0.4" />
    <circle r="4" cx="19.56" cy="45.28" opacity="0.5" />
    <circle r="4" cx="10.15" cy="39.85" opacity="0.6" />
    <circle r="4" cx="4.7" cy="30.44" opacity="0.7" />
    <circle r="4" cx="4.7" cy="19.56" opacity="0.8" />
    <circle r="4" cx="10.15" cy="10.15" opacity="0.9" />
    <circle r="4" cx="19.56" cy="4.72" opacity="1" />
  </svg>
);

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledComponent: React.VFC<SpinnerProps> = styled(Component)`
  width: 50px;
  height: 50px;
  fill: ${designTokens.colors.spinnerBlue};
  animation: ${rotateAnimation} 1s steps(12) infinite;
`;

export const Spinner = StyledComponent;
