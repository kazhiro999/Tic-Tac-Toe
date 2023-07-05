import * as React from 'react';
import { Icon } from '../Icon';
import { Entity, ENTITY_TYPE } from '../../models/entity';
import { PhotoSize, PHOTO_SIZE } from '../../models/user';
import { FIELD_TYPE } from '../../models/schema';
import {
  UserIcon,
  UserSelectGroupIcon,
  UserSelectOrganizationIcon,
  UserSelectOtherIcon
} from '../../icons';
import { ImgIcon } from '../Icon/ImgIcon';

type Props = Omit<
  React.ComponentProps<typeof Icon>,
  'icon' | 'alternativeText'
> & {
  entity: Entity;
  photoSize?: PhotoSize;
  alternativeText: string;
};

const Component: React.VFC<Props> = ({
  entity,
  photoSize = PHOTO_SIZE.SIZE_24,
  ...iconProps
}) => {
  switch (entity.entityType) {
    case ENTITY_TYPE.USER:
      return <ImgIcon iconUrl={entity.photo[photoSize]} {...iconProps} />;
    case ENTITY_TYPE.ORGANIZATION:
      return <Icon icon={<UserSelectOrganizationIcon />} {...iconProps} />;
    case ENTITY_TYPE.GROUP:
      return <Icon icon={<UserSelectGroupIcon />} {...iconProps} />;
    case ENTITY_TYPE.CREATOR:
    case ENTITY_TYPE.CUSTOM_ITEM:
      return <Icon icon={<UserSelectOtherIcon />} {...iconProps} />;
    case ENTITY_TYPE.FIELD_ENTITY:
      switch (entity.fieldType) {
        case FIELD_TYPE.GROUP_SELECT:
          return <Icon icon={<UserSelectGroupIcon />} {...iconProps} />;
        case FIELD_TYPE.ORGANIZATION_SELECT:
          return <Icon icon={<UserSelectOrganizationIcon />} {...iconProps} />;
        default:
          return <Icon icon={<UserIcon />} {...iconProps} />;
      }
    default:
      return null;
  }
};

export const EntityIcon = Component;
