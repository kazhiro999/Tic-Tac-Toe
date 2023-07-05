import { replaceLocalDateSlashToHyphen } from '../replaceLocalDateSlashToHyphen';

describe('replaceLocalDateSlashToHyphen', () => {
  test.each([
    ['2000/01/01', '2000-01-01'],
    ['2022-12/03', '2022-12-03'],
    ['1999/12-31', '1999-12-31']
  ])('replace %o (is not US date format)', (dataString, expected) => {
    expect(replaceLocalDateSlashToHyphen(dataString, false)).toBe(expected);
  });

  test.each([
    ['01/02/0001', '01/02/0001'],
    ['01/02/2021', '01/02/2021']
  ])('not replace %o (is US date format)', (dataString, expected) => {
    expect(replaceLocalDateSlashToHyphen(dataString, true)).toBe(expected);
  });
});
