import * as stories from '../stories/MultipleSelect.stories';
import * as testStories from '../stories/MultipleSelect.test.stories';
import { composeStories } from '@storybook/react';
import { act, render, screen } from '@testing-library/react';
import { designTokens } from '../../../designTokens';
import { userEvent } from '@storybook/testing-library';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

const { Normal, Disabled } = composeStories(stories);

describe('ListboxOptionをActive状態にする', () => {
  let listbox: HTMLElement;
  let listboxOptions: HTMLElement[];
  let focusListbox: VoidFunction;

  beforeEach(() => {
    const { getByRole, getAllByRole } = render(<Normal />);
    listbox = getByRole('listbox');
    listboxOptions = getAllByRole('option');
    focusListbox = () => act(() => listbox.focus());
  });

  test('Focused状態になると先頭のListboxOptionがActive状態になる', () => {
    // Listboxにフォーカス
    focusListbox();
    // 先頭のListboxOptionがActive状態になっている
    expectListboxOptionToBeActive(listboxOptions[0]);
  });

  test('ListboxOptionにHoverすると、そのListboxOptionがActive状態になる', () => {
    // 2番目のListboxOptionをホバー
    userEvent.hover(listboxOptions[1]);
    // 2番目のListboxOptionがActive状態になる
    expectListboxOptionToBeActive(listboxOptions[1]);
    // 3番目のListboxOptionをホバー
    userEvent.hover(listboxOptions[2]);
    // 3番目のListboxOptionがActive状態になる
    expectListboxOptionToBeActive(listboxOptions[2]);
  });

  test('下矢印を押すと、次のListboxOptionがActive状態になり、フォーカスループする', async () => {
    // Listboxにフォーカス
    focusListbox();
    // ListboxOptionの数だけ下矢印を押す
    for (const option of listboxOptions) {
      // 次のListboxOptionがActive状態になる
      expectListboxOptionToBeActive(option);
      // 下矢印押下
      await userEvent.keyboard('{arrowdown}');
    }
    // フォーカスループして、先頭のListboxOptionがActive状態になる
    expectListboxOptionToBeActive(listboxOptions[0]);
  });

  test('上矢印を押すと、前のListboxOptionがActive状態になり、フォーカスループする', async () => {
    // Listboxにフォーカス
    focusListbox();
    // 先頭のListboxOptionがActive状態になる
    expectListboxOptionToBeActive(listboxOptions[0]);
    // ListboxOptionの数だけ上矢印を押す
    // フォーカスループして、末尾のListboxOptionから先頭のListboxOptionまで順にActive状態になる
    for (const option of listboxOptions.reverse()) {
      // 上矢印押下
      await userEvent.keyboard('{arrowup}');
      // 前のListboxOptionがActive状態になる
      expectListboxOptionToBeActive(option);
    }
  });

  test('Homeキーを押すと先頭のListboxOptionがActive状態になり、Endキーを押すと末尾の ListboxOption が Active 状態になる', async () => {
    // 2番目のListboxOptionをクリック
    userEvent.click(listboxOptions[1]);
    // 2番目のListboxOptionがActive状態になる
    expectListboxOptionToBeActive(listboxOptions[1]);
    // Homeキー押下
    await userEvent.keyboard('{home}');
    // 先頭のListboxOptionがActive状態になる
    expectListboxOptionToBeActive(listboxOptions[0]);
    // Endキー押下
    await userEvent.keyboard('{end}');
    // 末尾のListboxOptionがActive状態になる
    expectListboxOptionToBeActive(listboxOptions[listboxOptions.length - 1]);
  });
});

