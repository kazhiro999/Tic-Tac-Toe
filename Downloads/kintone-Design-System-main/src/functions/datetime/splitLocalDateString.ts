import { dateTime } from './dateTime';
import { isValidLocalDateString } from './validateLocalDateString';

export const splitLocalDateString = (
  localDateStr: string,
  isUSDateFormat: boolean
) => {
  if (!isValidLocalDateString(localDateStr, isUSDateFormat)) {
    throw new Error(`Invalid date string format : "${localDateStr}"`);
  }
  return isUSDateFormat
    ? dateTime.splitEnDateString(localDateStr)
    : dateTime.splitISOString(localDateStr);
};
