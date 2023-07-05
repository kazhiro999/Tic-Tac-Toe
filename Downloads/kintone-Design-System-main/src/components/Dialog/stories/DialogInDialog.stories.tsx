import { Dialog } from '..';
import { DialogActions } from '../DialogActions';
import { DialogBody } from '../DialogBody';
import { useState } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

const Component = () => {
  const [outsideOpen, setOutsideOpen] = useState(false);
  const [insideOpen, setInsideOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOutsideOpen(true)}>Open</button>
      <Dialog
        open={outsideOpen}
        onClose={() => setOutsideOpen(false)}
        dialogTitle="Outside Dialog Header"
        headerCloseButtonAlternativeText="close"
        data-testid="outside-dialog"
      >
        <DialogBody>
          Outside Dialog
          <button
            type="button"
            onClick={() => {
              setOutsideOpen(false);
              setInsideOpen(true);
            }}
          >
            open inside dialog
          </button>
        </DialogBody>
        <DialogActions
          onClickOkButton={() => {
            setOutsideOpen(false);
            setInsideOpen(true);
          }}
          onClickCancelButton={() => setOutsideOpen(false)}
          okButtonDisabled={false}
          labelOkButton="OK"
          labelCancelButton="Cancel"
        />
      </Dialog>
      <Dialog
        open={insideOpen}
        onClose={() => {
          setInsideOpen(false);
          setOutsideOpen(true);
        }}
        dialogTitle="Inside Dialog Header"
        headerCloseButtonAlternativeText="close"
        data-testid="inside-dialog"
      >
        <DialogBody>Inside Dialog</DialogBody>
        <DialogActions
          onClickOkButton={() => {
            setInsideOpen(false);
            setOutsideOpen(true);
          }}
          onClickCancelButton={() => {
            setInsideOpen(false);
            setOutsideOpen(true);
          }}
          okButtonDisabled={false}
          labelOkButton="OK"
          labelCancelButton="Cancel"
        />
      </Dialog>
    </>
  );
};

export default {
  title: 'Components/Dialog',
  component: Component
} as ComponentMeta<typeof Component>;

export const DialogInDialog: ComponentStoryObj<typeof Component> = {
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
