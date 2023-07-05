import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 12.4864L12.5036 14L6.98887 8.52716L1.57616 13.9991L0 12.4049L5.39603 6.94702L0.23457 1.82584L1.73099 0.312278L6.89152 5.43345L12.269 0L13.8452 1.59421L8.48437 7.01735L14 12.4864Z"
    />
  </svg>
);

export const ApiTokenDeleteIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.gray};
  }
`;
