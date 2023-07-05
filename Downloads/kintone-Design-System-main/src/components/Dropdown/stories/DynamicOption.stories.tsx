import { useState, useCallback } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Dropdown, DropdownProps } from '..';

type Props = { initialValue: string } & DropdownProps<string>;

const Component = ({ initialValue, ...args }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [options, setOptions] = useState(args.options);
  const onChangePopupShown = useCallback(
    (popupShown: boolean) => {
      if (popupShown) {
        // 短いoptionsをセット
        setOptions([
          { label: '項目1', value: 'option1' },
          { label: '項目2', value: 'option2' },
          { label: '項目3', value: 'option3' }
        ]);
      } else {
        setOptions(args.options);
      }
    },
    [args.options]
  );
  return (
    <Dropdown
      {...args}
      options={options}
      changeValue={(v) => {
        args.changeValue(v);
        setValue(v);
      }}
      value={value}
      onChangePopupShown={onChangePopupShown}
    />
  );
};

export default {
  title: 'Components/Dropdown/test/DynamicOption',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as ComponentMeta<typeof Component>;

const range = (num: number): number[] =>
  Array.from(Array(num), (_, k) => k + 1);

export const DynamicOptions: ComponentStoryObj<typeof Component> = {
  args: {
    options: range(30).map((i) => ({
      label: `項目${i}`,
      value: `option${i}`
    })),
    initialValue: 'option2'
  }
};
