// IFをわかりやすくするための型
export type ISODateString = string;

export type CalendarDateContent = {
  year: number;
  month: number;
  date: number;
  dateStr: string;
};

export type CalendarHeadCellLabels = {
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
};

export type DropdownOption = {
  label: string;
  value: string;
};
