import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Default, ManyOptions, PositionBottom } from './Combobox.stories';
import { Combobox } from '..';

export default {
  title: 'Components/Combobox/test',
  component: Combobox
} as ComponentMeta<typeof Combobox>;

const playComboboxOpen: ComponentStoryObj<typeof Combobox>['play'] = async ({
  canvasElement
}) => {
  const canvas = within(canvasElement);
  userEvent.click(await canvas.findByRole('combobox'));
};

export const Focused: ComponentStoryObj<typeof Combobox> = {
  args: { ...Default.args },
  play: playComboboxOpen
};

export const Hover: ComponentStoryObj<typeof Combobox> = {
  args: { ...Default.args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.click(await canvas.findByRole('combobox'));
    userEvent.hover((await canvas.findAllByRole('option'))[0]);
  }
};

export const TooLongLabel: ComponentStoryObj<typeof Combobox> = {
  args: {
    ...Default.args,
    options: [
      { label: '項目1', value: 'option1' },
      { label: '長〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜いラベル', value: 'option2' },
      { label: '項目3', value: 'option3' }
    ]
  }
};

export const OpenOnTooLongLabel: ComponentStoryObj<typeof Combobox> = {
  args: { ...TooLongLabel.args },
  play: playComboboxOpen
};

export const OpenOnManyOptions: ComponentStoryObj<typeof Combobox> = {
  args: { ...ManyOptions.args },
  play: playComboboxOpen
};

export const OpenOnPositionBottom: ComponentStoryObj<typeof Combobox> = {
  args: { ...PositionBottom.args },
  play: playComboboxOpen
};

export const Width: ComponentStoryObj<typeof Combobox> = {
  args: {
    ...Default.args,
    width: 180
  }
};

export const FocusOnSearch: ComponentStoryObj<typeof Combobox> = {
  args: { ...Default.args },
  play: async ({ canvasElement }) => {
    const combobox = await within(canvasElement).findByRole('combobox');
    combobox.focus();
    expect(combobox).toHaveFocus();
  }
};
