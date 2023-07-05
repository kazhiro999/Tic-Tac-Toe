import { ENTITY_TYPE } from './entity';
import { Language } from './language';

export type Organization = {
  id: string;
  entityType: typeof ENTITY_TYPE.ORGANIZATION;
  code: string;
  name: string;
  localName: string | null;
  localNameLocale: Language | null;
  hasChildren: boolean;
  removed: boolean;
};
