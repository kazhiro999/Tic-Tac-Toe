import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { MultipleSelect } from '..';
import { Normal } from './MultipleSelect.stories';

export default {
  title: 'Components/MultipleSelect/test',
  component: MultipleSelect
} as ComponentMeta<typeof MultipleSelect>;

export const Focused: ComponentStoryObj<typeof MultipleSelect> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const listbox = await within(canvasElement).findByRole('listbox');
    listbox.focus();
    expect(listbox).toHaveFocus();
  }
};

export const Active: ComponentStoryObj<typeof MultipleSelect> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = (await canvas.findAllByRole('option'))[1];
    userEvent.hover(el);
  }
};

export const Selected: ComponentStoryObj<typeof MultipleSelect> = {
  args: {
    ...Normal.args,
    values: ['option1', 'option4']
  }
};

export const LongOptionLabel: ComponentStoryObj<typeof MultipleSelect> = {
  args: {
    ...Normal.args,
    options: [
      {
        label:
          'kintone Design System kintone Design System kintone Design System kintone Design System kintone Design System kintone Design System kintone Design System',
        value: 'optionx'
      }
    ]
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100px' }}>
        <Story />
      </div>
    )
  ]
};
