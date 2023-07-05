import React from 'react';
import styled from 'styled-components';
import { Icon, IconProps } from '../Icon';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = { title: React.ReactNode } & IconProps;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  title,
  ...iconProps
}) => {
  return (
    <span className={className}>
      <span className={`${className}__icon`}>
        <Icon {...iconProps} />
      </span>
      {title}
    </span>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  &__icon {
    font-size: ${({ height }) => `${height}px`};
    vertical-align: middle;
    margin-right: 8px;
  }
`;

export const DialogTitleWithIcon = StyledComponent;
