import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Notifier, NotifierProps } from '..';

const Component: React.VFC<
  Pick<NotifierProps, 'type' | 'title' | 'messageLines'>
> = ({ type, title, messageLines }) => {
  const [shown, setShown] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setShown(true)}>
        再度表示
      </button>
      <Notifier
        shown={shown}
        notificationId={0}
        type={type}
        title={title}
        messageLines={messageLines}
        autoClose
        onClose={() => setShown(false)}
        closeButtonAltText="閉じる"
      />
    </>
  );
};

export default {
  title: 'Components/Notifier',
  component: Component
} as ComponentMeta<typeof Component>;

export const ShowErrorNotifier: ComponentStoryObj<typeof Component> = {
  args: {
    type: 'error',
    title: 'エラー',
    messageLines: [
      'エラーメッセージ',
      '<a href="#">kintoneヘルプ</a>を参照してください。'
    ]
  },
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};

export const ShowSuccessNotifier: ComponentStoryObj<typeof Component> = {
  args: {
    type: 'success',
    title: '成功',
    messageLines: [
      '成功しました',
      '<a href="#">kintoneヘルプ</a>を参照してください。'
    ]
  },
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};

export const ShowInfoNotifier: ComponentStoryObj<typeof Component> = {
  args: {
    type: 'info',
    title: 'info',
    messageLines: [
      'infoメッセージ',
      '<a href="#">kintoneヘルプ</a>を参照してください。'
    ]
  },
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
