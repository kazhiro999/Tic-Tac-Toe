import * as stories from '../stories/TextButton.stories';
import * as testStories from '../stories/TextButton.test.stories';
import { composeStories } from '@storybook/react';
import { waitFor, render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';

const { Normal } = composeStories(stories);

describe('Normal', () => {
  it('ボタンのラベルがスクリーンリーダーで読み上げられる', async () => {
    render(<Normal />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    expect(button).toHaveAccessibleName();
  });

  it('ラベルをクリックすることでアクションが実行される', async () => {
    const onClickSpy = jest.fn();
    render(<Normal onClick={onClickSpy} />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    userEvent.click(button);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('エンターキーでアクションが実行できる', async () => {
    const onClickSpy = jest.fn();
    render(<Normal onClick={onClickSpy} />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    button.focus();
    userEvent.keyboard('{enter}');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('スペースキーでアクションが実行できる', async () => {
    const onClickSpy = jest.fn();
    render(<Normal onClick={onClickSpy} />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    button.focus();
    userEvent.keyboard('{space}');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('カーソルがリンクポインターになっている', async () => {
    render(<Normal />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    expect(button).toHaveStyle({ cursor: 'pointer' });
  });

  it('Tabキーでフォーカスを当てれる', async () => {
    render(<Normal />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    userEvent.tab();
    expect(button).toHaveFocus();
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
