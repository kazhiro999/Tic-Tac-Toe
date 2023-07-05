import React, { useEffect, useRef, AriaAttributes } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { IdentifiedDropdownOption } from './modules/types';
import { BORDER_SIZE_PX } from './DropdownMenuPopup';
// polyfillの読み込む場所を検討 https://github.dev.cybozu.co.jp/kintone/kintone/issues/19541
// webpack.common.jsで読み込むと、StorybookでPolyfillが適用されない
import 'focus-options-polyfill';
import { designTokens } from '../../designTokens';
import { scrollPopupIfNeeded } from '../../functions/scrollPopupIfNeeded';
import { Icon } from '../Icon';
import { MultipleSelectSelectedIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

const DATA_TESTID = 'shared-forms-Dropdown-DropdownMenuItem';

type Props<T extends string> = IdentifiedDropdownOption<T> & {
  liElRef: React.Ref<HTMLLIElement>;
  selected: boolean;
  changeValue: (value: T) => void;
  focused: boolean;
  onKeyDown: React.KeyboardEventHandler<HTMLLIElement>;
  onMouseEnter: React.MouseEventHandler<HTMLLIElement>;
  hidePopup: () => void;
} & Pick<AriaAttributes, 'aria-required'>;

const Component = <T extends string>({
  className,
  label,
  value,
  id,
  liElRef,
  selected,
  changeValue,
  focused,
  onKeyDown,
  onMouseEnter,
  hidePopup,
  'aria-required': ariaRequired
}: Props<T> & PropsForStyled) => {
  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <li
      className={clsx(className, {
        [`${className}__selected`]: selected
      })}
      ref={liElRef}
      role="option"
      aria-selected={selected}
      id={id}
      onClick={() => {
        if (!selected) {
          changeValue(value);
        }
        hidePopup();
      }}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={focused ? 0 : -1}
      data-testid={DATA_TESTID}
      aria-required={ariaRequired}
      title={label}
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
      <span
        className={`${className}__label`}
        data-testid={`${DATA_TESTID}-label`}
      >
        {label}
      </span>
    </li>
  );
};

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }
  line-height: 1.5;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  height: 30px;
  color: ${designTokens.colors.mineShaft};
  font-size: ${designTokens.fonts.size[4]};
  user-select: none;
  cursor: pointer;
  outline: none;

  &:focus {
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
    flex: 0 0 auto;
  }

  &__label {
    flex: 1;
    margin-right: 16px;
    white-space: nowrap;
  }
`;

type OuterProps<T extends string> = IdentifiedDropdownOption<T> & {
  popupElRef: React.RefObject<HTMLUListElement>;
  selected: boolean;
  changeValue: (value: T) => void;
  focused: boolean;
  focusMenuItemId: (menuItemId: string) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLLIElement>;
  hidePopup: () => void;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeyDown: (isFocusedKeyDown: boolean) => void;
} & Pick<AriaAttributes, 'aria-required'>;

const Container = <T extends string>({
  popupElRef,
  focusMenuItemId,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeyDown,
  ...others
}: OuterProps<T>): JSX.Element => {
  const liElRef = useRef<HTMLLIElement>(null);

  const { id, focused } = others;

  // メニュー項目をホバーしたら、その項目をフォーカスする
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
      // メニュー項目をホバーしたら、その項目にフォーカスを移動する。
      // ただしポップアップの境界上の項目（画面内に表示されていないが、
      // 1px分スクロールしたら画面内に表示される項目）の場合は、
      // ポップアップのborderをホバーしただけでMouseEnterイベントが発火し、
      // マウスがborder上にある間連続でフォーカスとスクロールが発生してしまう。
      // そのため、対象の項目が画面に表示されているかチェックする。
      if (
        popupClientRect.top + BORDER_SIZE_PX < liClientRect.bottom &&
        liClientRect.top < popupClientRect.bottom - BORDER_SIZE_PX
      ) {
        focusMenuItemId(id);
      }
    }
  };

  useEffect(() => {
    const popupEl = popupElRef.current;
    const liEl = liElRef.current;
    if (popupEl && liEl && focused) {
      // 項目をフォーカスすると画面内に見えるようにブラウザが自動でスクロールしてくれるが、
      // そのスクロール量はブラウザによってバラバラで、フォーカス位置が安定しない。
      // そのためブラウザの自動スクロールを無効化し、必要な量だけ自前でスクロールする。
      scrollPopupIfNeeded(popupEl, liEl, BORDER_SIZE_PX);
      liEl.focus({ preventScroll: true });
    }
  }, [focused, popupElRef]);

  return (
    <StyledComponent
      liElRef={liElRef}
      onMouseEnter={handleMouseEnter}
      {...others}
    />
  );
};

export const DropdownMenuItem = Container;
