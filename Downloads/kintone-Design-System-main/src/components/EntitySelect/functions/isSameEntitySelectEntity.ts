import { EntitySelectEntity } from '../modules/types';
import { getEntityTypeId } from '../../../functions/entity';

export const isSameEntitySelectEntity = (
  entity1: EntitySelectEntity,
  entity2: EntitySelectEntity
) => getEntityTypeId(entity1) === getEntityTypeId(entity2);
