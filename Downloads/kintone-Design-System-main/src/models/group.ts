import { ENTITY_TYPE } from './entity';

export type Group = {
  id: string;
  entityType: typeof ENTITY_TYPE.GROUP;
  code: string;
  name: string;
  removed: boolean;
};
