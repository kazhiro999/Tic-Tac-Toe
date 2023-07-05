/**
 * 特定の領域外をクリックしたときにcallbackを実行するカスタムHooks
 */
import React, { useEffect, useRef } from 'react';
import { getDocumentElement } from '../functions/document';

export const useOutsideTargetElementOnClick = <T extends HTMLElement>(
  callback: () => void,
  shouldNotFireCallback?: (event: MouseEvent) => boolean
): React.MutableRefObject<T | null> => {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const handleClickDocument = (event: MouseEvent) => {
      const targetEl = targetRef.current;
      const clickedNode = event.target as Node;
      // targetEl が null または event.target が document 下に存在しないとき即時 return する。
      if (targetEl === null || !getDocumentElement().contains(clickedNode)) {
        return;
      }

      // event.target が element の子孫ノードではない場合に callback 関数を実行する。
      if (
        !targetEl.contains(clickedNode) &&
        (!shouldNotFireCallback || !shouldNotFireCallback(event))
      ) {
        callback();
      }
    };

    // ダイアログを閉じた後にポップアップを開けなくなる問題があったので、非同期実行することで回避
    // https://github.dev.cybozu.co.jp/kintone/kintone/issues/19382
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickDocument, {
        capture: true
      });
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickDocument, {
        capture: true
      });
    };
  }, [callback, shouldNotFireCallback]);

  return targetRef;
};
