import { useRef, useEffect } from 'react';
import { getDocumentBody } from '../../functions/document';

const dataIdPrefix = 'data-kintone-ui-aria-hidden-';

const setAriaHidden = (child: Element, dataId: string) => {
  const ariaHidden = child.getAttribute('aria-hidden');
  child.setAttribute(dataId, ariaHidden || 'null');
  child.setAttribute('aria-hidden', 'true');
};
const removeAriaHidden = (child: Element, dataId: string) => {
  const previousAriaHidden = child.getAttribute(dataId);
  child.removeAttribute(dataId);

  if (!previousAriaHidden || previousAriaHidden === 'null') {
    child.removeAttribute('aria-hidden');
    return;
  }

  child.setAttribute('aria-hidden', previousAriaHidden);
};

// アクセシビリティー対応
// ダイアログがモーダルで表示されているときはダイアログ以外のbody直下の要素に
// aria-hidden 属性をつける必要がある
/**
 * ダイアログが表示されているときにダイアログ以外のbody直下の要素にaria-hidden 属性をつける
 * @param open ダイアログが表示されているかどうか
 * @param dialogId ダイアログごとに付与されるユニークなid
 * @return ref
 */
export const usePreventTextReadAloudForBodyChildren = (
  open: boolean,
  dialogId: string
) => {
  const id = `${dataIdPrefix}${dialogId}`;
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bodyChildren = getDocumentBody().children;
    const current = targetRef.current;

    open &&
      Array.from(bodyChildren)
        .filter((child) => current !== child)
        .forEach((child) => setAriaHidden(child, id));
    return () => {
      // クリーナップはopenの値が変わるたびに呼ばれてしまうため、openフラグを見て1回のみ実行する
      open &&
        Array.from(bodyChildren)
          .filter((child) => current !== child)
          .forEach((child) => removeAriaHidden(child, id));
    };
  }, [open, id]);

  return targetRef;
};
