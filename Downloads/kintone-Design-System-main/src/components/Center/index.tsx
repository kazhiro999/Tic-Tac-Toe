import clsx from 'clsx';
import * as React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  vertical: boolean;
  horizontal: boolean;
  children?: React.ReactNode;
};

export type CenterProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  vertical,
  horizontal,
  className,
  children
}) => (
  <div
    className={clsx(className, {
      [`${className}__vertical`]: vertical,
      [`${className}__horizontal`]: horizontal
    })}
  >
    {children}
  </div>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;

  &__vertical {
    align-items: center;
  }

  &__horizontal {
    justify-content: center;
  }
`;

export const Center = StyledComponent;
