import React, { AriaAttributes, useRef, useEffect } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { designTokens } from '../../designTokens';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Color = 'primary' | 'danger';

type Props = {
  buttonRef: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color?: Color;
} & PropsForDataTestId &
  AriaAttributes;

export const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonRef,
  children,
  onClick,
  color = 'primary',
  'data-testid': dataTestId,
  ...others
}) => (
  <button
    className={clsx(className, `${className}__${color}`)}
    ref={buttonRef}
    type="button"
    onClick={onClick}
    data-testid={dataTestId}
    {...others}
  >
    {children}
  </button>
);

export const StyledComponent: React.VFC<Props> = styled(Component)`
  min-width: 120px;
  height: 40px;
  text-align: center;
  margin: 0;
  padding: 0;
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
  font-size: ${designTokens.fonts.size[4]};
  cursor: pointer;
  line-height: 1.5;

  &__primary {
    color: ${designTokens.colors.curiousBlue};
    background-color: transparent;
    border: none;

    // focus-visibleが現在safariが非対応の為、hoverの記述を分けて書く
    &:hover {
      color: ${designTokens.colors.darkenCuriousBlue10};
    }
    &:focus-visible {
      color: ${designTokens.colors.darkenCuriousBlue10};
    }
  }

  &__danger {
    color: ${designTokens.colors.thunderbird};
    background-color: transparent;
    border: none;

    // focus-visibleが現在safariが非対応の為、hoverの記述を分けて書く
    &:hover {
      color: ${designTokens.colors.darkenThunderbird10};
    }
    &:focus-visible {
      color: ${designTokens.colors.darkenThunderbird10};
    }
  }
`;

type OuterProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  color?: Color;
  shouldFocus?: boolean;
  // @deprecated onBlurを利用してください
  clearShouldFocus?: () => void;
} & PropsForDataTestId &
  AriaAttributes;

export type TextButtonProps = OuterProps;

const Container: React.VFC<OuterProps> = (props) => {
  const { shouldFocus, clearShouldFocus, ...otherProps } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current && shouldFocus) {
      buttonRef.current.focus();
      // TODO deprecatedが浸透したら削除
      if (clearShouldFocus) {
        clearShouldFocus();
      }
    }
  }, [clearShouldFocus, shouldFocus]);

  return <StyledComponent buttonRef={buttonRef} {...otherProps} />;
};

export const TextButton = Container;
