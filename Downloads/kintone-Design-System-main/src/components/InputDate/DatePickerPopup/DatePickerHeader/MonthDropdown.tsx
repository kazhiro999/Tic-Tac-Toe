import React from 'react';
import { PickerDropdown } from '../PickerDropdown';
import type { DropdownOption } from '../../modules/types';

type Props = {
  value: number;
  changeValue: (value: number) => void;
  itemLabels: string[];
};

export const MONTH_DROPDOWN_DATA_TESTID = 'month-dropdown';

const Container: React.VFC<Props> = ({ value, changeValue, itemLabels }) => {
  return (
    <PickerDropdown
      options={getOptions(itemLabels)}
      value={value.toString()}
      changeValue={(v) => changeValue(Number(v))}
      data-testid={MONTH_DROPDOWN_DATA_TESTID}
    />
  );
};

export const MonthDropdown = Container;

const getOptions = (labels: string[]): DropdownOption[] => {
  const options: DropdownOption[] = [];
  labels.forEach((label, i) => {
    options.push({
      label: label,
      value: (i + 1).toString()
    });
  });
  return options;
};
