import { Dialog } from '..';
import { DialogActions } from '../DialogActions';
import { DialogBody } from '../DialogBody';
import { useState } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

const Component = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          dialogTitle="Header"
          headerCloseButtonAlternativeText="close"
        >
          <DialogBody>Dialog</DialogBody>
          <DialogActions
            onClickOkButton={() => setOpen(false)}
            onClickCancelButton={() => setOpen(false)}
            okButtonDisabled={false}
            labelOkButton="OK"
            labelCancelButton="Cancel"
          />
        </Dialog>
      )}
    </>
  );
};

export default {
  title: 'Components/Dialog',
  component: Component
} as ComponentMeta<typeof Component>;

export const ToggleDialog: ComponentStoryObj<typeof Component> = {
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
