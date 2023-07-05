import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { designTokens } from '../../../designTokens';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  id: string;
  label: string;
  displayedInTheCenter: boolean;
  handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  handleMouseEnter: React.MouseEventHandler<HTMLButtonElement>;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonRef,
  id,
  label,
  displayedInTheCenter,
  handleKeyDown,
  handleClick,
  handleMouseEnter
}) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.scrollIntoView && displayedInTheCenter) {
      ref.current.scrollIntoView({
        block: 'center'
      });
    }
  }, [displayedInTheCenter]);

  return (
    <li className={className} role="presentation" ref={ref}>
      <button
        className={clsx(`${className}__item`)}
        ref={buttonRef}
        type="button"
        id={id}
        role="menuitem"
        onKeyDown={handleKeyDown}
        onClick={(e) => {
          handleClick(e, id);
        }}
        onMouseEnter={handleMouseEnter}
        tabIndex={-1}
      >
        {label}
      </button>
    </li>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  margin: 0;
  padding: 0;

  &__item {
    display: block;
    appearance: none;
    border: 0;
    background: transparent;
    outline: none;
    flex-grow: 1;
    margin: 0;
    padding: 0 24px;
    height: 30px;
    color: ${designTokens.colors.mineShaft};
    text-align: left;
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
  }

  &:focus-within {
    background: ${designTokens.colors.solitude};
  }
`;

type outerProps = {
  id: string;
  label: string;
  displayedInTheCenter: boolean;
  focused: boolean;
  setFocusedOptionId: (value: string) => void;
  handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  menuitemFocusedKeyDown: boolean;
  setMenuitemFocusedKeydown: (isFocusedKeyDown: boolean) => void;
};

const Container: React.VFC<outerProps> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    id,
    focused,
    setFocusedOptionId,
    menuitemFocusedKeyDown,
    setMenuitemFocusedKeydown
  } = props;

  const handleMouseEnter = () => {
    // キーボード操作でMenuitemにフォーカスしていた場合、MouseEnterを一度だけ無効にする。
    // キーボード操作で画面スクロールが発生した際に、マウスカーソル位置のMenuitemにフォーカスが奪われるのを回避するため。
    if (menuitemFocusedKeyDown) {
      setMenuitemFocusedKeydown(false);
      return;
    }
    buttonRef.current && setFocusedOptionId(id);
  };

  useEffect(() => {
    if (focused && buttonRef.current) buttonRef.current.focus();
  }, [focused, buttonRef]);

  return (
    <StyledComponent
      buttonRef={buttonRef}
      handleMouseEnter={handleMouseEnter}
      {...props}
    />
  );
};

export const TimePickerItem = Container;
