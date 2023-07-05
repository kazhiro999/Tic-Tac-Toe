import { Organization } from '../../../models/organization';
import { OrganizationStructure } from './types';
import {
  CustomItem,
  CustomItemEntity,
  ENTITY_TYPE
} from '../../../models/entity';

export const shouldFetchPickerDialogDescendentOrganizations = (
  organization: Organization,
  structure: OrganizationStructure
) => {
  return organization.hasChildren && structure.childStructures.length === 0;
};

/**
 * 右ペインに「すべて選択」チェックボックスを表示するか判定する
 *
 * 表示するのは以下の条件を満たしたとき
 * - エンティティを複数選択可能なとき
 * - 右ペインにユーザーを表示するとき（右ペインにユーザー以外を表示するときは、項目は必ず一つしか存在しない）
 */
export const shouldShowSelectAll = (
  multipleSelection: boolean,
  userAvailable: boolean
) => {
  return multipleSelection && userAvailable;
};

export const convertCustomItemToEntity = (
  customItem: CustomItem
): CustomItemEntity => {
  return {
    id: customItem.id,
    name: customItem.name,
    entityType: ENTITY_TYPE.CUSTOM_ITEM
  };
};
