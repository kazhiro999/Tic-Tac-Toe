import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Radio } from '..';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Radio',
  component: Radio
} as ComponentMeta<typeof Radio>;

export const Unchecked: ComponentStoryObj<typeof Radio> = {
  args: {
    label: 'ラジオボタン',
    name: 'option',
    value: 'radio1',
    changeValue: action('changeValue')
  }
};

export const Checked: ComponentStoryObj<typeof Radio> = {
  args: {
    label: 'ラジオボタン',
    name: 'option',
    value: 'radio1',
    changeValue: action('changeValue'),
    checked: true
  }
};
export const UncheckedDisabled: ComponentStoryObj<typeof Radio> = {
  args: {
    ...Unchecked.args,
    disabled: true
  }
};

export const CheckedDisabled: ComponentStoryObj<typeof Radio> = {
  args: {
    ...Checked.args,
    disabled: true
  }
};
