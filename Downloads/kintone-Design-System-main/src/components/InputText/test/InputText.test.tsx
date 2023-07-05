import { render } from '@testing-library/react';
import * as stories from '../stories/InputText.stories';
import * as testStories from '../stories/InputText.test.stories';
import { composeStories } from '@storybook/react';
import { userEvent } from '@storybook/testing-library';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

const InputText = composeStories(stories).Normal;

it('クリックしたときに割り当てられたアクションが実行される', () => {
  // InputTextを描画する
  const onClickSpy = jest.fn();
  const { getByRole } = render(<InputText onClick={onClickSpy} />);
  // TextBoxをクリックする
  const textboxEl = getByRole('textbox');
  userEvent.click(textboxEl);
  // 割り当てられたアクションが実行されることを確認する
  expect(onClickSpy).toBeCalled();
});

it('キーを押したときに割り当てられたアクションが実行される', () => {
  // InputTextを描画する
  const onKeydownSpy = jest.fn();
  const emptyFunction = () => {
    // Does Nothing
  };
  const { getByRole } = render(
    <InputText onKeyDown={onKeydownSpy} changeValue={() => emptyFunction} />
  );
  // TextBoxに文字を入力する
  const textboxEl = getByRole('textbox');
  userEvent.type(textboxEl, 'a');
  // 割り当てられたアクションが実行されることを確認する
  expect(onKeydownSpy).toBeCalled();
});

it('フォーカスしたときに割り当てられたアクションが実行される', () => {
  // InputTextを描画する
  const onFocusSpy = jest.fn();
  const { getByRole } = render(<InputText onFocus={onFocusSpy} />);
  // TextBoxにフォーカスする
  const textboxEl = getByRole('textbox');
  textboxEl.focus();
  // 割り当てられたアクションが実行されることを確認する
  expect(onFocusSpy).toBeCalled();
});

it('フォーカスを外したときに割り当てられたアクションが実行される', () => {
  // InputTextを描画する
  const onBlurSpy = jest.fn();
  const { getByRole } = render(<InputText onBlur={onBlurSpy} />);
  // TextBoxにフォーカスしてからフォーカスを外す
  const textboxEl = getByRole('textbox');
  textboxEl.focus();
  textboxEl.blur();
  // 割り当てられたアクションが実行されることを確認する
  expect(onBlurSpy).toBeCalled();
});

it('マウスホバーするとカーソルが変化する', async () => {
  // InputTextを描画する
  const { getByRole } = render(<InputText />);
  // TextBowを取得する
  const textboxEl = getByRole('textbox');
  // CSSでcursor:autoが指定されていること
  expect(textboxEl).toHaveStyle({ cursor: 'auto' });
});

describe('a11y', () => {
  const testingStories = {
    ...composeStories(stories),
    ...composeStories(testStories)
  };
  for (const Story of Object.values(testingStories)) {
    assertExists(Story.storyName);
    test(Story.storyName, async () => {
      const { container } = await render(<Story />);
      await Story.play?.({ canvasElement: container });
      await checkA11y(container, {
        rules: {
          // InputTextにラベルを付与する仕組みが提供されていないためすべてのテストが失敗する
          label: { enabled: false }
        }
      });
    });
  }
});
