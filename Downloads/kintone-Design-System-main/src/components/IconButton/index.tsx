import clsx from 'clsx';
import React, {
  AriaAttributes,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react';
import styled from 'styled-components';
import { useIconStyle } from '../../hooks/useIconStyle';
import { Icon } from '../Icon';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

/**
 * @fileoverview 画像付きのボタンを表示するコンポーネント
 */

type Props = {
  buttonRef: React.Ref<HTMLButtonElement>;
  alternativeText: string;
  hasButtonTitle?: boolean;
  width: number;
  height: number;
  iconWidth: number;
  iconHeight: number;
  icon?: React.ReactNode;
  iconUrl?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  tabIndex?: number;
  rotate?: number;
  hideOutline?: boolean;
  role?: string;
  onFocus: React.FocusEventHandler<HTMLButtonElement>;
  onBlur: React.FocusEventHandler<HTMLButtonElement>;
  onMouseEnter: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
} & AriaAttributes &
  PropsForDataTestId;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  'data-testid': dataTestId,
  buttonRef,
  alternativeText,
  hasButtonTitle = true,
  width,
  height,
  iconWidth,
  iconHeight,
  icon,
  iconUrl,
  type = 'button',
  tabIndex,
  rotate,
  hideOutline = false,
  role,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  ...others
}) => (
  <button
    ref={buttonRef}
    className={clsx(className, {
      [`${className}__outline-hidden`]: hideOutline
    })}
    type={type}
    title={hasButtonTitle ? alternativeText : undefined}
    onFocus={onFocus}
    onBlur={onBlur}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    onKeyDown={onKeyDown}
    tabIndex={tabIndex}
    role={role}
    data-testid={dataTestId}
    {...others}
  >
    <Icon
      alternativeText={alternativeText}
      width={iconWidth}
      height={iconHeight}
      icon={icon}
      iconUrl={iconUrl}
      rotate={rotate}
    />
  </button>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border-style: none;
  background-color: transparent;
  cursor: pointer;

  &__outline-hidden {
    outline: none;
  }
`;

type OuterProps = {
  alternativeText: string;
  width: number;
  height: number;
  iconWidth: number;
  iconHeight: number;
  icon?: React.ReactNode;
  iconUrl?: string;
  hoverIconUrl?: string;
  className?: string;
  hasButtonTitle?: boolean;
  hoverIcon?: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  tabIndex?: number;
  rotate?: number;
  role?: string;
  hideOutline?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  shouldFocus?: boolean;
  // @deprecated onBlurを利用してください
  clearShouldFocus?: () => void;
} & AriaAttributes &
  PropsForDataTestId;

export type IconButtonProps = OuterProps;

// eslint-disable-next-line react/display-name
const Container = React.forwardRef<HTMLButtonElement, OuterProps>(
  (props, ref) => {
    const {
      onMouseEnter,
      onMouseLeave,
      onClick,
      onFocus,
      onBlur,
      shouldFocus,
      clearShouldFocus,
      role,
      icon,
      iconUrl,
      hoverIcon,
      hoverIconUrl,
      ...buttonProps
    } = props;
    const { isHoveredStyle, handlers } = useIconStyle({
      onMouseEnter,
      onMouseLeave
    });

    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
      ref,
      () => buttonRef.current
    );

    useEffect(() => {
      if (buttonRef.current !== null && shouldFocus) {
        buttonRef.current.focus();
        // TODO deprecatedが浸透したら削除
        if (clearShouldFocus) {
          clearShouldFocus();
        }
      }
    }, [clearShouldFocus, shouldFocus]);

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      buttonRef.current?.focus(); // 2022年4月5日現在 Safari で button をクリックしたときにフォーカスが body に移動するため、強制的に button にフォーカスさせる。
      onClick && onClick(e);
    };

    return (
      <StyledComponent
        buttonRef={buttonRef}
        onClick={onButtonClick}
        role={role}
        icon={isHoveredStyle && hoverIcon ? hoverIcon : icon}
        iconUrl={isHoveredStyle && hoverIconUrl ? hoverIconUrl : iconUrl}
        {...handlers}
        {...buttonProps}
      />
    );
  }
);

export const IconButton = Container;
