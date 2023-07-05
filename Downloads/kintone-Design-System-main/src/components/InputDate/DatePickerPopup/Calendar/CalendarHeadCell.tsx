import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../../designTokens';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
  weekend?: boolean;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children
}) => {
  return <th className={className}>{children}</th>;
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  width: 38px;
  min-width: 38px;
  padding: 8px 0;
  font-size: ${designTokens.fonts.size[1]};
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
  color: ${({ weekend }) =>
    weekend ? designTokens.colors.iron : designTokens.colors.mineShaft};
  text-align: center;
  word-wrap: break-word;
  line-height: 1.5;
`;

export const CalendarHeadCell = StyledComponent;
