import * as React from 'react';
import { AriaAttributes } from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../designTokens';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
} & Pick<AriaAttributes, 'aria-labelledby'>;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children,
  'aria-labelledby': ariaLabelledby
}) => (
  <div
    role="tabpanel"
    aria-labelledby={ariaLabelledby}
    tabIndex={0}
    className={className}
  >
    {children}
  </div>
);

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
  color: ${designTokens.colors.mineShaft};
  word-wrap: break-word;
  font-size: ${designTokens.fonts.size[5]};
  line-height: 1.5;
`;

export const TabPanel = StyledComponent;
