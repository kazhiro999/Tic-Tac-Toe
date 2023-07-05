import { createContext } from 'react';

type FocusContextType = {
  focusPrev: VoidFunction;
  focusNext: VoidFunction;
  focusFirst: VoidFunction;
  focusLast: VoidFunction;
  focusById: (id: string) => void;
  restoreFocus: VoidFunction;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = () => {};

export const FocusContext = createContext<FocusContextType>({
  focusNext: emptyFn,
  focusPrev: emptyFn,
  focusById: emptyFn,
  focusFirst: emptyFn,
  focusLast: emptyFn,
  restoreFocus: emptyFn
});
