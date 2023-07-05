import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  alternativeText?: string;
  width: number;
  height: number;
  icon: React.ReactNode;
  rotate?: number;
};
const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  alternativeText,
  width,
  height,
  icon
}) => {
  return (
    <span
      role="img"
      aria-label={alternativeText || undefined}
      aria-hidden={!alternativeText ? true : undefined}
      style={{ width, height }}
      className={className}
    >
      <span aria-hidden="true">{icon}</span>
    </span>
  );
};
const StyledComponent: React.VFC<Props> = styled(Component)`
  transform: ${({ rotate }) =>
    rotate !== undefined ? `rotate(${rotate}deg)` : undefined};
  display: inline-block;
  font-size: 0;
  & svg {
    width: 100%;
    height: 100%;
  }
`;
export type IconProps = Props;

export const SvgIcon = StyledComponent;
