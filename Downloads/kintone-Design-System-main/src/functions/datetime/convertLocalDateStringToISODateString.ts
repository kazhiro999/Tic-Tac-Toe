import { dateTime } from './dateTime';
import { splitLocalDateString } from './splitLocalDateString';
import { isValidLocalDateString } from './validateLocalDateString';

export const convertLocalDateStringToISODateString = (
  localDateString: string,
  isUSDateFormat: boolean
) => {
  if (isValidLocalDateString(localDateString, isUSDateFormat)) {
    const { year, month, date } = splitLocalDateString(
      localDateString,
      isUSDateFormat
    );
    return dateTime.formatToISODateString(year, month, date);
  }
  return '';
};
