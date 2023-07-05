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
      width="10"
      height="31"
      viewBox="0 0 10 31"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${id})`}>
        <circle cx="8" cy="8" r="2" />
        <circle cx="8" cy="2" r="2" />
        <circle cx="8" cy="20" r="2" />
        <circle cx="8" cy="26" r="2" />
        <circle cx="8" cy="14" r="2" />
        <circle cx="2" cy="11" r="2" />
        <circle cx="2" cy="5" r="2" />
        <circle cx="2" cy="23" r="2" />
        <circle cx="2" cy="29" r="2" />
        <circle cx="2" cy="17" r="2" />
      </g>
      <defs>
        <filter
          id={id}
          x="0"
          y="0"
          width="10"
          height="32"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
      </defs>
    </svg>
  );
};

export const DraggableIcon = styled(Component)`
  fill: none;

  & circle {
    fill: ${designTokens.colors.snow};
  }
`;
