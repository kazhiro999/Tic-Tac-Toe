import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className
}) => {
  return <li className={className}>{children}</li>;
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }

  &:nth-of-type(even) {
    background-color: ${designTokens.colors.athensGray};
  }
`;

export const ShimaShimaListItem = StyledComponent;
