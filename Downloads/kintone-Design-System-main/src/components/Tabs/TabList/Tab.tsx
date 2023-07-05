import * as React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { designTokens } from '../../../designTokens';
import { PropsForStyled } from '../../../typings/propsForStyled';
import { usePrevious } from '../../../hooks/usePrevious';

type Props = {
  id: string;
  label: string;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  width?: number;
};

// タブを作るためにbutton要素を横に並べた場合、スクリーンリーダーがタブを連続で読み上げてしまい聞き取りづらい
// レイアウトのためのタグ(li)で囲うことで連続でよみあげされないようにしている
// https://bozuman.cybozu.com/k/#/space/5794/thread/45990/2495629/3715103
const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  id,
  label,
  selected,
  onClick,
  onKeyDown
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const prevSelected = usePrevious(selected);
  React.useEffect(() => {
    // 初期表示時はfocusせずに、ユーザー操作による切り替えでfocusする (初期表示ではprevSelectedがundefinedになる)
    if (prevSelected === false && selected === true) {
      ref.current?.focus();
    }
  }, [prevSelected, selected]);
  return (
    <li className={className} role="presentation">
      <button
        ref={ref}
        type="button"
        role="tab"
        id={id}
        aria-selected={selected}
        className={clsx(`${className}__button`, {
          [`${className}__button-selected`]: selected
        })}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={selected ? 0 : -1}
      >
        {label}
      </button>
    </li>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  position: relative; // Tab を TabContents に当てた box-shadow より前面に出す

  &__button {
    min-width: ${({ width }) => (width !== undefined ? `${width}px` : '128px')};
    height: 48px;
    margin: 0;
    padding: 0 24px;
    background-color: ${designTokens.colors.iron};
    color: ${designTokens.colors.mineShaft};
    border-style: none;
    border-top: 1px solid ${designTokens.colors.darkenIron05};
    border-left: 1px solid ${designTokens.colors.darkenIron05};
    box-shadow: 1px 0 3px ${designTokens.colors.darkenIron05} inset;
    cursor: pointer;
    font-size: ${designTokens.fonts.size[5]};
    line-height: 1.5;
    word-wrap: break-word;
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

    &:last-of-type {
      border-right: 1px solid ${designTokens.colors.darkenIron05};
    }

    &-selected {
      background-color: ${designTokens.colors.snow};
      box-shadow: none;
    }
  }
`;

export const Tab = StyledComponent;
