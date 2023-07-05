import styled from 'styled-components';
import { ComboboxMenuItem } from './ComboboxMenuItem';
import { IdentifiedComboboxOption } from './modules/types';
import { useAdjustAbsolutePosition } from '../../hooks/useAdjustAbsolutePosition';
import { useOutsideTargetElementOnClick } from '../../hooks/useOutsideTargetElementOnClick';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

const DATA_TESTID = 'shared-forms-Combobox-ComboboxMenuPopup';

type Props<T extends string> = {
  id: string;
  options: Array<IdentifiedComboboxOption<T>>;
  selectedValue: T;
  highlightedMenuItemId: string | null;
  highlightMenuItemId: (menuItemId: string) => void;
  onClickMenuItem: (option: IdentifiedComboboxOption<T>) => void;
  onClickOutsideMenuPopup: () => void;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
  shouldNotFireClosePopup: (event: MouseEvent) => boolean;
};

const Component = <T extends string>({
  className,
  id,
  options,
  selectedValue,
  highlightedMenuItemId,
  highlightMenuItemId,
  onClickMenuItem,
  onClickOutsideMenuPopup,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeyDown,
  shouldNotFireClosePopup
}: Props<T> & PropsForStyled) => {
  // 領域外クリックをコンボボックス全体に当てると
  // 一画面にコンボボックスが複数ある場合処理がバッティングするため
  // 一画面に1つしか表示されないポップアップに適用する
  const targetRef = useOutsideTargetElementOnClick<HTMLUListElement>(
    onClickOutsideMenuPopup,
    shouldNotFireClosePopup
  );
  useAdjustAbsolutePosition(targetRef, { enableScrollIfNeeded: true });

  return (
    <ul
      className={className}
      id={id}
      role="listbox"
      ref={targetRef}
      data-testid={DATA_TESTID}
    >
      {options.map((option) => (
        <ComboboxMenuItem
          key={option.id}
          popupElRef={targetRef}
          option={option}
          selected={option.value === selectedValue}
          highlighted={option.id === highlightedMenuItemId}
          highlightMenuItemId={highlightMenuItemId}
          onClickMenuItem={onClickMenuItem}
          listboxOptionFocusedKeyDown={listboxOptionFocusedKeyDown}
          setListboxOptionFocusedKeyDown={setListboxOptionFocusedKeyDown}
        />
      ))}
    </ul>
  );
};

export const BORDER_SIZE_PX = 1;

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  min-width: 280px;
  max-height: 560px;
  overflow-y: auto;
  padding: 8px 0;
  border: ${BORDER_SIZE_PX}px solid ${designTokens.colors.porcelain};
  box-sizing: border-box;
  background-color: ${designTokens.colors.snow};
  box-shadow: 0 5px 10px ${designTokens.colors.transparentBlack10};
  position: absolute;
  z-index: ${designTokens.zIndex.popup};
  margin: 0;
  list-style: none;
`;

const GenericsComponent = <T extends string>(props: Props<T>): JSX.Element => (
  <StyledComponent {...props} />
);

export const ComboboxMenuPopup = GenericsComponent;
