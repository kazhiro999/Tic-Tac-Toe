import { assertExists } from '../../../functions/asserts/assertExists';
import { DropdownOption, IdentifiedDropdownOption } from './types';

export const createIdentifiedOptions = <T extends string>(
  options: Array<DropdownOption<T>>,
  componentId: string
) => {
  return options.map((option, index) => ({
    id: `${componentId}-DropdownMenuItem-${index}`,
    ...option
  }));
};

export const getSelectedOption = <T extends string>(
  identifiedOptions: Array<IdentifiedDropdownOption<T>>,
  value: string
) => {
  const selectedOption = identifiedOptions.find(
    (option) => option.value === value
  );
  assertExists(selectedOption);
  return selectedOption;
};

export const isDropdownButtonFocusable = (
  popupShown: boolean,
  disabled = false
) => {
  // ポップアップを開いているときはポップアップの項目にフォーカスが移動するため、
  // ボタンにフォーカス可能なのは、ポップアップが閉じているときだけ
  // ただし、ドロップダウン自体がdisabledの時は問答無用でフォーカス不可とする
  return !disabled && !popupShown;
};

export const getDropdownButtonAriaLabelledby = (
  dropdownButtonMenuItemId: string,
  ariaLabelledby?: string
) => {
  // 「ラベル」 → 「ドロップダウンの値」の順に読み上げる
  // https://bozuman.cybozu.com/k/#/space/5794/thread/45990/2630585/4143605
  return ariaLabelledby
    ? `${ariaLabelledby} ${dropdownButtonMenuItemId}`
    : dropdownButtonMenuItemId;
};

export const getWidth = (width: number | '100%' | undefined): string => {
  return width === '100%' ? '100%' : `${width}px`;
};
