import { screen, waitFor } from '@storybook/testing-library';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Normal } from './Dialog.stories';
import { expect } from '@storybook/jest';

export default {
  title: 'Components/Dialog/test',
  component: Normal,
  excludeStories: ['findDialog'],
  argTypes: {
    onClose: {
      action: 'onClose'
    },
    onClickOkButton: {
      action: 'onClickOkButton'
    },
    onClickCancelButton: {
      action: 'onClickCancelButton'
    }
  }
} as ComponentMeta<typeof Normal>;

export const Enabled: ComponentStoryObj<typeof Normal> = {
  args: {}
};

export const Disabled: ComponentStoryObj<typeof Normal> = {
  args: {
    okButtonDisabled: true
  }
};

export const MaxWidth: ComponentStoryObj<typeof Normal> = {
  args: {
    maxWidth: 600,
    dialogBody:
      'Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body Dialog Body'
  }
};

export const LongHeightDialogBody: ComponentStoryObj<typeof Normal> = {
  args: {
    dialogBody: <div style={{ height: '1000px' }}>Dialog Body</div>
  }
};

export const findDialog = async () => {
  const dialog = await screen.findByRole('dialog');
  // 以降のフォーカス制御チェックのために、Dialogのopen後にあたるフォーカスを待つ
  await waitFor(
    async () => {
      await expect(dialog).toHaveFocus();
    },
    {
      interval: 100,
      timeout: 5000
    }
  );
  return dialog;
};

const focus = async (el: HTMLElement) => {
  el.focus();
  await expect(el).toHaveFocus();
};

export const FocusedCloseButton: ComponentStoryObj<typeof Normal> = {
  play: async () => {
    await findDialog();
    const button = await screen.findByRole('button', {
      name: 'close'
    });
    focus(button);
  }
};

export const FocusedNormalButton: ComponentStoryObj<typeof Normal> = {
  play: async () => {
    await findDialog();
    const button = await screen.findByRole('button', { name: 'Cancel' });
    focus(button);
  }
};

export const FocusedPrimaryButton: ComponentStoryObj<typeof Normal> = {
  play: async () => {
    await findDialog();
    const button = await screen.findByRole('button', { name: 'OK' });
    focus(button);
  }
};
