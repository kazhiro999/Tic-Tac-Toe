import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20">
    <rect x="1" y="1" width="18" height="18" rx="1" strokeWidth="2" />
  </svg>
);

export const CheckboxUncheckedIcon: React.VFC = styled(Component)`
  & rect {
    fill: ${designTokens.colors.snow};
    stroke: ${designTokens.colors.alto};
  }
`;
