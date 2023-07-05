import { replaceLocalDateSlashToHyphen } from './replaceLocalDateSlashToHyphen';
import { zeroPaddingLocalDateString } from './zeroPaddingLocalDateString';

export const getFormattedLocalDate = (
  localDate: string,
  isUSDateFormat: boolean
) => {
  // trim & zero padding & slash to hyphen
  const trimmedLocalDate = localDate.trimStart();
  const trimmedAndSlashLocalDate = replaceLocalDateSlashToHyphen(
    trimmedLocalDate,
    isUSDateFormat
  );
  const trimmedAndSlashLocalDateAndZeroPadding = zeroPaddingLocalDateString(
    trimmedAndSlashLocalDate,
    isUSDateFormat
  );
  return trimmedAndSlashLocalDateAndZeroPadding;
};
