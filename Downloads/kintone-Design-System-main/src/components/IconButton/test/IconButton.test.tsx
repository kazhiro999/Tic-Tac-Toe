import { userEvent } from '@storybook/testing-library';
import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';
import * as stories from '../stories/IconButton.stories';
import * as testStories from '../stories/IconButton.test.stories';

const { Normal } = composeStories(stories);

describe('IconButton', () => {
  test('クリックすると、割り当てられたアクションを実行される', () => {
    // onClickを監視するモック関数
    const onClickSpy = jest.fn();
    // Normalでテスト
    const { getByRole } = render(<Normal onClick={onClickSpy} />);
    const button = getByRole('button');
    userEvent.click(button);
    // onClickSpyが呼ばれたか確認
    expect(onClickSpy).toHaveBeenCalled();
  });

  test('ホバーすると、ツールチップが表示される(titleにalternativeTextが設定)', () => {
    // Normalでテスト
    const { getByRole } = render(<Normal />);
    const button = getByRole('button');
    expect(button).toHaveAttribute('title', '追加');
  });

  test('ホバーしても、ツールチップが表示されない(titleにalternativeTextが設定されない)', () => {
    // Normalでテスト
    const { getByRole } = render(<Normal hasButtonTitle={false} />);
    const button = getByRole('button');
    expect(button).not.toHaveAttribute('title', '追加');
  });

  test('Tab キーでボタンにフォーカスできる', () => {
    // Normalでテスト
    const { getByRole } = render(<Normal />);
    const button = getByRole('button');
    // Tabキーを押下
    userEvent.tab();
    // フォーカスされているか確認
    expect(button).toHaveFocus();
  });

  test('エンターキーでボタンに割り当てられたアクションが実行される', () => {
    // onKeyDownを監視するモック関数
    const onKeyDownSpy = jest.fn();
    // Normalでテスト
    render(<Normal onClick={onKeyDownSpy} />);
    // buttonにフォーカス
    userEvent.tab();
    // エンターキーを押下
    userEvent.keyboard('{enter}');
    // onKeyDownSpyが呼ばれたか確認
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  test('スペースキーでボタンに割り当てられたアクションが実行される', () => {
    // onKeyDownを監視するモック関数
    const onKeyDownSpy = jest.fn();
    // Normalでテスト
    render(<Normal onClick={onKeyDownSpy} />);
    // buttonにフォーカス
    userEvent.tab();
    // エンターキーを押下
    userEvent.keyboard('{space}');
    // onKeyDownSpyが呼ばれたか確認
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  test('Iconの代替テキストが読み上げられる', () => {
    // Normalでテスト
    const { getByRole } = render(<Normal />);
    const button = getByRole('button');
    // 代替テキストがあるか確認
    expect(button).toHaveAccessibleName('追加');
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
        await checkA11y(container);
      });
    }
  });
});
