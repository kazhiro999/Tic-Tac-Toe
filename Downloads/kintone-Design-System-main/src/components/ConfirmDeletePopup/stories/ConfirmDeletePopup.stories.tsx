import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ConfirmDeletePopup } from '..';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ConfirmDeletePopup',
  component: ConfirmDeletePopup
} as ComponentMeta<typeof ConfirmDeletePopup>;

export const Normal: ComponentStoryObj<typeof ConfirmDeletePopup> = {
  args: {
    confirmDelete: action('confirmDelete'),
    closePopup: action('closePopup'),
    title: '削除します。よろしいですか？',
    okButtonText: '削除する',
    ngButtonText: 'キャンセル',
    left: '20px',
    top: '20px'
  }
};
