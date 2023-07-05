import { dateTime } from './dateTime';

export const isValidLocalDateString = (
  value: string,
  isUSDateFormat: boolean
) => {
  return isUSDateFormat
    ? dateTime.isValidEnDateString(value)
    : dateTime.isValidISOString(value);
};
