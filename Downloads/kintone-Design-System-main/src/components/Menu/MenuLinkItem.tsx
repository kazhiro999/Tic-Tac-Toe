import React from 'react';
import styled from 'styled-components';
import { MenuItem, menuItemStyle } from './MenuItem';
import { useComponentId } from '../../hooks/useComponentId';
import { useFocusContext } from './context/useFocusContext';
import { useHandleClickMenuItem } from './useHandleClickMenuItem';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  url: string;
  shouldOpenOtherTab?: boolean;
  externalSite?: boolean;
  children: React.ReactNode;
  id: string;
  handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement>;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
} & PropsForDataTestId;

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className,
  url,
  shouldOpenOtherTab,
  externalSite,
  id,
  handleMouseEnter,
  onClick,
  'data-testid': dataTestId
}) => {
  const linkProps: Partial<{
    target: string;
    rel: string;
  }> = {};
  if (shouldOpenOtherTab) {
    linkProps.target = '_blank';
  }
  if (externalSite) {
    linkProps.rel = 'noopener noreferrer';
  }

  return (
    <MenuItem>
      <a
        id={id}
        href={url}
        className={className}
        role="menuitem"
        tabIndex={-1}
        data-testid={dataTestId}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        {...linkProps}
      >
        {children}
      </a>
    </MenuItem>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  ${menuItemStyle}
`;

type OuterProps = {
  url: string;
  shouldOpenOtherTab?: boolean;
  externalSite?: boolean;
  children: React.ReactNode;
} & PropsForDataTestId;

export type MenuLinkItemProps = OuterProps;

const Container: React.VFC<OuterProps> = ({ children, ...others }) => {
  const componentId = `MenuLinkItem-${useComponentId()}`;
  const { focusById } = useFocusContext();
  const handleClick = useHandleClickMenuItem();

  return (
    <StyledComponent
      onClick={handleClick}
      handleMouseEnter={() => focusById(componentId)}
      id={componentId}
      {...others}
    >
      {children}
    </StyledComponent>
  );
};

export const MenuLinkItem = Container;
