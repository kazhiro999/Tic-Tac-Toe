import React, { useEffect } from 'react';
import { PickerDialog } from '../PickerDialog';
import { EntitySelectOtherType, PickerDialogTabType } from '../modules/types';
import {
  EntitySelectContext,
  defaultLocales,
  EntitySelectContextType
} from '../EntitySelectContext';
import { initialState, reducer } from '../modules/reducer';
import { repositories as repositoriesData } from './data';
import { useSafeMutativeReducer } from '../../../hooks/useSafeMutativeReducer';
import { buildEntitySelectOperations } from '../modules/operations';
import { UserSelectPickerButtonIcon } from '../../../icons';
import { useFetchSelectTab } from '../functions/useFetchSelectTab';
import { getTabTypes } from '../functions/getTabTypes';
import { Entity } from '../../../models/entity';

const InnerComponent: React.VFC<{ tabTypes: PickerDialogTabType[] }> = ({
  tabTypes
}) => {
  const fetchSelectTab = useFetchSelectTab();
  const { dispatch, repositories } = React.useContext(EntitySelectContext);

  useEffect(() => {
    const entitySelectOperations = buildEntitySelectOperations(repositories, {
      creatorNameLabel: defaultLocales.creatorNameLabel
    });

    entitySelectOperations.showPickerDialog(dispatch, tabTypes);
    fetchSelectTab(tabTypes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, repositories]);

  return <PickerDialog />;
};

export const PickerDialogComponent: React.VFC<{
  userAvailable: boolean;
  organizationAvailable: boolean;
  groupAvailable: boolean;
  otherTypes: EntitySelectOtherType[];
  changeValues: EntitySelectContextType['changeValues'];
  wrapEntityLabel?: boolean;
}> = ({
  userAvailable,
  organizationAvailable,
  groupAvailable,
  otherTypes,
  changeValues,
  wrapEntityLabel = false
}) => {
  const [state, dispatch] = useSafeMutativeReducer(reducer, initialState);

  const contextValue: EntitySelectContextType = {
    state,
    dispatch,
    values: [],
    changeValues,
    pickerDialogTitle: 'ユーザーを選択',
    locales: defaultLocales,
    repositories: repositoriesData,
    placeholder: 'エンティティを追加',
    pickerIconComponent: <UserSelectPickerButtonIcon />,
    userAvailable,
    organizationAvailable,
    groupAvailable,
    otherTypes,
    multipleSelection: true,
    shouldFocus: false,
    getDisplayName: (entity: Entity) => entity.name,
    getLabelAddButton: (count) => {
      if (count && count > 0) {
        return `追加（${count}）`;
      }
      return '追加';
    },
    // KLOG-5698対応
    wrapEntityLabel
  };

  const tabTypes = getTabTypes({
    organizationAvailable,
    groupAvailable,
    otherTypes
  });

  return (
    <EntitySelectContext.Provider value={contextValue}>
      <InnerComponent tabTypes={tabTypes} />
    </EntitySelectContext.Provider>
  );
};
