export const replaceLocalDateSlashToHyphen = (
  localDate: string,
  isUSDateFormat: boolean
) => {
  return isUSDateFormat ? localDate : localDate.replace(/\//g, '-');
};
