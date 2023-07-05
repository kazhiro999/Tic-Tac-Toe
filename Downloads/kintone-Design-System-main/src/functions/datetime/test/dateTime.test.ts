import { dateTime } from './../dateTime';

describe('parseISOString', () => {
  test.each([
    ['0001-01-01', 1, 1, 1],
    ['0099-01-01', 99, 1, 1],
    ['0100-01-01', 100, 1, 1],
    ['1900-01-01', 1900, 1, 1],
    ['2021-01-01', 2021, 1, 1]
  ])('valid %o', (isoString, year, month, date) => {
    expect(dateTime.parseISOString(isoString)).toEqual({
      year,
      month,
      date
    });
  });

  test.each([[''], ['abc'], ['20000101']])('invalid %o', (isoString) => {
    expect(() => dateTime.parseISOString(isoString)).toThrowError();
  });
});

describe('isValidISOString', () => {
  test.each([
    // 最大-最小
    ['0001-01-01'],
    ['0099-12-31'],
    ['9999-12-31'],
    // 月ごとの日
    ['0001-01-31'],
    ['0001-02-28'],
    ['0001-03-31'],
    ['0001-04-30'],
    ['0001-05-31'],
    ['0001-06-30'],
    ['0001-07-31'],
    ['0001-08-31'],
    ['0001-09-30'],
    ['0001-10-31'],
    ['0001-11-30'],
    ['0001-12-31'],
    // 閏年
    ['0004-02-29'],
    ['0400-02-29'],
    ['1-1-1']
  ])('value: %s → valid', (value) => {
    expect(dateTime.isValidISOString(value)).toBe(true);
  });

  test.each([
    // 年の範囲
    ['0000-01-01'],
    // 月の範囲
    ['0001-00-01'],
    ['0001-13-01'],
    // 日の範囲
    ['0001-01-00'],
    ['0001-01-32'],
    ['0001-04-31'],
    ['0001-06-31'],
    ['0001-09-31'],
    ['0001-11-31'],
    // 閏年
    ['0001-02-29'],
    ['0100-02-29'],
    // 異常値
    ['20000-01-01'],
    ['2000-001-01'],
    ['2000-01-001'],
    ['20000101'],
    ['2000-0101'],
    ['200001-01'],
    [''],
    ['aaa']
  ])('value: %s → invalid', (value) => {
    expect(dateTime.isValidISOString(value)).toBe(false);
  });
});
