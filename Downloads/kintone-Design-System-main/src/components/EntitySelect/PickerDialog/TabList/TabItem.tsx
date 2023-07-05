import * as React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { designTokens } from '../../../../designTokens';
import { PropsForStyled } from '../../../../typings/propsForStyled';
import { usePrevious } from '../../../../hooks/usePrevious';

type Props = {
  buttonRef: React.Ref<HTMLButtonElement>;
  label: string;
  selected: boolean;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonRef,
  label,
  selected,
  onKeyDown,
  onClick
}) => (
  <li role="presentation" className={className}>
    <button
      className={clsx(`${className}__button`, {
        [`${className}__button-selected`]: selected
      })}
      ref={buttonRef}
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  margin: 0;
  padding: 0;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 160px;
    padding: 0;
    background-color: ${designTokens.colors.iron};
    border-width: 1px 1px 0 0;
    border-style: solid;
    border-color: ${designTokens.colors.transparentGray20};
    box-shadow: 1px 0 3px ${designTokens.colors.transparentGray20} inset;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    :lang(en) & {
      font-family: ${designTokens.fonts.family.en};
    }
    font-size: ${designTokens.fonts.size[5]};
    line-height: 1.5;

    &-selected {
      background-color: ${designTokens.colors.snow};
      box-shadow: none;
    }
  }
`;

type OuterProps = {
  label: string;
  selected: boolean;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Container: React.VFC<OuterProps> = ({ ...others }) => {
  const { selected } = others;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const prevSelected = usePrevious(selected);

  React.useEffect(() => {
    // 左右キーで選択済みのタブを移動したときにフォーカス位置を追従させるため、選択済みのタブにフォーカスを移動させる
    // 初期表示時はfocusせずに、ユーザー操作による切り替えでfocusする (初期表示ではprevSelectedがundefinedになる)
    if (prevSelected === false && selected === true) {
      buttonRef.current?.focus();
    }
  }, [prevSelected, selected]);

  return <StyledComponent buttonRef={buttonRef} {...others} />;
};

export const TabItem = Container;
