import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { EntitySelect } from '..';
import { NormalWithMultipleSelect } from './EntitySelect.stories';

export default {
  component: EntitySelect,
  title: 'Components/EntitySelect⚠️/test/SearchAndSearchResultPopup',
  argTypes: { changeValues: { action: 'changeValues' } }
} as ComponentMeta<typeof EntitySelect>;

type storyType = ComponentStoryObj<typeof EntitySelect>;

const playSearch = async ({
  canvasElement
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const combobox = await canvas.findByRole('combobox', {
    name: 'エンティティを追加'
  });
  userEvent.type(combobox, 'test');
  expect(await canvas.findByRole('listbox')).toBeVisible();
};

export const Close: storyType = {
  ...NormalWithMultipleSelect
};

export const Open: storyType = {
  ...NormalWithMultipleSelect,
  play: playSearch
};

// 1つ目のSearchResultEntityをactiveにする
export const Active: storyType = {
  ...NormalWithMultipleSelect,
  play: async ({ canvasElement }) => {
    await playSearch({ canvasElement });
    await userEvent.keyboard('{arrowDown}');
  }
};

export const FocusOnOpenPickerDialogButton: storyType = {
  ...NormalWithMultipleSelect,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openPickerDialogButton = await canvas.findByRole('button', {
      name: '組織やグループから選択'
    });
    openPickerDialogButton.focus();
    expect(openPickerDialogButton).toHaveFocus();
  }
};

export const WrapEntityLabel: storyType = {
  args: {
    ...NormalWithMultipleSelect.args,
    wrapEntityLabel: true
  },
  play: async ({ canvasElement }) => {
    await playSearch({ canvasElement });
    await userEvent.keyboard('{arrowDown}');
  }
};
