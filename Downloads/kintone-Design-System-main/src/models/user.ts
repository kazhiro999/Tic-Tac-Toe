import { TypeOfValues } from '../typings/utilities';
import { ENTITY_TYPE } from './entity';
import { Language } from './language';

export const PHOTO_SIZE = {
  NORMAL: 'normal',
  ORIGINAL: 'original',
  SIZE_24: 'size_24',
  SIZE_32: 'size_32',
  SIZE_40: 'size_40',
  SIZE_48: 'size_48',
  SIZE_56: 'size_56',
  SMALL: 'small'
} as const;

export type PhotoSize = TypeOfValues<typeof PHOTO_SIZE>;

export type User = {
  id: string;
  entityType: typeof ENTITY_TYPE.USER;
  code: string;
  name: string;
  localName: string | null;
  localNameLocale: Language | null;
  photo: Record<PhotoSize, string>;
  email: string | null;
  url: string | null;
  employeeNumber: string | null;
  phone: string | null;
  mobilePhone: string | null;
  extensionNumber: string | null;
  timezone: string;
  removed: boolean;
};
