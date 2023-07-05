import { TypeOfValues } from '../../../typings/utilities';

export const ShimaShimaListMoreButtonLayout = {
  CENTER: 'CENTER',
  LEFT: 'LEFT'
} as const;

export type ShimaShimaListMoreButtonLayoutType = TypeOfValues<
  typeof ShimaShimaListMoreButtonLayout
>;
