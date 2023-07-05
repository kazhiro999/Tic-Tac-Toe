import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Checked } from './Checkbox.stories';
import { Checkbox } from '..';
import { within, userEvent } from '@storybook/testing-library';

export default {
  title: 'Components/Checkbox/test',
  component: Checkbox
} as ComponentMeta<typeof Checkbox>;

export const LeftPadding: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Checked.args,
    leftPadding: true
  }
};

export const Focus: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Checked.args
  },
  play: async ({ canvasElement }) => {
    const checkbox = await within(canvasElement).findByRole('checkbox');
    await userEvent.click(checkbox);
  }
};

export const TooLongLabel: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Checked.args,
    label:
      'チェックボックスチェックボックスチェックボックスチェックボックスチェックボックスチェックボックス'
  }
};

export const NoLabel: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Checked.args,
    label: '',
    alternativeText: 'ツールチップ'
  }
};
