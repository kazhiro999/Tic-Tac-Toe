export type TimePickerOption = {
  id: string;
  label: string;
  value: {
    hour: string;
    minute: string;
    ampm: AMPMType;
  };
};

export type AMPMType = 'AM' | 'PM' | '';
