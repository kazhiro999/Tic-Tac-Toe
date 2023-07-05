import { User } from '../../models/user';
import { Language } from '../../models/language';
import { ENTITY_TYPE } from '../../models/entity';

const getStaticImageUrl = (path: string) =>
  `https://static.cybozu-dev.com/contents/k/image/${path}`;

type Props = {
  id: string;
  code?: string;
  name?: string;
  localName?: string | null;
  localNameLocale?: Language | null;
  email?: string | null;
  url?: string | null;
  employeeNumber?: string | null;
  phone?: string | null;
  mobilePhone?: string | null;
  extensionNumber?: string | null;
  timezone?: string;
};

export const createDummyUser = (
  {
    id,
    code,
    name,
    localName = null,
    localNameLocale = null,
    email = null,
    url = null,
    employeeNumber = null,
    phone = null,
    mobilePhone = null,
    extensionNumber = null,
    timezone = 'Asia/Tokyo'
  }: Props = {
    id: '1',
    code: undefined,
    name: undefined,
    localName: null,
    localNameLocale: null,
    email: null,
    url: null,
    employeeNumber: null,
    phone: null,
    mobilePhone: null,
    extensionNumber: null,
    timezone: 'Asia/Tokyo'
  }
): User => ({
  id,
  entityType: ENTITY_TYPE.USER,
  code: code || `user${id}`,
  name: name || `ユーザー${id}`,
  localName,
  localNameLocale,
  photo: {
    normal: getStaticImageUrl('icon/user/user_36.svg'),
    original: getStaticImageUrl('icon/user/user.svg'),
    size_24: getStaticImageUrl('icon/user/user_24.svg'),
    size_32: getStaticImageUrl('icon/user/user_32.svg'),
    size_40: getStaticImageUrl('icon/user/user_40.svg'),
    size_48: getStaticImageUrl('icon/user/user_48.svg'),
    size_56: getStaticImageUrl('icon/user/user_56.svg'),
    small: getStaticImageUrl('icon/user/user_16.svg')
  },
  email,
  url,
  employeeNumber,
  phone,
  mobilePhone,
  extensionNumber,
  timezone,
  removed: false
});
