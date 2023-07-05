import { TypeOfValues } from '../typings/utilities';

export const LANGUAGE = {
  JA: 'ja',
  EN: 'en',
  ZH: 'zh'
} as const;

export type Language = TypeOfValues<typeof LANGUAGE>;
