import * as React from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { IdentifiedComboboxOption } from './modules/types';
import { BORDER_SIZE_PX } from './ComboboxMenuPopup';
// polyfillの読み込む場所を検討 https://github.dev.cybozu.co.jp/kintone/kintone/issues/19541
// webpack.common.jsで読み込むと、StorybookでPolyfillが適用されない
import 'focus-options-polyfill';
import { isTestBuild } from '../../functions/isTestBuild';
import { designTokens } from '../../designTokens';
import { scrollPopupIfNeeded } from '../../functions/scrollPopupIfNeeded';
import { Icon } from '../Icon';
import { MultipleSelectSelectedIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

export const DATA_TESTID = 'combobox-highlighted-menu-item';

type Props<T extends string> = {
  option: IdentifiedComboboxOption<T>;
  liElRef: React.Ref<HTMLLIElement>;
  selected: boolean;
  highlighted: boolean;
  onMouseEnter: React.MouseEventHandler<HTMLLIElement>;
  onClickMenuItem: (option: IdentifiedComboboxOption<T>) => void;
} & Pick<React.AriaAttributes, 'aria-required'>;

const Component = <T extends string>({
  className,
  option,
  liElRef,
  selected,
  highlighted,
  onMouseEnter,
  onClickMenuItem,
  'aria-required': ariaRequired
}: Props<T> & PropsForStyled) => {
  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <li
      className={clsx(className, {
        [`${className}__selected`]: selected,
        [`${className}__highlighted`]: highlighted
      })}
      ref={liElRef}
      role="option"
      aria-selected={selected}
      id={option.id}
      onClick={() => {
        onClickMenuItem(option);
      }}
      onMouseEnter={onMouseEnter}
      data-testid={highlighted ? DATA_TESTID : undefined}
      aria-required={ariaRequired}
    >
      <span className={`${className}__icon`}>
        {selected && (
          <Icon
            width={13}
            height={11}
            icon={<MultipleSelectSelectedIcon />}
            alternativeText=""
          />
        )}
      </span>
      <span className={`${className}__label`}>{option.label}</span>
    </li>
  );
};

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  display: flex;
  align-items: center;
  height: 30px;
  color: ${designTokens.colors.mineShaft};
  font-size: ${designTokens.fonts.size[4]};
  user-select: none;
  cursor: pointer;
  outline: none;
  margin: 0;
  padding: 0;

  &__highlighted {
    background-color: ${designTokens.colors.solitude};
  }

  &__selected {
    color: ${designTokens.colors.curiousBlue};
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
  }

  &__label {
    flex: 1;
    margin-right: 16px;
    white-space: nowrap;
  }
`;

type OuterProps<T extends string> = {
  option: IdentifiedComboboxOption<T>;
  popupElRef: React.RefObject<HTMLUListElement>;
  selected: boolean;
  highlighted: boolean;
  highlightMenuItemId: (menuItemId: string) => void;
  onClickMenuItem: (option: IdentifiedComboboxOption<T>) => void;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
} & Pick<React.AriaAttributes, 'aria-required'>;

const Container = <T extends string>({
  option,
  highlighted,
  popupElRef,
  highlightMenuItemId,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeyDown,
  ...others
}: OuterProps<T>): JSX.Element => {
  const liElRef = useRef<HTMLLIElement>(null);

  // メニュー項目をホバーしたら、その項目をハイライトする
  const handleMouseEnter = () => {
    // キーボード操作でListboxOptionにフォーカスしていた場合、MouseEnterを一度だけ無効にする。
    // キーボード操作で画面スクロールが発生した際に、マウスカーソル位置のListboxOptionにフォーカスが奪われるのを回避するため。
    if (listboxOptionFocusedKeyDown) {
      setListboxOptionFocusedKeyDown(false);
      return;
    }
    const popupEl = popupElRef.current;
    const liEl = liElRef.current;
    if (popupEl && liEl) {
      const popupClientRect = popupEl.getBoundingClientRect();
      const liClientRect = liEl.getBoundingClientRect();
      // メニュー項目をホバーしたら、その項目にハイライトを移動する。
      //
      // ただしポップアップの境界上の項目（画面内に表示されていないが、
      // 1px分スクロールしたら画面内に表示される項目）の場合は、
      // ポップアップのborderをホバーしただけでMouseEnterイベントが発火し、
      // マウスがborder上にある間連続でハイライトとスクロールが発生してしまう。
      // そのため、対象の項目が画面に表示されているかチェックする。
      if (
        isTestBuild() ||
        (popupClientRect.top + BORDER_SIZE_PX < liClientRect.bottom &&
          liClientRect.top < popupClientRect.bottom - BORDER_SIZE_PX)
      ) {
        highlightMenuItemId(option.id);
      }
    }
  };

  useEffect(() => {
    const popupEl = popupElRef.current;
    const liEl = liElRef.current;
    if (popupEl && liEl && highlighted) {
      // 画面外の項目にハイライトすると見えなくなってしまうので、
      // ハイライトが当たってる項目に必要な量だけ自前でスクロールする。
      scrollPopupIfNeeded(popupEl, liEl, BORDER_SIZE_PX);
    }
  }, [highlighted, popupElRef]);

  return (
    <StyledComponent
      option={option}
      highlighted={highlighted}
      liElRef={liElRef}
      onMouseEnter={handleMouseEnter}
      {...others}
    />
  );
};

export const ComboboxMenuItem = Container;
