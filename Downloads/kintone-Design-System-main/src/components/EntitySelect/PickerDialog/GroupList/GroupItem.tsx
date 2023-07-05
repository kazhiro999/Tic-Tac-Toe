import * as React from 'react';
import { Group } from '../../../../models/group';
import { EntitySelectContext } from '../../EntitySelectContext';
import { buildEntitySelectOperations } from '../../modules/operations';
import { LeftPaneEntityItem } from '../panes/LeftPaneEntityItem';
import {
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isSpaceKey
} from '../../../../functions/key';

type OuterProps = {
  group: Group;
};

const Container: React.VFC<OuterProps> = ({ group }) => {
  const { state, dispatch, repositories, locales, userAvailable } =
    React.useContext(EntitySelectContext);
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  const selectGroup = () => {
    entitySelectOperations.selectGroupInPickerDialog(dispatch, group.id);
    buildEntitySelectOperations(repositories, {
      creatorNameLabel: locales.creatorNameLabel
    }).fetchGroupUsersInPickerDialog(dispatch, group, userAvailable);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (isArrowDownKey(e)) {
      entitySelectOperations.focusNextGroupInPickerDialog(dispatch, group.id);
    }

    if (isArrowUpKey(e)) {
      entitySelectOperations.focusPreviousGroupInPickerDialog(
        dispatch,
        group.id
      );
    }

    if (isEnterKey(e) || isSpaceKey(e)) {
      // スペースキーを押したときにスクロールが発生するのを防ぐ
      e.preventDefault();

      selectGroup();
    }
  };

  const clearShouldFocus = () => {
    entitySelectOperations.clearShouldFocusGroupInPickerDialog(dispatch);
  };

  return (
    <LeftPaneEntityItem
      entity={group}
      selected={group.id === state.pickerDialog.selectedGroupId}
      focusable={group.id === state.pickerDialog.focusableGroupId}
      shouldFocus={state.pickerDialog.shouldFocusGroup}
      clearShouldFocus={clearShouldFocus}
      expandButtonShown={false}
      onNameButtonClick={selectGroup}
      onKeyDown={handleKeyDown}
    />
  );
};

export const GroupItem = Container;
