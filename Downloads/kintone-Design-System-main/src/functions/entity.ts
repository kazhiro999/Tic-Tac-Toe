import {
  APP_CREATOR_ID,
  AppCreator,
  Entity,
  ENTITY_TYPE
} from '../models/entity';

export const getEntityTypeId = (entity: Entity) =>
  `${entity.entityType}-${entity.id}`;

export const isSameEntity = (entity1: Entity, entity2: Entity) =>
  getEntityTypeId(entity1) === getEntityTypeId(entity2);

/**
 * アプリ作成者情報を取得する。
 */
export const getAppCreator = (name: string): AppCreator => {
  return {
    id: APP_CREATOR_ID,
    entityType: ENTITY_TYPE.CREATOR,
    name,
    localName: name,
    localNameLocale: null,
    removed: false
  };
};
