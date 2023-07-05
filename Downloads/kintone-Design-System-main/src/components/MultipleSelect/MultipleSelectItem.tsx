import { designTokens } from '../../designTokens';
import clsx from 'clsx';
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { scrollPopupIfNeeded } from '../../functions/scrollPopupIfNeeded';
import { BORDER_SIZE_PX } from '.';
import { Icon } from '../Icon';
import {
  MultipleSelectDisabledIcon,
  MultipleSelectSelectedIcon
} from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

export type IdentifiedMultipleSelectOption = {
  id: string;
  label: string;
  value: string;
};

type Props = IdentifiedMultipleSelectOption & {
  liElRef: React.Ref<HTMLLIElement>;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLLIElement>;
  focused: boolean;
  highlighted: boolean;
  disabled: boolean;
  setHighlightedItemId: (itemId: string | null) => void;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeydown: (isFocusedKeyDown: boolean) => void;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  id,
  label,
  liElRef,
  selected,
  onClick,
  focused,
  highlighted,
  setHighlightedItemId,
  disabled,
  listboxOptionFocusedKeyDown,
  setListboxOptionFocusedKeydown
}) => {
  // 項目をホバーしたら、その項目をハイライトする
  const handleMouseEnter = () => {
    // キーボード操作でListboxOptionにフォーカスしていた場合、MouseEnterを一度だけ無効にする。
    // キーボード操作で画面スクロールが発生した際に、マウスカーソル位置のListboxOptionにフォーカスが奪われるのを回避するため。
    if (listboxOptionFocusedKeyDown) {
      setListboxOptionFocusedKeydown(false);
      return;
    }
    setHighlightedItemId(id);
  };

  // 複数選択がフォーカスされてない状態で項目からホバーを外したら、その項目のハイライトを消す
  const handleMouseLeave = () => {
    if (!focused) {
      setHighlightedItemId(null);
    }
  };

  return (
    <li
      id={id}
      className={clsx(className, {
        [`${className}__selected`]: selected,
        [`${className}__highlighted`]: highlighted,
        [`${className}__disabled`]: disabled
      })}
      ref={liElRef}
      role="option"
      aria-selected={selected}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={!disabled ? handleMouseEnter : undefined}
      onMouseLeave={!disabled ? handleMouseLeave : undefined}
      title={label}
    >
      {selected && (
        <span className={`${className}__icon`}>
          <Icon
            width={13}
            height={11}
            icon={
              disabled ? (
                <MultipleSelectDisabledIcon />
              ) : (
                <MultipleSelectSelectedIcon />
              )
            }
            alternativeText=""
          />
        </span>
      )}
      <span className={`${className}__label`}>{label}</span>
    </li>
  );
};

const PADDING_TOP = '2px';
const PADDING_BOTTOM = '2px';
const MARGIN_BOTTOM = '2px';
const LINE_HEIGHT = `${designTokens.fonts.size[6]}`;
export const MULTIPLE_SELECT_ITEM_HEIGHT_FOR_CSS_CALC = `(${PADDING_TOP} + ${PADDING_BOTTOM} + ${MARGIN_BOTTOM} + ${LINE_HEIGHT})`;

const StyledComponent: React.VFC<Props> = styled(Component)`
  padding: ${PADDING_TOP} 0 ${PADDING_BOTTOM} 16px;
  margin: 0 0 ${MARGIN_BOTTOM} 0;
  display: flex;
  align-items: center;
  color: ${designTokens.colors.mineShaft};
  font-size: ${designTokens.fonts.size[4]};
  line-height: ${LINE_HEIGHT};
  user-select: none;
  cursor: pointer;
  overflow: hidden;
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

  &__selected {
    color: ${designTokens.colors.curiousBlue};
  }

  &__highlighted {
    background-color: ${designTokens.colors.solitude};
  }

  &__icon {
    padding-right: 3px;
  }

  &__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__disabled {
    background-color: ${designTokens.colors.iron};
    box-shadow: none;
    cursor: not-allowed;
    color: ${designTokens.colors.gray};
  }
`;

type OuterProps = IdentifiedMultipleSelectOption & {
  popupElRef: React.RefObject<HTMLUListElement>;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLLIElement>;
  focused: boolean;
  highlighted: boolean;
  disabled: boolean;
  setHighlightedItemId: (itemId: string | null) => void;
  listboxOptionFocusedKeyDown: boolean;
  setListboxOptionFocusedKeydown: (isFocusedKeyDown: boolean) => void;
};

const Container = ({
  popupElRef,
  highlighted,
  ...others
}: OuterProps): JSX.Element => {
  const liElRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const popupEl = popupElRef.current;
    const liEl = liElRef.current;
    if (popupEl && liEl && highlighted) {
      // 画面外の項目にハイライトすると見えなくなってしまうので、
      // ハイライトが当たってる項目に必要な量だけ自前でスクロールする。
      scrollPopupIfNeeded(popupEl, liEl, BORDER_SIZE_PX);
    }
  });

  return (
    <StyledComponent liElRef={liElRef} highlighted={highlighted} {...others} />
  );
};

export const MultipleSelectItem = Container;
