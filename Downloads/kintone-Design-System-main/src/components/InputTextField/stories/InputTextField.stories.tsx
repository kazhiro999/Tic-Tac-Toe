import { Meta, StoryObj } from '@storybook/react';
import { InputTextField } from '..';

export default {
  title: 'Components/InputTextField',
  component: InputTextField,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as Meta<typeof InputTextField>;

type StoryType = StoryObj<typeof InputTextField>;

export const Normal: StoryType = {
  args: {
    label: 'label',
    value: '',
    required: false,
    labelShown: true
  }
};

export const Medium: StoryType = {
  args: {
    ...Normal.args,
    height: 'medium'
  }
};

export const SuccessHelperText: StoryType = {
  args: {
    ...Normal.args,
    successMessage: 'Success!!!'
  }
};

export const ErrorHelperText: StoryType = {
  args: {
    ...Normal.args,
    errorMessage: 'Error!!!'
  }
};

export const Required: StoryType = {
  args: {
    ...Normal.args,
    required: true
  }
};

export const LabelHidden: StoryType = {
  args: {
    ...Normal.args,
    labelShown: false
  }
};
