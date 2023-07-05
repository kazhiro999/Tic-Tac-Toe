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
      d="M19.8618 7.94472V1.13808H16.3641V4.1382L12.3858 0.159887C12.2875 0.0605785 12.1505 0 12.0005 0C11.8495 0 11.7135 0.0605785 11.6142 0.159887L0.159887 11.6142C0.0605785 11.7135 0 11.9171 0 11.9171H2.97957V24H7.94502V12.9102H15.8897V24H20.8549V12C20.8549 12 24 12.3004 24 11.9995C24 11.8495 23.9394 11.7135 23.8401 11.6142L19.8618 7.94472Z"
    />
  </svg>
);

export const HeaderHomeIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.gray};
  }
`;
