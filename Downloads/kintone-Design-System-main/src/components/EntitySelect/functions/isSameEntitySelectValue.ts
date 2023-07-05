import { EntitySelectValue } from '../modules/types';

export const isSameEntitySelectValue = (
  value1: EntitySelectValue,
  value2: EntitySelectValue
) => value1.entityType === value2.entityType && value1.id === value2.id;
