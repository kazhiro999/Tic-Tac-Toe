import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

const handleUIEvent = (event: React.UIEvent) => {
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
  'data-testid': dataTestId,
  children
}) => (
  // オーバーレイをクリックしたときに、裏側の要素にClickイベントを伝搬させないようにするハンドラを設定する。
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={className}
    onClick={handleUIEvent}
    onKeyDown={handleUIEvent}
    data-testid={dataTestId}
  >
    {children}
  </div>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${designTokens.zIndex.loading};
`;

export const Overlay = StyledComponent;
