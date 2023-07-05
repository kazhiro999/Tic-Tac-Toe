import { useCallback, useEffect, useRef } from 'react';
import { getActiveElement } from '../../functions/document';

export const useFocusLastFocusedElement = <T extends HTMLElement>() => {
  const lastFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    lastFocusedRef.current = getActiveElement();
  }, []);

  const focusLastFocusedElement = useCallback(() => {
    const element = lastFocusedRef.current;
    if (element instanceof HTMLElement) {
      element.focus();
    }
  }, []);

  return focusLastFocusedElement;
};
