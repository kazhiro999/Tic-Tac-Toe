import * as stories from '../stories/Button.stories';
import * as testStories from '../stories/Button.test.stories';
import { composeStories } from '@storybook/react';
import { waitFor, render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';

const { NormalSizeLarge, Disabled } = composeStories(stories);

describe('NormalSizeLarge', () => {
  it('スクリーンリーダーで、ボタンのラベルを読み上げられる', async () => {
    render(<NormalSizeLarge />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    expect(button).toHaveAccessibleName(/^Click Me!$/);
  });

  it('マウスクリックでアクションが実行される', async () => {
    const onClickSpy = jest.fn();
    render(<NormalSizeLarge onClick={onClickSpy} />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    userEvent.click(button);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('エンターキーでアクションが実行できる', async () => {
    const onClickSpy = jest.fn();
    render(<NormalSizeLarge onClick={onClickSpy} />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    button.focus();
    userEvent.keyboard('{enter}');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('スペースキーでアクションが実行できる', async () => {
    const onClickSpy = jest.fn();
    render(<NormalSizeLarge onClick={onClickSpy} />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    button.focus();
    userEvent.keyboard('{space}');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('カーソルがリンクポインターになっている', async () => {
    render(<NormalSizeLarge />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    expect(button).toHaveStyle({ cursor: 'pointer' });
  });

  it('ボタンにフォーカスが当たること', async () => {
    render(<NormalSizeLarge />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    userEvent.tab();
    expect(button).toHaveFocus();
  });
});

describe('Disabled', () => {
  it('マウスクリックでアクションが実行されない', async () => {
    const onClickSpy = jest.fn();
    render(<Disabled onClick={onClickSpy} />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    userEvent.click(button);
    expect(onClickSpy).not.toHaveBeenCalled();
  });

  it('カーソルがデフォルトになっている', async () => {
    render(<Disabled />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    expect(button).toHaveStyle({ cursor: 'default' });
  });

  it('フォーカスがあたらない', async () => {
    render(<Disabled />);
    const button = screen.getByRole('button');
    await waitFor(() => button);
    userEvent.tab();
    expect(button).not.toHaveFocus();
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
