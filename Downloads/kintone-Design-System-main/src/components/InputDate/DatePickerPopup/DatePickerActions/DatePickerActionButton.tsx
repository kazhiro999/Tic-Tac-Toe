import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../../designTokens';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
};

const Component: React.FC<Props & PropsForStyled> = ({
  className,
  children,
  onClick,
  onKeyDown
}) => (
  <button className={className} onClick={onClick} onKeyDown={onKeyDown}>
    {children}
  </button>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  background-color: transparent;
  color: ${designTokens.colors.curiousBlue};
  font-size: ${designTokens.fonts.size[3]};
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
  border: none;
  padding: 0;
  cursor: pointer;
  word-wrap: break-word;
  line-height: 1.5;
`;

export const DatePickerActionButton = StyledComponent;
