import { Meta, StoryObj } from '@storybook/react';
import { InputText } from '..';

export default {
  title: 'Components/InputText',
  component: InputText,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    },
    onClick: {
      action: 'onClick'
    },
    onKeyDown: {
      action: 'onKeyDown'
    },
    onFocus: {
      action: 'onFocus'
    },
    onBlur: {
      action: 'onBlur'
    }
  }
} as Meta<typeof InputText>;

type StoryType = StoryObj<typeof InputText>;

export const Normal: StoryType = {
  args: {
    value: 'Sample text'
  }
};

export const Placeholder: StoryType = {
  args: {
    value: '',
    placeholder: 'プレースホルダー'
  }
};

export const PlaceholderWithValue: StoryType = {
  args: {
    value: 'value',
    placeholder: 'プレースホルダー'
  }
};

export const Medium: StoryType = {
  args: {
    ...Normal.args,
    height: 'medium'
  }
};

export const Disabled: StoryType = {
  args: {
    ...Normal.args,
    disabled: true
  }
};
