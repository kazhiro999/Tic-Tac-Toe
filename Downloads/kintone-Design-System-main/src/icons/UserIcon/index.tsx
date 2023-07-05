import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    version="1.1"
    id={useComponentId()}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 245.5 245"
    xmlSpace="preserve"
  >
    <rect
      x="-4.5"
      y="-4"
      className={`${className}__st0`}
      width="254.5"
      height="254.5"
    />
    <path
      className={`${className}__st1`}
      d="M122.3,43.3c18.9,0,36.1,18.3,35.8,44.2c-0.3,25.7-10.8,30.7-16.7,41.6c-2.2,4.1-2.8,16.9,1.4,19.4
	c19.3,11.7,38.2,20.6,54.3,30c7.1,4.2,8.1,12.9,8.1,18.8c-13,0-48.1,0-82.9,0s-69.9,0-82.9,0c0-5.9,1-14.6,8.1-18.8
	c16.1-9.4,35-18.3,54.3-30c4.2-2.5,3.6-15.3,1.4-19.4c-5.9-10.9-16.4-16-16.7-41.6C86.2,61.6,103.4,43.3,122.3,43.3"
    />
  </svg>
);

export const UserIcon = styled(Component)`
  enable-background: new 0 0 245.5 245;

  & image {
    display: none;
    overflow: visible;
  }

  &__st0 {
    fill: #717272;
  }

  &__st1 {
    fill: ${designTokens.colors.snow};
  }
`;
