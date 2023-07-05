import React, { AriaAttributes, useRef, useEffect } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { designTokens } from '../../designTokens';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Color = 'primary' | 'normal' | 'delete';
type Size = 'large' | 'medium' | 'small';

type Props = {
  buttonRef: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color?: Color;
  size?: Size;
} & PropsForDataTestId &
  AriaAttributes;

export const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonRef,
  children,
  onClick,
  disabled,
  color = 'normal',
  size = 'large',
  'data-testid': dataTestId,
  ...others
}) => (
  <button
    className={clsx(
      className,
      `${className}__${color}`,
      `${className}__${size}`
    )}
    ref={buttonRef}
    type="button"
    onClick={onClick}
    disabled={disabled}
    data-testid={dataTestId}
    {...others}
  >
    {children}
  </button>
);

export const StyledComponent: React.VFC<Props> = styled(Component)`
  text-align: center;
  margin: 0;
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
  cursor: pointer;
  line-height: 1.5;

  &__normal {
    color: ${designTokens.colors.curiousBlue};
    background-color: ${designTokens.colors.aquaHaze};
    border: 1px solid ${designTokens.colors.porcelain};

    // focus-visibleが現在safariが非対応の為、hoverの記述を分けて書く
    &:hover {
      background-color: ${designTokens.colors.darkenAquaHaze15};
    }
    &:focus-visible {
      background-color: ${designTokens.colors.darkenAquaHaze15};
    }
  }

  &__primary {
    color: ${designTokens.colors.snow};
    background-color: ${designTokens.colors.curiousBlue};
    border: 1px solid ${designTokens.colors.porcelain};

    // focus-visibleが現在safariが非対応の為、hoverの記述を分けて書く
    &:hover {
      background-color: ${designTokens.colors.darkenCuriousBlue15};
    }
    &:focus-visible {
      background-color: ${designTokens.colors.darkenCuriousBlue15};
    }
  }

  &__delete {
    color: ${designTokens.colors.snow};
    background-color: ${designTokens.colors.cinnabar};
    border: 1px solid ${designTokens.colors.porcelain};

    // focus-visibleが現在safariが非対応の為、hoverの記述を分けて書く
    &:hover {
      background-color: ${designTokens.colors.thunderbird};
    }
    &:focus-visible {
      background-color: ${designTokens.colors.thunderbird};
    }
  }

  &:disabled {
    cursor: default;
    color: ${designTokens.colors.gray};
    background-color: ${designTokens.colors.iron};
    border: 1px solid ${designTokens.colors.porcelain};
  }

  // focus-visibleが現在safariが非対応の為、記述を分けて書く
  &:disabled:hover {
    background-color: ${designTokens.colors.iron};
  }

  &:disabled:focus-visible {
    background-color: ${designTokens.colors.iron};
  }

  &__large {
    padding: 0 16px;
    height: 48px;
    min-width: 160px;
    font-size: ${designTokens.fonts.size[5]};
  }

  &__medium {
    padding: 0 16px;
    height: 40px;
    min-width: 120px;
    font-size: ${designTokens.fonts.size[5]};
  }

  &__small {
    padding: 0 8px;
    height: 36px;
    min-width: 96px;
    font-size: ${designTokens.fonts.size[2]};
  }
`;

type OuterProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color?: Color;
  size?: Size;
  shouldFocus?: boolean;
  // @deprecated onBlurを利用してください
  clearShouldFocus?: () => void;
} & PropsForDataTestId &
  AriaAttributes;

export type ButtonProps = OuterProps;

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

export const Button = Container;
