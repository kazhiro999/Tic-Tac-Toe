/**
 * PageLoadingなどのコンポーネントが表示されたときbody直下の要素にinert属性を付与するhooks。
 * ただしPageLoadingなどのコンポーネント自身にはinert属性を指定しない。
 */
import { useRef, useEffect, RefObject } from 'react';
import { getDocumentBody } from '../../functions/document';
// polyfillの読み込む場所を検討 https://github.dev.cybozu.co.jp/kintone/kintone/issues/19541
// webpack.common.jsで読み込むと、StorybookでPolyfillが適用されない
import 'wicg-inert';

const prevInertAttrPrefix = 'data-kintone-ui-inert-';

const enableInert = (element: Element) => {
  // まだinert属性が型定義されていないため element.inert=... とは書けない。そのため element.setAttribute() で代用する。
  // 将来的にinert属性が型定義されたときは element.inert=true と書く必要がある。 element.inert='' と書くと false とみなされるので注意。
  // > Note that the previous workaround (inert="") will no longer work since the empty string is considered false for boolean props.
  // https://github.com/facebook/react/pull/24730
  element.setAttribute('inert', '');
};

const disableInert = (element: Element) => {
  // まだinert属性が型定義されていないため element.inert=... とは書けない。そのため element.removeAttribute() で代用する。
  element.removeAttribute('inert');
};

const savePrevInert = (element: Element, prevInertAttr: string) => {
  const inert = element.getAttribute('inert');
  inert !== null && element.setAttribute(prevInertAttr, inert);
};

const loadPrevInert = (element: Element, prevInertAttr: string) => {
  const prevInert = element.getAttribute(prevInertAttr);
  prevInert !== null && element.setAttribute('inert', prevInert);
  element.removeAttribute(prevInertAttr);
};

const updateInertAll = (elements: Element[], prevInertAttr: string) => {
  elements.forEach((element) => {
    savePrevInert(element, prevInertAttr);
    enableInert(element);
  });
};

const restoreInertAll = (elements: Element[], prevInertAttr: string) => {
  elements.forEach((element) => {
    disableInert(element);
    loadPrevInert(element, prevInertAttr);
  });
};

const getBodyChildrenExceptFor = (exceptionElement: Element | null) => {
  return Array.from(getDocumentBody().children).filter(
    (child) => exceptionElement !== child
  );
};

/**
 * コンポーネントが表示されているときにコンポーネント以外のbody直下の要素にinert属性をつける。
 * @param shown コンポーネントが表示されているかどうか
 * @param componentId コンポーネントごとに付与されるユニークなid
 * @return ref
 */
export const useInertForBodyChildren = <T extends HTMLElement>(
  shown: boolean,
  componentId: string
): RefObject<T> => {
  const prevInertAttr = `${prevInertAttrPrefix}${componentId}`;
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const bodyChildren = getBodyChildrenExceptFor(targetRef.current);
    shown && updateInertAll(bodyChildren, prevInertAttr);
    return () => {
      shown && restoreInertAll(bodyChildren, prevInertAttr);
    };
  }, [shown, prevInertAttr]);

  return targetRef;
};
