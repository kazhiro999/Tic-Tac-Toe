import { type Placement } from '../../../models/placement';

export type IdentifiedDropdownOption<T extends string = string> = {
  id: string;
  label: string;
  value: T;
};

export type DropdownOption<T extends string = string> = Pick<
  IdentifiedDropdownOption<T>,
  'label' | 'value'
>;

export type DropdownPopupPlacement = Placement;
