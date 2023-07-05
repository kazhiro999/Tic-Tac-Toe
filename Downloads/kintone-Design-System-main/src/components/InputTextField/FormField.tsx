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
}) => <div className={className}>{children}</div>;

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${designTokens.fonts.size[5]};
  line-height: 1.5;

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
`;

export const FormField = StyledComponent;
