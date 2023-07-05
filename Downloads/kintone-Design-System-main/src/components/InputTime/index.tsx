import React from 'react';
import { FocusContextProvider } from './FocusContext';
import { InputTimeContainer } from './InputTimeContainer';
import { InputTimeContextProvider } from './InputTimeContextProvider';

type Props = {
  value: string;
  isAMPMNotation: boolean;
  changeValue: (value: string) => void;
} & React.ComponentProps<typeof InputTimeContainer>;

export type InputTimeProps = Props;

const Component: React.VFC<Props> = ({
  value,
  isAMPMNotation,
  changeValue,
  ...inputTimeContainerProps
}) => {
  return (
    <InputTimeContextProvider
      timeString={value}
      isAMPMNotation={isAMPMNotation}
      changeValue={changeValue}
    >
      <FocusContextProvider>
        <InputTimeContainer {...inputTimeContainerProps} />
      </FocusContextProvider>
    </InputTimeContextProvider>
  );
};

export const InputTime = Component;
