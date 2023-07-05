import { setUpFocusContext } from './setUpFocusContext';

export type Key = `ITEM_${string}`;

// 親コンポーネントでsetUpFocusContextを呼び出すと、子コンポーネント -> 親コンポーネントへの依存が発生するので、必要に応じて別ファイル化する
export const { useFocus, useChangeFocus, FocusContextProvider } =
  setUpFocusContext<Key>();
