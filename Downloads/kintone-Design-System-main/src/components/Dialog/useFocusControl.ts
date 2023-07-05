import { useEffect, useRef, useCallback } from 'react';
import * as React from 'react';
import { getActiveElement } from '../../functions/document';
import { isTabKey } from '../../functions/key';

export const useFocusControl = (
  open: boolean
): [
  React.MutableRefObject<HTMLDivElement | null>,
  React.MutableRefObject<HTMLSpanElement | null>,
  React.KeyboardEventHandler<HTMLDivElement>,
  React.FocusEventHandler<HTMLSpanElement>
] => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const dialogEndRef = useRef<HTMLSpanElement | null>(null);
  const lastFocusedRef = useRef<Element | null>(null);
  // useState を使うと状態が変更される前に onFocus イベントが実行されてしまうので ref でフラグを管理している。
  const isPressingShiftTabKeyRef = useRef(false);

  useEffect(() => {
    if (open) {
      lastFocusedRef.current = getActiveElement();
      dialogRef.current && dialogRef.current.focus();
    }
    return () => {
      // クリーナップはopenの値が変わるたびに呼ばれてしまうため、openフラグを見て1回のみ実行する
      open &&
        lastFocusedRef.current instanceof HTMLElement &&
        lastFocusedRef.current.focus();
    };
  }, [open]);

  /**
   * ダイアログがフォーカスされた状態で Shift + Tabキー 入力された場合、ダイアログの最後の要素(ダミーのspan)にフォーカスが移動する。
   * その後、通常のフォーカス移動のイベントが処理されるので、ダミーのspanの前の要素にフォーカスが移動する。
   */
  const focusOnDialogEndWhenKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isTabKey(e)) {
        if (e.shiftKey && dialogRef.current === e.target) {
          isPressingShiftTabKeyRef.current = true;
          dialogEndRef.current && dialogEndRef.current.focus();
        } else if (!e.shiftKey) {
          isPressingShiftTabKeyRef.current = false;
        }
      }
    },
    []
  );

  /**
   * Shift + Tabキー 以外のキー入力でダイアログの最後の要素(ダミーのspan)にフォーカスがあたったとき、ダイアログ全体にフォーカスを移動させる。
   */
  const focusOnDialogWhenFocus = useCallback(
    (e: React.FocusEvent<HTMLSpanElement>) => {
      !isPressingShiftTabKeyRef.current &&
        dialogRef.current &&
        dialogRef.current.focus();
    },
    []
  );

  return [
    dialogRef,
    dialogEndRef,
    focusOnDialogEndWhenKeyDown,
    focusOnDialogWhenFocus
  ];
};
