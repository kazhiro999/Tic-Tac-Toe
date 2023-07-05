import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
};

export type DialogBodyProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className
}) => <div className={className}>{children}</div>;

const StyledComponent: React.VFC<Props> = styled(Component)`
  background-color: ${designTokens.colors.aquaHaze};
  border-top: 1px solid ${designTokens.colors.porcelain};
  border-bottom: 1px solid ${designTokens.colors.porcelain};
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
  font-size: ${designTokens.fonts.size[5]};
  color: ${designTokens.colors.mineShaft};
  line-height: 1.5;
  overflow-y: auto;
`;

export const DialogBody = StyledComponent;
