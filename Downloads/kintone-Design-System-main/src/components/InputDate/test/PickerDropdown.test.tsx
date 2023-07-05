import { userEvent } from '@storybook/testing-library';
import { render, screen, act } from '@testing-library/react';
import { PickerDropdown } from '../DatePickerPopup/PickerDropdown';

const changeValueSpy = jest.fn();
const options = [...Array(30).keys()].map((i) => ({
  value: `option${i}`,
  label: `項目${i}`
}));
describe('InputDate/PickerDropdown', () => {
  beforeEach(() => {
    changeValueSpy.mockReset();
  });
  beforeAll(() => {
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
    changeValueSpy.mockReset();
    // useOutsideTargetElementOnclickでsetTimeOutを使用しているのでtimerをモックする
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('Dropdown開閉', () => {
    test('トリガーボタンクリックでポップアップを開閉できる', async () => {
      const { clickTriggerButton, findTriggerButton } = renderComponent();

      // ポップアップが閉じていること
      await expectListboxPopupToClose();

      // トリガーボタンをクリック
      await clickTriggerButton();

      // ポップアップが開いていること
      await expectListboxPopupToOpen();

      // 再度トリガーボタンをクリック
      await clickTriggerButton();

      // ポップアップが閉じていること
      await expectListboxPopupToClose();
      // トリガーボタンがフォーカスされていること
      expect(await findTriggerButton()).toHaveFocus();
    });

    test('トリガーボタンにフォーカスしエンターキーを押すとドロップダウンを開閉できる', async () => {
      const { findTriggerButton, focusButtonAndKey } = renderComponent();
      const button = await findTriggerButton();

      // トリガーボタンにフォーカスしてエンターキーを押す
      await focusButtonAndKey('{Enter}');

      // ポップアップが開いていること
      await expectListboxPopupToOpen();
      expect(button).not.toHaveFocus();

      // 再度トリガーボタンにフォーカスし、エンターキーを押す
      await focusButtonAndKey('{Enter}');

      // ポップアップが閉じていること
      await expectListboxPopupToClose();
      // トリガーボタンにフォーカスしていること
      expect(button).toHaveFocus();
    });

    test('トリガーボタンにフォーカスしスペースキーを押すとドロップダウンを開閉できる', async () => {
      const { findTriggerButton, focusButtonAndKey } = renderComponent();
      const button = await findTriggerButton();

      // トリガーボタンにフォーカスし、スペースキーを押す
      await focusButtonAndKey('{Space}');
      // ポップアップが開いていること
      await expectListboxPopupToOpen();
      expect(button).not.toHaveFocus();

      // 再度トリガーボタンにフォーカスし、スペースキーを押す
      await focusButtonAndKey('{Space}');

      // ポップアップが閉じていること
      await expectListboxPopupToClose();
      // トリガーボタンにフォーカスしていること
      expect(button).toHaveFocus();
    });

    test('トリガーボタンにフォーカスし、下矢印キーを押す', async () => {
      const { findTriggerButton, focusButtonAndKey } = renderComponent();
      const button = await findTriggerButton();

      // トリガーボタンにフォーカスし、下矢印キーを押す
      await focusButtonAndKey('{ArrowDown}');
      // ポップアップが開いていること
      await expectListboxPopupToOpen();
      expect(button).not.toHaveFocus();
    });

    test('トリガーボタンにフォーカスし、上矢印キーを押す', async () => {
      const { findTriggerButton, focusButtonAndKey } = renderComponent();
      const button = await findTriggerButton();

      // トリガーボタンにフォーカスし、上矢印キーを押す
      await focusButtonAndKey('{ArrowUp}');
      // ポップアップが開いていること
      await expectListboxPopupToOpen();
      expect(button).not.toHaveFocus();
    });

    test('枠外クリックでポップアップが閉じる', async () => {
      // ポップアップを開いた状態にしておく
      const { findTriggerButton } = await renderPopupOpenedComponent();
      const button = await findTriggerButton();

      // 枠外をクリック
      await clickExternalPopup();
      // ポップアップが閉じていること
      await expectListboxPopupToClose();
      // トリガーボタンにフォーカスしていること
      expect(button).toHaveFocus();
    });

    test('エスケープキーを押すとポップアップが閉じる', async () => {
      // ポップアップを開いた状態にしておく
      const { findTriggerButton } = await renderPopupOpenedComponent();
      const button = await findTriggerButton();

      // エスケープキーを押す
      await keyboard('{Escape}');
      // ポップアップが閉じていること
      await expectListboxPopupToClose();
      // トリガーボタンにフォーカスしていること
      expect(button).toHaveFocus();
    });

    test('Tabキーを押すとポップアップが閉じる', async () => {
      // ポップアップを開いた状態にしておく
      await renderPopupOpenedComponent();

      // タブキーを押す
      userEvent.tab();
      // ポップアップが閉じていること
      await expectListboxPopupToClose();
      // Tabキーで閉じた場合は、トリガーボタンにフォーカスが戻らず
      // 次の要素(ここではrender時のexternal-popupボタン)にフォーカスする
      expect(await screen.findByTestId('external-popup')).toHaveFocus();
    });
  });

  describe('Dropdown内操作', () => {
    test('Optionをホバーすると、そのOptionがActive状態になる', async () => {
      const { findDropdownOptions } = await renderPopupOpenedComponent();
      // 先頭のOptionがSelected状態且つActive状態になっていること
      const dropdownOptions = await findDropdownOptions();

      await expectListboxOptionToBeSelected(dropdownOptions[0]);
      expectListboxOptionToBeActive(dropdownOptions[0]);

      // 2番目のOptionをホバー
      await hover(dropdownOptions[1]);
      // 2番目のOptionがActive状態になり、Selected状態にはなっていないこと
      await expectListboxOptionNotToBeSelected(dropdownOptions[1]);
      expectListboxOptionToBeActive(dropdownOptions[1]);

      // 7番目のOptionをホバー
      await hover(dropdownOptions[6]);
      // 7番目のOptionがActive状態になり、Selected状態にはなっていないこと
      await expectListboxOptionNotToBeSelected(dropdownOptions[6]);
      expectListboxOptionToBeActive(dropdownOptions[6]);
      // Active状態にするだけではchangeValueは呼ばれない
      expect(changeValueSpy).not.toHaveBeenCalled();
    });

    test('上下矢印キーで順にOptionをActive状態にできる', async () => {
      const { findDropdownOptions } = await renderPopupOpenedComponent();
      const dropdownOptions = await findDropdownOptions();

      // 下矢印キーを押す
      await keyboard('{ArrowDown}');
      // 2番目のOptionがActive状態になり、Selected状態にはなっていないこと
      await expectListboxOptionNotToBeSelected(dropdownOptions[1]);
      expectListboxOptionToBeActive(dropdownOptions[1]);
      // 下矢印キーを押す
      await keyboard('{ArrowDown}');
      // 3番目のOptionがActive状態になり、Selected状態にはなっていないこと
      await expectListboxOptionNotToBeSelected(dropdownOptions[2]);
      expectListboxOptionToBeActive(dropdownOptions[2]);
      // 上矢印キーを押す
      await keyboard('{ArrowUp}');
      // 2番目のOptionがActive状態になり、Selected状態にはなっていないこと
      await expectListboxOptionNotToBeSelected(dropdownOptions[1]);
      expectListboxOptionToBeActive(dropdownOptions[1]);
      // 上矢印キーを押す
      await keyboard('{ArrowUp}');
      // 先頭のOptionがActive状態になり、Selected状態にはなっていないこと
      // もともとのSelected状態が維持されていること
      await expectListboxOptionToBeSelected(dropdownOptions[0]);
      expectListboxOptionToBeActive(dropdownOptions[0]);
      // active状態を切り替えるだけではchangeValueは呼ばれない
      expect(changeValueSpy).not.toHaveBeenCalled();
    });

    test('Home/Endキーで、先頭・末尾のOptionをActive状態にできる', async () => {
      const { findDropdownOptions } = await renderPopupOpenedComponent();
      const dropdownOptions = await findDropdownOptions();

      // Endキーを押す
      await keyboard('{End}');
      // 末尾のOptionがActive状態になり、Selected状態ではないこと
      const lastOption = dropdownOptions[dropdownOptions.length - 1];
      expectListboxOptionToBeActive(lastOption);
      await expectListboxOptionNotToBeSelected(lastOption);
      // Homeキーを押す
      await keyboard('{Home}');
      // 先頭のOptionがActive状態になっていること
      // もともとのSelected状態が維持されていること
      expectListboxOptionToBeActive(dropdownOptions[0]);
      await expectListboxOptionToBeSelected(dropdownOptions[0]);
      // active状態を切り替えるだけではchangeValueは呼ばれない
      expect(changeValueSpy).not.toHaveBeenCalled();
    });

    test('上下矢印キーでフォーカスループする', async () => {
      const { findDropdownOptions } = await renderPopupOpenedComponent();
      const dropdownOptions = await findDropdownOptions();

      // 先頭のOptionがActive状態(focus)であること
      expectListboxOptionToBeActive(dropdownOptions[0]);

      // 上矢印キーを押す
      await keyboard('{ArrowUp}');
      // 末尾のOptionがActive状態になり、Selected状態ではないこと
      const lastOption = dropdownOptions[dropdownOptions.length - 1];
      expectListboxOptionToBeActive(lastOption);
      await expectListboxOptionNotToBeSelected(lastOption);
      // 下矢印キーを押す
      await keyboard('{ArrowDown}');
      // 先頭のOptionがActive状態になっていること
      // もともとのSelected状態が維持されていること
      expectListboxOptionToBeActive(dropdownOptions[0]);
      await expectListboxOptionToBeSelected(dropdownOptions[0]);
      // Active状態を切り替えるだけではchangeValueは呼ばれない
      expect(changeValueSpy).not.toHaveBeenCalled();
    });
  });

  describe('選択状態', () => {
    test('valueが選択される', async () => {
      // 3番目のOptionを指定
      const selectedOption = options[2];
      const { findTriggerButton, clickTriggerButton } = await renderComponent({
        value: selectedOption.value
      });
      // トリガーボタンのlabelが指定されたOptionのlabelになっている
      expect((await findTriggerButton()).textContent).toEqual(
        selectedOption.label
      );
      // popupを開く
      await clickTriggerButton();

      // 指定したOptionがSelect状態であること
      await expectListboxOptionToBeSelected(
        await screen.findByRole('option', { name: selectedOption.label })
      );
    });

    test('OptionをクリックするとそのOptionがSelected状態になる', async () => {
      const { findDropdownOptions } = await renderPopupOpenedComponent();
      const dropdownOptions = await findDropdownOptions();

      // 先頭のOptionがSelect状態であること
      await expectListboxOptionToBeSelected(dropdownOptions[0]);
      // 3番目のListboxOptionをクリック
      userEvent.click(dropdownOptions[2]);
      // changeValueが呼ばれ、3番目のOptionのvalueがアプリケーション側に渡される
      expect(changeValueSpy).toHaveBeenCalledWith(options[2].value);
      // PopupがClose状態になっていること
      await expectListboxPopupToClose();
    });

    test('エンターキーを押すとそのOptionがSelected状態になる', async () => {
      const { findDropdownOptions } = await renderPopupOpenedComponent();
      const dropdownOptions = await findDropdownOptions();

      await keyboard('{ArrowDown}');
      // 2番目のOptionがActive状態なことを確認
      expectListboxOptionToBeActive(dropdownOptions[1]);

      // エンターキーを押す
      await keyboard('{Enter}');
      // changeValueが呼ばれ、2番目のOptionのvalueがアプリケーション側に渡される
      expect(changeValueSpy).toHaveBeenCalledWith(options[1].value);
      // PopupがClose状態になっていること
      await expectListboxPopupToClose();
    });
  });
});

const KeyMap = {
  // 現在利用しているuser-event v13向けにキー変換を準備
  // user-event v14 / v13
  // see: https://testing-library.com/docs/ecosystem-user-event/#special-characters
  '{Enter}': '{enter}',
  '{Escape}': '{esc}',
  '{Space}': '{space}',
  '{ArrowDown}': '{arrowdown}',
  '{ArrowUp}': '{arrowup}',
  '{Home}': '{home}',
  '{End}': '{end}'
};
type Key = keyof typeof KeyMap;
type KeyboardOption = Parameters<typeof userEvent.keyboard>[1];

// 要検証：ListboxOptionをActiveにしてもすぐにフォーカス状態にならない。とりあえず時間進めて対応。
// TODO: テストがTimerに依存しないようにする（他のテストも同様）。
const keyboard = async (key: Key, option: Partial<KeyboardOption> = {}) => {
  await act(async () => {
    await userEvent.keyboard(KeyMap[key], option);
  });
  jest.runAllTimers();
};

const hover = async (element: Element) => {
  userEvent.hover(element);
  jest.runAllTimers();
};

// dropdownコンポーネントの描画
const renderComponent = ({ value }: { value?: string } = {}) => {
  const selectedValue = value ? value : options[0].value;
  const selectedLabel = options.find(
    ({ value: v }) => selectedValue === v
  )?.label;
  const result = render(
    <>
      <PickerDropdown
        options={options}
        changeValue={changeValueSpy}
        value={selectedValue}
      />
      <button data-testid="external-popup" />
    </>
  );
  const findTriggerButton = () =>
    screen.findByRole('button', {
      name: selectedLabel
    });
  const clickTriggerButton = async () => {
    // トリガーボタンをクリック
    userEvent.click(await findTriggerButton());
    jest.runAllTimers();
  };
  const focusButtonAndKey = async (key: Key) => {
    (await findTriggerButton()).focus();
    await keyboard(key);
    jest.runAllTimers();
  };
  return {
    findTriggerButton,
    clickTriggerButton,
    focusButtonAndKey,
    ...result
  };
};

// dropdownのpopupが開いた状態でのコンポーネントの描画
const renderPopupOpenedComponent = async (
  ...args: Parameters<typeof renderComponent>
) => {
  const rendered = renderComponent(...args);
  await rendered.clickTriggerButton();
  await expectListboxPopupToOpen();

  return {
    ...rendered,
    findDropdownOptions: () => rendered.findAllByRole('option')
  };
};

const clickExternalPopup = async () =>
  userEvent.click(await screen.findByTestId('external-popup'));

const expectListboxPopupToOpen = async () => {
  expect(await screen.findByRole('listbox')).toBeVisible();
};

const expectListboxPopupToClose = async () => {
  expect(screen.queryByRole('listbox')).toBeNull();
};

const findSelectedOptions = async () =>
  screen.findAllByRole('option', {
    selected: true
  });

// aria-selected="true"のListboxOptionのOptionLabelが、targetLabelと一致していること
const expectListboxOptionToBeSelected = async (targetOption: HTMLElement) => {
  const selectedOptions = await findSelectedOptions();
  expect(selectedOptions).toContain(targetOption);
};

// aria-selected="true"のListboxOptionのOptionLabelが、targetLabelと一致していないこと
const expectListboxOptionNotToBeSelected = async (
  targetOption: HTMLElement
) => {
  const selectedOptions = await findSelectedOptions();
  expect(selectedOptions).not.toContain(targetOption);
};

const expectListboxOptionToBeActive = (targetOption: HTMLElement) => {
  expect(targetOption).toHaveFocus();
};
