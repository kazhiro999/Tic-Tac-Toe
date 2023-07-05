import { zeroPaddingLocalDateString } from '../zeroPaddingLocalDateString';

describe('zeroPaddingLocalDateString', () => {
  test.each([
    ['1-01-02', '0001-01-02'],
    ['0099-1-02', '0099-01-02'],
    ['100-01-2', '0100-01-02'],
    ['2021-1-2', '2021-01-02']
  ])('valid %o (is not US date format)', (dateString, expected) => {
    const isUSDateFormat = false;
    expect(zeroPaddingLocalDateString(dateString, isUSDateFormat)).toBe(
      expected
    );
  });

  test.each([
    ['01/02/1', '01/02/0001'],
    ['1/02/0099', '01/02/0099'],
    ['01/2/100', '01/02/0100'],
    ['1/2/2021', '01/02/2021']
  ])('valid %o (is US date format)', (dateString, expected) => {
    const isUSDateFormat = true;
    expect(zeroPaddingLocalDateString(dateString, isUSDateFormat)).toBe(
      expected
    );
  });

  // localeとlanguageから決まるformatに従っていない場合は何もしないことを確認する
  test.each([['01/02/1'], ['1/2/2021']])(
    'invalid %o (is not US date format)',
    (localDateString) => {
      const isUSDateFormat = false;
      expect(zeroPaddingLocalDateString(localDateString, isUSDateFormat)).toBe(
        localDateString
      );
    }
  );

  test.each([['1-01-02'], ['2021-1-2']])(
    'invalid %o (is US date format)',
    (localDateString) => {
      const isUSDateFormat = true;
      expect(zeroPaddingLocalDateString(localDateString, isUSDateFormat)).toBe(
        localDateString
      );
    }
  );
});
