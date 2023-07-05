import { splitLocalDateString } from './splitLocalDateString';
import { isValidLocalDateString } from './validateLocalDateString';

export const zeroPaddingLocalDateString = (
  localDateStr: string,
  isUSDateFormat: boolean
) => {
  if (isValidLocalDateString(localDateStr, isUSDateFormat)) {
    const { year, month, date } = splitLocalDateString(
      localDateStr,
      isUSDateFormat
    );
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
  return localDateStr;
};
