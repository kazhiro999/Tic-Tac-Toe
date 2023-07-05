export type IdentifiedComboboxOption<T extends string = string> = {
  id: string;
  label: string;
  value: T;
};

export type ComboboxOption<T extends string = string> = Pick<
  IdentifiedComboboxOption<T>,
  'label' | 'value'
>;
