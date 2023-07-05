import React, { AriaAttributes, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { DropdownMenuItem } from './DropdownMenuItem';
import { IdentifiedDropdownOption } from './modules/types';
import { useOutsideTargetElementOnClick } from '../../hooks/useOutsideTargetElementOnClick';
import { useAdjustAbsolutePosition } from '../../hooks/useAdjustAbsolutePosition';
import { useAdjustSpecifiedPlacement } from '../../hooks/useAdjustSpecifiedPlacement';
import { designTokens } from '../../designTokens';
import { getWidth } from './modules/functions';
import { type Placement } from '../../models/placement';
import { setScrollEnabled } from '../../functions/setScrollEnabled';
import { PropsForStyled } from '../../typings/propsForStyled';

const DATA_TESTID = 'shared-forms-Dropdown-DropdownMenuPopup';

type Props<T extends string> = {
  options: Array<IdentifiedDropdownOption<T>>;
  selectedValue: T;
  changeValue: (value: T) => void;
  focusedMenuItemId: string;
  focusMenuItemId: (menuItemId: string) => void;
  onKeyDownMenuItem: React.KeyboardEventHandler<HTMLLIElement>;
  hidePopup: () => void;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
  shouldNotFireClosePopup: (event: MouseEvent) => boolean;
  defaultHeight?: number;
  width?: number | '100%';
  maxWidth?: number | '100%';
  isMenuPopupSameWidth?: boolean;
  placement?: Placement;
} & Pick<AriaAttributes, 'aria-required'>;

const Component = <T extends string>({
  className,
  options,
  selectedValue,
  changeValue,
  focusedMenuItemId,
  focusMenuItemId,
  onKeyDownMenuItem,
  hidePopup,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeyDown,
  shouldNotFireClosePopup,
  placement,
  'aria-required': ariaRequired
}: Props<T> & PropsForStyled) => {
  const targetRef = useOutsideTargetElementOnClick<HTMLUListElement>(
    hidePopup,
    shouldNotFireClosePopup
  );

  if (placement) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAdjustSpecifiedPlacement(targetRef, {
      enableScrollIfNeeded: true,
      placement
    });
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAdjustAbsolutePosition(targetRef, { enableScrollIfNeeded: true });
  }
  // useAdjustSpecifiedPlacement, useAdjustAbsolutePosition内部でuseLayoutEffectを利用しているのであわせてuseLayoutEffectを使う
  useLayoutEffect(() => {
    if (!targetRef.current) return;
    setScrollEnabled(targetRef.current, true);
  }, [options.length, targetRef]);

  return (
    <ul
      className={className}
      role="listbox"
      ref={targetRef}
      data-testid={DATA_TESTID}
    >
      {options.map((option, index) => (
        <DropdownMenuItem
          key={option.id}
          popupElRef={targetRef}
          {...option}
          selected={option.value === selectedValue}
          changeValue={changeValue}
          focused={option.id === focusedMenuItemId}
          focusMenuItemId={focusMenuItemId}
          onKeyDown={onKeyDownMenuItem}
          hidePopup={hidePopup}
          listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
          setListboxOptionFocusedKeyDown={setListboxOptionFocusedKeyDown}
          aria-required={ariaRequired}
        />
      ))}
    </ul>
  );
};

export const BORDER_SIZE_PX = 1;

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  list-style: none;
  min-width: 280px;
  max-width: ${({ isMenuPopupSameWidth, maxWidth }) =>
    isMenuPopupSameWidth && maxWidth ? getWidth(maxWidth) : `unset`};
  width: ${({ isMenuPopupSameWidth, width }) =>
    isMenuPopupSameWidth && width ? getWidth(width) : `auto`};
  height: ${({ defaultHeight }) =>
    defaultHeight !== undefined ? defaultHeight + 'px' : undefined};
  overflow-y: auto;
  margin: 0;
  padding: 8px 0;
  border: ${BORDER_SIZE_PX}px solid ${designTokens.colors.porcelain};
  box-sizing: border-box;
  background-color: ${designTokens.colors.snow};
  box-shadow: 0 5px 10px ${designTokens.colors.transparentBlack10};
  position: absolute;
  z-index: ${designTokens.zIndex.popup};
`;

const GenericsComponent = <T extends string>(props: Props<T>): JSX.Element => (
  <StyledComponent {...props} />
);

export const DropdownMenuPopup = GenericsComponent;
