import { AMPMType, TimePickerOption } from './types';
import { assert } from '../../../functions/asserts/assert';
import { assertExists } from '../../../functions/asserts/assertExists';

const HOURS_FOR_12 = [
  { hour: '0', ampm: 'AM' },
  { hour: '1', ampm: 'AM' },
  { hour: '2', ampm: 'AM' },
  { hour: '3', ampm: 'AM' },
  { hour: '4', ampm: 'AM' },
  { hour: '5', ampm: 'AM' },
  { hour: '6', ampm: 'AM' },
  { hour: '7', ampm: 'AM' },
  { hour: '8', ampm: 'AM' },
  { hour: '9', ampm: 'AM' },
  { hour: '10', ampm: 'AM' },
  { hour: '11', ampm: 'AM' },
  { hour: '0', ampm: 'PM' },
  { hour: '1', ampm: 'PM' },
  { hour: '2', ampm: 'PM' },
  { hour: '3', ampm: 'PM' },
  { hour: '4', ampm: 'PM' },
  { hour: '5', ampm: 'PM' },
  { hour: '6', ampm: 'PM' },
  { hour: '7', ampm: 'PM' },
  { hour: '8', ampm: 'PM' },
  { hour: '9', ampm: 'PM' },
  { hour: '10', ampm: 'PM' },
  { hour: '11', ampm: 'PM' }
];

const HOURS_FOR_24 = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23'
];

const createOption = (
  id: string,
  hour: string,
  minute: string,
  ampm: AMPMType,
  isAMPMNotation: boolean = false
) => {
  return {
    id: isAMPMNotation
      ? `${id}-timePickerItem-${hour}-${minute}-${ampm}`
      : `${id}-timePickerItem-${hour}-${minute}`,
    label: isAMPMNotation ? `${hour}:${minute} ${ampm}` : `${hour}:${minute}`,
    value: {
      hour: hour.padStart(2, '0'),
      minute,
      ampm
    }
  };
};

export const createOptions = (
  id: string,
  isAMPMNotation: boolean
): TimePickerOption[] => {
  if (isAMPMNotation) {
    return HOURS_FOR_12.map(({ hour, ampm }) => [
      createOption(id, hour, '00', ampm as AMPMType, isAMPMNotation),
      createOption(id, hour, '30', ampm as AMPMType, isAMPMNotation)
    ]).flat(2);
  }

  return HOURS_FOR_24.map((hour) => [
    createOption(id, hour, '00', '' as AMPMType),
    createOption(id, hour, '30', '' as AMPMType)
  ]).flat(2);
};

export const makeCalculatedValue = (value: string, delta: number) => {
  const num = Number(value) + delta;
  return ('0' + num).slice(-2);
};

export const findFocusedMenuItemIndex = (
  options: TimePickerOption[],
  id: string
) => {
  const index = options.findIndex((option) => option.id === id);
  assert(index !== -1);
  return index;
};

export const findFocusedItem = (options: TimePickerOption[], id: string) => {
  const item = options.find((option) => option.id === id);
  assertExists(item);
  return item;
};

export const moveCaretPosition = (element: HTMLInputElement) => {
  element.setSelectionRange(2, 2);
};
