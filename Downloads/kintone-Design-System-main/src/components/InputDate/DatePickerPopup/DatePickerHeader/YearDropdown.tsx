import React from 'react';
import { PickerDropdown } from '../PickerDropdown';
import type { DropdownOption } from '../../modules/types';

type OuterProps = {
  value: number;
  changeValue: (value: number) => void;
  suffix: string;
};

export const YEAR_DROPDOWN_DATA_TESTID = 'year-dropdown';

const Container: React.VFC<OuterProps> = ({ value, changeValue, suffix }) => {
  return (
    <PickerDropdown
      options={getOptions(value, suffix)}
      value={value.toString()}
      changeValue={(v) => changeValue(Number(v))}
      data-testid={YEAR_DROPDOWN_DATA_TESTID}
    />
  );
};

export const YearDropdown = Container;

const getOptions = (value: number, suffix: string): DropdownOption[] => {
  // 0 〜 1000 年を直接入力しても、保存するまでエラーにはならないので、プルダウンは作っておく
  const floorYear = Math.max(value - 100, 0);
  // 10000 年以降を直接入力しても、保存するまでエラーにはならないので、プルダウンは作っておく
  const upperYear = value + 101;

  const options = [];
  for (let year = floorYear; year < upperYear; year++) {
    options.push({
      label: `${year}${suffix}`,
      value: year.toString()
    });
  }
  return options;
};
