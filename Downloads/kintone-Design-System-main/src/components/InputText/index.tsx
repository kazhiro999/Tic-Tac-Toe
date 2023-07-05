/**
 * @fileoverview シンプルな入力フォームコンポーネント
 * FormFieldLabelやFormFieldMessageなど、他のコンポーネントと組み合わせることで、様々な入力フォームを表現できる。
 * 主に、InputTextFieldで要件を満たせない場合に利用する。
 */

import * as React from 'react';
import { useEffect, useRef, AriaAttributes, AriaRole } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Height = 'small' | 'medium';
export type InputTextHeight = Height;

type Props = {
  /**
   * InputTextの入力値。
   */
  value: string;
  /**
   * changeイベント発生時のコールバック。引数の<code>value</code>はInputTextの入力値です。
   */
  changeValue: (value: string) => void;
  /**
   * 入力か必須かどうか。
   */
  required?: boolean;
  /**
   * 入力値が正常なら<code>true</code>、不正なら<code>false</code>にします。
   * <code>false</code>の場合、<code>aria-invalid="true"</code>となり、スクリーンリーダーが不正な値であることを読み上げます。
   */
  valid?: boolean;
  /**
   * InputTextクリック時のコールバック。
   */
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  /**
   * キー押下時のコールバック。キーボード操作を実装する場合に使います。
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * <code>true</code>にするとInputTextにフォーカスがあたります。
   */
  shouldFocus?: boolean;
  /**
   * InputTextフォーカス時のコールバック。
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * InputTextからフォーカスを外したときのコールバック。
   * 主に<code>shouldFocus: true</code>でフォーカスした後に、<code>shouldFocus: false</code>にするために使います。
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * <code>shouldFocus: true</code>の副作用をリセットするためのコールバック。
   *
   * @deprecated onBlurを利用してください。
   */
  clearShouldFocus?: () => void;
  /**
   * Value を選択状態にします。
   */
  shouldSelect?: boolean;
  /**
   * <code>role</code>属性の値。
   */
  role?: AriaRole;
  /**
   * Placeholderの表示文字列。
   */
  placeholder?: string;
  /**
   * Value の水平方向の表示位置を指定します。
   */
  align?: React.CSSProperties['textAlign'];
  /**
   * InputTextの高さ。
   * <code>'small'</code>は32px、<code>'medium'</code>は40px。
   */
  height?: Height;
  /**
   * <code>inputmode</code>属性の値。
   */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  /**
   * <code>pattern</code>属性の値。
   */
  pattern?: React.InputHTMLAttributes<HTMLInputElement>['pattern'];
  /**
   * Disabled状態。
   */
  disabled?: boolean;
} & AriaAttributes;

export type InputTextProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  value,
  changeValue,
  required = false,
  valid = true,
  onClick,
  onKeyDown,
  shouldFocus = false,
  onFocus,
  onBlur,
  clearShouldFocus,
  shouldSelect = false,
  role,
  placeholder,
  inputMode,
  pattern,
  disabled,
  ...ariaAttributes
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(event.target.value);
  };

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current !== null && shouldFocus) {
      ref.current.focus();
      if (shouldSelect) {
        ref.current.select();
      }
      // TODO deprecatedが浸透したら削除
      if (clearShouldFocus) {
        clearShouldFocus();
      }
    }
  }, [clearShouldFocus, shouldFocus, shouldSelect]);

  return (
    <input
      className={clsx(className, { [`${className}__disabled`]: disabled })}
      type="text"
      ref={ref}
      value={value}
      onChange={handleChange}
      required={required}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      role={role}
      placeholder={placeholder}
      inputMode={inputMode}
      pattern={pattern}
      disabled={disabled}
      {...ariaAttributes}
      aria-invalid={!valid ? 'true' : undefined}
    />
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  width: 100%;
  height: ${({ height }) => (height === 'medium' ? '40px' : '32px')};
  box-sizing: border-box;
  box-shadow: 2px 2px 4px ${designTokens.colors.wildSand} inset,
    -2px -2px 4px ${designTokens.colors.wildSand} inset;
  border: 1px solid ${designTokens.colors.porcelain};
  background-color: ${designTokens.colors.snow};
  color: ${designTokens.colors.mineShaft};
  font-size: ${designTokens.fonts.size[4]};

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
  padding: 0 8px;
  margin: 0;
  text-align: ${({ align }) => align};

  &:focus {
    background-color: ${designTokens.colors.solitude};
    box-shadow: none;
  }

  &__disabled {
    background-color: ${designTokens.colors.iron};
    box-shadow: none;
    color: ${designTokens.colors.gray};
    cursor: not-allowed;
  }
`;

export const InputText = StyledComponent;
