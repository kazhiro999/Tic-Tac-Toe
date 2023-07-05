import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { RadioGroup } from '..';
import { useState } from 'react';

const Component = () => {
  const [value, setValue] = useState('');
  return (
    <RadioGroup
      value={value}
      groupName="name"
      radioContents={[
        {
          label: 'ラジオボタン1',
          value: 'radio1'
        },
        {
          label: 'ラジオボタン2',
          value: 'radio2'
        },
        {
          label: 'ラジオボタン3',
          value: 'radio3'
        }
      ]}
      changeValue={setValue}
      disabled={false}
    />
  );
};

export default {
  title: 'Components/RadioGroup',
  component: Component
} as ComponentMeta<typeof Component>;

export const ToggleRadioGroup: ComponentStoryObj<typeof Component> = {
  ...Component,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
};
