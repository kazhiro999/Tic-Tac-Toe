import { ENTITY_TYPE } from '../../models/entity';
import { Group } from '../../models/group';

type Props = {
  id: string;
  code?: string;
  name?: string;
};

export const createDummyGroup = (
  { id, code, name }: Props = {
    id: '1'
  }
): Group => ({
  id,
  entityType: ENTITY_TYPE.GROUP,
  code: code || `group${id}`,
  name: name || `グループ${id}`,
  removed: false
});
