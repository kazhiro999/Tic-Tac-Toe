import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState
} from 'react';

type FocusContextType<T extends string> = {
  focusedKey: T | null;
  changeFocus: (key: T) => void;
  clearFocus: () => void;
};

type Props = {
  children: React.ReactNode;
};

const useFocusContextInitialValue = <T extends string>() => {
  const [focusedKey, setFocusedKey] = useState<T | null>(null);

  const changeFocus = (key: T) => {
    setFocusedKey(key);
  };

  const clearFocus = () => {
    setFocusedKey(null);
  };

  return {
    focusedKey,
    changeFocus,
    clearFocus
  };
};

/**
 * Focusに必要なContextを生成し、付随するHooksも作成する関数
 */
export const setUpFocusContext = <T extends string>() => {
  const FocusContext = createContext<FocusContextType<T> | null>(null);

  const FocusContextProvider: React.VFC<Props> = ({ children }) => {
    const contextValue = useFocusContextInitialValue<T>();
    return (
      <FocusContext.Provider value={contextValue}>
        {children}
      </FocusContext.Provider>
    );
  };

  const useChangeFocus = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { changeFocus } = useContext(FocusContext)!;

    return { changeFocus };
  };

  function useFocus(
    targetKey: T | null,
    // targetKeyとfocusedKeyが一致した場合に、RefObjectにフォーカスするか、任意のコールバックを実行できる
    param: React.RefObject<HTMLElement | null> | (() => void)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { focusedKey, clearFocus } = useContext(FocusContext)!;

    useLayoutEffect(() => {
      if (focusedKey === targetKey) {
        if (typeof param === 'function') {
          param();
        } else if (param.current) {
          param.current.focus();
        }
        clearFocus();
      }
    }, [clearFocus, focusedKey, param, targetKey]);
  }

  return {
    FocusContextProvider,
    useChangeFocus,
    useFocus
  };
};
