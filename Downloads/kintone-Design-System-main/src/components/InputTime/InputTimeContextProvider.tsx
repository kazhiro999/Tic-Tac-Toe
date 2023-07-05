import React, { createContext } from 'react';
import {
  InputTimeContextType,
  useInputTimeContextInitialValue
} from './hooks/useInputTimeContext';

type Props = {
  children: React.ReactNode;
  timeString: string;
  isAMPMNotation: boolean;
  changeValue: (value: string) => void;
};

export const InputTimeContext = createContext<InputTimeContextType | null>(
  null
);

export const InputTimeContextProvider: React.VFC<Props> = ({
  children,
  timeString,
  isAMPMNotation,
  changeValue
}) => {
  const contextValue = useInputTimeContextInitialValue(
    timeString,
    isAMPMNotation,
    changeValue
  );

  return (
    <InputTimeContext.Provider value={contextValue}>
      {children}
    </InputTimeContext.Provider>
  );
};
