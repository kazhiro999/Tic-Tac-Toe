import { useRef } from 'react';
import { makeUniqueIdForUi } from '../functions/makeUniqueIdForUi';

/**
 * コンポーネントの中で使う一時的なIDを生成するカスタムHooks
 *
 * 主な用途はアクセシビリティ対応
 * 利用例：ラベルのidにユニークIDを指定し、入力要素のaria-labelledbyに同じ値を指定する
 *
 * 永続化が必要な場合は、サーバーで生成したIDを利用してください。
 */
export const useComponentId = () => {
  // コンポーネントが再renderされて、useComponentIdが複数回実行されたとしても
  // 同じIDを返せるようにuseRefで実装
  const idRef = useRef(makeUniqueIdForUi());
  return idRef.current;
};
