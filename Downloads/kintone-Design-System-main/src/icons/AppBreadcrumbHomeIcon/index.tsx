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
      <title>Page 1</title>
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
          <g id={`${id}-3`}>
            <polygon
              id={`${id}-4`}
              points="16 19.9720583 18.0443115 19.9720583 18.0443115 27 20.973999 27 20.973999 20.9390869 25.0131836 20.9390869 25.0131836 27 28.0020752 27 28.0020752 20 30 19.9720583 26.9769287 16.9943848 26.9769287 13 25.0131836 13 25.0131836 14.9887085 23 13 22.4166667 13"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const AppBreadcrumbHomeIcon = styled(Component)`
  &__fill {
    fill: ${designTokens.colors.gray};
  }
`;
