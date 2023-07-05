import React, { AriaAttributes } from 'react';
import styled from 'styled-components';
import { DropdownMenuItem } from './DropdownMenuItem';
import { useOutsideTargetElementOnClick } from '../../../../hooks/useOutsideTargetElementOnClick';
import { useAdjustAbsolutePosition } from '../../../../hooks/useAdjustAbsolutePosition';
import { designTokens } from '../../../../designTokens';
import type { DropdownOption } from '../../modules/types';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  options: DropdownOption[];
  selectedValue: string;
  changeValue: (value: string) => void;
  focusedValue: string;
  focusValue: (value: string) => void;
  onKeyDownMenuItem: React.KeyboardEventHandler<HTMLLIElement>;
  hidePopup: () => void;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
  shouldNotFireClosePopup: (event: MouseEvent) => boolean;
} & Pick<AriaAttributes, 'aria-required'>;

const Component = ({
  className,
  options,
  selectedValue,
  changeValue,
  focusValue,
  focusedValue,
  onKeyDownMenuItem,
  hidePopup,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeyDown,
  shouldNotFireClosePopup,
  'aria-required': ariaRequired
}: Props & PropsForStyled) => {
  const targetRef = useOutsideTargetElementOnClick<HTMLUListElement>(
    hidePopup,
    shouldNotFireClosePopup
  );

  useAdjustAbsolutePosition(targetRef, { enableScrollIfNeeded: true });

  return (
    <ul className={className} role="listbox" ref={targetRef}>
      {options.map((option) => (
        <DropdownMenuItem
          key={option.value}
          popupElRef={targetRef}
          {...option}
          selected={option.value === selectedValue}
          changeValue={changeValue}
          focused={option.value === focusedValue}
          focusValue={focusValue}
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

const StyledComponent: (props: Props) => JSX.Element = styled(Component)`
  list-style: none;
  min-width: 280px;
  width: auto;
  max-height: 300px;
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

const GenericsComponent = (props: Props): JSX.Element => (
  <StyledComponent {...props} />
);

export const DropdownMenuPopup = GenericsComponent;
