import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Notifier } from '..';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Notifier/test',
  component: Notifier
} as ComponentMeta<typeof Notifier>;

const pauseAnimationAtEnd = {
  chromatic: { pauseAnimationAtEnd: true }
};

export const Error: ComponentStoryObj<typeof Notifier> = {
  args: {
    type: 'error',
    shown: true,
    notificationId: 0,
    title: 'エラー',
    messageLines: [
      'エラーメッセージ',
      '<a href="#">kintoneヘルプ</a>を参照してください。'
    ],
    autoClose: false,
    onClose: action('onClose'),
    closeButtonAltText: '閉じる'
  },
  parameters: { ...pauseAnimationAtEnd }
};

export const Success: ComponentStoryObj<typeof Notifier> = {
  args: {
    ...Error.args,
    type: 'success',
    title: '成功',
    messageLines: [
      '成功しました',
      '<a href="#">kintoneヘルプ</a>を参照してください。'
    ],
    autoClose: true
  },
  parameters: { ...pauseAnimationAtEnd }
};

export const Info: ComponentStoryObj<typeof Notifier> = {
  args: {
    ...Error.args,
    type: 'info',
    title: 'info',
    messageLines: [
      'infoメッセージ',
      '<a href="#">kintoneヘルプ</a>を参照してください。'
    ],
    autoClose: true
  },
  parameters: {
    ...pauseAnimationAtEnd
  }
};

export const TitleOnly: ComponentStoryObj<typeof Notifier> = {
  args: {
    ...Error.args,
    messageLines: []
  },
  parameters: {
    ...pauseAnimationAtEnd
  }
};

export const MultipleLines: ComponentStoryObj<typeof Notifier> = {
  args: {
    ...Error.args,
    messageLines: [
      'エラーメッセージ1',
      'エラーメッセージ2',
      'エラーメッセージ3'
    ]
  },
  parameters: {
    ...pauseAnimationAtEnd
  }
};

export const LongMessage: ComponentStoryObj<typeof Notifier> = {
  args: {
    ...Error.args,
    messageLines: [
      '100文字までのキーワードを入力してください。100文字までのキーワードを入力してください。100文字までのキーワードを入力してください。100文字までのキーワードを入力してください。'
    ]
  },
  parameters: {
    ...pauseAnimationAtEnd
  }
};
