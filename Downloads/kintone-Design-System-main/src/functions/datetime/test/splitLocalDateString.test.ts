import { splitLocalDateString } from '../splitLocalDateString';

describe('splitLocalDateString', () => {
  test.each([
    ['0001-01-02', 1, 1, 2],
    ['0099-01-02', 99, 1, 2],
    ['0100-01-02', 100, 1, 2],
    ['1900-01-02', 1900, 1, 2],
    ['2021-01-02', 2021, 1, 2]
  ])('valid %o (not US date format)', (localDateString, year, month, date) => {
    const isUSDateFormat = false;
    expect(splitLocalDateString(localDateString, isUSDateFormat)).toEqual({
      year,
      month,
      date
    });
  });

  test.each([
    ['01/02/0001', 1, 1, 2],
    ['01/02/0099', 99, 1, 2],
    ['01/02/0100', 100, 1, 2],
    ['01/02/1900', 1900, 1, 2],
    ['01/02/2021', 2021, 1, 2]
  ])('valid %o (US date format)', (localDateString, year, month, date) => {
    const isUSDateFormat = true;
    expect(splitLocalDateString(localDateString, isUSDateFormat)).toEqual({
      year,
      month,
      date
    });
  });

  test.each([['01/02/0001'], ['01/02/2021']])(
    'invalid %o (not US date format)',
    (localDateString) => {
      const isUSDateFormat = false;
      expect(() =>
        splitLocalDateString(localDateString, isUSDateFormat)
      ).toThrowError();
    }
  );

  test.each([['0001-01-02'], ['2021-01-02']])(
    'invalid %o (US date format)',
    (localDateString) => {
      const isUSDateFormat = true;
      expect(() =>
        splitLocalDateString(localDateString, isUSDateFormat)
      ).toThrowError();
    }
  );

  test.each([[''], ['abc'], ['20000101']])(
    'invalid %o',
    (invalidDateString) => {
      expect(() =>
        splitLocalDateString(invalidDateString, false)
      ).toThrowError();
    }
  );
});
