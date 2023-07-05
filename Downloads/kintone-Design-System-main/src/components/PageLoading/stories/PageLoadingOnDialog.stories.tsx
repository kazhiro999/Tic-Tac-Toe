import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { PageLoading } from '..';
import { Dialog } from '../../Dialog';
import { DialogActions, DialogBody } from '../../..';
import { userEvent, screen, within } from '@storybook/testing-library';

type ComponentPropsForTest = {
  dataTestIdDialog?: string;
};

const Component: React.VFC<ComponentPropsForTest> = ({ dataTestIdDialog }) => {
  const [loadingShown, setLoadingShown] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setDialogShown(true)}>
        Show Dialog
      </button>
      <Dialog
        open={dialogShown}
        onClose={() => setDialogShown(false)}
        dialogTitle=""
        headerCloseButtonAlternativeText="Close"
        data-testid={dataTestIdDialog}
      >
        <DialogBody>Dialog</DialogBody>
        <DialogActions
          onClickOkButton={() => setLoadingShown(true)}
          onClickCancelButton={() => {
            setDialogShown(false);
            setLoadingShown(false);
          }}
          okButtonDisabled={false}
          labelOkButton="OK"
          labelCancelButton="Cancel"
        />
      </Dialog>
      <PageLoading shown={loadingShown} />
    </>
  );
};

export default {
  title: 'Components/PageLoading',
  component: Component
} as ComponentMeta<typeof Component>;

export const PageLoadingOnDialog: ComponentStoryObj<typeof Component> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.click(await canvas.findByRole('button'));
    const dialog = await screen.findByRole('dialog');
    userEvent.click(await within(dialog).findByRole('button', { name: 'OK' }));
  },
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
