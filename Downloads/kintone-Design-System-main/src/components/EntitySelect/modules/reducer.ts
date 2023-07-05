import * as React from 'react';
import { assert } from '../../../functions/asserts/assert';
import { Group } from '../../../models/group';
import { Organization } from '../../../models/organization';
import { isSameEntitySelectEntity } from '../functions/isSameEntitySelectEntity';
import {
  ENTITY_SELECT_ACTION_TYPES as ACTION_TYPES,
  EntitySelectAction as Action
} from './actions';
import {
  EntitySelectEntity,
  EntitySelectOtherType,
  OrganizationStructure,
  Other,
  PickerDialogTabType,
  ResponseTree,
  SearchResultContent
} from './types';
import { getEntityTypeId, isSameEntity } from '../../../functions/entity';

export type State = {
  searchText: string;
  searchResultContents: SearchResultContent[] | null;
  highlightSearchResultContentItemId: string | null;
  pickerDialog: {
    shown: boolean;
    tabTypes: PickerDialogTabType[] | null;
    selectedTabType: PickerDialogTabType | null;
    organizations: Record<string, Organization> | null;
    organizationStructure: OrganizationStructure | null;
    selectedOrganizationId: string | null;
    expandedOrganizationIds: string[] | null;
    // 左ペインのフォーカス可能なOrganizationId。左ペインで同時にフォーカス可能な要素は一つしかない。
    focusableOrganizationId: string | null;
    // 左ペインの中で上下キーで移動する場合に、強制的にフォーカスさせるためのフラグ。
    shouldFocusOrganization: boolean;
    groups: Group[] | null;
    selectedGroupId: string | null;
    // 左ペインのフォーカス可能なGroupId。左ペインで同時にフォーカス可能な要素は一つしかない。
    focusableGroupId: string | null;
    // 左ペインの中で上下キーで移動する場合に、強制的にフォーカスさせるためのフラグ。
    shouldFocusGroup: boolean;
    others: Other[] | null;
    selectedOtherId: string | null;
    selectedOtherType: EntitySelectOtherType | null;
    // 左ペインのフォーカス可能なotherType。左ペインで同時にフォーカス可能な要素は一つしかない。
    focusableOtherId: string | null;
    focusableOtherType: EntitySelectOtherType | null;
    // 左ペインの中で上下キーで移動する場合に、強制的にフォーカスさせるためのフラグ。
    shouldFocusOther: boolean;
    entities: EntitySelectEntity[] | null;
    selectedEntities: EntitySelectEntity[] | null;
    // 右ペインのフォーカス可能なEntity。右ペインで同時にフォーカス可能な要素は一つしかない。
    focusableEntityTypeId: string | null;
    // 右ペインの「さらに表示」がフォーカス可能かどうか。
    readMoreEntitiesFocused: boolean | null;
    // 右ペインの中で上下キーで移動する場合に、強制的にフォーカスさせるためのフラグ。
    shouldFocusEntity: boolean;
    readMoreShown: boolean;
    userSize: number;
  };
};

export const initialState: State = {
  searchText: '',
  searchResultContents: null,
  highlightSearchResultContentItemId: null,
  pickerDialog: {
    shown: false,
    tabTypes: null,
    selectedTabType: null,
    organizations: null,
    organizationStructure: null,
    selectedOrganizationId: null,
    expandedOrganizationIds: null,
    focusableOrganizationId: null,
    shouldFocusOrganization: false,
    groups: null,
    selectedGroupId: null,
    focusableGroupId: null,
    shouldFocusGroup: false,
    others: null,
    selectedOtherId: null,
    selectedOtherType: null,
    focusableOtherId: null,
    focusableOtherType: null,
    shouldFocusOther: false,
    entities: null,
    selectedEntities: null,
    focusableEntityTypeId: null,
    readMoreEntitiesFocused: null,
    shouldFocusEntity: false,
    readMoreShown: false,
    userSize: 0
  }
};

