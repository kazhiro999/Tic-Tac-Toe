import React from 'react';
import { Dialog, DialogProps } from '..';
import { DialogActions, DialogActionsProps } from '../DialogActions';
import { DialogBody } from '../DialogBody';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

type Props = Omit<DialogProps, 'children'> &
  DialogActionsProps & {
    dialogBody?: React.ReactNode;
  };

export const Normal: React.VFC<Props> = ({
  open = true,
  onClose,
  variant = 'normal',
  dialogTitle = 'Dialog Title',
  headerCloseButtonAlternativeText = 'close',
  headerBackgroundColor,
  maxWidth,
  labelCancelButton = 'Cancel',
  labelOkButton = 'OK',
  onClickCancelButton,
  onClickOkButton,
  okButtonDisabled,
  dialogBody = 'Dialog Body'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      variant={variant}
      dialogTitle={dialogTitle}
      headerCloseButtonAlternativeText={headerCloseButtonAlternativeText}
      maxWidth={maxWidth}
      headerBackgroundColor={headerBackgroundColor}
    >
      <DialogBody>{dialogBody}</DialogBody>
      <DialogActions
        labelCancelButton={labelCancelButton}
        labelOkButton={labelOkButton}
        onClickOkButton={onClickOkButton}
        onClickCancelButton={onClickCancelButton}
        okButtonDisabled={okButtonDisabled}
      />
    </Dialog>
  );
};

export const Warning: ComponentStoryObj<typeof Normal> = {
  args: {
    variant: 'warning'
  }
};

export default {
  title: 'Components/Dialog',
  component: Normal,
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
