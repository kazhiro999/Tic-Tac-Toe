import { dateTime } from './dateTime';
import { isValidISOString } from './validateISOString';

export const convertISODateStringToLocalDateString = (
  isoString: string,
  isUSDateFormat: boolean
) => {
  if (isValidISOString(isoString)) {
    const { year, month, date } = dateTime.splitISOString(isoString);
    return isUSDateFormat
      ? [
          String(month).padStart(2, '0'),
          String(date).padStart(2, '0'),
          String(year).padStart(4, '0')
        ].join('/')
      : [
          String(year).padStart(4, '0'),
          String(month).padStart(2, '0'),
          String(date).padStart(2, '0')
        ].join('-');
  }
  return isoString;
};
