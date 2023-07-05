import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { CheckboxGroup } from '..';
import { Checkbox } from '../../Checkbox';

export default {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  subcomponents: { Checkbox },
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as ComponentMeta<typeof CheckboxGroup>;

export const Normal: ComponentStoryObj<typeof CheckboxGroup> = {
  args: {
    checkboxContents: [
      {
        label: 'チェックボックス1',
        name: 'name1',
        value: true,
        disabled: false
      },
      {
        label: 'チェックボックス2',
        name: 'name2',
        value: true,
        disabled: false
      },
      {
        label: 'チェックボックス3',
        name: 'name3',
        value: false,
        disabled: false
      }
    ]
  }
};
