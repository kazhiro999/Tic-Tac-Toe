import { assertExists } from '../../../functions/asserts/assertExists';
import { ComboboxOption, IdentifiedComboboxOption } from './types';

export const createIdentifiedOptions = <T extends string>(
  options: Array<ComboboxOption<T>>,
  componentId: string
) => {
  return options.map((option, index) => ({
    id: `${componentId}-ComboboxMenuItem-${index}`,
    ...option
  }));
};

export const getSelectedOption = <T extends string>(
  identifiedOptions: Array<IdentifiedComboboxOption<T>>,
  value: T
) => {
  const selectedOption = identifiedOptions.find(
    (option) => option.value === value
  );
  assertExists(selectedOption);
  return selectedOption;
};
