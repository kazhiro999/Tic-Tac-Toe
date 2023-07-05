import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { EntitySelect } from '..';
import { NormalWithMultipleSelect } from './EntitySelect.stories';
import { selectedValues } from './data';

export default {
  component: EntitySelect,
  title: 'Components/EntitySelect⚠️/test/SelectedEntityList',
  argTypes: { changeValues: { action: 'changeValues' } }
} as ComponentMeta<typeof EntitySelect>;

type storyType = ComponentStoryObj<typeof EntitySelect>;

export const SelectedEntityList: storyType = {
  args: { ...NormalWithMultipleSelect.args, values: selectedValues }
};

// 上から2番目のSelectedEntityItemのRemoveEntityButtonにフォーカス
export const FocusOnRemoveEntityButton: storyType = {
  ...SelectedEntityList,
  play: async ({ canvasElement }) => {
    const selectedEntityList = await within(canvasElement).findByRole('list');
    const selectedEntity = (
      await within(selectedEntityList).findAllByRole('listitem')
    )[1];
    const removeEntityButton = await within(selectedEntity).findByRole(
      'button',
      {
        name: '選択解除'
      }
    );
    removeEntityButton.focus();
    expect(removeEntityButton).toHaveFocus();
  }
};

export const WrapEntityLabel: storyType = {
  args: {
    ...SelectedEntityList.args,
    wrapEntityLabel: true
  }
};