// statementsが上限の40個を超えているので、分割を検討する https://github.dev.cybozu.co.jp/kintone/kintone/issues/19214
// eslint-disable-next-line max-statements
export const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ENTITY_SELECT_CHANGE_SEARCH_TEXT: {
      state.searchText = action.payload;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_MOVE_HIGHLIGHT_SEARCH_RESULT_CONTENT_ITEM: {
      state.highlightSearchResultContentItemId =
        nextHighlightSearchResultContentItemId(
          action.payload.direction,
          state.searchResultContents,
          state.highlightSearchResultContentItemId
        );
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_SEARCH_ENTITIES_SUCCEEDED: {
      const entities = action.payload;
      const searchResultContents = entities.map((entity) => {
        return {
          ...entity,
          itemId: makeSearchResultContentItemId(entity)
        };
      });
      state.searchResultContents = searchResultContents;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_HIDE_SEARCH_RESULT_POPUP: {
      state.searchResultContents = null;
      state.highlightSearchResultContentItemId = null;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_SHOW_PICKER_DIALOG: {
      const { tabTypes } = action.payload;
      assert(tabTypes.length > 0);
      state.pickerDialog.shown = true;
      state.pickerDialog.tabTypes = tabTypes;
      state.pickerDialog.selectedTabType = tabTypes[0];
      state.pickerDialog.selectedEntities = [];
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_HIDE_PICKER_DIALOG: {
      state.pickerDialog = { ...initialState.pickerDialog };
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_SELECT_TAB_IN_PICKER_DIALOG: {
      const selectedTabType = action.payload;
      if (state.pickerDialog.selectedTabType === selectedTabType) {
        return state;
      }

      state.pickerDialog.selectedTabType = selectedTabType;
      state.pickerDialog.entities = null;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FETCH_PICKER_DIALOG_ORGANIZATIONS: {
      const { orgs, tree } = action.payload;
      const organizationStructure =
        convertResponseTreeToOrganizationStructure(tree);
      const expandedOrganizationIds: string[] = [];
      const focusableOrganizationIds = getFocusableOrganizationIds(
        organizationStructure,
        expandedOrganizationIds
      );

      state.pickerDialog.organizations = orgs;
      state.pickerDialog.organizationStructure = organizationStructure;
      state.pickerDialog.expandedOrganizationIds = expandedOrganizationIds;
      state.pickerDialog.focusableOrganizationId =
        focusableOrganizationIds.length > 0
          ? focusableOrganizationIds[0]
          : null;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FETCH_PICKER_DIALOG_DESCENDENT_ORGANIZATIONS: {
      const { orgs, tree } = action.payload;
      state.pickerDialog.organizations = {
        ...state.pickerDialog.organizations,
        ...orgs
      };
      const descendentStructure =
        convertResponseTreeToOrganizationStructure(tree);
      assert(state.pickerDialog.organizationStructure);
      state.pickerDialog.organizationStructure = mergeOrganizationStructure(
        state.pickerDialog.organizationStructure,
        descendentStructure
      );
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_SELECT_ORGANIZATION_IN_PICKER_DIALOG: {
      const { organizationId } = action.payload;
      state.pickerDialog.selectedOrganizationId = organizationId;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_EXPAND_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG: {
      const { organizationId } = action.payload;
      const { expandedOrganizationIds } = state.pickerDialog;
      assert(expandedOrganizationIds);

      // actionが2重実行されても多重追加されないようにfilterしてから追加する
      state.pickerDialog.expandedOrganizationIds = [
        ...expandedOrganizationIds.filter((id) => id !== organizationId),
        organizationId
      ];
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_COLLAPSE_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG: {
      const { organizationId } = action.payload;
      const { expandedOrganizationIds } = state.pickerDialog;
      assert(expandedOrganizationIds);

      state.pickerDialog.expandedOrganizationIds =
        expandedOrganizationIds.filter((id) => id !== organizationId);
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ORGANIZATION_IN_PICKER_DIALOG: {
      const { currentOrganizationId: organizationId } = action.payload;
      const { organizationStructure, expandedOrganizationIds } =
        state.pickerDialog;
      assert(organizationStructure);
      assert(expandedOrganizationIds);

      const focusableOrganizationIds = getFocusableOrganizationIds(
        organizationStructure,
        expandedOrganizationIds
      );
      const currentIndex = focusableOrganizationIds.findIndex(
        (id) => id === organizationId
      );
      const nextIndex =
        currentIndex === focusableOrganizationIds.length - 1
          ? 0
          : currentIndex + 1;

      state.pickerDialog.focusableOrganizationId =
        focusableOrganizationIds[nextIndex];
      state.pickerDialog.shouldFocusOrganization = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ORGANIZATION_IN_PICKER_DIALOG: {
      const { currentOrganizationId: organizationId } = action.payload;
      const { organizationStructure, expandedOrganizationIds } =
        state.pickerDialog;
      assert(organizationStructure);
      assert(expandedOrganizationIds);

      const focusableOrganizationIds = getFocusableOrganizationIds(
        organizationStructure,
        expandedOrganizationIds
      );
      const currentIndex = focusableOrganizationIds.findIndex(
        (id) => id === organizationId
      );
      const previousIndex =
        currentIndex > 0
          ? currentIndex - 1
          : focusableOrganizationIds.length - 1;

      state.pickerDialog.focusableOrganizationId =
        focusableOrganizationIds[previousIndex];
      state.pickerDialog.shouldFocusOrganization = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_PARENT_ORGANIZATION_IN_PICKER_DIALOG: {
      const { currentOrganizationId: organizationId } = action.payload;
      const { organizationStructure, expandedOrganizationIds } =
        state.pickerDialog;
      assert(organizationStructure);
      assert(expandedOrganizationIds);

      const focusableOrganizationIds = getFocusableOrganizationIds(
        organizationStructure,
        expandedOrganizationIds
      );
      const parentOrganizationId = getChildToParentOrganizationIds(
        organizationStructure
      )[organizationId];

      // 親組織がフォーカス可能なら親組織にフォーカスを移動する
      // 親組織がフォーカス不可（例：root組織）なら何もしない
      if (focusableOrganizationIds.includes(parentOrganizationId)) {
        state.pickerDialog.focusableOrganizationId = parentOrganizationId;
        state.pickerDialog.shouldFocusOrganization = true;
        return state;
      }
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ORGANIZATION_IN_PICKER_DIALOG: {
      state.pickerDialog.shouldFocusOrganization = false;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FETCH_ORGANIZATION_USERS_IN_PICKER_DIALOG: {
      const { organization, users, hasMoreUsers } = action.payload;
      const entities = [organization, ...users];
      state.pickerDialog.entities = entities;
      state.pickerDialog.readMoreShown = hasMoreUsers;
      state.pickerDialog.userSize = users.length;
      state.pickerDialog.focusableEntityTypeId =
        entities.length > 0 ? getEntityTypeId(entities[0]) : null;
      state.pickerDialog.readMoreEntitiesFocused = false;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FETCH_GROUPS_IN_PICKER_DIALOG: {
      const { groups } = action.payload;
      state.pickerDialog.groups = groups;
      state.pickerDialog.focusableGroupId =
        groups.length > 0 ? groups[0].id : null;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_SELECT_GROUP_IN_PICKER_DIALOG: {
      const { groupId } = action.payload;
      state.pickerDialog.selectedGroupId = groupId;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_GROUP_IN_PICKER_DIALOG: {
      const { currentGroupId: groupId } = action.payload;
      const { groups } = state.pickerDialog;
      assert(groups);

      const currentIndex = groups.findIndex((g) => g.id === groupId);
      const nextIndex =
        currentIndex === groups.length - 1 ? 0 : currentIndex + 1;

      state.pickerDialog.focusableGroupId = groups[nextIndex].id;
      state.pickerDialog.shouldFocusGroup = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_GROUP_IN_PICKER_DIALOG: {
      const { currentGroupId: groupId } = action.payload;
      const { groups } = state.pickerDialog;
      assert(groups);

      const currentIndex = groups.findIndex((g) => g.id === groupId);
      const previousIndex =
        currentIndex > 0 ? currentIndex - 1 : groups.length - 1;

      state.pickerDialog.focusableGroupId = groups[previousIndex].id;
      state.pickerDialog.shouldFocusGroup = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_GROUP_IN_PICKER_DIALOG: {
      state.pickerDialog.shouldFocusGroup = false;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FETCH_GROUP_USERS_IN_PICKER_DIALOG: {
      const { group, users, hasMoreUsers } = action.payload;
      const entities = [group, ...users];
      state.pickerDialog.entities = entities;
      state.pickerDialog.readMoreShown = hasMoreUsers;
      state.pickerDialog.userSize = users.length;
      state.pickerDialog.focusableEntityTypeId =
        entities.length > 0 ? getEntityTypeId(entities[0]) : null;
      state.pickerDialog.readMoreEntitiesFocused = false;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_INITIALIZE_OTHERS_IN_PICKER_DIALOG: {
      const { others } = action.payload;
      state.pickerDialog.others = others;
      state.pickerDialog.focusableOtherType =
        others.length > 0 ? others[0].entityType : null;
      state.pickerDialog.focusableOtherId =
        others.length > 0 ? others[0].id : null;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_SELECT_OTHER_IN_PICKER_DIALOG: {
      const { other } = action.payload;
      state.pickerDialog.selectedOtherId = other.id;
      state.pickerDialog.selectedOtherType = other.entityType;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_INITIALIZE_OTHER_ENTITIES_IN_PICKER_DIALOG: {
      const { other } = action.payload;
      const entities = [other];
      state.pickerDialog.entities = entities;
      state.pickerDialog.focusableEntityTypeId =
        entities.length > 0 ? getEntityTypeId(entities[0]) : null;
      state.pickerDialog.readMoreEntitiesFocused = false;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_OTHER_IN_PICKER_DIALOG: {
      const { currentOtherEntity } = action.payload;
      const { others } = state.pickerDialog;
      assert(others);

      const currentIndex = others.findIndex((o) =>
        isSameEntity(o, currentOtherEntity)
      );
      const nextIndex =
        currentIndex === others.length - 1 ? 0 : currentIndex + 1;

      state.pickerDialog.focusableOtherId = others[nextIndex].id;
      state.pickerDialog.focusableOtherType = others[nextIndex].entityType;
      state.pickerDialog.shouldFocusOther = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_OTHER_IN_PICKER_DIALOG: {
      const { currentOtherEntity } = action.payload;
      const { others } = state.pickerDialog;
      assert(others);

      const currentIndex = others.findIndex((o) =>
        isSameEntity(o, currentOtherEntity)
      );
      const previousIndex =
        currentIndex > 0 ? currentIndex - 1 : others.length - 1;

      state.pickerDialog.focusableOtherId = others[previousIndex].id;
      state.pickerDialog.focusableOtherType = others[previousIndex].entityType;
      state.pickerDialog.shouldFocusOther = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_OTHER_IN_PICKER_DIALOG:
      state.pickerDialog.shouldFocusOther = false;
      return state;

    case ACTION_TYPES.ENTITY_SELECT_SELECT_ENTITY_IN_PICKER_DIALOG: {
      const { entity, multipleSelection } = action.payload;
      const { selectedEntities } = state.pickerDialog;
      assert(selectedEntities);

      if (multipleSelection) {
        const list = selectedEntities.filter(
          (item) => !isSameEntitySelectEntity(item, entity)
        );
        state.pickerDialog.selectedEntities = [...list, entity];
      } else {
        state.pickerDialog.selectedEntities = [entity];
      }
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_UNSELECT_ENTITY_IN_PICKER_DIALOG: {
      const { entity } = action.payload;
      const { selectedEntities } = state.pickerDialog;
      assert(selectedEntities);

      state.pickerDialog.selectedEntities = selectedEntities.filter(
        (selectedEntity) => !isSameEntitySelectEntity(selectedEntity, entity)
      );
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_SELECT_ALL_ENTITIES_IN_PICKER_DIALOG: {
      const { selectedEntities, entities } = state.pickerDialog;

      // 右ペインのユーザーをまだ取得していないときに「すべて選択」をチェックしたら何もしない
      if (entities === null) {
        return state;
      }

      assert(selectedEntities);
      const unselectedEntities = entities.filter(
        (e) => !includesEntity(selectedEntities, e)
      );

      state.pickerDialog.selectedEntities = [
        ...selectedEntities,
        ...unselectedEntities
      ];
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_UNSELECT_ALL_ENTITIES_IN_PICKER_DIALOG: {
      const { selectedEntities, entities } = state.pickerDialog;

      // 右ペインのユーザーをまだ取得していないときに「すべて選択」のチェックを外したら何もしない
      if (entities === null) {
        return state;
      }

      assert(selectedEntities);
      state.pickerDialog.selectedEntities = selectedEntities.filter(
        (e) => !includesEntity(entities, e)
      );
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG: {
      const { currentEntity } = action.payload;

      const { entities, readMoreShown } = state.pickerDialog;
      assert(entities);

      let nextFocusableEntityTypeId;
      let nextReadMoreEntitiesFocused;
      const currentIndex = entities.findIndex((e) =>
        isSameEntitySelectEntity(currentEntity, e)
      );
      if (currentIndex === entities.length - 1) {
        // entitiesの末尾の要素にフォーカスしていた場合
        if (readMoreShown) {
          // 「さらに表示」があるなら「さらに表示」にフォーカス移動
          nextFocusableEntityTypeId = null;
          nextReadMoreEntitiesFocused = true;
        } else {
          // entitiesの先頭にフォーカス移動
          nextFocusableEntityTypeId = getEntityTypeId(entities[0]);
          nextReadMoreEntitiesFocused = false;
        }
      } else {
        // entitiesの末尾以外の要素にフォーカスしていた場合、次の要素にフォーカス移動
        nextFocusableEntityTypeId = getEntityTypeId(entities[currentIndex + 1]);
        nextReadMoreEntitiesFocused = false;
      }

      state.pickerDialog.focusableEntityTypeId = nextFocusableEntityTypeId;
      state.pickerDialog.readMoreEntitiesFocused = nextReadMoreEntitiesFocused;
      state.pickerDialog.shouldFocusEntity = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG: {
      const { currentEntity } = action.payload;

      const { entities, readMoreShown } = state.pickerDialog;
      assert(entities);

      let nextFocusableEntityTypeId;
      let nextReadMoreEntitiesFocused;
      const currentIndex = entities.findIndex((e) =>
        isSameEntitySelectEntity(currentEntity, e)
      );
      if (currentIndex === 0) {
        // entitiesの先頭の要素にフォーカスしていた場合
        if (readMoreShown) {
          // 「さらに表示」があるなら「さらに表示」にフォーカス移動
          nextFocusableEntityTypeId = null;
          nextReadMoreEntitiesFocused = true;
        } else {
          // entitiesの末尾にフォーカス移動
          nextFocusableEntityTypeId = getEntityTypeId(
            entities[entities.length - 1]
          );
          nextReadMoreEntitiesFocused = false;
        }
      } else {
        // entitiesの末尾以外の要素にフォーカスしていた場合、前の要素にフォーカス移動
        nextFocusableEntityTypeId = getEntityTypeId(entities[currentIndex - 1]);
        nextReadMoreEntitiesFocused = false;
      }

      state.pickerDialog.focusableEntityTypeId = nextFocusableEntityTypeId;
      state.pickerDialog.readMoreEntitiesFocused = nextReadMoreEntitiesFocused;
      state.pickerDialog.shouldFocusEntity = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG: {
      const { entities } = state.pickerDialog;
      assert(entities);

      // 「さらに表示」にフォーカスしていた場合は、entitiesの先頭にフォーカス移動
      state.pickerDialog.focusableEntityTypeId = getEntityTypeId(entities[0]);
      state.pickerDialog.readMoreEntitiesFocused = false;
      state.pickerDialog.shouldFocusEntity = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG: {
      const { entities } = state.pickerDialog;
      assert(entities);

      // 「さらに表示」にフォーカスしていた場合は、entitiesの末尾にフォーカス移動
      state.pickerDialog.focusableEntityTypeId = getEntityTypeId(
        entities[entities.length - 1]
      );
      state.pickerDialog.readMoreEntitiesFocused = false;
      state.pickerDialog.shouldFocusEntity = true;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ENTITY_IN_PICKER_DIALOG: {
      state.pickerDialog.shouldFocusEntity = false;
      return state;
    }
    case ACTION_TYPES.ENTITY_SELECT_FETCH_MORE_USERS_IN_PICKER_DIALOG: {
      const { users, hasMoreUsers } = action.payload;
      const entities = state.pickerDialog.entities;
      assert(entities);

      const notIncludedUsers = users.filter(
        (e) => !includesEntity(entities, e)
      );

      state.pickerDialog.entities = [...entities, ...notIncludedUsers];
      state.pickerDialog.readMoreShown = hasMoreUsers;
      state.pickerDialog.userSize += notIncludedUsers.length;

      // 「さらに表示」にフォーカスがある場合は、追加で取得したユーザーの先頭にフォーカス移動
      if (state.pickerDialog.readMoreEntitiesFocused === true) {
        if (users.length > 0) {
          state.pickerDialog.focusableEntityTypeId = getEntityTypeId(users[0]);
          state.pickerDialog.readMoreEntitiesFocused = false;
          state.pickerDialog.shouldFocusEntity = true;
        } else {
          // 裏でユーザーを削除したケース
          state.pickerDialog.focusableEntityTypeId = getEntityTypeId(
            entities[entities.length - 1]
          );
          state.pickerDialog.readMoreEntitiesFocused = false;
          state.pickerDialog.shouldFocusEntity = true;
        }
      }

      return state;
    }
    default:
      return state;
  }
};

const makeSearchResultContentItemId = (entity: EntitySelectEntity) => {
  return `entityselect-${entity.entityType}-${entity.id}`;
};

const nextHighlightSearchResultContentItemId = (
  direction: 'UP' | 'DOWN',
  searchResultContents: SearchResultContent[] | null,
  currentHighlightSearchResultContentItemId: string | null
): string | null => {
  if (searchResultContents === null) {
    // 検索結果をまだ取得しておらず、ポップアップが非表示のときは、ハイライトする項目が存在しない
    return null;
  }

  // 検索結果項目の表示順で、各itemIdを配列に詰める
  const itemIds = searchResultContents.map((content) => content.itemId);

  const moveUp = direction === 'UP';
  const moveDown = direction === 'DOWN';
  if (currentHighlightSearchResultContentItemId === null) {
    // どの項目もハイライトされていない場合
    if (moveDown) {
      // 下向き移動の場合は最初の要素に移動
      // 上向き移動の場合は何もしない
      return itemIds[0];
    }
  } else {
    const index = itemIds.indexOf(currentHighlightSearchResultContentItemId);
    if (moveDown && index < itemIds.length - 1) {
      // 下向き移動かつ一番下の項目でなければ、一つ下の項目に移動
      return itemIds[index + 1];
    }
    if (moveUp && index > 0) {
      // 上向き移動かつ一番上の項目でなければ、一つ上の項目に移動
      return itemIds[index - 1];
    }
  }

  return currentHighlightSearchResultContentItemId;
};

const convertResponseTreeToOrganizationStructure = (
  tree: ResponseTree
): OrganizationStructure => {
  const organizationIds = Object.keys(tree);
  assert(organizationIds.length === 1);
  const organizationId = organizationIds[0];

  const childStructures = tree[organizationId].map(
    convertResponseTreeToOrganizationStructure
  );
  return {
    organizationId,
    childStructures
  };
};

const mergeOrganizationStructure = (
  currentStructure: OrganizationStructure,
  descendentStructure: OrganizationStructure
): OrganizationStructure => {
  const { organizationId, childStructures } = currentStructure;

  if (descendentStructure.organizationId === organizationId) {
    return descendentStructure;
  }

  return {
    organizationId,
    childStructures: childStructures.map((childStructure) => {
      return mergeOrganizationStructure(childStructure, descendentStructure);
    })
  };
};

/**
 * フォーカス可能な組織IDの配列を取得する。
 * 組織IDはフォーカス可能な順序に並ぶ。
 *
 * 以下の組織はフォーカス不可
 * - root組織であるorganizationStructure.organizationId（画面に表示されないため）
 * - 閉じていて画面に表示されていない子組織
 */
const getFocusableOrganizationIds = (
  organizationStructure: OrganizationStructure,
  expandedOrganizationIds: string[]
): string[] =>
  organizationStructure.childStructures
    .map((childStructure) =>
      getFocusableChildOrganizationIds(childStructure, expandedOrganizationIds)
    )
    // IE11ではArray.prototype.flat()を利用できないので、reduceで代用
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat
    .reduce((acc, organizationIds) => acc.concat(organizationIds), []);

const getFocusableChildOrganizationIds = (
  organizationStructure: OrganizationStructure,
  expandedOrganizationIds: string[]
): string[] => {
  let newChildOrganizationIds: string[] = [];

  const expanded = expandedOrganizationIds.includes(
    organizationStructure.organizationId
  );
  if (expanded) {
    newChildOrganizationIds = organizationStructure.childStructures
      .map((childStructure) =>
        getFocusableChildOrganizationIds(
          childStructure,
          expandedOrganizationIds
        )
      )
      // IE11ではArray.prototype.flat()を利用できないので、reduceで代用
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat
      .reduce((acc, organizationIds) => acc.concat(organizationIds), []);
  }

  return [organizationStructure.organizationId, ...newChildOrganizationIds];
};

/**
 * 子組織IDをキー、親組織IDを値とするオブジェクトを返す
 */
const getChildToParentOrganizationIds = (
  organizationStructure: OrganizationStructure
): Record<string, string> => {
  let childToParentOrganizationIds: Record<string, string> = {};

  organizationStructure.childStructures.forEach((childStructure) => {
    childToParentOrganizationIds[childStructure.organizationId] =
      organizationStructure.organizationId;

    childToParentOrganizationIds = {
      ...childToParentOrganizationIds,
      ...getChildToParentOrganizationIds(childStructure)
    };
  });

  return childToParentOrganizationIds;
};

const includesEntity = (
  entities: EntitySelectEntity[],
  entity: EntitySelectEntity
) => entities.some((e) => isSameEntitySelectEntity(e, entity));
