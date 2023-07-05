import * as React from 'react';
import { EntitySelectContext } from '../../EntitySelectContext';
import { LeftPaneEntityItem } from '../panes/LeftPaneEntityItem';
import { Other } from '../../modules/types';
import { buildEntitySelectOperations } from '../../modules/operations';
import {
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isSpaceKey
} from '../../../../functions/key';

type OuterProps = {
  other: Other;
};

const Container: React.VFC<OuterProps> = ({ other }) => {
  const { state, dispatch, repositories, locales } =
    React.useContext(EntitySelectContext);
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  const selectOther = () => {
    entitySelectOperations.selectOtherInPickerDialog(dispatch, other);
    buildEntitySelectOperations(repositories, {
      creatorNameLabel: locales.creatorNameLabel
    }).initializeOtherEntitiesInPickerDialog(dispatch, other);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (isArrowDownKey(e)) {
      entitySelectOperations.focusNextOtherInPickerDialog(dispatch, other);
    }

    if (isArrowUpKey(e)) {
      entitySelectOperations.focusPreviousOtherInPickerDialog(dispatch, other);
    }

    if (isEnterKey(e) || isSpaceKey(e)) {
      // スペースキーを押したときにスクロールが発生するのを防ぐ
      e.preventDefault();

      selectOther();
    }
  };

  const clearShouldFocus = () => {
    entitySelectOperations.clearShouldFocusOtherInPickerDialog(dispatch);
  };

  return (
    <LeftPaneEntityItem
      entity={other}
      selected={
        other.id === state.pickerDialog.selectedOtherId &&
        other.entityType === state.pickerDialog.selectedOtherType
      }
      focusable={
        other.id === state.pickerDialog.focusableOtherId &&
        other.entityType === state.pickerDialog.focusableOtherType
      }
      shouldFocus={state.pickerDialog.shouldFocusOther}
      clearShouldFocus={clearShouldFocus}
      expandButtonShown={false}
      onNameButtonClick={selectOther}
      onKeyDown={handleKeyDown}
    />
  );
};

export const OtherItem = Container;
