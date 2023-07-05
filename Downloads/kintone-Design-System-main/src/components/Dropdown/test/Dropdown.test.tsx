import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';
import * as stories from '../stories/Dropdown.stories';
import * as testStories from '../stories/Dropdown.test.stories';

const { Disabled, Normal } = composeStories(stories);
const { TitleAttr } = composeStories(testStories);

const changeValueSpy = jest.fn();
const onChangePopupShonSpy = jest.fn();
const options = [...Array(30).keys()].map((i) => ({
  value: `option${i}`,
  label: `項目${i}`
}));
const selectedOption = options[0];

const dropdownRenderer = () => {
  changeValueSpy.mockReset();
  onChangePopupShonSpy.mockReset();
  return render(
    <>
      <Normal
        changeValue={changeValueSpy}
        onChangePopupShown={onChangePopupShonSpy}
        options={options}
        initialValue={selectedOption.value}
      />
      <div data-testid="external-popup" />
    </>
  );
};

describe('ListboxPopupの開閉', () => {
  let button: HTMLElement;

  beforeEach(() => {
    dropdownRenderer();
    // useOutsideTargetElementOnclickでsetTimeOutを使用しているのでtimerをモックする
    jest.useFakeTimers();
    button = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
  });

  test('ListboxButtonクリックでListboxPopupを開閉できる', async () => {
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    // 再度ListboxButtonをクリック
    jest.runAllTimers();
    clickListboxButton();
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスしていること
    expect(button).toHaveFocus();
  });

  test('ListboxButtonにフォーカスしエンターキーを押すとListboxPopupを開閉できる', async () => {
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスし、エンターキーを押す
    focusListboxButtonAndPressEnter();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    // 再度ListboxButtonにフォーカスし、エンターキーを押す
    jest.runAllTimers();
    focusListboxButtonAndPressEnter();
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスしていること
    expect(button).toHaveFocus();
  });

  test('ListboxButtonにフォーカスしスペースキーを押すとListboxPopupを開閉できる', async () => {
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスし、スペースキーを押す
    focusListboxButtonAndPressSpace();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    // 再度ListboxButtonにフォーカスし、スペースキーを押す
    jest.runAllTimers();
    focusListboxButtonAndPressSpace();
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスしていること
    expect(button).toHaveFocus();
  });

  test('ListboxButtonにフォーカスし、上下矢印キーを押すとListboxPopupが開く', async () => {
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスし下矢印キーを押す
    focusListboxButtonAndPressArrowDown();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    // ListboxButtonをクリック
    jest.runAllTimers();
    clickListboxButton();
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスし、上矢印キーを押す
    focusListboxButtonAndPressArrowUp();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスしていること
    expect(button).toHaveFocus();
  });

  test('枠外クリックでListboxPopupが閉じる', async () => {
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    // 枠外をクリック
    jest.runAllTimers();
    clickExternalPopup();
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスしていること
    expect(button).toHaveFocus();
  });

  test('エスケープキーを押すとListboxPopupが閉じる', async () => {
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    jest.runAllTimers();
    // エスケープキーを押す
    userEvent.keyboard('{Escape}');
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonにフォーカスしていること
    expect(button).toHaveFocus();
  });

  test('Tabキーを押すとListboxPopupが閉じる', async () => {
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    jest.runAllTimers();
    // Tabキーを押す
    userEvent.tab();
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // TabキーでListboxPopupを閉じた場合は、ListboxButtonにフォーカスしない
    // Dropdownの次の要素にフォーカスする
    expect(button).not.toHaveFocus();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});

describe('ListboxOptionのActive化', () => {
  beforeEach(() => {
    dropdownRenderer();
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
    // 要検証：ListboxOptionをActiveにしてもすぐにフォーカス状態にならない。とりあえず時間進めて対応。
    jest.useFakeTimers();
  });

  test('ListboxOptionをホバーすると、そのListboxOptionがActive状態になる', async () => {
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupがOpen状態になっていること
    expectListboxPopupToOpen();
    // TODO: テストがTimerに依存しないようにする（他のテストも同様）。
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがSelected状態且つActive状態になっていること
    const listboxOptions = screen.getAllByRole('option');
    expectListboxOptionToBeSelected(listboxOptions[0]);
    expectListboxOptionToBeActive(listboxOptions[0]);
    // 2番目のListboxOptionをホバー
    userEvent.hover(listboxOptions[1]);
    jest.advanceTimersByTime(5);
    // 2番目のListboxOptionがActive状態になり、Selected状態にはなっていないこと
    expectListboxOptionToBeActive(listboxOptions[1]);
    expectListboxOptionNotToBeSelected(listboxOptions[1]);
    // 7番目のListboxOptionをホバー
    userEvent.hover(listboxOptions[6]);
    jest.advanceTimersByTime(5);
    // 7番目のListboxOptionがActive状態になり、Selected状態にはなっていないこと
    expectListboxOptionToBeActive(listboxOptions[6]);
    expectListboxOptionNotToBeSelected(listboxOptions[6]);
    // Active状態にするだけではchangeValueは呼ばれない
    expect(changeValueSpy).not.toHaveBeenCalled();
  });

  test('上下矢印キーで順にListboxOptionをActive状態にできる', async () => {
    // ListboxButtonにフォーカスし、下矢印キーを押す
    focusListboxButtonAndPressArrowDown();
    // ListboxPopupが開いていること
    expectListboxPopupToOpen();
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがSelected且つActive状態になっていること
    const listboxOptions = screen.getAllByRole('option');
    expectListboxOptionToBeSelected(listboxOptions[0]);
    expectListboxOptionToBeActive(listboxOptions[0]);
    // 下矢印キーを押す
    userEvent.keyboard('{ArrowDown}');
    jest.advanceTimersByTime(5);
    // 2番目のListboxがActive状態になっており、Selected状態ではないこと
    expectListboxOptionToBeActive(listboxOptions[1]);
    expectListboxOptionNotToBeSelected(listboxOptions[1]);
    // 下矢印キーを押す
    userEvent.keyboard('{ArrowDown}');
    jest.advanceTimersByTime(5);
    // 3番目のListboxOptionがActive状態になり、Selected状態ではないこと
    expectListboxOptionToBeActive(listboxOptions[2]);
    expectListboxOptionNotToBeSelected(listboxOptions[2]);
    // 上矢印キーを押す
    userEvent.keyboard('{ArrowUp}');
    jest.advanceTimersByTime(5);
    // 2番目のListboxOptionがActive状態になり、Selected状態ではないこと
    expectListboxOptionToBeActive(listboxOptions[1]);
    expectListboxOptionNotToBeSelected(listboxOptions[1]);
    // 上矢印キーを押す
    userEvent.keyboard('{ArrowUp}');
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがActive状態になること
    // もともとのSelected状態が維持されていること
    expectListboxOptionToBeActive(listboxOptions[0]);
    expectListboxOptionToBeSelected(listboxOptions[0]);
    // active状態を切り替えるだけではchangeValueは呼ばれない
    expect(changeValueSpy).not.toHaveBeenCalled();
  });

  test('Home/Endキーで、先頭・末尾のListboxOptionをActive状態にできる', async () => {
    // ListboxButtonにフォーカスし下矢印キーを押す
    focusListboxButtonAndPressArrowDown();
    // ListboxPopupが開いていること
    expectListboxPopupToOpen();
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがSelected且つActive状態になっていること
    const listboxOptions = screen.getAllByRole('option');
    expectListboxOptionToBeSelected(listboxOptions[0]);
    expectListboxOptionToBeActive(listboxOptions[0]);
    // Endキーを押す
    userEvent.keyboard('{End}');
    jest.advanceTimersByTime(5);
    // 末尾のListboxOptionがActive状態になり、Selected状態ではないこと
    expectListboxOptionToBeActive(listboxOptions[listboxOptions.length - 1]);
    expectListboxOptionNotToBeSelected(
      listboxOptions[listboxOptions.length - 1]
    );
    // Homeキーを押す
    userEvent.keyboard('{Home}');
    jest.advanceTimersByTime(5);
    // 先頭のListboxがActive状態になっていること
    // もともとのSelected状態が維持されていること
    expectListboxOptionToBeActive(listboxOptions[0]);
    expectListboxOptionToBeSelected(listboxOptions[0]);
    // active状態を切り替えるだけではchangeValueは呼ばれない
    expect(changeValueSpy).not.toHaveBeenCalled();
  });

  test('上下矢印キーでフォーカスループする', async () => {
    // ListboxButtonにフォーカスし、下矢印キーを押す
    focusListboxButtonAndPressArrowDown();
    // ListboxPopupが開いていること
    expectListboxPopupToOpen();
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがSelected且つActive状態になっていること
    const listboxOptions = screen.getAllByRole('option');
    expectListboxOptionToBeSelected(listboxOptions[0]);
    expectListboxOptionToBeActive(listboxOptions[0]);
    // 上矢印キーを押す
    userEvent.keyboard('{ArrowUp}');
    jest.advanceTimersByTime(5);
    // 末尾のListboxがActive状態になり、Selected状態ではないこと
    expectListboxOptionToBeActive(listboxOptions[listboxOptions.length - 1]);
    expectListboxOptionNotToBeSelected(
      listboxOptions[listboxOptions.length - 1]
    );
    // 下矢印キーを押す
    userEvent.keyboard('{ArrowDown}');
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがActive状態になっていること
    // もともとのSelected状態が維持されていること
    expectListboxOptionToBeActive(listboxOptions[0]);
    expectListboxOptionToBeSelected(listboxOptions[0]);
    // Active状態を切り替えるだけではchangeValueは呼ばれない
    expect(changeValueSpy).not.toHaveBeenCalled();
  });

  afterEach(() => jest.useRealTimers());
});

describe('ListboxOptionをSelected状態にする', () => {
  let listboxButton: HTMLElement;

  beforeEach(() => {
    dropdownRenderer();
    listboxButton = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
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
    // 要検証：ListboxOptionをActiveにしてもすぐにフォーカス状態にならない。とりあえず時間進めて対応。
    jest.useFakeTimers();
  });

  test('クリックするとそのListboxOptionがSelected状態になる', async () => {
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupが開いていること
    expectListboxPopupToOpen();
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがActive且つSelected状態になっていること
    const listboxOptions = screen.getAllByRole('option');
    expectListboxOptionToBeActive(listboxOptions[0]);
    expectListboxOptionToBeSelected(listboxOptions[0]);
    // 3番目のListboxOptionをクリック
    userEvent.click(listboxOptions[2]);
    // changeValueが呼ばれ、3番目のListboxOptionのvalueがアプリケーション側に渡される
    expect(changeValueSpy).toHaveBeenCalledWith(options[2].value);
    // ListboxPopupがClose状態になっていること
    expectListboxPopupToClose();
    // ListboxButtonLabelが3番目のListboxOptionのLabelになっていること
    expect(listboxButton.textContent).toEqual(options[2].label);
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxPopupが開いていること
    expectListboxPopupToOpen();
    act(() => {
      jest.advanceTimersByTime(5);
    });
    // 3番目のListboxOptionがActive且つSelected状態になっていること
    const newListboxOptions = screen.getAllByRole('option');
    expectListboxOptionToBeActive(newListboxOptions[2]);
    expectListboxOptionToBeSelected(newListboxOptions[2]);
  });

  test('エンターキーを押すとそのListboxOptionがSelected状態になる', async () => {
    // ListboxButtonにフォーカスし、下矢印キーを押す
    focusListboxButtonAndPressArrowDown();
    // ListboxPopupが開いていること
    expectListboxPopupToOpen();
    jest.advanceTimersByTime(5);
    // 先頭のListboxOptionがActive且つSelected状態になっていること
    const listboxOptions = screen.getAllByRole('option');
    expectListboxOptionToBeActive(listboxOptions[0]);
    expectListboxOptionToBeSelected(listboxOptions[0]);
    // 下矢印キーを押す
    userEvent.keyboard('{ArrowDown}');
    jest.advanceTimersByTime(5);
    // エンターキーを押す
    // userEventだと動かない
    // TODO: userEvent v14 にアップデートしたらuserEventで動くか確認する
    fireEvent.keyDown(listboxOptions[1], { key: 'Enter', code: 'Enter' });
    // changeValueが呼ばれ、2番目のListboxOptionのvalueがアプリケーション側に渡される
    expect(changeValueSpy).toHaveBeenCalledWith(options[1].value);
    // ListboxPopupがClose状態になること
    expectListboxPopupToClose();
  });

  afterEach(() => jest.useRealTimers());
});

describe('ツールチップ', () => {
  test('DropdownTitleが指定されているとき、ListboxButtonにホバーするとツールチップが表示される', async () => {
    const { getByTestId } = render(
      <TitleAttr dropdownTitle="dropdown-title" />
    );
    // ListboxButtonにtitle属性が付いていること
    // ブラウザのふるまいでホバーするとツールチップが表示される
    expect(getByTestId('shared-forms-Dropdown-DropdownButton')).toHaveAttribute(
      'title',
      'dropdown-title'
    );
  });

  test('ListboxOptionにホバーするとOptionLabelがツールチップで表示される', async () => {
    const { getByRole } = render(
      <Normal
        changeValue={() => console.log('dropdown')}
        options={options}
        initialValue={options[0].value}
      />
    );
    // ListboxButtonをクリック
    clickListboxButton();
    // ListboxOptionにOptionLabelの値がtitle属性についていること
    // ブラウザのふるまいでホバーするとツールチップが表示される
    expect(getByRole('option', { name: options[0].label })).toHaveAttribute(
      'title',
      options[0].label
    );
  });
});

describe('カーソル', () => {
  test('ListboxButtonのカーソルはリンクポインタ', async () => {
    const { getByTestId } = render(
      <Normal changeValue={() => console.log('dropdown')} />
    );
    expect(getByTestId('shared-forms-Dropdown-DropdownButton')).toHaveStyle({
      cursor: 'pointer'
    });
  });

  test('Disabledの時、ListboxButtonのカーソルはnot-allowed', async () => {
    const { getByTestId } = render(<Disabled />);
    expect(getByTestId('shared-forms-Dropdown-DropdownButton')).toHaveStyle({
      cursor: 'not-allowed'
    });
  });

  test('ListboxOptionのカーソルはリンクポインタ', async () => {
    const { getByRole } = render(<Normal options={options} />);
    clickListboxButton();
    expect(getByRole('option', { name: options[0].label })).toHaveStyle({
      cursor: 'pointer'
    });
  });
});

describe('Disabledの場合', () => {
  let listboxButton: HTMLElement;

  beforeEach(() => {
    render(<Disabled />);
    listboxButton = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
  });

  test('ListboxButtonをクリックしてもListboxPopupは開かない', async () => {
    // ListboxButtonをクリック
    userEvent.click(listboxButton);
    // ListboxPopupはClose状態のままであること
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  test('Tabキーでフォーカスできない', async () => {
    // Tabキーを押す
    userEvent.tab();
    // ListboxButtonにフォーカスできないこと
    expect(listboxButton).not.toHaveFocus();
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
      await act(async () =>
        // todo: 無効かしたルールについて改善する
        checkA11y(container, {
          rules: { 'aria-input-field-name': { enabled: false } }
        })
      );
    });
  }
});

describe('キー操作前後のマウスホバーによる挙動', () => {
  // キー操作によってOptionsが移動し、マウスカーソルが別のListboxOptionに当たる時、そのListboxOptionがActiveになることを防ぎたい
  // そのため、キー操作直後にはDropdownMenuItemのhandleMouseEnter内でsetHighlightedItemIdが呼ばれる前にreturnするようになっている
  // しかしこれをテストするためには、userEvent.keyboard()の前後でマウスカーソルが保持されていることをシミュレートする必要がある
  // そのため、現状ではこの挙動をテストすることは難しい
  // それまでは以下は手動試験にて実施
  test.todo(
    '最初の ListboxOption をマウスオーバー後にArrowDownキーを押すと2番目の ListboxOption が Active 状態になる'
  );
  test.todo(
    '2番目の ListboxOption をマウスオーバー後にArrowUpキーを押すと最初の ListboxOption が Active 状態になる'
  );
  test.todo(
    '最初の ListboxOption をマウスオーバー後にEndキーを押すと末尾の ListboxOption が Active 状態になる'
  );
  test.todo(
    '最後の ListboxOption をマウスオーバー後にHomeキーを押すと最初の ListboxOption が Active 状態になる'
  );
});

const clickListboxButton = () => {
  const button = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
  userEvent.click(button);
};

const clickExternalPopup = () =>
  userEvent.click(screen.getByTestId('external-popup'));

const focusListboxButtonAndPressEnter = () => {
  const button = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
  button.focus();
  userEvent.keyboard('{enter}');
};

const focusListboxButtonAndPressSpace = () => {
  const button = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
  button.focus();
  userEvent.keyboard('{space}');
};

const focusListboxButtonAndPressArrowDown = () => {
  const button = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
  button.focus();
  userEvent.keyboard('{arrowdown}');
};
const focusListboxButtonAndPressArrowUp = () => {
  const button = screen.getByTestId('shared-forms-Dropdown-DropdownButton');
  button.focus();
  userEvent.keyboard('{ArrowUp}');
};

const expectListboxPopupToOpen = () => {
  expect(screen.getByRole('listbox')).toBeVisible();
  expect(onChangePopupShonSpy).lastCalledWith(true);
};

const expectListboxPopupToClose = () => {
  expect(screen.queryByRole('listbox')).toBeNull();
  expect(onChangePopupShonSpy).lastCalledWith(false);
};

const expectListboxOptionToBeSelected = (targetOption: HTMLElement) => {
  // aria-selected="true"のListboxOptionのOptionLabelが、targetLabelと一致しているか
  const selectedListboxOption = screen.getByRole('option', { selected: true });
  expect(selectedListboxOption).toEqual(targetOption);
};

const expectListboxOptionNotToBeSelected = (targetOption: HTMLElement) => {
  // aria-selected="true"のListboxOptionのOptionLabelが、targetLabelと一致していないこと
  const selectedListboxOption = screen.getByRole('option', { selected: true });
  expect(selectedListboxOption).not.toEqual(targetOption);
};

const expectListboxOptionToBeActive = (targetOption: HTMLElement) => {
  expect(targetOption).toHaveFocus();
};
