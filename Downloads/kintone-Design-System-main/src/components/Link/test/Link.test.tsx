import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';
import * as stories from '../stories/Link.stories';
import * as testStories from '../stories/Link.test.stories';

const { Normal, External, Underline } = composeStories(stories);

describe('Link', () => {
  test('指定したURL先に同一タブで遷移する', () => {
    const url = 'http://cybozu.co.jp';
    const { getByRole } = render(<Normal url={url} />);
    // href属性に指定されたurlが設定されていること、同一タブ遷移になっていることをチェック
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', url);
    expect(link).not.toHaveAttribute('target');
    // マウスクリック・エンターで遷移することは、aタグのふるまいのため保証される
  });

  test('指定したurl先に別タブで遷移する', () => {
    const url = 'http://kintone.design';
    const { getByRole } = render(<External url={url} />);
    // 指定したurlがhref属性に設定されていること、別タブ遷移の設定がされているかをチェック
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    // マウスクリックとエンターで遷移することは、aタグのふるまいのため保証される
  });

  test('指定した場合、下線が付く', () => {
    const { getByRole } = render(<Underline />);
    expect(getByRole('link')).toHaveStyle({ 'text-decoration': 'underline' });
  });

  // LinkのカーソルはデフォルトでPointer
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
