import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from '../stories/Combobox.stories';
import * as testStories from '../stories/Combobox.test.stories';
import userEvent from '@testing-library/user-event';
import { DATA_TESTID as ACTIVE_DATA_TESTID } from '../ComboboxMenuItem';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';
import { addIgnoreComponentNames } from '../../../functions/testing/ignoreReactActWarning';

const { Default } = composeStories(stories);

const createDefaultOptions = () => {
  const options = [];

  for (let i = 0; i < 30; i++) {
    options.push({ label: `Option ${i}`, value: `option${i}` });
  }
  return options;
};

const DEFAULT_OPTIONS = createDefaultOptions();
const SELECTED_OPTION = DEFAULT_OPTIONS[1];

const comboboxRenderer = (changeValue: (value: string) => void = jest.fn) => {
  return render(
    <>
      <Default
        options={DEFAULT_OPTIONS}
        value={SELECTED_OPTION.value}
        changeValue={changeValue}
      />
      <div data-testid="external-popup" />
    </>
  );
};

describe('Search', () => {
  let refreshIgnoreComponents: VoidFunction;
  beforeAll(() => {
    // TODO actが必要な箇所があるので解決したら削除する
    refreshIgnoreComponents = addIgnoreComponentNames('Combobox');
  });
  afterAll(() => {
    refreshIgnoreComponents();
  });

  describe('Searchbox', () => {
    test('クリックするとListboxPopupを開閉できる', async () => {
      const { getByRole, queryByRole } = comboboxRenderer();
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // 再度Searchboxをクリック
      userEvent.click(searchbox);
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
    });

    test('文字入力するとListboxOptionが絞り込まれる', async () => {
      const { getByRole, getAllByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // ListboxPopupを開いた直後はすべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toEqual(DEFAULT_OPTIONS.length);
      // Searchboxに最初のListboxOptionのLabelを入力する
      userEvent.type(
        searchbox,
        `{selectall}{backspace}${DEFAULT_OPTIONS[0].label}`
      );
      // ListboxOptionがひとつに絞り込まれていること
      expect(getAllByRole('option').length).toEqual(1);
    });

    test('入力した文字列の中間一致の結果がListboxPopupに表示される', async () => {
      const { getByRole, getAllByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // 入力値をクリアして「1」と入力
      userEvent.type(searchbox, '{selectall}{backspace}1');
      // Option 1, Option 10 ~ Option 19, Option 21 の12個のListboxOptionが絞り込まれること
      expect(getAllByRole('option').length).toBe(12);
    });

    test('検索時は大文字小文字を区別しない', async () => {
      const { getByRole, getAllByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // 小文字で「option 10」入力（ListboxOptionのLabelは先頭が大文字）
      userEvent.type(searchbox, '{selectall}{backspace}option 10');
      // ListboxOptionがOption 10ひとつに絞り込まれていること
      let option = getAllByRole('option');
      expect(option.length).toBe(1);
      expect(option[0]).toHaveTextContent('Option 10');
      // すべて大文字で「OPTION 11」と入力
      userEvent.type(searchbox, '{selectall}{backspace}OPTION 11');
      // ListboxOptionがOption 11ひとつに絞り込まれていること
      option = getAllByRole('option');
      expect(option.length).toBe(1);
      expect(option[0]).toHaveTextContent('Option 11');
    });

    test('ヒットするListboxOptionがない場合はListboxPopupはClose状態になり、マウスやキー操作を受け付けない', async () => {
      const { getByRole, queryByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // この時点ではListboxPopupは開いていること
      expect(getByRole('listbox')).toBeVisible();
      // 「abc」と入力
      userEvent.type(searchbox, '{selectall}{backspace}abc');
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // 下矢印キーを押してもListboxPopupは表示されないこと
      userEvent.keyboard('{arrowdown}');
      expect(queryByRole('listbox')).toBeNull();
      // 上矢印キーを押してもListboxPopupは表示されないこと
      userEvent.keyboard('{arrowup}');
      expect(queryByRole('listbox')).toBeNull();
      // SearchboxをクリックしてもListboxPopupは表示されないこと
      userEvent.click(searchbox);
      expect(queryByRole('listbox')).toBeNull();
    });

    test('空欄・空文字の場合はすべてのListboxOptionが表示される', async () => {
      const { getByRole, getAllByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // Searchboxを空欄にする
      userEvent.clear(searchbox);
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
      // 半角の空白文字を入力
      userEvent.type(searchbox, '   ');
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
      // 全角の空白文字を入力
      userEvent.type(searchbox, '　　　');
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
    });

    test('下矢印キーを押すとListboxPopupが開き、Selected状態のListboxOptionがActive状態になる', async () => {
      const { getByRole } = comboboxRenderer();
      // Searchboxにフォーカス
      const searchbox = getByRole('combobox');
      searchbox.focus();
      // 下矢印キーを押す
      userEvent.keyboard('{arrowdown}');
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // Selected状態のListboxOptionがActive状態になること
      expectListboxOptionToBeActive(searchbox, SELECTED_OPTION.label);
    });

    test('上矢印キーを押すとListboxPopupが開き、Selected状態のListboxOptionがActive状態になる', async () => {
      const { getByRole } = comboboxRenderer();
      // Searchboxにフォーカス
      const searchbox = getByRole('combobox');
      searchbox.focus();
      // 上矢印キーを押す
      userEvent.keyboard('{arrowup}'); // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // Selected状態のListboxOptionがActive状態になること
      expectListboxOptionToBeActive(searchbox, SELECTED_OPTION.label);
    });
  });

  describe('SearchButton', () => {
    beforeEach(() => jest.useFakeTimers());

    test('クリックするとListboxPopupを開閉できる', async () => {
      const { getByRole, queryByRole } = comboboxRenderer();
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // SearchButtonをクリック
      const searchButton = getByRole('button');
      userEvent.click(searchButton);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // Searchboxにフォーカスしていること
      expect(getByRole('combobox')).toHaveFocus();
      // 再度SearchButtonをクリック
      jest.runAllTimers();
      userEvent.click(searchButton);
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
    });

    test('エンターキーを押すとListboxPopupが開閉できる', async () => {
      const { getByRole, queryByRole } = comboboxRenderer();
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // SearchButtonはTabキーではフォーカスできないが、スクリーンリーダーのボタンジャンプ機能を使えばフォーカスできる
      // SearchButtonにフォーカス
      const searchButton = getByRole('button');
      searchButton.focus();
      // エンターキーを押す
      userEvent.keyboard('{enter}');
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // Searchboxにフォーカスしていること
      expect(getByRole('combobox')).toHaveFocus();
      // 再度SearchButtonにフォーカス
      jest.runAllTimers();
      searchButton.focus();
      // エンターキーを押す
      userEvent.keyboard('{enter}');
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
    });

    test('スペースキーを押すとListboxPopupが開閉できる', async () => {
      const { getByRole, queryByRole } = comboboxRenderer();
      // SearchButtonはTabキーではフォーカスできないが、スクリーンリーダーのボタンジャンプ機能を使えばフォーカスできる
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // SearchButtonにフォーカス
      const searchButton = getByRole('button');
      searchButton.focus();
      // スペースキーを押す
      userEvent.keyboard('{space}');
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // Searchboxにフォーカスしていること
      expect(getByRole('combobox')).toHaveFocus();
      // 再度SearchButtonにフォーカス
      jest.runAllTimers();
      searchButton.focus();
      // エンターキーを押す
      userEvent.keyboard('{space}');
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
    });

    test('SearchButtonにAccessibleNameが設定されている', async () => {
      const { getByRole } = comboboxRenderer();
      expect(getByRole('button')).toHaveAccessibleName();
    });

    afterEach(() => jest.useRealTimers());
  });

  describe('入力値と候補の初期化', () => {
    beforeEach(() => jest.useFakeTimers());

    test('入力中でListboxPopupがClose状態の時、枠外をクリックすると初期化される', async () => {
      const { getByRole, getAllByRole, getByTestId, queryByRole } =
        comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // 不正な値「abc」を入力
      userEvent.clear(searchbox);
      userEvent.type(searchbox, 'abc');
      // 候補がないのでListboxPopupは閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // ListboxPopupの領域外をクリック
      jest.advanceTimersByTime(10);
      userEvent.click(getByTestId('external-popup'));
      // ListboxPopupは閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxの入力値がSelected状態のListboxOptionのLabelに初期化されていること
      expect(searchbox).toHaveDisplayValue(SELECTED_OPTION.label);
      // Searchboxをクリック
      userEvent.click(searchbox);
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
    });

    test('入力中でListboxPopupがClose状態の時、Tabキーを押すと初期化される', async () => {
      const { getByRole, getAllByRole, queryByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // 不正な値「abc」を入力
      userEvent.clear(searchbox);
      userEvent.type(searchbox, 'abc');
      // 候補がないのでListboxPopupは閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Tabキーを押す
      userEvent.tab();
      // Searchboxの入力値がSelected状態のListboxOptionのLabelに初期化されていること
      expect(searchbox).toHaveDisplayValue(SELECTED_OPTION.label);
      // Searchboxにフォーカスしていないこと
      expect(searchbox).not.toHaveFocus();
      // Searchboxにフォーカスし、下矢印キーを押してListboxPopupを開く
      searchbox.focus();
      userEvent.keyboard('{arrowdown}');
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
    });

    test('入力中にTabキーを押すと初期化される（非Active状態の時）', async () => {
      const { getByRole, getAllByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // Searchboxの値をクリアして「Op」まで入力
      userEvent.clear(searchbox);
      userEvent.type(searchbox, 'Op');
      // Tabキーを押す
      userEvent.tab();
      // Searchboxの入力値がSelected状態のListboxOptionのLabelに初期化されていること
      expect(searchbox).toHaveDisplayValue(SELECTED_OPTION.label);
      // Searchboxにフォーカスしていないこと
      expect(searchbox).not.toHaveFocus();
      // Searchboxにフォーカスし、下矢印キーを押してListboxPopupを開く
      searchbox.focus();
      userEvent.keyboard('{arrowdown}');
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
    });

    test('入力中にTabキーを押すと初期化される（Active状態の時）', async () => {
      const { getByRole, getAllByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // Searchboxの値をクリアして「Op」まで入力
      userEvent.clear(searchbox);
      userEvent.type(searchbox, 'Op');
      // ListboxOptionをActiveにするため下矢印を押す
      userEvent.keyboard('{ArrowDown}');
      // Tabキーを押す
      userEvent.tab();
      // Searchboxの入力値がSelected状態のListboxOptionのLabelに初期化されていること
      expect(searchbox).toHaveDisplayValue(SELECTED_OPTION.label);
      // Searchboxにフォーカスしていないこと
      expect(searchbox).not.toHaveFocus();
      // Searchboxにフォーカスし、下矢印キーを押してListboxPopupを開く
      searchbox.focus();
      userEvent.keyboard('{arrowdown}');
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
    });

    test('入力中に枠外をクリックすると初期化される', async () => {
      const { getByRole, getAllByRole, getByTestId, queryByRole } =
        comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // 「Op」と入力
      userEvent.clear(searchbox);
      userEvent.type(searchbox, 'Op');
      jest.advanceTimersByTime(10);
      // ListboxPopupの領域外をクリック
      userEvent.click(getByTestId('external-popup'));
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxの値がSelected状態のListboxOptionのLabelに初期化されていること
      expect(searchbox).toHaveDisplayValue(SELECTED_OPTION.label);
      // SearchboxをクリックしてListboxPopupを開く
      userEvent.click(searchbox);
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
    });

    test('入力中にListboxButtonをクリックすると初期化される', async () => {
      const { getByRole, getAllByRole, queryByRole } = comboboxRenderer();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // 「Op」と入力
      userEvent.clear(searchbox);
      userEvent.type(searchbox, 'Op');
      jest.advanceTimersByTime(10);
      // ListboxButtonをクリック
      userEvent.click(getByRole('button'));
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxの値がSelected状態のListboxOptionのLabelに初期化されていること
      expect(searchbox).toHaveDisplayValue(SELECTED_OPTION.label);
      // SearchboxをクリックしてListboxPopupを開く
      userEvent.click(searchbox);
      // すべてのListboxOptionが表示されていること
      expect(getAllByRole('option').length).toBe(DEFAULT_OPTIONS.length);
    });

    afterEach(() => jest.useRealTimers());
  });
});

describe('ListboxPopup', () => {
  describe('閉じる操作', () => {
    beforeEach(() => jest.useFakeTimers());

    test('ListboxPopupの枠外をクリックするとListboxPopupが閉じる', async () => {
      const { getByRole, queryByRole, getByTestId } = comboboxRenderer();
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // 枠外をクリック
      jest.advanceTimersByTime(10);
      userEvent.click(getByTestId('external-popup'));
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
    });

    test('エスケープキーを押すとListboxPopupが閉じる', async () => {
      const { getByRole, queryByRole } = comboboxRenderer();
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // エスケープキーを押す
      userEvent.keyboard('{escape}');
      // ListboxPopupが閉じること
      expect(queryByRole('listbox')).toBeNull();
    });

    test('Tabキーを押すとListboxPopupが閉じる', async () => {
      const { getByRole, queryByRole } = comboboxRenderer();
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // Tabキーを押す
      userEvent.type(searchbox, '{tab}');
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
    });

    afterEach(() => jest.useRealTimers());
  });

  describe('ListboxOptionをactiveにする', () => {
    let changeValue: jest.Mock;
    beforeEach(() => (changeValue = jest.fn()));

    test('マウスホバーするとListboxOptionがactive状態になる', async () => {
      const { getByRole, getAllByRole } = comboboxRenderer(changeValue);
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // 3番目のListboxOptionをホバーする
      const option3 = getAllByRole('option')[2];
      userEvent.hover(option3);
      // 該当のListboxOptionがActive状態になっており、Selected状態ではないこと
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[2].label);
      expectListboxOptionNotToBeSelected(DEFAULT_OPTIONS[2].label);
      // ActiveにするだけではchangeValueが呼ばれない
      expect(changeValue).not.toHaveBeenCalled();
    });

    test('上下矢印キーで順にListboxOptionをActive状態にできる', async () => {
      const { getByRole } = comboboxRenderer(changeValue);
      // Searchboxにフォーカス
      const searchbox = getByRole('combobox');
      searchbox.focus();
      // 下矢印キーを押す
      userEvent.keyboard('{arrowdown}');
      // Selected状態のListboxOptionがActive状態になっていること
      expectListboxOptionToBeActive(searchbox, SELECTED_OPTION.label);
      expectListboxOptionToBeSelected(SELECTED_OPTION.label);
      // 下矢印キーを押す
      userEvent.keyboard('{arrowdown}');
      // 次のListboxOptionがActive状態になり、selected状態ではないこと
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[2].label);
      expectListboxOptionNotToBeSelected(DEFAULT_OPTIONS[2].label);
      // 上矢印キーを押す
      userEvent.keyboard('{arrowup}');
      // ひとつ前のListboxOptionがActive状態になること
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[1].label);
      // もともとSelected状態だったのでSelected状態が維持されていること
      expectListboxOptionToBeSelected(DEFAULT_OPTIONS[1].label);
      // キー操作している間フォーカスはSearchboxにあること
      expect(searchbox).toHaveFocus();
      // ActiveにするだけではchangeValueが呼ばれない
      expect(changeValue).not.toHaveBeenCalled();
    });

    test('Homeキー・Endキーを押すと先頭・末尾のListboxOptionがActive状態になる', async () => {
      const { getByRole } = comboboxRenderer(changeValue);
      // Searchboxにフォーカス
      const searchbox = getByRole('combobox');
      searchbox.focus();
      // 下矢印キーを押す
      userEvent.keyboard('{arrowdown}');
      // Selected状態のListboxOptionがActive状態になる
      expectListboxOptionToBeActive(searchbox, SELECTED_OPTION.label);
      expectListboxOptionToBeSelected(SELECTED_OPTION.label);
      // Homeキーを押す
      userEvent.keyboard('{Home}');
      // 先頭のListboxOptionがActive状態になり、Selected状態ではないこと
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[0].label);
      expectListboxOptionNotToBeSelected(DEFAULT_OPTIONS[0].label);
      // Endキーを押す
      userEvent.keyboard('{End}');
      // 末尾のListboxOptionがActive状態になり、Selected状態ではないこと
      expectListboxOptionToBeActive(
        searchbox,
        DEFAULT_OPTIONS[DEFAULT_OPTIONS.length - 1].label
      );
      expectListboxOptionNotToBeSelected(
        DEFAULT_OPTIONS[DEFAULT_OPTIONS.length - 1].label
      );
      // キー操作している間フォーカスはSearchboxにあること
      expect(searchbox).toHaveFocus();
      // ActiveにするだけではchangeValueが呼ばれない
      expect(changeValue).not.toHaveBeenCalled();
    });

    test('先頭のListboxOptionがActiveの時上矢印キーを押すと末尾のListboxOptionがActiveになり、末尾のListboxOptionがActiveの時に下矢印キーを押すと先頭のListboxOptionがActiveになる', async () => {
      const { getByRole } = comboboxRenderer(changeValue);
      // Searchboxにフォーカス
      const searchbox = getByRole('combobox');
      searchbox.focus();
      // 下矢印キー、Homeキーの順に押す
      userEvent.keyboard('{arrowdown}{Home}');
      // 先頭のListboxOptionがActive状態にななり、Selected状態ではないこと
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[0].label);
      expectListboxOptionNotToBeSelected(DEFAULT_OPTIONS[0].label);
      // 上矢印キーを押す
      userEvent.keyboard('{arrowup}');
      // 末尾のListboxOptionがActive状態になり、Selected状態ではないこと
      expectListboxOptionToBeActive(
        searchbox,
        DEFAULT_OPTIONS[DEFAULT_OPTIONS.length - 1].label
      );
      expectListboxOptionNotToBeSelected(
        DEFAULT_OPTIONS[DEFAULT_OPTIONS.length - 1].label
      );
      // 下矢印キーを押す
      userEvent.keyboard('{arrowdown}');
      // 先頭のListboxOptionがActive状態になり、Selected状態ではないこと
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[0].label);
      expectListboxOptionNotToBeSelected(DEFAULT_OPTIONS[0].label);
      // キー操作している間フォーカスはSearchboxにあること
      expect(searchbox).toHaveFocus();
      // ActiveにするだけではchangeValueが呼ばれない
      expect(changeValue).not.toHaveBeenCalled();
    });
  });

  describe('ListboxOptionをSelected状態にする', () => {
    let changeValue: jest.Mock;
    beforeEach(() => {
      changeValue = jest.fn();
      // handleMouseEnter内でgetBoundingClientRectを使っておりモックが必要
      // li要素がul要素内に来るようにモックする
      // see: https://github.com/jsdom/jsdom/issues/1590
      jest
        .spyOn(HTMLUListElement.prototype, 'getBoundingClientRect')
        .mockImplementation(
          jest.fn(() => ({ top: 300, bottom: 860 } as DOMRect))
        );
      jest
        .spyOn(HTMLLIElement.prototype, 'getBoundingClientRect')
        .mockImplementation(
          jest.fn(() => ({ top: 400, bottom: 430 } as DOMRect))
        );
    });

    test('クリックするとSelected状態になる', async () => {
      const { getByRole, getAllByRole, queryByRole } =
        comboboxRenderer(changeValue);
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // ListboxPopupが開いていること
      expect(getByRole('listbox')).toBeVisible();
      // 3番目のListboxOptionはSelected状態ではないこと
      expectListboxOptionNotToBeSelected(DEFAULT_OPTIONS[2].label);
      // 3番目のListboxOptionをクリック
      const options = getAllByRole('option');
      // JavaScriptのclick()で意図したListboxOptionが押せるかを検証する
      // userEvent.clickはホバー→クリックをエミュレートするため、ホバーを省略するオプションを指定する
      // See:https://github.com/kintone-private/kintone-Design-System/issues/1738
      userEvent.click(options[2], undefined, { skipHover: true });
      // ListboxPopupが閉じること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxの入力値が３番目のListboxOptionのLabelになること
      expect(searchbox).toHaveDisplayValue(DEFAULT_OPTIONS[2].label);
      // changeValueが呼ばれ、3番目のListboxOptionのvalueがわたってくる
      expect(changeValue).toHaveBeenCalledTimes(1);
      expect(changeValue).toHaveBeenCalledWith(DEFAULT_OPTIONS[2].value);
      // Searchboxをクリック
      userEvent.click(searchbox);
      // 3番目のListboxOptionがActive且つSelected状態になっていること
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[2].label);
      expectListboxOptionToBeSelected(DEFAULT_OPTIONS[2].label);
    });

    test('エンターキーを押すとSelected状態になる', async () => {
      const { getByRole, queryByRole } = comboboxRenderer(changeValue);
      // Searchboxをクリック
      const searchbox = getByRole('combobox');
      userEvent.click(searchbox);
      // 2番目のListboxOptionがActive且つSelected状態になっていること
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[1].label);
      expectListboxOptionToBeSelected(DEFAULT_OPTIONS[1].label);
      // 下矢印キーを押す
      userEvent.keyboard('{arrowdown}');
      // 3番目のListboxOptionがActive状態になり、Selected状態ではないこと
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[2].label);
      expectListboxOptionNotToBeSelected(DEFAULT_OPTIONS[2].label);
      // エンターキーを押す
      userEvent.keyboard('{enter}');
      // ListboxPopupが閉じていること
      expect(queryByRole('listbox')).toBeNull();
      // Searchboxの入力値が3番目のListboxOptionのLabelになること
      expect(searchbox).toHaveDisplayValue(DEFAULT_OPTIONS[2].label);
      // changeValueが呼ばれ、3番目のListboxOptionのvalueがわたってくる
      expect(changeValue).toHaveBeenCalledTimes(1);
      expect(changeValue).toHaveBeenLastCalledWith(DEFAULT_OPTIONS[2].value);
      // Searchboxをクリック
      userEvent.click(searchbox);
      // 3番目のListboxOptionがActive且つSelected状態になっていること
      expectListboxOptionToBeActive(searchbox, DEFAULT_OPTIONS[2].label);
      expectListboxOptionToBeSelected(DEFAULT_OPTIONS[2].label);
    });
  });
});

