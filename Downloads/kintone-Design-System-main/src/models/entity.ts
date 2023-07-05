import { Group } from './group';
import { Organization } from './organization';
import { User } from './user';
import { FIELD_TYPE, FieldType } from './schema';
import { TypeOfValues } from '../typings/utilities';
import { Language } from './language';

export const ENTITY_TYPE = {
  USER: 'USER',
  ORGANIZATION: 'ORGANIZATION',
  GROUP: 'GROUP',
  CREATOR: 'CREATOR',
  FIELD_ENTITY: 'FIELD_ENTITY',
  CUSTOM_ITEM: 'CUSTOMITEM'
} as const;

export type EntityType = TypeOfValues<typeof ENTITY_TYPE>;

export type FieldEntity = {
  id: string; // フィールドID
  entityType: typeof ENTITY_TYPE.FIELD_ENTITY;
  fieldType: FieldType;
  name: string;
};

export type Entity =
  | User
  | Organization
  | Group
  | FieldEntity
  | AppCreator
  | CustomItemEntity;

// アプリ作成者
export const APP_CREATOR_ID = '1';

export type AppCreator = {
  id: string;
  entityType: typeof ENTITY_TYPE.CREATOR;
  name: string;
  localName: string | null;
  localNameLocale: Language | null;
  removed: boolean;
};

// slashのカスタマイズ項目（サーバー側から受け取ったレスポンス）
export type CustomItem = {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
  type: typeof FIELD_TYPE.USER_SELECT;
};

// slashのカスタマイズ項目（フロントエンドで扱うための型）
export type CustomItemEntity = {
  id: string;
  name: string;
  entityType: typeof ENTITY_TYPE.CUSTOM_ITEM;
};
