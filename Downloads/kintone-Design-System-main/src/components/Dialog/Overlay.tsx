import * as React from 'react';
import styled from 'styled-components';
import { useOverflowHidden } from '../../hooks/useOverflowHidden';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
};

const handleClick = (event: React.MouseEvent) => {
  // オーバーレイをクリックしたときに、裏側の要素にClickイベントを伝搬させないようにする。
  // useOutsideTargetElementOnClick のようにClickイベントで動作する機能を抑制するため。

  // Reactのイベントハンドラには、ブラウザのネイティブイベントではなく、合成イベントが渡ってくる。
  // https://ja.reactjs.org/docs/events.html

  // Reactの合成イベントを受け取るイベントハンドラを抑制
  event.stopPropagation();

  // ブラウザのネイティブイベントを受け取るイベントハンドラ（例：document.addEventListener）を抑制
  event.nativeEvent.stopImmediatePropagation();
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children
}) => {
  useOverflowHidden();

  return (
    // オーバーレイをクリックしたときに、裏側の要素にClickイベントを伝搬させないようにするハンドラを設定する。
    // jsx-a11y/no-static-element-interactionsを回避するためにdivのroleを上書きする
    <div className={className} onClick={handleClick} role="presentation">
      {children}
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${designTokens.zIndex.dialog};
  background-color: ${designTokens.colors.transparentBlack60};
`;

export const Overlay = StyledComponent;
