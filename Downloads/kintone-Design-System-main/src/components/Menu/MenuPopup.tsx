import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { useHandleKeyDownMenuPopup } from './useHandleKeyDownMenuPopup';
import { PropsForDataTestId } from '../../typings/dataTestId';

type Props = {
  children: React.ReactNode;
  className?: string;
  onKeyDown: React.KeyboardEventHandler<HTMLUListElement>;
  onMouseEnter: React.MouseEventHandler<HTMLUListElement>;
  onMouseLeave: React.MouseEventHandler<HTMLUListElement>;
} & PropsForDataTestId;

// eslint-disable-next-line react/display-name
const Component = forwardRef<HTMLUListElement, Props>(
  (
    {
      className,
      children,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      'data-testid': dataTestId
    },
    ref
  ) => (
    <div role="menu" className={className}>
      <ul
        ref={ref}
        className={`${className}__list`}
        role="none"
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-testid={dataTestId}
      >
        {children}
      </ul>
    </div>
  )
);

const StyledComponent = styled(Component)`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: ${designTokens.zIndex.popup};

  &__list {
    list-style: none;
    width: 280px;
    margin: 0;
    padding: 8px 0;
    border: ${designTokens.colors.gallery} solid 1px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px ${designTokens.colors.transparentBlack10};
    background-color: ${designTokens.colors.snow};
  }
`;

type OuterProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onMouseEnter: React.MouseEventHandler<HTMLUListElement>;
  onMouseLeave: React.MouseEventHandler<HTMLUListElement>;
} & PropsForDataTestId;

// eslint-disable-next-line react/display-name
const Container = forwardRef<HTMLUListElement, OuterProps>(
  ({ isOpen, ...props }, ref) => {
    const handleKeyDown = useHandleKeyDownMenuPopup();

    // メニューのmount/unmountで利用側が制御をかけていることがあるので、styleによる表示/非表示は使わない see:https://github.com/kintone-private/AppShell/issues/593
    return isOpen ? (
      <StyledComponent onKeyDown={handleKeyDown} {...props} ref={ref} />
    ) : null;
  }
);

export const MenuPopup = Container;
