import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Checkbox, CheckboxProps } from '..';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

const Component = ({ value, changeValue, ...rest }: CheckboxProps<string>) => {
  const [checked, setChecked] = useState(value);
  return (
    <Checkbox
      {...rest}
      value={checked}
      changeValue={(...args) => {
        setChecked(!checked);
        changeValue(...args);
      }}
    />
  );
};

export type ComponentType = typeof Component;

export default {
  title: 'Components/Checkbox',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as ComponentMeta<typeof Component>;

export const Unchecked: ComponentStoryObj<typeof Component> = {
  args: {
    label: 'チェックボックス',
    name: 'name',
    value: false,
    changeValue: action('changeValue')
  }
};

export const Checked: ComponentStoryObj<typeof Component> = {
  args: {
    ...Unchecked.args,
    value: true
  }
};

export const UncheckedDisabled: ComponentStoryObj<typeof Component> = {
  args: {
    ...Unchecked.args,
    disabled: true
  }
};

export const CheckedDisabled: ComponentStoryObj<typeof Component> = {
  args: {
    ...Checked.args,
    disabled: true
  }
};
