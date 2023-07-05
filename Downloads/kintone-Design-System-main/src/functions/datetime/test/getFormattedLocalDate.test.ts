import { getFormattedLocalDate } from '../getFormattedLocalDate';

describe('getFormattedLocalDate', () => {
  describe('フォーマットが正しい場合', () => {
    test('trimが実行されている', () => {
      expect(getFormattedLocalDate('  1999-01-01', false)).toBe('1999-01-01');
    });
    test('zeroPaddingが実行される', () => {
      expect(getFormattedLocalDate('1999-1-1', false)).toBe('1999-01-01');
    });
    test('/から-への置換が実行されている', () => {
      expect(getFormattedLocalDate('1999/01/01', false)).toBe('1999-01-01');
    });
    test('全てのフォーマット処理が実行されている', () => {
      expect(getFormattedLocalDate('  99/1/1', false)).toBe('0099-01-01');
    });
  });

  describe('フォーマットが正しくない場合', () => {
    test('trimが実行されている', () => {
      expect(getFormattedLocalDate('  1999-01-01-01', false)).toBe(
        '1999-01-01-01'
      );
    });
    test('zeroPaddingは実行されない', () => {
      expect(getFormattedLocalDate('1999-1-1-1', false)).toBe('1999-1-1-1');
    });
    test('/から-への置換が実行されている', () => {
      expect(getFormattedLocalDate('1999/1/1/1', false)).toBe('1999-1-1-1');
    });
  });

  describe('USの場合', () => {
    test('zeroPaddingが正しく実行できている', () => {
      expect(getFormattedLocalDate('1/1/1999', true)).toBe('01/01/1999');
    });
    test('/から-への置換は実行されない', () => {
      expect(getFormattedLocalDate('01/01/1999', true)).toBe('01/01/1999');
    });
  });
});
