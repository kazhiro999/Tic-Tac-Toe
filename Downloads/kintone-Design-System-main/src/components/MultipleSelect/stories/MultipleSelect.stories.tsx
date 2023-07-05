import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { MultipleSelect, MultipleSelectProps } from '..';

const Component = ({
  values: initialValues,
  changeValues,
  ...args
}: MultipleSelectProps) => {
  const [values, setValues] = useState(initialValues);
  return (
    <MultipleSelect
      values={values}
      {...args}
      changeValues={(v) => {
        setValues(v);
        changeValues(v);
      }}
    />
  );
};

export default {
  title: 'Components/MultipleSelect',
  component: Component
} as ComponentMeta<typeof Component>;

const options = [
  { label: '選択項目0', value: 'option0' },
  { label: '選択項目1', value: 'option1' },
  { label: '選択項目2', value: 'option2' },
  { label: '選択項目3', value: 'option3' },
  { label: '選択項目4', value: 'option4' }
];

export const Normal: ComponentStoryObj<typeof Component> = {
  args: {
    options: options,
    values: [],
    changeValues: action('changeValue'),
    disabled: false
  }
};

export const Disabled: ComponentStoryObj<typeof Component> = {
  args: {
    ...Normal.args,
    disabled: true
  }
};

export const ManyOptions: ComponentStoryObj<typeof Component> = {
  args: {
    ...Normal.args,
    options: [...Array(30).keys()].map((index) => ({
      label: `選択項目${index}`,
      value: `option${index}`
    }))
  }
};
