import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAdjustAbsolutePosition } from '../../hooks/useAdjustAbsolutePosition';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
};

export type TooltipProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className,
  onMouseEnter,
  onMouseLeave
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useAdjustAbsolutePosition(ref);

  return (
    <div
      ref={ref}
      role="tooltip"
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${className}__tooltip`}>{children}</div>
    </div>
  );
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
  word-wrap: break-word;
  line-height: 1.5;

  position: absolute;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: ${designTokens.zIndex.popup};

  &__tooltip {
    border: 1px solid ${designTokens.colors.iron};
    background: ${designTokens.colors.gallery};
    background: linear-gradient(
      to bottom,
      ${designTokens.colors.snow} 0,
      ${designTokens.colors.aquaHaze} 60%,
      ${designTokens.colors.gallery} 100%
    );
    color: ${designTokens.colors.mineShaft};
    font-size: ${designTokens.fonts.size[3]};
    padding: 24px;
    box-shadow: 0 5px 10px ${designTokens.colors.transparentBlack10};
    white-space: pre;
  }
`;

export const Tooltip = StyledComponent;
