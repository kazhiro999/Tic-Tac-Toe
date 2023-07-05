import { composeStories } from '@storybook/react';
import * as stories from '../stories/InputDate.stories';
import { act, render } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

const { NormalDateFormat, USDateFormat } = composeStories(stories);
const changeValueSpy = jest.fn();
const onValidateSpy = jest.fn();

const normalDateFormatRenderer = () => {
  changeValueSpy.mockReset();
  onValidateSpy.mockReset();

  return render(
    <NormalDateFormat changeValue={changeValueSpy} onValidate={onValidateSpy} />
  );
};

const usDateFormatRenderer = () => {
  changeValueSpy.mockReset();
  onValidateSpy.mockReset();

  return render(
    <USDateFormat changeValue={changeValueSpy} onValidate={onValidateSpy} />
  );
};

describe('DatePickerInput', () => {
  describe('Normal Date Formatの時', () => {
    test('キーボードで正常な日付を入力すると、yyyy-mm-ddのフォーマットで表示される', async () => {
      const { getByRole } = normalDateFormatRenderer();
      // DatePickerInputをクリック
      const inputDate = getByRole('textbox');
      userEvent.click(inputDate);
      // 日付の初期値をクリア
      userEvent.clear(inputDate);
      // キーボードで正常な日付として2024-02-29を入力する
      userEvent.type(inputDate, '2024-02-29');
      // DatePickerInputに2024-02-29が入力されていること
      expect(inputDate).toHaveValue('2024-02-29');
      expect(changeValueSpy).lastCalledWith('2024-02-29');
    });

    test('Tabでフォーカスできる', () => {
      const { getByRole } = normalDateFormatRenderer();
      userEvent.tab();
      expect(getByRole('textbox')).toHaveFocus();
    });

    describe('バリデーション', () => {
      let datePickerInput: HTMLElement;

      beforeEach(() => {
        const { getByRole } = normalDateFormatRenderer();
        // DatePickerInputをクリック
        datePickerInput = getByRole('textbox');
        userEvent.click(datePickerInput);
        // DatePickerInputの値をクリアしておく
        userEvent.clear(datePickerInput);
      });

      test('不正な値が入力された状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '111');
      });

      test('規定のフォーマット以外が入力された時フォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '20220301');
      });

      test('後方にスペースがある状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '2022-03-01    ');
      });

      test('年に1より小さい値を入力した状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '0000-01-01');
      });

      test('年に9999より大きい値を入力した状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '10000-01-01');
      });

      test('月に1より小さい値を入力した状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '2022-00-01');
      });

      test('月に12より大きい値を入力した状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '2022-13-01');
      });

      test('日に1より小さい値を入力した状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '2022-01-00');
      });

      test('31日まである月で、日に31より大きい値を入力した状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '2022-01-32');
      });

      test('30まである月で、日に30より大きい値を入力した状態でフォーカスを外すとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '2022-04-31');
      });

      test('閏年ではない年の2月に、日に28より大きい値を入力するとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '2022-02-29');
      });

      test('mm/dd/yyyy表記の値を入力するとバリデーションエラー', async () => {
        await checkValidation(datePickerInput, '03/01/2022');
      });

      test('yyyy-mm-dd表記の値を入力するとバリデーションエラーは発生しない', async () => {
        // yyyy-mm-ddフォーマットの日付をキーボードで入力
        userEvent.type(datePickerInput, '2033-03-03');
        // フォーカスを外す
        userEvent.tab();
        // バリデーションエラーは発生しない
        expect(onValidateSpy).toHaveBeenCalledWith({
          hasValidationError: false
        });
      });
    });

    describe('前方トリム', () => {
      let datePickerInput: HTMLElement;

      beforeEach(() => {
        const { getByRole } = normalDateFormatRenderer();
        // DatePickerInputをクリック
        datePickerInput = getByRole('textbox');
        userEvent.click(datePickerInput);
        // DatePickerInputの値をクリアしておく
        userEvent.clear(datePickerInput);
      });

      test('前方にスペースを入力した状態でクリックすると前方トリムされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '  2022-03-01',
          '2022-03-01',
          'click'
        );
      });

      test('前方にスペースを入力した状態でフォーカスすると前方トリムされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '  2022-03-01',
          '2022-03-01',
          'focus'
        );
      });

      test('前方にスペースを入力した状態でブラーすると前方トリムされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '  2022-03-01',
          '2022-03-01',
          'blur'
        );
        // エラーでないこと
        expect(onValidateSpy).toBeCalledTimes(1);
        expect(onValidateSpy).lastCalledWith({ hasValidationError: false });
      });
    });
    describe('0埋め', () => {
      let datePickerInput: HTMLElement;

      beforeEach(() => {
        const { getByRole } = normalDateFormatRenderer();
        // DatePickerInputをクリック
        datePickerInput = getByRole('textbox');
        userEvent.click(datePickerInput);
        // DatePickerInputの値をクリアしておく
        userEvent.clear(datePickerInput);
      });

      test('桁数が足りない値を入力した状態で再度クリックすると0埋めされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2022-3-1',
          '2022-03-01',
          'click'
        );
      });

      test('桁数が足りない値を入力した状態で再度フォーカスすると0埋めされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2022-3-1',
          '2022-03-01',
          'focus'
        );
      });
      test('桁数が足りない値を入力した状態でブラーすると0埋めされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2022-3-1',
          '2022-03-01',
          'blur'
        );
        // エラーでないこと
        expect(onValidateSpy).toBeCalledTimes(1);
        expect(onValidateSpy).lastCalledWith({ hasValidationError: false });
      });
    });

    describe('/から-への置換', () => {
      let datePickerInput: HTMLElement;
      beforeEach(() => {
        const { getByRole } = normalDateFormatRenderer();
        datePickerInput = getByRole('textbox');
        // DatePickerInputをクリック
        userEvent.click(datePickerInput);
        // DatePickerInputの値をクリアしておく
        userEvent.clear(datePickerInput);
      });

      test('yyyy/mm/dd表記で入力した後、inputをクリックするとyyyy-mm-dd表記で置換される', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2022/12/22',
          '2022-12-22',
          'click'
        );
      });

      test('yyyy/mm/dd表記で入力した後、フォーカスするとyyyy-mm-dd表記で置換される', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2022/12/22',
          '2022-12-22',
          'focus'
        );
      });

      test('yyyy/mm/dd表記で入力した後、ブラーするとyyyy-mm-dd表記で置換される', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2022/12/22',
          '2022-12-22',
          'blur'
        );
        // エラーでないこと
        expect(onValidateSpy).toBeCalledTimes(1);
        expect(onValidateSpy).lastCalledWith({ hasValidationError: false });
      });
    });
    describe('フォーマットの複合テスト', () => {
      let datePickerInput: HTMLElement;
      beforeEach(() => {
        const { getByRole } = normalDateFormatRenderer();
        datePickerInput = getByRole('textbox');
        // DatePickerInputをクリック
        userEvent.click(datePickerInput);
        // DatePickerInputの値をクリアしておく
        userEvent.clear(datePickerInput);
      });
      test('入力した後、inputをクリックすると全てのフォーマット処理が実行される', async () => {
        await checkTheFormatter(
          datePickerInput,
          '  22/2/2',
          '0022-02-02',
          'click'
        );
      });
      test('入力した後、フォーカスすると全てのフォーマット処理が実行される', async () => {
        await checkTheFormatter(
          datePickerInput,
          '  22/2/2',
          '0022-02-02',
          'focus'
        );
      });

      test('入力した後、ブラーすると全てのフォーマット処理が実行される', async () => {
        await checkTheFormatter(
          datePickerInput,
          '  22/2/2',
          '0022-02-02',
          'blur'
        );
        // エラーでないこと
        expect(onValidateSpy).toBeCalledTimes(1);
        expect(onValidateSpy).lastCalledWith({ hasValidationError: false });
      });
    });
  });

  describe('US Date Formatの時', () => {
    let datePickerInput: HTMLElement;

    beforeEach(() => {
      const { getByRole } = usDateFormatRenderer();
      datePickerInput = getByRole('textbox');
      // DatePickerInputをクリック
      userEvent.click(datePickerInput);
      userEvent.click(datePickerInput);
    });

    test('日付がmm/dd/yyyy表記になっている', async () => {
      // 日付がmm/dd/yyyy（2桁/2桁/4桁）表記になっている
      const datePickerInputValue = datePickerInput.getAttribute('value');
      const isValid = datePickerInputValue?.match(/^\d{2}\/\d{2}\/\d{4}$/);
      expect(isValid).toBeTruthy();
    });

    describe('バリデーション', () => {
      beforeEach(() => {
        // DatePickerInputの入力値をクリアする
        userEvent.clear(datePickerInput);
      });

      test('yyyy-mm-dd表記の値を入力するとバリデーションエラー', async () => {
        checkValidation(datePickerInput, '2033-03-03');
      });

      test('mm/dd/yyyy表記の値を入力するとバリデーションエラーは発生しない', async () => {
        // mm/dd/yyyyフォーマットの日付をキーボードで入力
        userEvent.type(datePickerInput, '03/03/2033');
        // フォーカスを外す
        userEvent.tab();
        // バリデーションエラーは発生しない
        expect(onValidateSpy).toHaveBeenCalledWith({
          hasValidationError: false
        });
      });
    });

    describe('前方トリム', () => {
      beforeEach(() => {
        userEvent.clear(datePickerInput);
      });

      test('前方にスペースを入力した状態でクリックすると前方トリムされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '    03/01/2022',
          '03/01/2022',
          'click'
        );
      });

      test('前方にスペースを入力した状態でフォーカスすると前方トリムされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '    03/01/2022',
          '03/01/2022',
          'focus'
        );
      });

      test('前方にスペースを入力した状態でブラーすると前方トリムされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '    03/01/2022',
          '03/01/2022',
          'blur'
        );
        // エラーでないこと
        expect(onValidateSpy).toBeCalledTimes(1);
        expect(onValidateSpy).lastCalledWith({ hasValidationError: false });
      });
    });

    describe('0埋め', () => {
      beforeEach(() => {
        userEvent.clear(datePickerInput);
      });
      test('桁数が足りない値を入力した状態でフォーカスを外し、再度クリックすると0埋めされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2/2/22',
          '02/02/0022',
          'click'
        );
      });

      test('桁数が足りない値を入力した状態でフォーカスすると0埋めされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2/2/22',
          '02/02/0022',
          'focus'
        );
      });

      test('桁数が足りない値を入力した状態でフォーカスを外し、再度ブラーすると0埋めされる', async () => {
        await checkTheFormatter(
          datePickerInput,
          '2/2/22',
          '02/02/0022',
          'blur'
        );
        // エラーでないこと
        expect(onValidateSpy).toBeCalledTimes(1);
        expect(onValidateSpy).lastCalledWith({ hasValidationError: false });
      });
    });

    describe('-から/への置換', () => {
      test('日付がmm/dd/yyyy表記でも、blur時にyyyy-mm-dd表記に置換しない', async () => {
        // // DatePickerInputの値をクリアしておく
        userEvent.clear(datePickerInput);
        // DatePickerInputに「03/03/2033」を入力
        userEvent.type(datePickerInput, '03/03/2033');
        // DatePickerInputをクリックする
        userEvent.click(datePickerInput);

        expect(datePickerInput).toHaveValue('03/03/2033');
      });
    });
  });
});

const checkValidation = (datePickerInput: HTMLElement, inputString: string) => {
  // キーボードで不正な値を入力する
  userEvent.type(datePickerInput, inputString);
  // DatePickerInputからフォーカスを外す
  userEvent.tab();
  // バリデーションエラー処理されること
  expect(onValidateSpy).toBeCalledTimes(1);
  expect(onValidateSpy).toHaveBeenCalledWith({
    hasValidationError: true
  });
};

const checkTheFormatter = (
  datePickerInput: HTMLElement,
  inputString: string,
  expectedString: string,
  howToActiveInputDate: 'click' | 'focus' | 'blur'
) => {
  act(() => {
    // 検証用の文字列をキーボードで入力する
    userEvent.type(datePickerInput, inputString);
    // DatePickerInputをアクティブにする（クリックまたはフォーカス）
    if (howToActiveInputDate === 'click') userEvent.click(datePickerInput);
    else if (howToActiveInputDate === 'focus') {
      // TODO:実際にはblurの処理が先にかかってしまう。
      userEvent.tab();
      datePickerInput.focus();
    } else if (howToActiveInputDate === 'blur') userEvent.tab();
  });
  // フォーマットされていること
  expect(datePickerInput).toHaveValue(expectedString);
};
