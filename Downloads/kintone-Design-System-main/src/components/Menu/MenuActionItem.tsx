import React from 'react';
import styled from 'styled-components';
import { MenuItem, menuItemStyle } from './MenuItem';
import { useComponentId } from '../../hooks/useComponentId';
import { useFocusContext } from './context/useFocusContext';
import { useHandleClickMenuItem } from './useHandleClickMenuItem';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  handleMouseEnter: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
  children: React.ReactNode;
} & PropsForDataTestId;

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className,
  id,
  onClick,
  handleMouseEnter,
  'data-testid': dataTestId
}) => {
  return (
    <MenuItem>
      <button
        id={id}
        className={className}
        type="button"
        role="menuitem"
        tabIndex={-1}
        onClick={onClick}
        data-testid={dataTestId}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </button>
    </MenuItem>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  ${menuItemStyle}
`;

type OuterProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
} & PropsForDataTestId;

export type MenuActionItemProps = OuterProps;

const Container: React.VFC<OuterProps> = ({
  onClick,
  children,
  'data-testid': dataTestid
}) => {
  const componentId = `MenuActionItem-${useComponentId()}`;
  const { focusById } = useFocusContext();
  const handleClick = useHandleClickMenuItem(onClick);

  return (
    <StyledComponent
      onClick={handleClick}
      handleMouseEnter={() => focusById(componentId)}
      id={componentId}
      data-testid={dataTestid}
    >
      {children}
    </StyledComponent>
  );
};

export const MenuActionItem = Container;
