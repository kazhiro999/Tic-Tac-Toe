import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20">
    <rect x="1" y="1" width="18" height="18" rx="1" strokeWidth="2" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.76172 10.4763L6.19029 8.5715L9.04743 10.9525L13.8093 5.71436L15.2379 7.14293L9.04743 13.8096L4.76172 10.4763Z"
    />
  </svg>
);

export const CheckboxCheckedIcon: React.VFC = styled(Component)`
  & rect {
    fill: ${designTokens.colors.snow};
    stroke: ${designTokens.colors.deprecatedIconBlue};
  }

  & path {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
