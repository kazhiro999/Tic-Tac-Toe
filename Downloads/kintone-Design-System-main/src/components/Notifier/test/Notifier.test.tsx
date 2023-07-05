import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from '../stories/Notifier.stories';
import * as testStories from '../stories/Notifier.test.stories';
import userEvent from '@testing-library/user-event';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

const { Error, Success, Info } = composeStories(testStories);

describe('error', () => {
  test('Close Buttonをクリックすると、onCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Error onClose={onCloseSpy} />);
    // Close Buttonをクリック
    userEvent.click(getByRole('button'));
    // onCloseイベントが発火すること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('Close Buttonをエンターキーで押すとonCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Error onClose={onCloseSpy} />);
    // Close Buttonにフォーカスする
    getByRole('button').focus();
    // エンターキーを押す
    userEvent.keyboard('{enter}');
    // onCloseイベントが発火すること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('Close Buttonをスペースキーで押すとonCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Error onClose={onCloseSpy} />);
    // Close Buttonにフォーカスする
    getByRole('button').focus();
    // スペースキーを押す
    userEvent.keyboard('{space}');
    // onCloseイベントが発火すること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('7秒後にonCloseイベントが自動で発火しない', async () => {
    const onCloseSpy = jest.fn();
    render(<Error onClose={onCloseSpy} />);
    jest.useFakeTimers();
    // 7秒待つ
    jest.advanceTimersByTime(7000);
    // onCloseイベントが発火しないこと
    expect(onCloseSpy).not.toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('Title/Message Lines / Close Buttonの代替テキストを支援技術に通知するための属性がマークアップされている', async () => {
    const { getByRole } = render(<Error />);
    // エラーを支援技術に通知するためのrole属性、aria-live属性があること
    const status = getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  test('Close ButtonにAccessible Nameが設定されている', async () => {
    const { getByRole } = render(<Error />);
    // Close ButtonにAccessible Nameがあること
    const button = getByRole('button');
    expect(button).toHaveAccessibleName();
  });
});

describe('Success', () => {
  test('Close Buttonをクリックすると、onCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Success onClose={onCloseSpy} />);
    // Close Buttonをクリック
    userEvent.click(getByRole('button'));
    // onCloseイベントが発火すること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('Close Buttonをエンターキーで押すとonCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Success onClose={onCloseSpy} />);
    // Close Buttonにフォーカス
    getByRole('button').focus();
    // エンターキーを押す
    userEvent.keyboard('{enter}');
    // onCloseイベントが発火すること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('Close Buttonをスペースキーで押すとonCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Success onClose={onCloseSpy} />);
    // Close Buttonにフォーカス
    getByRole('button').focus();
    // スペースキーを押す
    userEvent.keyboard('{space}');
    // onCloseイベントが発火すること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('7秒後にonCloseイベントが自動で発火する', async () => {
    jest.useFakeTimers();
    const onCloseSpy = jest.fn();
    render(<Success onClose={onCloseSpy} />);
    // onCloseイベントが発火していないこと
    expect(onCloseSpy).not.toHaveBeenCalled();
    // 6秒待つ
    jest.advanceTimersByTime(6000);
    // onCloseイベントが発火していないこと
    expect(onCloseSpy).not.toHaveBeenCalled();
    // 1秒待つ
    jest.advanceTimersByTime(1000);
    // onCloseイベントが発火していること
    expect(onCloseSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('Title/Message Lines / Close Buttonの代替テキストを支援技術に通知するための属性がマークアップされている', async () => {
    const { getByRole } = render(<Success />);
    // エラーを支援技術に通知するためのrole属性、aria-live属性があること
    const status = getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  test('Close ButtonにAccessible Nameが設定されている', async () => {
    const { getByRole } = render(<Success />);
    // Close ButtonにAccessible Nameが設定されていること
    const button = getByRole('button');
    expect(button).toHaveAccessibleName();
  });
});

describe('Info', () => {
  test('Close Buttonをクリックすると、onCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Info onClose={onCloseSpy} />);
    // Close Buttonをクリック
    userEvent.click(getByRole('button'));
    // onCloseイベントが発火していること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('Close Buttonをエンターキーで押すとonCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Info onClose={onCloseSpy} />);
    // Close Buttonにフォーカス
    getByRole('button').focus();
    // エンターキーを押す
    userEvent.keyboard('{enter}');
    // onCloseイベントが発火していること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('Close Buttonをスペースキーで押すとonCloseイベントが発火する', async () => {
    const onCloseSpy = jest.fn();
    const { getByRole } = render(<Info onClose={onCloseSpy} />);
    // Close Buttonにフォーカス
    getByRole('button').focus();
    // スペースキーを押す
    userEvent.keyboard('{space}');
    // onCloseイベントが発火していること
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('7秒後にonCloseイベントが自動で発火する', async () => {
    jest.useFakeTimers();
    const onCloseSpy = jest.fn();
    render(<Info onClose={onCloseSpy} />);
    // onCloseイベントが発火していないこと
    expect(onCloseSpy).not.toHaveBeenCalled();
    // 6秒待つ
    jest.advanceTimersByTime(6000);
    // onCloseイベントが発火していないこと
    expect(onCloseSpy).not.toHaveBeenCalled();
    // 1秒待つ
    jest.advanceTimersByTime(1000);
    // onCloseイベントが発火していること
    expect(onCloseSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('Title/Message Lines / Close Buttonの代替テキストが支援技術に通知される', async () => {
    const { getByRole } = render(<Info />);
    // エラーを支援技術に通知するためのrole属性、aria-live属性があること
    const status = getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  test('Close ButtonにAccessible Nameが設定されている', async () => {
    const { getByRole } = render(<Info />);
    // Close ButtonにAccessible Nameが設定されていること
    expect(getByRole('button')).toHaveAccessibleName();
  });
});

describe('a11y', () => {
  const testingStories = {
    ...composeStories(testStories),
    ...composeStories(stories)
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
