import { setUpFocusContext } from '../focus/setUpFocusContext';

type FocusedKey = 'HOUR' | 'MINUTE' | 'AMPM' | 'TIME_PICKER';

export const { useFocus, useChangeFocus, FocusContextProvider } =
  setUpFocusContext<FocusedKey>();
