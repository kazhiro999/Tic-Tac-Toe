import { IdentifiedMultipleSelectOption } from '../MultipleSelectItem';

export type MultipleSelectOption = Pick<
  IdentifiedMultipleSelectOption,
  'label' | 'value'
>;
