import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="8"
    height="8"
    viewBox="0 0 8 8"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>breadcrumb_arrow</title>
    <desc>divider_for_breadcrumb</desc>
    <defs />
    <path d="M7.93115 4.17236L0.605957 7.42871V6.36865L6.49023 3.81689L0.605957 1.26514V0.205078L7.93115 3.46143V4.17236Z" />
  </svg>
);

export const AppBreadcrumbArrowIcon = styled(Component)`
  fill: none;
  & path {
    fill: ${designTokens.colors.gray};
  }
`;
