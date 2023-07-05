/**
 * keyCode は deprecated なのでキー判定には使用しない
 * code は IE 非対応なので key を使用する
 *
 * ブラウザごとの key の違いは以下のページを参照
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */
const getKey = (e: React.KeyboardEvent): string => e.key;

/**
 * IMEの入力中の判定を行う
 * @param e
 */
const isComposing = (e: React.KeyboardEvent) => {
  // e.isComposing は IE非対応であり、Safariの判定タイミングが怪しいため keyCodeで判定する
  // 参考）isComposing: https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent/isComposing
  // keyCodeは非推奨のため将来的には別の方法で置き換えたい
  return e.keyCode === 229;
};

export const isEscKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return ['Escape', 'Esc'].includes(getKey(e));
};

export const isTabKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return getKey(e) === 'Tab';
};

export const isEnterKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return getKey(e) === 'Enter';
};

export const isSpaceKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return [' ', 'Spacebar'].includes(getKey(e));
};

export const isArrowUpKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return ['ArrowUp', 'Up'].includes(getKey(e));
};

export const isArrowRightKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return ['ArrowRight', 'Right'].includes(getKey(e));
};

export const isArrowDownKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return ['ArrowDown', 'Down'].includes(getKey(e));
};

export const isArrowLeftKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return ['ArrowLeft', 'Left'].includes(getKey(e));
};

export const isHomeKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return getKey(e) === 'Home';
};

export const isEndKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return getKey(e) === 'End';
};

export const isBackspaceKey = (e: React.KeyboardEvent) => {
  if (isComposing(e)) {
    return false;
  }

  return getKey(e) === 'Backspace';
};
