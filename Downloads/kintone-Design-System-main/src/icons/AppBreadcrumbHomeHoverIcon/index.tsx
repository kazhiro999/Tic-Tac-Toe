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
      width="14px"
      height="14px"
      viewBox="0 0 14 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>breadcrumb_home_hover</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g
        id={`${id}-1`}
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          className={`${className}__fill`}
          id={`${id}-2`}
          transform="translate(-16.000000, -13.000000)"
        >
          <g id={`${id}-3`} transform="translate(0.000000, -1.000000)">
            <polygon
              id={`${id}-4`}
              points="16 20.9720583 18.0443115 20.9720583 18.0443115 28 20.973999 28 20.973999 21.9390869 25.0131836 21.9390869 25.0131836 28 28.0020752 28 28.0020752 21 30 20.9720583 26.9769287 17.9943848 26.9769287 14 25.0131836 14 25.0131836 15.9887085 23 14 22.4166667 14"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const AppBreadcrumbHomeHoverIcon = styled(Component)`
  &__fill {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
