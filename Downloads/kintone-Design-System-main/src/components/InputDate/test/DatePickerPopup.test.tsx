import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../stories/InputDate.stories';
import { MONTH_DROPDOWN_DATA_TESTID } from '../DatePickerPopup/DatePickerHeader/MonthDropdown';
import { YEAR_DROPDOWN_DATA_TESTID } from '../DatePickerPopup/DatePickerHeader/YearDropdown';
import { composeStories } from '@storybook/react';
import { InputDate, DATA_TESTID } from '..';
import dayjs from 'dayjs';

// 以下の仕様書をベースにテスト設計を行う
// https://github.dev.cybozu.co.jp/kintone/kintone/blob/reactone/spec/%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E8%A8%AD%E5%AE%9A%EF%BC%88%E5%85%B1%E9%80%9A%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%EF%BC%89/%E3%83%91%E3%83%BC%E3%83%84/%E6%97%A5%E4%BB%98%E5%85%A5%E5%8A%9B%E3%83%91%E3%83%BC%E3%83%84.md
const { NormalDateFormat, USDateFormat, Empty } = composeStories(stories);
const changeValueSpy = jest.fn();
const onValidateSpy = jest.fn();

const normalDateFormatRenderer = () => {
  changeValueSpy.mockReset();
  onValidateSpy.mockReset();

  return render(
    <>
      <NormalDateFormat
        changeValue={changeValueSpy}
        onValidate={onValidateSpy}
      />
      <button data-testid="external-popup" />
    </>
  );
};

const usDateFormatRenderer = () => {
  changeValueSpy.mockReset();
  onValidateSpy.mockReset();

  return render(
    <USDateFormat changeValue={changeValueSpy} onValidate={onValidateSpy} />
  );
};

const emptyRenderer = () => {
  changeValueSpy.mockReset();
  onValidateSpy.mockReset();

  return render(
    <Empty changeValue={changeValueSpy} onValidate={onValidateSpy} />
  );
};

