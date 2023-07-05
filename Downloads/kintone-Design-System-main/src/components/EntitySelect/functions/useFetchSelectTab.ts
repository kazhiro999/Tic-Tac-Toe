import { useContext, useCallback } from 'react';
import { EntitySelectContext } from '../EntitySelectContext';
import { buildEntitySelectOperations } from '../modules/operations';
import {
  type PickerDialogTabType,
  PICKER_DIALOG_TAB_TYPE
} from '../modules/types';

export const useFetchSelectTab = () => {
  const { state, dispatch, repositories, locales, userAvailable, otherTypes } =
    useContext(EntitySelectContext);
  const {
    selectTabInPickerDialog,
    fetchGroupUsersInPickerDialog,
    fetchGroupsInPickerDialog,
    fetchOrganizationUsersInPickerDialog,
    fetchPickerDialogOrganizations,
    initializeOtherEntitiesInPickerDialog,
    initializeOthersInPickerDialog
  } = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  return useCallback(
    (tabType: PickerDialogTabType) => {
      selectTabInPickerDialog(dispatch, tabType);
      const {
        groups,
        selectedGroupId,
        organizations,
        selectedOrganizationId,
        others,
        selectedOtherType,
        selectedOtherId
      } = state.pickerDialog;
      if (tabType === PICKER_DIALOG_TAB_TYPE.GROUP) {
        const selectedGroup = groups?.find((g) => g.id === selectedGroupId);
        if (selectedGroup) {
          // 選択済みのグループが存在した場合は、選択したグループに紐づくユーザーを取得する
          fetchGroupUsersInPickerDialog(dispatch, selectedGroup, userAvailable);
        } else {
          fetchGroupsInPickerDialog(dispatch);
        }
      } else if (tabType === PICKER_DIALOG_TAB_TYPE.ORGANIZATION) {
        const selectedOrganization =
          organizations && selectedOrganizationId
            ? organizations[selectedOrganizationId]
            : null;
        if (selectedOrganization) {
          // 選択済みの組織が存在した場合は、選択した組織に紐づくユーザーを取得する
          fetchOrganizationUsersInPickerDialog(
            dispatch,
            selectedOrganization,
            userAvailable
          );
        } else {
          fetchPickerDialogOrganizations(dispatch);
        }
      } else if (tabType === PICKER_DIALOG_TAB_TYPE.OTHER) {
        const selectedOther = others?.find(
          (o) => o.id === selectedOtherId && o.entityType === selectedOtherType
        );
        if (selectedOther) {
          // 選択済みのその他が存在した場合は、選択したその他に紐づくユーザーを取得する
          initializeOtherEntitiesInPickerDialog(dispatch, selectedOther);
        } else {
          initializeOthersInPickerDialog(dispatch, otherTypes);
        }
      }
    },
    [
      dispatch,
      fetchGroupUsersInPickerDialog,
      fetchGroupsInPickerDialog,
      fetchOrganizationUsersInPickerDialog,
      fetchPickerDialogOrganizations,
      initializeOtherEntitiesInPickerDialog,
      initializeOthersInPickerDialog,
      otherTypes,
      selectTabInPickerDialog,
      state.pickerDialog,
      userAvailable
    ]
  );
};
