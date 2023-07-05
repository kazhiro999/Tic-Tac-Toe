import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { RadioGroup } from '..';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup
} as ComponentMeta<typeof RadioGroup>;

export const Normal: ComponentStoryObj<typeof RadioGroup> = {
  args: {
    value: 'radio1',
    groupName: 'name',
    radioContents: [
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
    ],
    changeValue: action('changeValue'),
    disabled: false
  }
};

export const Disabled: ComponentStoryObj<typeof RadioGroup> = {
  args: {
    ...Normal.args,
    disabled: true
  }
};