describe('DatePickerPopup', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('ポップアップで選択した日付が入力欄に表示され、YYYY-MM-DDの表記になっている', async () => {
    const { getByRole } = normalDateFormatRenderer();
    // DatePickerInputをクリック
    const datePickerInput = getByRole('textbox');
    userEvent.click(datePickerInput);
    // カレンダーを取得
    const calendar = getByRole('grid');
    // 2022-03-31のDateCellをクリック
    const dateCell = within(calendar).getByLabelText('31 3月');
    userEvent.click(dateCell);
    // 選択した日付がDatePickerInputに入力される
    expect(datePickerInput).toHaveValue('2022-03-31');
    // changeValueが呼ばれ、選択した日付がアプリケーション側に渡される
    expect(changeValueSpy).lastCalledWith('2022-03-31');
  });

  describe('DatePickerPopupの表示', () => {
    let datePickerInput: HTMLElement;
    const openPopup = () => {
      userEvent.click(datePickerInput);
      expect(getDatePickerPopup()).toBeVisible();
      // 枠外クリック用リスナー登録にtimerが仕掛けられているため全timerをすすめる
      jest.runAllTimers();
    };

    beforeEach(() => {
      const { getByRole } = normalDateFormatRenderer();
      datePickerInput = getByRole('textbox');
    });

    test('初めはClose状態になっている', () => {
      expect(getDatePickerPopup()).toBeNull();
    });

    test('DatePickerInputをクリックするとOpen状態になる', () => {
      // DatePickerInputをクリック
      userEvent.click(datePickerInput);
      // DatePickerが表示される
      expect(getDatePickerPopup()).toBeVisible();
    });

    test('DatePickerPopupの枠外をクリックするとClose状態になる', async () => {
      // DatePickerを表示
      openPopup();
      // DatePicker外をクリック
      userEvent.click(await screen.findByTestId('external-popup'));
      // DatePickerが閉じる
      expect(getDatePickerPopup()).toBeNull();
    });

    test('DatePickerInputにフォーカスしている時にESCを押すとClose状態になる', async () => {
      // DatePickerを表示
      openPopup();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じる
      expect(getDatePickerPopup()).toBeNull();
    });

    test('フォーカスがPreviousMonthButtonにある時、ESCを押すとClose状態になり、DatePickerInputにフォーカスする', async () => {
      // DatePickerを表示
      openPopup();
      // PreviousMonthButtonにフォーカスする
      const prev = await screen.findByRole('button', {
        name: NormalDateFormat.args?.previousMonthButtonAlternativeText
      });
      prev.focus();
      // PreviousMonthButtonのフォーカスを確認
      expect(prev).toHaveFocus();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じていることとDatePickerInputにフォーカスが移ることを確認
      expect(getDatePickerPopup()).toBeNull();
      expect(datePickerInput).toHaveFocus();
    });

    test('FollowingMonthButtonにフォーカスがある時、ESCを押すとClose状態になり、DatePickerInputにフォーカスする', async () => {
      // DatePickerを表示
      openPopup();
      // FollowingMonthButtonにフォーカスする
      const follow = await screen.findByRole('button', {
        name: NormalDateFormat.args?.followingMonthButtonAlternativeText
      });
      follow.focus();
      // FollowingMonthButtonのフォーカスを確認
      expect(follow).toHaveFocus();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じていることとDatePickerInputにフォーカスが移ることを確認
      expect(getDatePickerPopup()).toBeNull();
      expect(datePickerInput).toHaveFocus();
    });

    test('フォーカスがYearDropdownにある時、ESCを押すとClose状態になり、DatePickerInputにフォーカスする', async () => {
      // DatePickerを表示
      openPopup();
      // YearDropdownにフォーカスする
      const year = await within(
        await screen.findByTestId(YEAR_DROPDOWN_DATA_TESTID)
      ).findByRole('button');
      year.focus();
      // YearDropdownのフォーカスを確認
      expect(year).toHaveFocus();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じていることとDatePickerInputにフォーカスが移ることを確認
      expect(getDatePickerPopup()).toBeNull();
      expect(datePickerInput).toHaveFocus();
    });

    test('フォーカスがMonthDropdownにある時、ESCを押すとClose状態になり、DatePickerInputにフォーカスする', async () => {
      // DatePickerを表示
      openPopup();
      // MonthDropdownにフォーカスする
      const month = await within(
        await screen.findByTestId(MONTH_DROPDOWN_DATA_TESTID)
      ).findByRole('button');
      month.focus();
      // MonthDropdownのフォーカスを確認
      expect(month).toHaveFocus();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じていることとDatePickerInputにフォーカスが移ることを確認
      expect(getDatePickerPopup()).toBeNull();
      expect(datePickerInput).toHaveFocus();
    });

    test('フォーカスがDateCellにある時、ESCを押すとClose状態になり、DatePickerInputにフォーカスする', async () => {
      // DatePickerを表示
      openPopup();
      // 3月10日にフォーカスする (TODO: i18n対応 https://github.com/kintone-private/kintone-Design-System/issues/915)
      const date = await screen.findByRole('button', { name: '10 3月' });
      date.focus();
      // 3月10日セルのフォーカスを確認
      expect(date).toHaveFocus();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じていることとDatePickerInputにフォーカスが移ることを確認
      expect(getDatePickerPopup()).toBeNull();
      expect(datePickerInput).toHaveFocus();
    });

    test('フォーカスがTodayButtonにある時、ESCを押すとClose状態になり、DatePickerInputにフォーカスする', async () => {
      // DatePickerを表示
      openPopup();
      // TodayButtonにフォーカスする
      const today = await screen.findByRole('button', { name: '今日' });
      today.focus();
      // TodayButtonのフォーカスを確認
      expect(today).toHaveFocus();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じていることとDatePickerInputにフォーカスが移ることを確認
      expect(getDatePickerPopup()).toBeNull();
      expect(datePickerInput).toHaveFocus();
    });

    test('フォーカスがClearButtonにある時、ESCを押すとClose状態になり、DatePickerInputにフォーカスする', async () => {
      // DatePickerを表示
      openPopup();
      // ClearButtonにフォーカスする
      const clear = await screen.findByRole('button', { name: '選択を解除' });
      clear.focus();
      // ClearButtonのフォーカスを確認
      expect(clear).toHaveFocus();
      // Escapeキーを入力
      await userEvent.keyboard('{Escape}');
      // DatePickerが閉じていることとDatePickerInputにフォーカスが移ることを確認
      expect(getDatePickerPopup()).toBeNull();
      expect(datePickerInput).toHaveFocus();
    });

    test('ClearButtonにフォーカスしている時にTabを押すとClose状態になる', async () => {
      // DatePickerを表示
      openPopup();
      // ClearButtonにフォーカスする
      const clear = await screen.findByRole('button', { name: '選択を解除' });
      clear.focus();
      // ClearButtonのフォーカスを確認
      expect(clear).toHaveFocus();
      // Tabを入力
      userEvent.tab();
      // DatePickerが閉じていることを確認
      expect(getDatePickerPopup()).toBeNull();
      // (念のため) focusはinput外であることを確認
      expect(datePickerInput).not.toHaveFocus();
    });

    test('PreviousMonthButtonにフォーカスしている時にShift+Tabを押すとClose状態になる', async () => {
      // DatePickerを表示
      openPopup();
      // PreviousMonthButtonにフォーカスする
      const prev = await screen.findByRole('button', {
        name: NormalDateFormat.args?.previousMonthButtonAlternativeText
      });
      prev.focus();
      // PreviousMonthButtonのフォーカスを確認
      expect(prev).toHaveFocus();
      // Shift+Tabを入力
      await userEvent.keyboard('{Shift>}{Tab}');
      // DatePickerが閉じていることを確認
      expect(getDatePickerPopup()).toBeNull();
      // (念のため) focusはinput外であることを確認
      expect(datePickerInput).not.toHaveFocus();
    });
  });

  describe('入力値に応じたカレンダー表示', () => {
    test('DatePickerInputに入力されている月を含むカレンダーが表示される', async () => {
      const { getByRole } = normalDateFormatRenderer();
      const datePickerInput = getByRole('textbox');
      // DatePickerInputをクリック
      userEvent.click(datePickerInput);
      // DatePickerInputの値と同じ月がカレンダーに表示されていることを確認
      expect(
        await screen.findByTestId(MONTH_DROPDOWN_DATA_TESTID)
      ).toHaveTextContent('3月');
    });

    test('DatePickerInputに値が入力されていない時、現在のブラウザ上でのシステム日付の月を含むカレンダーが表示される', async () => {
      const month = new Date().getMonth() + 1;
      const { getByRole } = emptyRenderer();
      const datePickerInput = getByRole('textbox');
      // DatePickerInputをクリック
      userEvent.click(datePickerInput);
      // DatePickerInputの値と同じ月がカレンダーに表示されていることを確認
      expect(
        await screen.findByTestId(MONTH_DROPDOWN_DATA_TESTID)
      ).toHaveTextContent(`${month}月`);
    });
  });

  describe('表示言語による違い', () => {
    test('Normal Date Formatの時、年/月の並び順になっている', async () => {
      normalDateFormatRenderer();
      // DatePickerInputをクリック
      const datePickerInput = getDatePickerInput();
      userEvent.click(datePickerInput);
      // YearDropdownの次の要素がMonthDropdownかどうか
      const yearDropdownNextElement = (await findYearDropdown())
        .nextElementSibling;
      const monthDropdown = await findMonthDropdown();
      expect(yearDropdownNextElement).toBe(monthDropdown);
    });

    test('US Date Formatの時、月/年の並び順になっている', async () => {
      usDateFormatRenderer();
      // DatePickerInputをクリック
      const datePickerInput = getDatePickerInput();
      userEvent.click(datePickerInput);
      // MonthDropdownの次の要素がYearDropdownかどうか
      // 月の次のエレメントを取得する
      const monthDropdownNextElement = (await findMonthDropdown())
        .nextElementSibling;
      const yearDropdown = await findYearDropdown();
      // 月の次のエレメントが年を選ぶdropdownかどうかテストする
      expect(monthDropdownNextElement).toBe(yearDropdown);
    });
  });

  describe('年の選択', () => {
    const expectToBeAbleToChangeTheValue = async (
      inputValue: string,
      targetYear: string
    ) => {
      // 入力済みの値をクリアする
      userEvent.clear(getDatePickerInput());
      // DatePickerInputにinputValueを入力する
      userEvent.type(getDatePickerInput(), inputValue);
      // 入力値が反映されていないポップアップが開いているので、ポップアップを開き直す
      userEvent.keyboard('{escape}');
      userEvent.click(getDatePickerInput());
      // 月のドロップダウンの値を取得しておく
      const monthDropdownValue = (await findMonthDropdownButton()).textContent;
      // 年のドロップダウンをクリック
      const yearDropdownButton = await findYearDropdownButton();
      userEvent.click(yearDropdownButton);
      // targetYearのListboxOptionをクリック
      userEvent.click(
        within(await findYearDropdown()).getByRole('option', {
          name: targetYear
        })
      );
      // 年のドロップダウンの値がtargetYearであるか
      expect(yearDropdownButton.textContent).toBe(targetYear);
      // 月のドロップダウンの値が変わっていないか
      expect((await findMonthDropdownButton()).textContent).toBe(
        monthDropdownValue
      );
    };

    test('YearDropdownに、現在表示している年の前後100年の選択肢が表示される', async () => {
      // inputとして2000年を設定
      await renderAndPopup('2000-01-01');
      const yearDropdown = await findYearDropdownButton();
      expect(yearDropdown).toHaveTextContent('2000年');
      // 年のドロップダウンをを開く
      userEvent.click(yearDropdown);
      const yearList = (await screen.findAllByRole('option')).map(
        (v) => v.textContent
      );
      // ドロップダウンに1900年~2100年までのリストが並んでいる
      for (let y = 1900; y <= 2100; y++) {
        expect(yearList).toContain(`${y}年`);
      }
      expect(yearList).not.toContain('1899年');
      expect(yearList).not.toContain('2101年');
    });

    test('YearDropdownで年を切り替えたとき、切り替えた年の前後100年の選択肢が表示される', async () => {
      await renderAndPopup();
      const yearDropdown = await findYearDropdownButton();
      // 初期状態を確認
      expect(yearDropdown).toHaveTextContent('2022年');
      // 年のドロップダウンを開く
      userEvent.click(yearDropdown);
      // 2010年を選択
      userEvent.click(await screen.findByRole('option', { name: '2010年' }));
      expect(yearDropdown).toHaveTextContent('2010年');
      // 再度ドロップダウンを開く
      userEvent.click(yearDropdown);
      const yearList = (await screen.findAllByRole('option')).map(
        (v) => v.textContent
      );
      // ドロップダウンに1910年~2110年までのリストが並んでいる
      for (let y = 1910; y <= 2110; y++) {
        expect(yearList).toContain(`${y}年`);
      }
      expect(yearList).not.toContain('1909年');
      expect(yearList).not.toContain('2111年');
    });

    test('FollowingMonthButtonで年が変わるまで月送りした時、YearDropdownに切り替えた年の前後100年の選択肢が表示される', async () => {
      // DatePickerを表示
      await renderAndPopup('2000-12-01');
      // 12月の状態でFollowingMonthButtonをクリックする
      userEvent.click(
        await screen.findByRole('button', {
          name: stories.args.followingMonthButtonAlternativeText
        })
      );
      const yearDropdown = await findYearDropdownButton();
      // 翌年になっていることを確認
      expect(yearDropdown).toHaveTextContent('2001年');
      // 年のドロップダウンを開く
      userEvent.click(yearDropdown);
      const yearList = (await screen.findAllByRole('option')).map(
        (v) => v.textContent
      );
      // ドロップダウンに1901年~2101年までのリストが並んでいる
      for (let y = 1901; y <= 2101; y++) {
        expect(yearList).toContain(`${y}年`);
      }
      expect(yearList).not.toContain('1900年');
      expect(yearList).not.toContain('2102年');
    });

    test('PreviousMonthButtonで年が変わるまで月戻しした時、YearDropdownに切り替えた年の前後100年の選択肢が表示される', async () => {
      // DatePickerを表示
      await renderAndPopup('2000-01-01');
      // 1月の状態でPreviousMonthButtonをクリックする
      userEvent.click(
        await screen.findByRole('button', {
          name: stories.args.previousMonthButtonAlternativeText
        })
      );
      const yearDropdown = await findYearDropdownButton();
      // 前年になっていることを確認
      expect(yearDropdown).toHaveTextContent('1999年');
      // 年のドロップダウンを開く
      userEvent.click(yearDropdown);
      const yearList = (await screen.findAllByRole('option')).map(
        (v) => v.textContent
      );
      // ドロップダウンに1899年~2099年までのリストが並んでいる
      for (let y = 1899; y <= 2099; y++) {
        expect(yearList).toContain(`${y}年`);
      }
      expect(yearList).not.toContain('1898年');
      expect(yearList).not.toContain('2100年');
    });

    test('値を変えるとCalendarの表示年が変更される', async () => {
      normalDateFormatRenderer();
      // 表示年を確認
      await expectToBeAbleToChangeTheValue('2022-03-01', '2033年');
    });

    test('1年を表示できる', async () => {
      normalDateFormatRenderer();
      // 表示年を確認
      await expectToBeAbleToChangeTheValue('0003-01-01', '1年');
    });

    test('9999年を表示できる', async () => {
      normalDateFormatRenderer();
      // 表示年を確認
      await expectToBeAbleToChangeTheValue('9995-01-01', '9999年');
    });

    test('0年を表示できる', async () => {
      normalDateFormatRenderer();
      // 表示年を確認
      await expectToBeAbleToChangeTheValue('0001-01-01', '0年');
    });

    test('10000年を表示できる', async () => {
      normalDateFormatRenderer();
      // 表示年を確認
      await expectToBeAbleToChangeTheValue('9999-01-01', '10000年');
    });
  });

  describe('月の選択', () => {
    describe('MonthDropdown', () => {
      test('1月から12月のListboxOptionが表示される', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');

        // 月ドロップダウン表示に2月が表示されていることを確認
        const monthDropdown = await findMonthDropdownButton();
        expect(monthDropdown).toHaveTextContent('2月');
        // ドロップダウンをを開く
        userEvent.click(monthDropdown);
        const monthList = (await screen.findAllByRole('option')).map(
          (v) => v.textContent
        );
        // ドロップダウンに1月から12月までのリストが並んでいる
        for (let m = 1; m <= 12; m++) {
          expect(monthList).toContain(`${m}月`);
        }
      });

      test('値を変えるとCalendarの表示月が変更される', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');

        // 月ドロップダウン表示に2月が表示されていることを確認
        const monthDropdown = await findMonthDropdownButton();
        expect(monthDropdown).toHaveTextContent('2月');
        // ドロップダウンを開く
        userEvent.click(monthDropdown);

        // 4月を選択
        userEvent.click(await screen.findByRole('option', { name: '4月' }));
        // 月ドロップダウン表示に4月が表示されていることを確認
        expect(monthDropdown).toHaveTextContent('4月');
      });
    });

    describe('PreviousMonthButton', () => {
      const findPrevMonthButton = () =>
        screen.findByRole('button', {
          name: NormalDateFormat.args?.previousMonthButtonAlternativeText
        });

      test('Tabでフォーカスできる', async () => {
        // DatePickerを表示
        await renderAndPopup();
        // PreviousMonthButtonにフォーカス
        const prev = await findPrevMonthButton();
        prev.focus();
        // PreviousMonthButtonのフォーカスを確認
        expect(prev).toHaveFocus();
      });

      test('クリックで前月に切り替えられる', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');
        // PreviousMonthButtonをクリック
        userEvent.click(await findPrevMonthButton());
        // 月ドロップダウン表示に前月が表示されていることを確認
        expect(await findMonthDropdown()).toHaveTextContent('1月');
      });

      test('Enterで前月に切り替えられる', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');
        // PreviousMonthButtonにフォーカス
        (await findPrevMonthButton()).focus();
        // Enterを入力
        userEvent.keyboard('{enter}');
        // 月ドロップダウン表示に前月が表示されていることを確認
        expect(await findMonthDropdown()).toHaveTextContent('1月');
      });

      test('Spaceで前月に切り替えられる', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');
        // PreviousMonthButtonにフォーカス
        (await findPrevMonthButton()).focus();
        // Spaceを入力
        userEvent.keyboard('{space}');
        // 月ドロップダウン表示に前月が表示されていることを確認
        expect(await findMonthDropdown()).toHaveTextContent('1月');
      });
    });

    describe('FollowingMonthButton', () => {
      const findFollowMonthButton = () =>
        screen.findByRole('button', {
          name: NormalDateFormat.args?.followingMonthButtonAlternativeText
        });

      test('Tabでフォーカスできる', async () => {
        // DatePickerを表示
        await renderAndPopup();
        // FollowingMonthButtonにフォーカス
        const follow = await findFollowMonthButton();
        follow.focus();
        // FollowingMonthButtonのフォーカスを確認
        expect(follow).toHaveFocus();
      });

      test('クリックで翌月に切り替えられる', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');
        // FollowingMonthButtonをクリック
        userEvent.click(await findFollowMonthButton());
        // 月ドロップダウン表示に翌月が表示されていることを確認
        expect(await findMonthDropdown()).toHaveTextContent('3月');
      });

      test('Enterで翌月に切り替えられる', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');
        // FollowingMonthButtonにフォーカス
        (await findFollowMonthButton()).focus();
        // Enterを入力
        userEvent.keyboard('{enter}');
        // 月ドロップダウン表示に翌月が表示されていることを確認
        expect(await findMonthDropdown()).toHaveTextContent('3月');
      });

      test('Spaceで翌月に切り替えられる', async () => {
        // DatePickerを表示
        await renderAndPopup('2020-02-01');
        // FollowingMonthButtonにフォーカス
        (await findFollowMonthButton()).focus();
        // Spaceを入力
        userEvent.keyboard('{space}');
        // 月ドロップダウン表示に翌月が表示されていることを確認
        expect(await findMonthDropdown()).toHaveTextContent('3月');
      });
    });
  });

  describe('DateCell', () => {
    test('Tabでフォーカスできる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // 12月2日セルにフォーカスする
      const secondButton = await screen.findByRole('button', {
        name: '2 12月'
      });
      secondButton.focus();
      // 12月2日セルのフォーカスを確認
      expect(secondButton).toHaveFocus();
    });

    test('Enterを押すとClose状態になり、選択した日付がDatePickerInputに入力される', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // 12月2日セルにフォーカスする
      (await screen.findByRole('button', { name: '2 12月' })).focus();
      // Enterを入力
      userEvent.keyboard('{enter}');
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputにフォーカスしていた日付が入力されていることを確認
      expect(getDatePickerInput()).toHaveValue('2021-12-02');
    });

    test('Spaceを押すとClose状態になり、選択した日付がDatePickerInputに入力される', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // 12月2日セルにフォーカスする
      (await screen.findByRole('button', { name: '2 12月' })).focus();
      // Spaceを入力
      userEvent.keyboard('{space}');
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputにフォーカスしていた日付が入力されていることを確認
      expect(getDatePickerInput()).toHaveValue('2021-12-02');
    });
  });

  describe('TodayButton', () => {
    const findTodayButton = () => screen.findByRole('button', { name: '今日' });
    const getTodayString = () => dayjs().format('YYYY-MM-DD');

    test('Tabでフォーカスできる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // TodayButtonにフォーカスする
      const todayButton = await findTodayButton();
      todayButton.focus();
      // TodayButtonのフォーカスを確認
      expect(todayButton).toHaveFocus();
    });

    test('クリックするとDatePickerInputに今日の日付が入力され、Close状態になる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // TodayButtonをクリック
      userEvent.click(await findTodayButton());
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputに今日の日付が入力されていることを確認
      expect(getDatePickerInput()).toHaveValue(getTodayString());
    });

    test('Enterを押すとDatePickerInputに今日の日付が入力され、Close状態になる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // TodayButtonにフォーカスする
      (await findTodayButton()).focus();
      // Enterを入力
      userEvent.keyboard('{enter}');
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputに今日の日付が入力されていることを確認
      expect(getDatePickerInput()).toHaveValue(getTodayString());
    });
    test('Spaceを押すとDatePickerInputに今日の日付が入力され、Close状態になる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // TodayButtonにフォーカスする
      (await findTodayButton()).focus();
      // Spaceを入力
      userEvent.keyboard('{space}');
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputに今日の日付が入力されていることを確認
      expect(getDatePickerInput()).toHaveValue(getTodayString());
    });
  });

  describe('ClearButton', () => {
    const findClearButton = () =>
      screen.findByRole('button', { name: '選択を解除' });

    test('Tabでフォーカスできる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // ClearButtonにフォーカスする
      const clearButton = await findClearButton();
      clearButton.focus();
      // ClearButtonのフォーカスを確認
      expect(clearButton).toHaveFocus();
    });

    test('クリックするとDatePickerInputがクリアされ、Close状態になる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // ClearButtonをクリック
      userEvent.click(await findClearButton());
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputがクリアされることを確認
      expect(getDatePickerInput()).toHaveValue('');
    });

    test('Enterを押すとDatePickerInputがクリアされ、Close状態になる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // ClearButtonにフォーカスする
      (await findClearButton()).focus();
      // Enterを入力
      userEvent.keyboard('{enter}');
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputがクリアされることを確認
      expect(getDatePickerInput()).toHaveValue('');
    });
    test('Spaceを押すとDatePickerInputがクリアされ、Close状態になる', async () => {
      // DatePickerを表示
      await renderAndPopup('2021-12-01');
      // ClearButtonにフォーカスする
      (await findClearButton()).focus();
      // Spaceを入力
      userEvent.keyboard('{space}');
      // DatePickerが閉じることを確認
      expect(getDatePickerPopup()).toBeNull();
      // DatePickerInputがクリアされることを確認
      expect(getDatePickerInput()).toHaveValue('');
    });
  });

  describe('DatePickerOpenSupportButton', () => {
    const findSupportButton = () =>
      screen.findByRole('button', {
        name: 'カレンダーを開く'
      });

    test('Tabでフォーカスできる', async () => {
      normalDateFormatRenderer();
      // DatePickerOpenSupportButtonにフォーカスする
      const supportButton = await findSupportButton();
      supportButton.focus();
      // DatePickerOpenSupportButtonのフォーカスを確認
      expect(supportButton).toHaveFocus();
    });

    test('Enterを押すとOpen状態になる', async () => {
      normalDateFormatRenderer();
      // DatePickerOpenSupportButtonにフォーカスする
      (await findSupportButton()).focus();
      // Enterを入力
      userEvent.keyboard('{enter}');
      // DatePickerが表示されることを確認
      expect(getDatePickerPopup()).toBeVisible();
    });

    test('Spaceを押すとOpen状態になる', async () => {
      normalDateFormatRenderer();
      // DatePickerOpenSupportButtonにフォーカスする
      (await findSupportButton()).focus();
      // Spaceを入力
      userEvent.keyboard('{space}');
      // DatePickerが表示されることを確認
      expect(getDatePickerPopup()).toBeVisible();
    });
  });
});

const renderAndPopup = async (value = stories.args.initialValue) => {
  const ret = render(
    <InputDate
      {...stories.args}
      changeValue={changeValueSpy}
      onValidate={onValidateSpy}
      value={value}
    />
  );
  const input = await ret.findByRole('textbox');
  userEvent.click(input);
  return ret;
};

const getDatePickerInput = () =>
  within(screen.getByTestId(DATA_TESTID)).getByRole('textbox');

const getDatePickerPopup = () =>
  within(screen.getByTestId(DATA_TESTID)).queryByRole('dialog');

const findYearDropdown = () => screen.findByTestId(YEAR_DROPDOWN_DATA_TESTID);

const findYearDropdownButton = async () =>
  within(await findYearDropdown()).findByRole('button');

const findMonthDropdown = () => screen.findByTestId(MONTH_DROPDOWN_DATA_TESTID);

const findMonthDropdownButton = async () =>
  within(await findMonthDropdown()).findByRole('button');
