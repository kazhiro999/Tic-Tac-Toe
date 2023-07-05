import { ComponentStoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { InputTime, InputTimeProps } from '../index';

const Component = ({
  value: inputValue,
  changeValue,
  ...rest
}: InputTimeProps) => {
  const [value, setValue] = useState(inputValue);
  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <InputTime
      value={value}
      changeValue={(v) => {
        setValue(v);
        changeValue(v);
      }}
      {...rest}
    />
  );
};

export default {
  title: 'Components/InputTime',
  component: Component,
  parameters: {
    backgrounds: {
      default: 'white'
    }
  },
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
};

export const Notation12: ComponentStoryObj<typeof Component> = {
  args: {
    isAMPMNotation: true,
    value: '13:32',
    hourAriaLabel: '時',
    minuteAriaLabel: '分',
    getAMPMLabel: (value) => value,
    inputTextAriaLabel: '時刻',
    timePickerOpenSupportButtonLabel: '時刻を選択'
  }
};

export const Notation24: ComponentStoryObj<typeof Component> = {
  args: {
    ...Notation12.args,
    isAMPMNotation: false
  }
};

export const EmptyOfNotation12: ComponentStoryObj<typeof Component> = {
  args: {
    ...Notation12.args,
    value: ''
  }
};

export const EmptyOfNotation24: ComponentStoryObj<typeof Component> = {
  args: {
    ...Notation24.args,
    value: ''
  }
};
