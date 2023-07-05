import { Organization } from '../../../models/organization';
import {
  EntitySelectEntity,
  OrgDescendentResponse,
  OrgRootTreeResponse,
  Other,
  PickerDialogTabType
} from './types';
import { User } from '../../../models/user';
import { Group } from '../../../models/group';

export const ENTITY_SELECT_ACTION_TYPES = {
  ENTITY_SELECT_CHANGE_SEARCH_TEXT: 'ENTITY_SELECT_CHANGE_SEARCH_TEXT',
  ENTITY_SELECT_SEARCH_ENTITIES_SUCCEEDED:
    'ENTITY_SELECT_SEARCH_ENTITIES_SUCCEEDED',
  ENTITY_SELECT_MOVE_HIGHLIGHT_SEARCH_RESULT_CONTENT_ITEM:
    'ENTITY_SELECT_MOVE_HIGHLIGHT_SEARCH_RESULT_CONTENT_ITEM',
  ENTITY_SELECT_HIDE_SEARCH_RESULT_POPUP:
    'ENTITY_SELECT_HIDE_SEARCH_RESULT_POPUP',
  ENTITY_SELECT_SHOW_PICKER_DIALOG: 'ENTITY_SELECT_SHOW_PICKER_DIALOG',
  ENTITY_SELECT_HIDE_PICKER_DIALOG: 'ENTITY_SELECT_HIDE_PICKER_DIALOG',
  ENTITY_SELECT_SELECT_TAB_IN_PICKER_DIALOG:
    'ENTITY_SELECT_SELECT_TAB_IN_PICKER_DIALOG',
  ENTITY_SELECT_FETCH_PICKER_DIALOG_ORGANIZATIONS:
    'ENTITY_SELECT_FETCH_PICKER_DIALOG_ORGANIZATIONS',
  ENTITY_SELECT_FETCH_PICKER_DIALOG_DESCENDENT_ORGANIZATIONS:
    'ENTITY_SELECT_FETCH_PICKER_DIALOG_DESCENDENT_ORGANIZATIONS',
  ENTITY_SELECT_SELECT_ORGANIZATION_IN_PICKER_DIALOG:
    'ENTITY_SELECT_SELECT_ORGANIZATION_IN_PICKER_DIALOG',
  ENTITY_SELECT_EXPAND_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG:
    'ENTITY_SELECT_EXPAND_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG',
  ENTITY_SELECT_COLLAPSE_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG:
    'ENTITY_SELECT_COLLAPSE_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_NEXT_ORGANIZATION_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_NEXT_ORGANIZATION_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_PREVIOUS_ORGANIZATION_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_PREVIOUS_ORGANIZATION_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_PARENT_ORGANIZATION_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_PARENT_ORGANIZATION_IN_PICKER_DIALOG',
  ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ORGANIZATION_IN_PICKER_DIALOG:
    'ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ORGANIZATION_IN_PICKER_DIALOG',
  ENTITY_SELECT_FETCH_ORGANIZATION_USERS_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FETCH_ORGANIZATION_USERS_IN_PICKER_DIALOG',
  ENTITY_SELECT_FETCH_GROUPS_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FETCH_GROUPS_IN_PICKER_DIALOG',
  ENTITY_SELECT_SELECT_GROUP_IN_PICKER_DIALOG:
    'ENTITY_SELECT_SELECT_GROUP_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_NEXT_GROUP_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_NEXT_GROUP_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_PREVIOUS_GROUP_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_PREVIOUS_GROUP_IN_PICKER_DIALOG',
  ENTITY_SELECT_CLEAR_SHOULD_FOCUS_GROUP_IN_PICKER_DIALOG:
    'ENTITY_SELECT_CLEAR_SHOULD_FOCUS_GROUP_IN_PICKER_DIALOG',
  ENTITY_SELECT_FETCH_GROUP_USERS_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FETCH_GROUP_USERS_IN_PICKER_DIALOG',
  ENTITY_SELECT_INITIALIZE_OTHERS_IN_PICKER_DIALOG:
    'ENTITY_SELECT_INITIALIZE_OTHERS_IN_PICKER_DIALOG',
  ENTITY_SELECT_SELECT_OTHER_IN_PICKER_DIALOG:
    'ENTITY_SELECT_SELECT_OTHER_IN_PICKER_DIALOG',
  ENTITY_SELECT_INITIALIZE_OTHER_ENTITIES_IN_PICKER_DIALOG:
    'ENTITY_SELECT_INITIALIZE_OTHER_ENTITIES_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_NEXT_OTHER_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_NEXT_OTHER_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_PREVIOUS_OTHER_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_PREVIOUS_OTHER_IN_PICKER_DIALOG',
  ENTITY_SELECT_CLEAR_SHOULD_FOCUS_OTHER_IN_PICKER_DIALOG:
    'ENTITY_SELECT_CLEAR_SHOULD_FOCUS_OTHER_IN_PICKER_DIALOG',
  ENTITY_SELECT_SELECT_ENTITY_IN_PICKER_DIALOG:
    'ENTITY_SELECT_SELECT_ENTITY_IN_PICKER_DIALOG',
  ENTITY_SELECT_UNSELECT_ENTITY_IN_PICKER_DIALOG:
    'ENTITY_SELECT_UNSELECT_ENTITY_IN_PICKER_DIALOG',
  ENTITY_SELECT_SELECT_ALL_ENTITIES_IN_PICKER_DIALOG:
    'ENTITY_SELECT_SELECT_ALL_ENTITIES_IN_PICKER_DIALOG',
  ENTITY_SELECT_UNSELECT_ALL_ENTITIES_IN_PICKER_DIALOG:
    'ENTITY_SELECT_UNSELECT_ALL_ENTITIES_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG',
  ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG',
  ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ENTITY_IN_PICKER_DIALOG:
    'ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ENTITY_IN_PICKER_DIALOG',
  ENTITY_SELECT_FETCH_MORE_USERS_IN_PICKER_DIALOG:
    'ENTITY_SELECT_FETCH_MORE_USERS_IN_PICKER_DIALOG'
} as const;