describe('a11y', () => {
  const testingStories = {
    ...composeStories(stories),
    ...composeStories(testStories)
  };
  for (const Story of Object.values(testingStories)) {
    assertExists(Story.storyName);
    test(Story.storyName, async () => {
      const { container } = render(<Story />);
      await Story.play?.({ canvasElement: container });
      await checkA11y(container, {
        rules: {
          label: { enabled: false },
          'aria-input-field-name': { enabled: false }
        }
      });
    });
  }
});

const expectListboxOptionToBeActive = (
  comboboxElement: HTMLElement,
  targetOptionLabel: string
) => {
  // activedescendant属性が参照している値がactive状態のListboxOptionのidと一致しているか
  expect(comboboxElement).toHaveAttribute(
    'aria-activedescendant',
    screen.getByTestId(ACTIVE_DATA_TESTID).getAttribute('id')
  );
  // Active状態のListboxOptionのlabelがtargetOptionLabelと一致しているか
  expect(screen.getByTestId(ACTIVE_DATA_TESTID)).toHaveTextContent(
    targetOptionLabel
  );
};

const expectListboxOptionToBeSelected = (targetOptionLabel: string) => {
  // aria-selectedがtrueのListboxOptionのlabelがtargetOptionLabelと一致しているか
  expect(screen.getByRole('option', { selected: true })).toHaveTextContent(
    targetOptionLabel
  );
};

const expectListboxOptionNotToBeSelected = (targetOptionLabel: string) => {
  // aria-selectedがtrueのListboxOptionのlabelがtargetOptionLabelと一致していないこと
  expect(screen.getByRole('option', { selected: true })).not.toHaveTextContent(
    targetOptionLabel
  );
};
