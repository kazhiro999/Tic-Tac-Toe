import { Group } from '../../../models/group';
import { Organization } from '../../../models/organization';
import { User } from '../../../models/user';
import {
  AppCreator,
  CustomItem,
  CustomItemEntity
} from '../../../models/entity';
import { TypeOfValues } from '../../../typings/utilities';

export const ENTITY_SELECT_OTHER_TYPE = {
  APP_CREATOR: 'CREATOR',
  CUSTOM_ITEM: 'CUSTOMITEM'
} as const;

export type EntitySelectOtherType = TypeOfValues<
  typeof ENTITY_SELECT_OTHER_TYPE
>;

// その他タブのユーザー
export type Other = AppCreator | CustomItemEntity;

export type EntitySelectEntity = User | Organization | Group | Other;

export type EntitySelectValue = EntitySelectEntity;

// SearchResultPopup
export type SearchResultContent = EntitySelectEntity & {
  itemId: string;
};

export type SearchDirectoryResponse = {
  users: User[];
  orgs: Organization[];
  groups: Group[];
};

export type SearchOrganizationResponse = {
  entities: Organization[];
};

export type SearchGroupResponse = {
  entities: Group[];
};

// Picker Dialog
export type OrganizationStructure = {
  organizationId: string;
  childStructures: OrganizationStructure[];
};

export type ResponseTree = Record<string, ResponseTree[]>;

export type OrgRootTreeResponse = {
  orgs: Record<string, Organization>;
  tree: ResponseTree;
};

export type OrgDescendentResponse = {
  orgs: Record<string, Organization>;
  tree: ResponseTree;
};

export type OrgUsersResponse = {
  entities: User[];
};

export type GroupListResponse = {
  entities: Group[];
};

export type GroupUsersResponse = {
  entities: User[];
};

export type CustomItemsResponse = {
  items: CustomItem[];
};

export const PICKER_DIALOG_TAB_TYPE = {
  ORGANIZATION: 'ORGANIZATION',
  GROUP: 'GROUP',
  OTHER: 'OTHER'
} as const;

export type PickerDialogTabType = TypeOfValues<typeof PICKER_DIALOG_TAB_TYPE>;

// 検索ボックスでユーザー・組織・グループを検索したときに取得する件数
export const SEARCH_SIZE = 11;

// ピッカーダイアログでユーザーを取得したときに「さらに表示」を表示するか判定したいので、1件多く取得する
export const USER_FETCH_SIZE = 101;

export const GROUP_FETCH_SIZE = 100;
