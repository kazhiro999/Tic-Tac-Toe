/**
 * こちらのHooksを呼び出したコンポーネントが表示されている間、 body要素のスクロールバーを非表示にするカスタムHooks
 */
import { useEffect } from 'react';

import { getDocumentHead } from '../functions/document';

const setOverflowHidden = () => {
  const styleEl = document.createElement('style');
  styleEl.innerText = 'body {overflow: hidden}';
  getDocumentHead().append(styleEl);

  const restoreOverflow = () => {
    styleEl.remove();
  };
  return restoreOverflow;
};

export const useOverflowHidden = () => {
  useEffect(() => {
    const restoreOverflow = setOverflowHidden();
    return () => restoreOverflow();
  }, []);
};
