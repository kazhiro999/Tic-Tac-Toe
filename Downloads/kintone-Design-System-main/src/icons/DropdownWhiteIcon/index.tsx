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
      width="12"
      height="8"
      viewBox="0 0 12 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#${id})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0L6 6.121L12 0V1.88901L6 8.00999L0 1.88901V0Z"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="12" height="8" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DropdownWhiteIcon = styled(Component)`
  fill: none;
  & path {
    fill: ${designTokens.colors.snow};
  }

  & rect {
    fill: ${designTokens.colors.snow};
  }
`;
