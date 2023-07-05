import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { ShimaShimaListMoreButtonLayoutType } from './modules/types';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  label: string;
  height: string;
  layout: ShimaShimaListMoreButtonLayoutType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  label,
  onClick,
  className
}) => (
  <div className={className}>
    <button onClick={onClick}>{label}</button>
  </div>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: ${({ layout }) => layout.toLowerCase()};

  & button {
    color: ${designTokens.colors.curiousBlue};
    background-color: transparent;
    margin: 0;
    border: none;
    font-size: ${designTokens.fonts.size[5]};
    cursor: pointer;

    // focus-visibleが現在safariが非対応の為、hoverの記述を分けて書く
    &:hover {
      color: ${designTokens.colors.darkenCuriousBlue10};
    }
    &:focus-visible {
      color: ${designTokens.colors.darkenCuriousBlue10};
    }
  }
`;

export const MoreButton = StyledComponent;
