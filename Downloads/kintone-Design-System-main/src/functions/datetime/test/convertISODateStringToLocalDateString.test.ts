import { convertISODateStringToLocalDateString } from '../convertISODateStringToLocalDateString';

describe('convertISODateStringToLocalDateString', () => {
  test.each([
    ['0001-01-02', '0001-01-02'],
    ['0099-01-02', '0099-01-02'],
    ['0100-01-02', '0100-01-02'],
    ['1900-01-02', '1900-01-02'],
    ['2021-01-02', '2021-01-02']
  ])('valid %o (not US date format)', (isoDateString, expected) => {
    const isUSDateFormat = false;
    expect(
      convertISODateStringToLocalDateString(isoDateString, isUSDateFormat)
    ).toEqual(expected);
  });

  test.each([
    ['0001-01-02', '01/02/0001'],
    ['0099-01-02', '01/02/0099'],
    ['0100-01-02', '01/02/0100'],
    ['1900-01-02', '01/02/1900'],
    ['2021-01-02', '01/02/2021']
  ])('valid %o (US date format)', (isoDateString, expected) => {
    const isUSDateFormat = true;
    expect(
      convertISODateStringToLocalDateString(isoDateString, isUSDateFormat)
    ).toEqual(expected);
  });

  test.each([[''], ['abc'], ['20000101'], ['01/02/2021'], ['01/02/0001']])(
    'invalid %o',
    (invalidDateString) => {
      expect(
        convertISODateStringToLocalDateString(invalidDateString, false)
      ).toBe(invalidDateString);
    }
  );
});
