import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  const id = useComponentId();
  return (
    <svg
      className={className}
      version="1.1"
      id={`${id}-1`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 18.6 19.1"
      xmlSpace="preserve"
    >
      <g id={`${id}-2`} className={`${className}__st0`}>
        <g id={`${id}-3`} className={`${className}__st1`}>
          <polygon
            className={`${className}__st2`}
            points="22.7,15.2 3.5,15.2 3.5,-11.4 13.5,-11.4 22.7,-2.1 "
          />
          <polygon
            className={`${className}__st3`}
            points="13.5,-2.1 13.5,-11.4 22.7,-2.1"
          />
          <rect
            x="4.7"
            y="-0.4"
            className={`${className}__st4`}
            width="19.3"
            height="11.9"
          />
          <g>
            <text
              transform="matrix(1 0 0 1 5.7656 8.9521)"
              className={`${className}__st2 ${className}__st5 ${className}__st6`}
            >
              LOG
            </text>
          </g>
        </g>
      </g>
      <g id={`${id}-4`}>
        <ellipse
          className={`${className}__st7`}
          cx="9.4"
          cy="9.5"
          rx="9.1"
          ry="9.3"
        />
      </g>
      <polygon
        className={`${className}__st8`}
        points="9.4,4.8 4.3,13.6 14.5,13.6"
      />
    </svg>
  );
};
export const AppAdminWebhookErrorIcon = styled(Component)`
  enable-background: new 0 0 18.6 19.1;

  &__st0 {
    display: none;
  }

  &__st1 {
    display: inline;
  }

  &__st2 {
    fill: #3a99d9;
  }

  &__st3 {
    fill: #2878a5;
  }

  &__st4 {
    fill: ${designTokens.colors.snow};
    stroke: #3a99d9;
    stroke-width: 2;
    stroke-miterlimit: 10;
  }

  &__st5 {
    font-family: 'Corbel-Bold';
  }

  &__st6 {
    font-size: 9.0608px;
  }

  &__st7 {
    fill: #e74d3d;
  }

  &__st8 {
    fill: none;
    stroke: ${designTokens.colors.snow};
    stroke-miterlimit: 10;
  }
`;
