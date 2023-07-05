import { Organization } from '../../models/organization';
import { Language } from '../../models/language';
import { ENTITY_TYPE } from '../../models/entity';

type Props = {
  id: string;
  code?: string;
  name?: string;
  localName?: string | null;
  localNameLocale?: Language | null;
  hasChildren?: boolean;
};

export const createDummyOrganization = (
  {
    id,
    code,
    name,
    localName = null,
    localNameLocale = null,
    hasChildren = false
  }: Props = {
    id: '1',
    localName: null,
    localNameLocale: null
  }
): Organization => ({
  id,
  entityType: ENTITY_TYPE.ORGANIZATION,
  code: code || `org${id}`,
  name: name || `組織${id}`,
  localName,
  localNameLocale,
  hasChildren,
  removed: false
});
