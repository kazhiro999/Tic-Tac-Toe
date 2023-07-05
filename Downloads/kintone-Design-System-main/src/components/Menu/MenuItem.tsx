import React from 'react';
import { css } from 'styled-components';
import { designTokens } from '../../designTokens';

type Props = {
  children: React.ReactNode;
};

export const menuItemStyle = css`
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
  line-height: 1.5;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: ${designTokens.fonts.size[4]};
  text-align: left;
  text-decoration: none;
  margin: 0;
  padding: 4px 16px;
  color: ${designTokens.colors.mineShaft};
  background-color: inherit;
  border: none;
  cursor: pointer;

  &:focus {
    color: ${designTokens.colors.mineShaft};
    background-color: ${designTokens.colors.solitude};
  }
`;

const Component: React.VFC<Props> = ({ children }) => (
  <li role="none" data-testid="shared-MenuPopup-MenuItem">
    {children}
  </li>
);

export const MenuItem = Component;