export type EntitySelectAction =
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_CHANGE_SEARCH_TEXT;
      payload: string;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_MOVE_HIGHLIGHT_SEARCH_RESULT_CONTENT_ITEM;
      payload: {
        direction: 'UP' | 'DOWN';
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SEARCH_ENTITIES_SUCCEEDED;
      payload: Array<User | Organization | Group>;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_HIDE_SEARCH_RESULT_POPUP;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SHOW_PICKER_DIALOG;
      payload: {
        tabTypes: PickerDialogTabType[];
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_HIDE_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SELECT_TAB_IN_PICKER_DIALOG;
      payload: PickerDialogTabType;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FETCH_PICKER_DIALOG_ORGANIZATIONS;
      payload: OrgRootTreeResponse;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FETCH_PICKER_DIALOG_DESCENDENT_ORGANIZATIONS;
      payload: OrgDescendentResponse;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SELECT_ORGANIZATION_IN_PICKER_DIALOG;
      payload: {
        organizationId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_EXPAND_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG;
      payload: {
        organizationId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_COLLAPSE_CHILD_ORGANIZATIONS_IN_PICKER_DIALOG;
      payload: {
        organizationId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ORGANIZATION_IN_PICKER_DIALOG;
      payload: {
        currentOrganizationId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ORGANIZATION_IN_PICKER_DIALOG;
      payload: {
        currentOrganizationId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_PARENT_ORGANIZATION_IN_PICKER_DIALOG;
      payload: {
        currentOrganizationId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ORGANIZATION_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FETCH_ORGANIZATION_USERS_IN_PICKER_DIALOG;
      payload: {
        organization: Organization;
        users: User[];
        hasMoreUsers: boolean;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FETCH_GROUPS_IN_PICKER_DIALOG;
      payload: {
        groups: Group[];
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SELECT_GROUP_IN_PICKER_DIALOG;
      payload: {
        groupId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_GROUP_IN_PICKER_DIALOG;
      payload: {
        currentGroupId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_GROUP_IN_PICKER_DIALOG;
      payload: {
        currentGroupId: string;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_GROUP_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FETCH_GROUP_USERS_IN_PICKER_DIALOG;
      payload: {
        group: Group;
        users: User[];
        hasMoreUsers: boolean;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_INITIALIZE_OTHERS_IN_PICKER_DIALOG;
      payload: {
        others: Other[];
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SELECT_OTHER_IN_PICKER_DIALOG;
      payload: {
        other: Other;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_INITIALIZE_OTHER_ENTITIES_IN_PICKER_DIALOG;
      payload: {
        other: Other;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_OTHER_IN_PICKER_DIALOG;
      payload: {
        currentOtherEntity: Other;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_OTHER_IN_PICKER_DIALOG;
      payload: {
        currentOtherEntity: Other;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_OTHER_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SELECT_ENTITY_IN_PICKER_DIALOG;
      payload: {
        entity: EntitySelectEntity;
        multipleSelection: boolean;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_UNSELECT_ENTITY_IN_PICKER_DIALOG;
      payload: {
        entity: EntitySelectEntity;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_SELECT_ALL_ENTITIES_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_UNSELECT_ALL_ENTITIES_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG;
      payload: {
        currentEntity: EntitySelectEntity;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_ENTITIES_IN_PICKER_DIALOG;
      payload: {
        currentEntity: EntitySelectEntity;
      };
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_NEXT_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FOCUS_PREVIOUS_ENTITY_FROM_READ_MORE_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_CLEAR_SHOULD_FOCUS_ENTITY_IN_PICKER_DIALOG;
    }
  | {
      type: typeof ENTITY_SELECT_ACTION_TYPES.ENTITY_SELECT_FETCH_MORE_USERS_IN_PICKER_DIALOG;
      payload: {
        users: User[];
        hasMoreUsers: boolean;
      };
    };
