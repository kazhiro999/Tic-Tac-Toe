import { Dispatch } from 'react';
import { assert } from '../../../functions/asserts/assert';
import { Group } from '../../../models/group';
import { Organization } from '../../../models/organization';
import { isSameEntitySelectValue } from '../functions/isSameEntitySelectValue';
import {
  ENTITY_SELECT_ACTION_TYPES as ACTION_TYPES,
  EntitySelectAction as Action
} from './actions';
import type { Repositories } from './repositories';
import {
  EntitySelectEntity,
  GROUP_FETCH_SIZE,
  Other,
  PickerDialogTabType,
  SearchResultContent,
  USER_FETCH_SIZE,
  ENTITY_SELECT_OTHER_TYPE,
  EntitySelectOtherType,
  EntitySelectValue
} from './types';
import { User } from '../../../models/user';
import { convertCustomItemToEntity } from './functions';
import { getAppCreator } from '../../../functions/entity';

// eslint-disable-next-line max-statements
export const buildEntitySelectOperations = (
  repositories: Repositories,
  { creatorNameLabel }: { creatorNameLabel: string }
) => {
  const selectSearchResultContent = (
    dispatch: Dispatch<Action>,
    searchResultContent: SearchResultContent,
    values: EntitySelectValue[],
    changeValues: (newValues: EntitySelectValue[]) => void
  ) => {
    // 選択した検索結果が選択済みリストに含まれていない場合は、一番最後に追加する
    const found = values.some((value) =>
      isSameEntitySelectValue(value, searchResultContent)
    );
    if (!found) {
      changeValues([...values, searchResultContent]);
    }

    // 検索結果ポップアップを閉じ、検索ボックスもクリアする
    hideSearchResultPopup(dispatch);
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_CHANGE_SEARCH_TEXT,
      payload: ''
    });
  };

  const changeSearchText = async (
    dispatch: Dispatch<Action>,
    searchText: string,
    userAvailable: boolean,
    organizationAvailable: boolean,
    groupAvailable: boolean
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_CHANGE_SEARCH_TEXT,
      payload: searchText
    });
    await searchAndShowSearchResultPopup(
      dispatch,
      searchText,
      userAvailable,
      organizationAvailable,
      groupAvailable
    );
  };

  const moveHighlightSearchResultContentItem = (
    dispatch: Dispatch<Action>,
    direction: 'UP' | 'DOWN'
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_MOVE_HIGHLIGHT_SEARCH_RESULT_CONTENT_ITEM,
      payload: {
        direction
      }
    });
  };

  const searchAndShowSearchResultPopup = async (
    dispatch: Dispatch<Action>,
    searchText: string,
    userAvailable: boolean,
    organizationAvailable: boolean,
    groupAvailable: boolean
  ) => {
    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText === '') {
      hideSearchResultPopup(dispatch);
    } else {
      let entities: Array<User | Organization | Group> = [];
      if (userAvailable && groupAvailable) {
        const result = await repositories.searchDirectory(trimmedSearchText);
        const { orgs, groups, users } = result;
        entities = [...orgs, ...groups, ...users];
      } else if (!userAvailable && organizationAvailable && !groupAvailable) {
        const result = await repositories.searchOrganization(trimmedSearchText);
        entities = [...result.entities];
      } else if (!userAvailable && !organizationAvailable && groupAvailable) {
        const result = await repositories.searchGroup(trimmedSearchText);
        entities = [...result.entities];
      } else {
        throw new Error();
      }

      dispatch({
        type: ACTION_TYPES.ENTITY_SELECT_SEARCH_ENTITIES_SUCCEEDED,
        payload: entities
      });
    }
  };

  const hideSearchResultPopup = (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_HIDE_SEARCH_RESULT_POPUP
    });
  };

  const showPickerDialog = (
    dispatch: Dispatch<Action>,
    tabTypes: PickerDialogTabType[]
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_SHOW_PICKER_DIALOG,
      payload: {
        tabTypes
      }
    });
  };

  const hidePickerDialog = (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_HIDE_PICKER_DIALOG
    });
  };

  const selectTabInPickerDialog = (
    dispatch: Dispatch<Action>,
    tabType: PickerDialogTabType
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_SELECT_TAB_IN_PICKER_DIALOG,
      payload: tabType
    });
  };

  const fetchPickerDialogOrganizations = async (dispatch: Dispatch<Action>) => {
    const result = await repositories.fetchOrgRootTree();
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FETCH_PICKER_DIALOG_ORGANIZATIONS,
      payload: result
    });
  };

  const fetchPickerDialogDescendentOrganizations = async (
    dispatch: Dispatch<Action>,
    organizationId: string
  ) => {
    const result = await repositories.fetchOrgDescendent(organizationId);
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FETCH_PICKER_DIALOG_DESCENDENT_ORGANIZATIONS,
      payload: result
    });
  };

  const selectOrganizationInPickerDialog = (
    dispatch: Dispatch<Action>,
    organizationId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_SELECT_ORGANIZATION_IN_PICKER_DIALOG,
      payload: {
        organizationId
      }
    });
  };

  const expandOrganizationInPickerDialog = (
    dispatch: Dispatch<Action>,
    organizationId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_EXPAND_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG,
      payload: {
        organizationId
      }
    });
  };

  const collapseOrganizationInPickerDialog = (
    dispatch: Dispatch<Action>,
    organizationId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_COLLAPSE_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG,
      payload: {
        organizationId
      }
    });
  };

  const focusNextOrganizationInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentOrganizationId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ORGANIZATION_IN_PICKER_DIALOG,
      payload: {
        currentOrganizationId
      }
    });
  };

  const focusPreviousOrganizationInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentOrganizationId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ORGANIZATION_IN_PICKER_DIALOG,
      payload: {
        currentOrganizationId
      }
    });
  };

  const focusParentOrganizationInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentOrganizationId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_PARENT_ORGANIZATION_IN_PICKER_DIALOG,
      payload: {
        currentOrganizationId
      }
    });
  };

  const clearShouldFocusOrganizationInPickerDialog = (
    dispatch: Dispatch<Action>
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ORGANIZATION_IN_PICKER_DIALOG
    });
  };

  const fetchOrganizationUsersInPickerDialog = async (
    dispatch: Dispatch<Action>,
    organization: Organization,
    userAvailable: boolean
  ) => {
    let users: User[] = [];
    let hasMoreUsers = false;
    if (userAvailable) {
      const result = await repositories.fetchOrgUsers(organization.id, 0);
      users = result.entities.filter((e, index) => index < USER_FETCH_SIZE - 1);
      hasMoreUsers = result.entities.length === USER_FETCH_SIZE;
    }

    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FETCH_ORGANIZATION_USERS_IN_PICKER_DIALOG,
      payload: {
        organization,
        users,
        hasMoreUsers
      }
    });
  };

  const fetchGroupsInPickerDialog = async (dispatch: Dispatch<Action>) => {
    let groups: Group[] = [];
    let resultCount = 0;

    do {
      const result = await repositories.fetchGroupList(groups.length);
      resultCount = result.entities.length;
      groups = [...groups, ...result.entities];
    } while (resultCount === GROUP_FETCH_SIZE);

    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FETCH_GROUPS_IN_PICKER_DIALOG,
      payload: {
        groups
      }
    });
  };

  const selectGroupInPickerDialog = (
    dispatch: Dispatch<Action>,
    groupId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_SELECT_GROUP_IN_PICKER_DIALOG,
      payload: {
        groupId
      }
    });
  };

  const focusNextGroupInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentGroupId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_GROUP_IN_PICKER_DIALOG,
      payload: {
        currentGroupId
      }
    });
  };

  const focusPreviousGroupInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentGroupId: string
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_GROUP_IN_PICKER_DIALOG,
      payload: {
        currentGroupId
      }
    });
  };

  const clearShouldFocusGroupInPickerDialog = (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_GROUP_IN_PICKER_DIALOG
    });
  };

  const fetchGroupUsersInPickerDialog = async (
    dispatch: Dispatch<Action>,
    group: Group,
    userAvailable: boolean
  ) => {
    let users: User[] = [];
    let hasMoreUsers = false;
    if (userAvailable) {
      const result = await repositories.fetchGroupUsers(group.id, 0);
      users = result.entities.filter((e, index) => index < USER_FETCH_SIZE - 1);
      hasMoreUsers = result.entities.length === USER_FETCH_SIZE;
    }

    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FETCH_GROUP_USERS_IN_PICKER_DIALOG,
      payload: {
        group,
        users,
        hasMoreUsers
      }
    });
  };

  const initializeOthersInPickerDialog = async (
    dispatch: Dispatch<Action>,
    otherTypes: EntitySelectOtherType[]
  ) => {
    let others: Other[] = [];

    await Promise.all(
      otherTypes.map(async (otherType) => {
        switch (otherType) {
          case ENTITY_SELECT_OTHER_TYPE.APP_CREATOR:
            others = [...others, getAppCreator(creatorNameLabel)];
            break;
          case ENTITY_SELECT_OTHER_TYPE.CUSTOM_ITEM: {
            const result = await repositories.fetchCustomItems();
            others = [
              ...others,
              ...result.items.map(convertCustomItemToEntity)
            ];
            break;
          }
          default:
            throw new Error(`Invalid otherType: ${otherType}`);
        }
      })
    );

    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_INITIALIZE_OTHERS_IN_PICKER_DIALOG,
      payload: {
        others
      }
    });
  };

  const selectOtherInPickerDialog = (
    dispatch: Dispatch<Action>,
    other: Other
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_SELECT_OTHER_IN_PICKER_DIALOG,
      payload: {
        other
      }
    });
  };

  const initializeOtherEntitiesInPickerDialog = (
    dispatch: Dispatch<Action>,
    other: Other
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_INITIALIZE_OTHER_ENTITIES_IN_PICKER_DIALOG,
      payload: {
        other
      }
    });
  };

  const focusNextOtherInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentOtherEntity: Other
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_OTHER_IN_PICKER_DIALOG,
      payload: {
        currentOtherEntity
      }
    });
  };

  const focusPreviousOtherInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentOtherEntity: Other
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_OTHER_IN_PICKER_DIALOG,
      payload: {
        currentOtherEntity
      }
    });
  };

  const clearShouldFocusOtherInPickerDialog = (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_OTHER_IN_PICKER_DIALOG
    });
  };

  const selectEntityInPickerDialog = (
    dispatch: Dispatch<Action>,
    entity: EntitySelectEntity,
    multipleSelection: boolean
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_SELECT_ENTITY_IN_PICKER_DIALOG,
      payload: {
        entity,
        multipleSelection
      }
    });
  };

  const unselectEntityInPickerDialog = (
    dispatch: Dispatch<Action>,
    entity: EntitySelectEntity
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_UNSELECT_ENTITY_IN_PICKER_DIALOG,
      payload: {
        entity
      }
    });
  };

  const selectAllEntitiesInPickerDialog = (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_SELECT_ALL_ENTITIES_IN_PICKER_DIALOG
    });
  };

  const unselectAllEntitiesInPickerDialog = (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_UNSELECT_ALL_ENTITIES_IN_PICKER_DIALOG
    });
  };

  const focusNextEntityFromEntitiesInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentEntity: EntitySelectEntity
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG,
      payload: {
        currentEntity
      }
    });
  };

  const focusPreviousEntityFromEntitiesInPickerDialog = (
    dispatch: Dispatch<Action>,
    currentEntity: EntitySelectEntity
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG,
      payload: {
        currentEntity
      }
    });
  };

  const focusNextEntityFromReadMoreInPickerDialog = (
    dispatch: Dispatch<Action>
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG
    });
  };

  const focusPreviousEntityFromReadMoreInPickerDialog = (
    dispatch: Dispatch<Action>
  ) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG
    });
  };

  const clearShouldFocusEntityInPickerDialog = (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ENTITY_IN_PICKER_DIALOG
    });
  };

  const addEntitiesInPickerDialog = (
    dispatch: Dispatch<Action>,
    selectedEntities: EntitySelectEntity[] | null,
    values: EntitySelectValue[],
    changeValues: (newValues: EntitySelectValue[]) => void
  ) => {
    assert(selectedEntities);

    // ピッカーダイアログで選択したエンティティが選択済みリストに含まれていない場合は、一番最後に追加する
    const newEntities = selectedEntities.filter((entity) => {
      return !includesEntitySelectValue(values, entity);
    });
    changeValues([...values, ...newEntities]);

    // ピッカーダイアログを閉じる
    hidePickerDialog(dispatch);
  };

  const fetchMoreOrganizationUsersInPickerDialog = async (
    dispatch: Dispatch<Action>,
    organizationId: string,
    userSize: number
  ) => {
    const offset = userSize;
    const result = await repositories.fetchOrgUsers(organizationId, offset);
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FETCH_MORE_USERS_IN_PICKER_DIALOG,
      payload: {
        users: result.entities.filter(
          (e, index) => index < USER_FETCH_SIZE - 1
        ),
        hasMoreUsers: result.entities.length === USER_FETCH_SIZE
      }
    });
  };

  const fetchMoreGroupUsersInPickerDialog = async (
    dispatch: Dispatch<Action>,
    groupId: string,
    userSize: number
  ) => {
    const offset = userSize;
    const result = await repositories.fetchGroupUsers(groupId, offset);
    dispatch({
      type: ACTION_TYPES.ENTITY_SELECT_FETCH_MORE_USERS_IN_PICKER_DIALOG,
      payload: {
        users: result.entities.filter(
          (e, index) => index < USER_FETCH_SIZE - 1
        ),
        hasMoreUsers: result.entities.length === USER_FETCH_SIZE
      }
    });
  };

  const includesEntitySelectValue = (
    values: EntitySelectValue[],
    entity: EntitySelectEntity
  ) => values.some((value) => isSameEntitySelectValue(value, entity));

  return {
    selectSearchResultContent,
    changeSearchText,
    moveHighlightSearchResultContentItem,
    searchAndShowSearchResultPopup,
    hideSearchResultPopup,
    showPickerDialog,
    hidePickerDialog,
    selectTabInPickerDialog,
    fetchPickerDialogOrganizations,
    fetchPickerDialogDescendentOrganizations,
    selectOrganizationInPickerDialog,
    expandOrganizationInPickerDialog,
    collapseOrganizationInPickerDialog,
    focusNextOrganizationInPickerDialog,
    focusPreviousOrganizationInPickerDialog,
    focusParentOrganizationInPickerDialog,
    clearShouldFocusOrganizationInPickerDialog,
    fetchOrganizationUsersInPickerDialog,
    fetchGroupsInPickerDialog,
    selectGroupInPickerDialog,
    focusNextGroupInPickerDialog,
    focusPreviousGroupInPickerDialog,
    clearShouldFocusGroupInPickerDialog,
    fetchGroupUsersInPickerDialog,
    initializeOthersInPickerDialog,
    selectOtherInPickerDialog,
    initializeOtherEntitiesInPickerDialog,
    focusNextOtherInPickerDialog,
    focusPreviousOtherInPickerDialog,
    clearShouldFocusOtherInPickerDialog,
    selectEntityInPickerDialog,
    unselectEntityInPickerDialog,
    selectAllEntitiesInPickerDialog,
    unselectAllEntitiesInPickerDialog,
    focusNextEntityFromEntitiesInPickerDialog,
    focusPreviousEntityFromEntitiesInPickerDialog,
    focusNextEntityFromReadMoreInPickerDialog,
    focusPreviousEntityFromReadMoreInPickerDialog,
    clearShouldFocusEntityInPickerDialog,
    fetchMoreOrganizationUsersInPickerDialog,
    fetchMoreGroupUsersInPickerDialog,
    addEntitiesInPickerDialog
  };
};
