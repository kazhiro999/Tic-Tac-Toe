import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9998 0L8.29175 7.90068L0 9.16727L5.9999 15.3168L4.58371 24L11.9998 19.9L19.4163 24L17.9997 15.3168L24 9.16727L15.7082 7.90068L11.9998 0Z"
    />
  </svg>
);

export const BookmarkIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.gray};
  }
`;
