import { Meta, StoryObj } from '@storybook/react';
import { InputText } from '..';

export default {
  title: 'Components/InputText/test',
  component: InputText,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as Meta<typeof InputText>;

type StoryType = StoryObj<typeof InputText>;

export const Focused: StoryType = {
  args: {
    value: 'sample text',
    shouldFocus: true
  }
};

export const AlignCenter: StoryType = {
  args: {
    value: 'Sample text',
    align: 'center'
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    )
  ]
};
