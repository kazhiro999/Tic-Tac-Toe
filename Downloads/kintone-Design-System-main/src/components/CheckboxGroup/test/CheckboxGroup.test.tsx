import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from '../stories/CheckboxGroup.stories';
import userEvent from '@testing-library/user-event';
import { CheckboxGroupProps } from '..';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';

const { Normal } = composeStories(stories);
let changeValue: CheckboxGroupProps<string>['changeValue'];
let checkboxes: HTMLElement[];

beforeEach(() => {
  // CheckboxGroupをレンダー
  changeValue = jest.fn();
  const { getAllByRole } = render(<Normal changeValue={changeValue} />);
  checkboxes = getAllByRole('checkbox');
});
// Normalストーリーでテスト
test('Checkboxをクリックすると該当のnameとCheck状態がChangeValueに渡される', async () => {
  // 最初のCheckboxがChecked状態になっていること
  expect(checkboxes[0]).toBeChecked();
  // 最初のCheckboxをクリック
  userEvent.click(checkboxes[0]);
  // イベントが発火し、changeValueにnameと切り替え後の状態（Unchecked）がわたってくる
  expect(changeValue).lastCalledWith('name1', false);
  // 3番目のCheckboxがUnchecked状態になっていること
  expect(checkboxes[2]).not.toBeChecked();
  // 3番目のCheckboxをクリック
  userEvent.click(checkboxes[2]);
  // イベントが発火し、changeValueにnameと切り替え後の状態（Checked）がわたってくる
  expect(changeValue).lastCalledWith('name3', true);
});

test('Checkboxをスペースで押すと該当のnameとCheck状態がChangeValueに渡される', async () => {
  // 最初のCheckboxがChecked状態になっていること
  expect(checkboxes[0]).toBeChecked();
  // 最初のCheckboxをスペースで押す
  checkboxes[0].focus();
  userEvent.keyboard('{space}');
  // イベントが発火し、changeValueにnameと切り替え後の状態（Unchecked）がわたってくる
  expect(changeValue).lastCalledWith('name1', false);
  // 3番目のCheckboxがUnchecked状態になっていること
  expect(checkboxes[2]).not.toBeChecked();
  // 3番目のCheckboxをスペースで押す
  checkboxes[2].focus();
  userEvent.keyboard('{space}');
  // イベントが発火し、changeValueにnameと切り替え後の状態（Checked）がわたってくる
  expect(changeValue).lastCalledWith('name3', true);
});

describe('a11y', () => {
  for (const Story of Object.values(composeStories(stories))) {
    assertExists(Story.storyName);
    test(Story.storyName, async () => {
      const { container } = await render(<Normal />);
      await Story.play?.({ canvasElement: container });
      await checkA11y(container);
    });
  }
});
