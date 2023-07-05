import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { ConfirmDeletePopup } from '..';
import { within } from '@storybook/testing-library';
import { Normal } from './ConfirmDeletePopup.stories';

export default {
  title: 'Components/ConfirmDeletePopup/test',
  component: ConfirmDeletePopup
} as ComponentMeta<typeof ConfirmDeletePopup>;

export const HoverOnButtons: ComponentStoryObj<typeof ConfirmDeletePopup> = {
  args: {
    ...Normal.args
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const FocusOnDeleteButton: ComponentStoryObj<typeof ConfirmDeletePopup> =
  {
    args: {
      ...Normal.args
    },
    play: async ({ canvasElement }) => {
      const deleteButton = await within(canvasElement).findByRole('button', {
        name: '削除する'
      });
      deleteButton.focus();
      expect(deleteButton).toHaveFocus();
    }
  };

export const FocusOnCancelButton: ComponentStoryObj<typeof ConfirmDeletePopup> =
  {
    args: {
      ...Normal.args,
      focusNgButton: true
    }
  };
