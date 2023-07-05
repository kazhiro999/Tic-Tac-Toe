import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  alternativeText: string;
  width: number;
  height: number;
  iconUrl: string;
  rotate?: number;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  alternativeText,
  width,
  height,
  iconUrl
}) => (
  <img
    className={className}
    src={iconUrl}
    width={width}
    height={height}
    alt={alternativeText}
  />
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  transform: ${({ rotate }) =>
    rotate !== undefined ? `rotate(${rotate}deg)` : undefined};
`;

export type IconProps = Props;

export const ImgIcon = StyledComponent;
