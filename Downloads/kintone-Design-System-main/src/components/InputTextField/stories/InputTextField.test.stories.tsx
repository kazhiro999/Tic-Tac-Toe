import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { InputTextField } from '../';
import { Normal } from './InputTextField.stories';

export default {
  title: 'Components/InputTextField/test',
  component: InputTextField,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as Meta<typeof InputTextField>;

type storyType = StoryObj<typeof InputTextField>;

export const Focused: storyType = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox');
    textbox.focus();
    expect(textbox).toHaveFocus();
  }
};

export const LongLabel: storyType = {
  args: {
    ...Normal.args,
    label:
      '長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長いラベル'
  }
};

export const LongHelperText: storyType = {
  args: {
    ...Normal.args,
    errorMessage:
      '長いHelperText長いHelperText長いHelperText長いHelperText長いHelperText長いHelperText'
  }
};
