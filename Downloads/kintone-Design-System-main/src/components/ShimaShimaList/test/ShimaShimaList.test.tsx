import * as stories from '../stories/ShimaShimaList.stories';
import * as testStories from '../stories/ShimaShimaList.test.stories';
import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';

const { Normal } = composeStories(stories);

describe('MoreButton', () => {
  it('マウスクリックでアクションが実行される', () => {
    // MoreButton有りのShimaShimaListを描画
    const onClickSpy = jest.fn();
    const { getByRole } = render(<Normal onClickMoreButton={onClickSpy} />);
    // MoreButton取得
    const moreButton = getByRole('button');
    // onClickMoreButtonに指定した関数が呼ばれていないこと
    expect(onClickSpy).not.toBeCalled();
    // MoreButtonをクリック
    userEvent.click(moreButton);
    // onClickMoreButtonに指定した関数が呼ばれていること
    expect(onClickSpy).toBeCalled();
  });

  it('Enterキーでアクションが実行される', () => {
    // MoreButton有りのShimaShimaListを描画
    const onClickSpy = jest.fn();
    const { getByRole } = render(<Normal onClickMoreButton={onClickSpy} />);
    // MoreButton取得
    const moreButton = getByRole('button');
    // onClickMoreButtonに指定した関数が呼ばれていないこと
    expect(onClickSpy).not.toBeCalled();
    // MoreButtonにフォーカスしてEnterキー
    moreButton.focus();
    userEvent.keyboard('{enter}');
    // onClickMoreButtonに指定した関数が呼ばれていること
    expect(onClickSpy).toBeCalled();
  });

  it('Spaceキーでアクションが実行される', () => {
    // MoreButton有りのShimaShimaListを描画
    const onClickSpy = jest.fn();
    const { getByRole } = render(<Normal onClickMoreButton={onClickSpy} />);
    // MoreButton取得
    const moreButton = getByRole('button');
    // onClickMoreButtonに指定した関数が呼ばれていないこと
    expect(onClickSpy).not.toBeCalled();
    // MoreButtonにフォーカスしてSpaceキー
    moreButton.focus();
    userEvent.keyboard('{space}');
    // onClickMoreButtonに指定した関数が呼ばれていること
    expect(onClickSpy).toBeCalled();
  });

  it('カーソルがpointerになる', () => {
    // MoreButtonありのShimaShimaListを描画
    const { getByRole } = render(<Normal />);
    // MoreButton取得
    const moreButton = getByRole('button');
    // CSSでcursor:pointerが指定されていること
    expect(moreButton).toHaveStyle({ cursor: 'pointer' });
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
      await checkA11y(container);
    });
  }
});
