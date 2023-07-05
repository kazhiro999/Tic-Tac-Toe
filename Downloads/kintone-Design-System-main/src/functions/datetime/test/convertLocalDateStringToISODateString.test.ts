import { convertLocalDateStringToISODateString } from '../convertLocalDateStringToISODateString';

describe('convertLocalDateStringToISODateString', () => {
  test.each([
    ['1-1-2', '0001-01-02'],
    ['0099-1-02', '0099-01-02'],
    ['0100-01-2', '0100-01-02'],
    ['1900-1-2', '1900-01-02'],
    ['2021-01-02', '2021-01-02']
  ])('valid %o (not US date format)', (localDateString, expected) => {
    const isUSDateFormat = false;
    expect(
      convertLocalDateStringToISODateString(localDateString, isUSDateFormat)
    ).toEqual(expected);
  });

  test.each([
    ['1/2/1', '0001-01-02'],
    ['1/02/0099', '0099-01-02'],
    ['01/2/0100', '0100-01-02'],
    ['1/2/1900', '1900-01-02'],
    ['01/02/2021', '2021-01-02']
  ])('valid %o (US date format)', (localDateString, expected) => {
    const isUSDateFormat = true;
    expect(
      convertLocalDateStringToISODateString(localDateString, isUSDateFormat)
    ).toEqual(expected);
  });

  test.each([
    [''],
    ['abc'],
    ['20000101'],
    ['01/02/20021'],
    ['13/02/2021'],
    ['01/35/2021']
  ])('invalid %o', (invalidDateString) => {
    expect(
      convertLocalDateStringToISODateString(invalidDateString, false)
    ).toBe('');
  });
});
