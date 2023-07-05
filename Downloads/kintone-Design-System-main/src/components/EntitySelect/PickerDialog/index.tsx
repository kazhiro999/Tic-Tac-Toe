import { designTokens } from '../../../designTokens';
import { Dialog } from '../../Dialog';
import { DialogActions } from '../../Dialog/DialogActions';
import * as React from 'react';
import { EntitySelectContext } from '../EntitySelectContext';
import { buildEntitySelectOperations } from '../modules/operations';
import { canAddEntitiesInPickerDialog } from '../modules/selectors';
import { PickerDialogBody } from './PickerDialogBody';
import { PickerDialogBodyContent } from './PickerDialogBodyContent';
import styled from 'styled-components';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  labelAddButton: string;
  onClickAddButton: React.MouseEventHandler<HTMLButtonElement>;
  addable: boolean;
  headerBackgroundColor: string;
  closeButtonAlternativeTextLabel: string;
  cancelButtonLabel: string;
};

const Component: React.VFC<Props> = ({
  open,
  onClose,
  title,
  labelAddButton,
  onClickAddButton,
  addable,
  headerBackgroundColor,
  closeButtonAlternativeTextLabel,
  cancelButtonLabel
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      dialogTitle={title}
      headerBackgroundColor={headerBackgroundColor}
      headerCloseButtonAlternativeText={closeButtonAlternativeTextLabel}
    >
      <PickerDialogBody>
        <PickerDialogBodyContent />
      </PickerDialogBody>
      <DialogActions
        labelOkButton={labelAddButton}
        onClickOkButton={onClickAddButton}
        okButtonDisabled={!addable}
        onClickCancelButton={() => {
          onClose();
        }}
        labelCancelButton={cancelButtonLabel}
      />
    </Dialog>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }
  font-size: ${designTokens.fonts.size[5]};
  color: ${designTokens.colors.mineShaft};
  line-height: 1.5;
`;

const Container: React.VFC = () => {
  const {
    state,
    dispatch,
    values,
    changeValues,
    pickerDialogTitle,
    repositories,
    locales,
    getLabelAddButton
  } = React.useContext(EntitySelectContext);
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });
  const handleClose = () => {
    entitySelectOperations.hidePickerDialog(dispatch);
  };

  const handleClickAddButton = () => {
    entitySelectOperations.addEntitiesInPickerDialog(
      dispatch,
      state.pickerDialog.selectedEntities,
      values,
      changeValues
    );
  };

  return (
    <StyledComponent
      open={state.pickerDialog.shown}
      onClose={handleClose}
      title={pickerDialogTitle}
      labelAddButton={getLabelAddButton(
        state.pickerDialog.selectedEntities?.length
      )}
      onClickAddButton={handleClickAddButton}
      addable={canAddEntitiesInPickerDialog(state)}
      headerBackgroundColor={designTokens.colors.iron}
      closeButtonAlternativeTextLabel={locales.closeButtonAlternativeTextLabel}
      cancelButtonLabel={locales.cancelButtonLabel}
    />
  );
};

export const PickerDialog = Container;
