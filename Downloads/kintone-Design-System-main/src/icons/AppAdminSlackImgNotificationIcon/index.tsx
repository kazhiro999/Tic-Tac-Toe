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
      width="386"
      height="208"
      version="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          x="-2%"
          y="-7%"
          width="104%"
          filterUnits="objectBoundingBox"
          id={`${id}-1`}
        >
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="2"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          x="-2%"
          y="-7%"
          width="104%"
          filterUnits="objectBoundingBox"
          id={`${id}-2`}
        >
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="2"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          x="-2%"
          y="-7%"
          width="104%"
          filterUnits="objectBoundingBox"
          id={`${id}-3`}
        >
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="2"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g filter={`url(#${id}-1)`} transform="translate(64 132)">
          <path className={`${className}__white`} d="M0 0h318v70H0z" />
          <path
            className={`${className}__gray`}
            d="M69 41h225v13H69zM69 18h136v13H69z"
          />
          <rect
            className={`${className}__green`}
            x="21"
            y="18"
            width="36"
            height="36"
            rx="4"
          />
        </g>
        <g filter={`url(#${id}-2)`} transform="translate(34 67)">
          <path className={`${className}__white`} d="M0 0h318v70H0z" />
          <path
            className={`${className}__gray`}
            d="M69 41h225v13H69zM69 18h136v13H69z"
          />
          <rect
            className={`${className}__blue`}
            x="21"
            y="18"
            width="36"
            height="36"
            rx="4"
          />
        </g>
        <g filter={`url(#${id}-3)`} transform="translate(4 2)">
          <path className={`${className}__white`} d="M0 0h318v70H0z" />
          <path
            className={`${className}__gray`}
            d="M69 41h225v13H69zM69 18h136v13H69z"
          />
          <rect
            className={`${className}__red`}
            x="21"
            y="18"
            width="36"
            height="36"
            rx="4"
          />
        </g>
      </g>
    </svg>
  );
};

export const AppAdminSlackImgNotificationIcon = styled(Component)`
  fill: none;

  &__white {
    fill: ${designTokens.colors.snow};
  }

  &__gray {
    fill: #e2e3e3;
  }

  &__red {
    fill: ${designTokens.colors.cinnabar};
  }

  &__green {
    fill: ${designTokens.colors.olivine};
  }

  &__blue {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
