const UNIQUE_ID_PREFIX = `kintone-id`;
let id = 0;

/**
 * 表示している画面内でユニークなIDを生成する。
 *
 * 主な用途はアクセシビリティ対応
 * 利用例：ラベルのidにユニークIDを指定し、入力要素のaria-labelledbyに同じ値を指定する
 *
 * 永続化が必要な場合は、サーバーで生成したIDを利用してください。
 */
export const makeUniqueIdForUi = () => `${UNIQUE_ID_PREFIX}-${id++}`;

export const isUniqueIdForUi = (itemId: string) => {
  return itemId.startsWith(UNIQUE_ID_PREFIX);
};