describe('キー操作前後のマウスホバーによる挙動', () => {
  // キー操作によってOptionsが移動し、マウスカーソルが別のListboxOptionに当たる時、そのListboxOptionがActiveになることを防ぎたい
  // そのため、キー操作直後にはMultipleSelectItemのhandleMouseEnter内でsetHighlightedItemIdが呼ばれる前にreturnするようになっている
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

describe('ListboxOptionをSelected状態にする', () => {
  let listbox: HTMLElement;
  let listboxOptions: HTMLElement[];
  let changeValuesSpy: VoidFunction;
  let focusListbox: VoidFunction;

  beforeEach(() => {
    changeValuesSpy = jest.fn();
    const { getByRole, getAllByRole } = render(
      <Normal changeValues={changeValuesSpy} />
    );
    listbox = getByRole('listbox');
    listboxOptions = getAllByRole('option');
    focusListbox = () => act(() => listbox.focus());
  });

  test('ListboxOptionをクリックすると、そのListboxOptionがSelected状態になり、再度クリックするとSelected状態が解除される', () => {
    // 先頭のListboxOptionをクリック
    userEvent.click(listboxOptions[0]);
    // 先頭のListboxOptionがSelected状態になっている
    expectListboxOptionToBeSelected(listboxOptions[0]);
    // changeValuesが呼ばれ、選択したListboxOptionのvalue値がアプリケーション側に渡される
    expect(changeValuesSpy).lastCalledWith(['option0']);
    // 先頭のListboxOptionを再度クリック
    userEvent.click(listboxOptions[0]);
    // Selected状態が解除されている
    expectListboxOptionNotToBeSelected(listboxOptions[0]);
    // changeValuesが呼ばれ、なにも選択していないことがアプリケーション側に渡される
    expect(changeValuesSpy).lastCalledWith([]);
  });

  test('マウスクリックで複数のListboxOptionをSelected状態にできる', () => {
    // 1番目、3番目、4番目のListboxOptionを順にクリック
    userEvent.click(listboxOptions[0]);
    userEvent.click(listboxOptions[2]);
    userEvent.click(listboxOptions[3]);
    // 1番目、3番目、4番目のListboxOptionがSelected状態になっている
    expectListboxOptionToBeSelected(listboxOptions[0]);
    expectListboxOptionToBeSelected(listboxOptions[2]);
    expectListboxOptionToBeSelected(listboxOptions[3]);
    // 2番目のListboxOptionはSelected状態ではない
    expectListboxOptionNotToBeSelected(listboxOptions[1]);
    // changeValueが呼ばれ、1番目、3番目、4番目のvalue値がアプリケーション側に渡される
    expect(changeValuesSpy).lastCalledWith(['option0', 'option2', 'option3']);
  });

  test('Spaceを押すと、そのListboxOptionがSelected状態になり、再度押すとSelected状態が解除される', async () => {
    // Listboxにフォーカス
    focusListbox();
    // Spaceを押下
    await userEvent.keyboard('{space}');
    // 先頭のListboxOptionがSelected状態になる
    expectListboxOptionToBeActive(listboxOptions[0]);
    // changeValuesが呼ばれ、先頭のListboxOptionのvalue値がアプリケーション側に渡される
    expect(changeValuesSpy).lastCalledWith(['option0']);
    // 再度Spaceを押下
    await userEvent.keyboard('{space}');
    // Selected状態が解除される
    expectListboxOptionNotToBeSelected(listboxOptions[0]);
    // changeValuesが呼ばれ、なにも選択していないことがアプリケーション側に渡される
    expect(changeValuesSpy).lastCalledWith([]);
  });

  test('Space押下で複数のListboxOptionをSelected状態にできる', async () => {
    // Listboxにフォーカス
    focusListbox();
    // 1番目、3番目、4番目のListboxOptionをActive状態にし、順にSpaceを押す
    // 1.
    // Space押下
    await userEvent.keyboard('{space}');
    // 2.
    // 下矢印を2回押す
    await userEvent.keyboard('{arrowdown}');
    await userEvent.keyboard('{arrowdown}');
    // Space押下
    await userEvent.keyboard('{space}');
    // 3.
    // 下矢印を押す
    await userEvent.keyboard('{arrowdown}');
    // Space押下
    await userEvent.keyboard('{space}');
    // 結果：
    // 1番目、3番目、4番目のListboxOptionがSelected状態になっている
    expectListboxOptionToBeSelected(listboxOptions[0]);
    expectListboxOptionToBeSelected(listboxOptions[2]);
    expectListboxOptionToBeSelected(listboxOptions[3]);
    // 2番目のListboxOptionはSelected状態ではない
    expectListboxOptionNotToBeSelected(listboxOptions[1]);
    // changeValuesが呼ばれ、1番目、3番目、4番目のListboxOptionのvalue値がアプリケーション側に渡される
    expect(changeValuesSpy).lastCalledWith(['option0', 'option2', 'option3']);
  });
});

describe('Disabled状態の時', () => {
  test('Listboxにフォーカスできない', () => {
    const { getByRole } = render(<Disabled />);
    const listbox = getByRole('listbox');
    act(() => listbox.focus());
    expect(listbox).not.toHaveFocus();
  });

  test('ListboxOptionをホバーしても、Active状態にならない', () => {
    const { getAllByRole } = render(<Disabled />);
    const listboxOptions = getAllByRole('option');
    userEvent.hover(listboxOptions[0]);
    expectListboxOptionNotToBeActive(listboxOptions[0]);
  });

  test('Selected状態ではない時、そのListboxOptionをクリックしてもSelected状態にはならない', () => {
    const changeValuesSpy = jest.fn();
    const { getAllByRole } = render(
      <Disabled changeValues={changeValuesSpy} />
    );
    const listboxOptions = getAllByRole('option');
    // 先頭のListboxOptionはSelected状態ではない
    expectListboxOptionNotToBeSelectedWithDisabledStyle(listboxOptions[0]);
    // 先頭のListboxOptionをクリック
    userEvent.click(listboxOptions[0]);
    // 先頭のListboxOptionがSelected状態ではない（変化なし）
    expectListboxOptionNotToBeSelectedWithDisabledStyle(listboxOptions[0]);
    // changeValuesが呼ばれない
    expect(changeValuesSpy).not.toHaveBeenCalled();
  });

  test('Selected状態の時、ListboxOptionをクリックしてもSelected状態は解除されない', () => {
    const changeValuesSpy = jest.fn();
    const { getAllByRole } = render(
      <Disabled changeValues={changeValuesSpy} values={['option0']} />
    );
    const listboxOptions = getAllByRole('option');
    // 先頭のListboxOptionはSelected状態である
    expectListboxOptionToBeSelectedWithDisabledStyle(listboxOptions[0]);
    // 先頭のListboxOptionをクリック
    userEvent.click(listboxOptions[0]);
    // 先頭のListboxOptionはSelected状態である（変化なし）
    expectListboxOptionToBeSelectedWithDisabledStyle(listboxOptions[0]);
    // changeValuesが呼ばれない
    expect(changeValuesSpy).not.toHaveBeenCalled();
  });
});

describe('見た目の確認', () => {
  test('Disabledではない時、ListboxOptionをホバーした時、カーソルはPointerになる', () => {
    const { getAllByRole } = render(<Normal />);
    for (const option of getAllByRole('option')) {
      expect(option).toHaveStyle({ cursor: 'pointer' });
    }
  });

  test('Disabledの時、ListboxOptionをホバーすると、カーソルはnot-allowedになる', () => {
    const { getAllByRole } = render(<Disabled />);
    for (const option of getAllByRole('option')) {
      expect(option).toHaveStyle({ cursor: 'not-allowed' });
    }
  });

  test('ListboxOptionにホバーすると、OptionLabelの値がツールチップとして表示される', () => {
    const { getAllByRole } = render(<Normal />);
    // すべてのListboxOptionに、OptionLabelの値をとるtitle属性が設定されている
    for (const option of getAllByRole('option')) {
      expect(option).toHaveAttribute('title', option.textContent);
    }
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
      await act(() => Story.play?.({ canvasElement: container }));
      await checkA11y(container, {
        rules: {
          // todo: ルールを有効にするための改善策を検討する
          'aria-input-field-name': { enabled: false }
        }
      });
    });
  }
});

const getListbox = () => screen.getByRole('listbox');

const expectListboxOptionToBeActive = (target: HTMLElement) => {
  // aria-activedescendant属性が参照している値が、targetのidと一致している
  expect(getListbox()).toHaveAttribute(
    'aria-activedescendant',
    target.getAttribute('id')
  );
  // targetの背景色が colors.solitude に変化する
  expect(target).toHaveStyle({
    'background-color': designTokens.colors.solitude
  });
};

const expectListboxOptionNotToBeActive = (target: HTMLElement) => {
  // targetのid値を、aria-activedescendantが参照していない
  expect(getListbox()).not.toHaveAttribute(
    'aria-activedescendant',
    target.getAttribute('id')
  );
  // 背景色が colors.snow になる
  // ただし、jestではComputedStyleの値をとれないため、テストできない
};

const expectListboxOptionToBeSelected = (target: HTMLElement) => {
  // aria-selected属性がtrueになっている
  expect(target).toHaveAttribute('aria-selected', 'true');
  // 前景色が colors.curiousBlue になっている
  expect(target).toHaveStyle({ color: designTokens.colors.curiousBlue });
};

const expectListboxOptionNotToBeSelected = (target: HTMLElement) => {
  // aria-selected属性がfalseになっている
  expect(target).toHaveAttribute('aria-selected', 'false');
  // 前景色が colors.mineShaft になっている
  expect(target).toHaveStyle({ color: designTokens.colors.mineShaft });
};

const expectListboxOptionToBeDisabledStyle = (target: HTMLElement) => {
  // 前景色が colors.grayになっている
  expect(target).toHaveStyle({ color: designTokens.colors.gray });
  // 背景色が colors.iron になっている
  expect(target).toHaveStyle({ 'background-color': designTokens.colors.iron });
};

const expectListboxOptionToBeSelectedWithDisabledStyle = (
  target: HTMLElement
) => {
  // aria-selectedの値はtrue
  expect(target).toHaveAttribute('aria-selected', 'true');
  expectListboxOptionToBeDisabledStyle(target);
};

const expectListboxOptionNotToBeSelectedWithDisabledStyle = (
  target: HTMLElement
) => {
  // aria-selectedの値はfalse
  expect(target).toHaveAttribute('aria-selected', 'false');
  expectListboxOptionToBeDisabledStyle(target);
};
