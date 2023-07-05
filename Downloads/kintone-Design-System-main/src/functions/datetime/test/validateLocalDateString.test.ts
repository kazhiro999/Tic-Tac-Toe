import { isValidLocalDateString } from '../validateLocalDateString';

describe('isValidLocalDateString', () => {
  test.each([
    '0001-01-02',
    '0099-01-02',
    '0100-01-02',
    '1900-01-02',
    '2021-01-02'
  ])('%o is valid JA / ZH date string', (localDateString) => {
    const isUSDateFormat = false;
    expect(isValidLocalDateString(localDateString, isUSDateFormat)).toBe(true);
  });

  test.each([
    '01/02/0001',
    '01/02/0099',
    '01/02/0100',
    '01/02/1900',
    '01/02/2021'
  ])('%o is valid US date string', (localDateString) => {
    const isUSDateFormat = true;
    expect(isValidLocalDateString(localDateString, isUSDateFormat)).toBe(true);
  });

  test.each(['01/02/0001', '01/02/2021'])(
    '%o is invalid JA / ZH date string',
    (localDateString) => {
      const isUSDateFormat = false;
      expect(isValidLocalDateString(localDateString, isUSDateFormat)).toBe(
        false
      );
    }
  );

  test.each(['0001-01-02', '2021-01-02'])(
    '%o is invalid US date string',
    (localDateString) => {
      const isUSDateFormat = true;
      expect(isValidLocalDateString(localDateString, isUSDateFormat)).toBe(
        false
      );
    }
  );

  test.each([[''], ['abc'], ['20000101']])('invalid %o', (localDateString) => {
    expect(isValidLocalDateString(localDateString, false)).toBe(false);
  });
});
