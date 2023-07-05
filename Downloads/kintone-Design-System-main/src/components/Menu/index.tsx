import React, { useRef, forwardRef } from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { IconButton } from '../IconButton';
import { useMenuPopupContext } from './context/useMenuPopupContext';
import { MenuContextProvider } from './context/MenuContextProvider';
import { MenuPopup } from './MenuPopup';
import { useHandleKeyDownMenuButton } from './useHandleKeyDownMenuButton';
import { useOutsideTargetElementOnClick } from './useOutsideTargetElementOnClick';
import { PropsForStyled } from '../../typings/propsForStyled';
import { PropsForDataTestId } from '../../typings/dataTestId';

type Props = {
  width: number;
  height: number;
  iconWidth: number;
  iconHeight: number;
  icon: React.ReactNode;
  alt: string;
  onClickMenuButton: React.MouseEventHandler<HTMLButtonElement>;
  menuPopupOpen: boolean;
  menuPopupRef: React.RefObject<HTMLUListElement>;
  onKeyDownMenuButton: React.KeyboardEventHandler<HTMLButtonElement>;
  onMouseEnter: React.MouseEventHandler<unknown>;
  onMouseLeave: React.MouseEventHandler<unknown>;
  children: React.ReactNode;
} & PropsForDataTestId;

// eslint-disable-next-line react/display-name
const Component = forwardRef<HTMLDivElement, Props & PropsForStyled>(
  (
    {
      className,
      height,
      width,
      iconWidth,
      iconHeight,
      icon,
      alt,
      onClickMenuButton,
      menuPopupOpen,
      menuPopupRef,
      onKeyDownMenuButton,
      onMouseEnter,
      onMouseLeave,
      children,
      'data-testid': dataTestId
    },
    ref
  ) => (
    <div ref={ref} className={className}>
      <IconButton
        className={`${className}__button`}
        width={width}
        height={height}
        iconWidth={iconWidth}
        iconHeight={iconHeight}
        icon={icon}
        alternativeText={alt}
        onClick={onClickMenuButton}
        onKeyDown={onKeyDownMenuButton}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-expanded={menuPopupOpen}
        aria-haspopup="true"
        data-testid={dataTestId ? `${dataTestId}-button` : undefined}
      />
      <MenuPopup
        isOpen={menuPopupOpen}
        data-testid={dataTestId ? `${dataTestId}-popup` : undefined}
        ref={menuPopupRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </MenuPopup>
    </div>
  )
);

const StyledComponent = styled(Component)`
  display: inline-block;

  &__button {
    &:hover,
    &:focus {
      background-color: ${designTokens.colors.transparentBlack10};
    }
  }
`;

type OuterProps = {
  height: number;
  width: number;
  iconWidth: number;
  iconHeight: number;
  icon: React.ReactNode;
  alt: string;
  onClickMenuButton?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  triggerOnHover?: boolean;
} & PropsForDataTestId;

export type MenuProps = OuterProps;

const InnerContainer: React.VFC<OuterProps> = ({
  onClickMenuButton,
  triggerOnHover = false,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleKeyDownMenuButton = useHandleKeyDownMenuButton();
  const { isMenuOpen, toggleMenu, closeMenu, openMenu, menuPopupRef } =
    useMenuPopupContext();
  useOutsideTargetElementOnClick(wrapperRef, closeMenu);
  const handleMouseEnter = () => triggerOnHover && openMenu();
  const handleMouseLeave = () => triggerOnHover && closeMenu();

  return (
    <StyledComponent
      ref={wrapperRef}
      menuPopupOpen={isMenuOpen}
      menuPopupRef={menuPopupRef}
      onClickMenuButton={(e) => {
        toggleMenu();
        onClickMenuButton?.(e);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDownMenuButton={handleKeyDownMenuButton}
      {...props}
    />
  );
};

const Container: React.VFC<OuterProps> = (props) => {
  return (
    <MenuContextProvider>
      <InnerContainer {...props} />
    </MenuContextProvider>
  );
};

export const Menu = Container;
