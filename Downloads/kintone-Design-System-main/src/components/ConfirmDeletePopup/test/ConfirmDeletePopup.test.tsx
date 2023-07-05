import { composeStories } from '@storybook/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import * as togglePopupStories from '../stories/ToggleConfirmDeletePopup.stories';
import * as stories from '../stories/ConfirmDeletePopup.stories';
import * as testStories from '../stories/ConfirmDeletePopup.test.stories';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';

const { TogglePopup } = composeStories(togglePopupStories);

const TESTID_TOGGLE_BUTTON = 'confirm-delete-icon-button';
const TESTID_POPUP = 'confirm-delete-popup';
const TESTID_EXTERNAL_POPUP = 'external-popup';

const dataTestIds = {
  dataTestIdToggleButton: TESTID_TOGGLE_BUTTON,
  dataTestIdPopup: TESTID_POPUP,
  dataTestIdExternalPopup: TESTID_EXTERNAL_POPUP
};

describe('ConfirmDeletePopup', () => {
  const clickToggleButton = () => {
    const toggleButton = screen.getByTestId(TESTID_TOGGLE_BUTTON);
    fireEvent.click(toggleButton);
  };

  const getCancelButton = async () => {
    const buttons = await screen.findAllByRole('button');
    return buttons[1];
  };

  const getDeleteButton = async () => {
    const buttons = await screen.findAllByRole('button');
    return buttons[2];
  };

  describe('開閉ボタン', () => {
    test('クリックしてConfirmDeletePopupを開閉できる', async () => {
      render(<TogglePopup {...dataTestIds} />);
      // useOutsideTargetElementOnClick内でsetTimeoutを利用しているためモック
      jest.useFakeTimers();
      // 開閉ボタンをクリック
      clickToggleButton();
      // ConfirmDeletePopupが開いていることを確認
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      jest.runAllTimers();
      // 開閉ボタンをクリック
      clickToggleButton();
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
      // teardown
      jest.useRealTimers();
    });

    test('エンターキー押下でConfirmDeletePopupを開閉できる', async () => {
      render(<TogglePopup {...dataTestIds} />);
      // useOutsideTargetElementOnClick内でsetTimeoutを利用しているためモック
      jest.useFakeTimers();
      // 開閉ボタンにフォーカスしてエンターキー押下
      screen.getByTestId(TESTID_TOGGLE_BUTTON).focus();
      userEvent.keyboard('{enter}');
      jest.runAllTimers();
      // ConfirmDeletePopupが開いていることを確認
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      jest.runAllTimers();
      // 開閉ボタンでエンターキー押下
      screen.getByTestId(TESTID_TOGGLE_BUTTON).focus();
      userEvent.keyboard('{enter}');
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
      // teardown
      jest.useRealTimers();
    });
  });

  test('PopupContainer外部をクリックしてポップアップを閉じる', async () => {
    render(<TogglePopup {...dataTestIds} />);
    // useOutsideTargetElementOnClick内でsetTimeoutを利用しているためモック
    jest.useFakeTimers();
    // ConfirmDeletePopupを開く
    clickToggleButton();
    const popup = screen.getByTestId(TESTID_POPUP);
    expect(popup).toBeInTheDocument();
    jest.runAllTimers();
    // PopupContainer外部をクリックする
    const externalPopup = screen.getByTestId(TESTID_EXTERNAL_POPUP);
    fireEvent.click(externalPopup);
    // ConfirmDeletePopupが閉じていることを確認
    expect(popup).not.toBeInTheDocument();
    // teardown
    jest.useRealTimers();
  });

  test('ESCキーを押すと、ConfirmDeletePopupが閉じ、開閉ボタンにフォーカスする', async () => {
    render(<TogglePopup {...dataTestIds} />);
    // ConfirmDeletePopupを開く
    clickToggleButton();
    const popup = screen.getByTestId(TESTID_POPUP);
    expect(popup).toBeInTheDocument();
    // PopupContainer内部にフォーカスを移動
    const cancelButton = await getCancelButton();
    cancelButton.focus();
    // ESCキー押下
    userEvent.keyboard('{escape}');
    // ConfirmDeletePopupが閉じていることを確認
    expect(popup).not.toBeInTheDocument();
    // 開閉ボタンにフォーカスが当たってることを確認
    const toggleButton = screen.getByTestId(TESTID_TOGGLE_BUTTON);
    expect(toggleButton).toHaveFocus();
  });

  describe('CancelButton', () => {
    test('クリックでConfirmDeletePopupが閉じ、開閉ボタンにフォーカスする', async () => {
      render(<TogglePopup {...dataTestIds} />);
      // ConfirmDeletePopupを開く
      clickToggleButton();
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      // CancelButtonをクリックする
      const cancelButton = await getCancelButton();
      fireEvent.click(cancelButton);
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
      // 開閉ボタンにフォーカスが当たってることを確認
      const toggleButton = screen.getByTestId(TESTID_TOGGLE_BUTTON);
      expect(toggleButton).toHaveFocus();
    });

    test('エンターキー押下でConfirmDeletePopupが閉じ、開閉ボタンにフォーカスする', async () => {
      render(<TogglePopup {...dataTestIds} />);
      // ConfirmDeletePopupを開く
      clickToggleButton();
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      // CancelButtonにフォーカス当ててエンターキー押下
      const cancelButton = await getCancelButton();
      cancelButton.focus();
      userEvent.keyboard('{enter}');
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
      // 開閉ボタンにフォーカスが当たってることを確認
      const toggleButton = screen.getByTestId(TESTID_TOGGLE_BUTTON);
      expect(toggleButton).toHaveFocus();
    });

    test('スペースキー押下でConfirmDeletePopupが閉じ、開閉ボタンにフォーカスする', async () => {
      render(<TogglePopup {...dataTestIds} />);
      // ConfirmDeletePopupを開く
      clickToggleButton();
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      // CancelButtonにフォーカス当ててスペースキー押下
      const cancelButton = await getCancelButton();
      cancelButton.focus();
      userEvent.keyboard('{space}');
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
      // 開閉ボタンにフォーカスが当たってることを確認
      const toggleButton = screen.getByTestId(TESTID_TOGGLE_BUTTON);
      expect(toggleButton).toHaveFocus();
    });
  });

  describe('DeleteButton', () => {
    test('クリックでconfirmDeleteが呼ばれ、ConfirmDeletePopupが閉じる', async () => {
      const mockConfirmDelete = jest.fn();
      render(
        <TogglePopup {...dataTestIds} confirmDelete={mockConfirmDelete} />
      );
      // ConfirmDeletePopupを開く
      clickToggleButton();
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      expect(mockConfirmDelete).not.toBeCalled();
      // DeleteButtonをクリックする
      const deleteButton = await getDeleteButton();
      fireEvent.click(deleteButton);
      // confirmDeleteが呼ばれていることを確認
      expect(mockConfirmDelete).toBeCalled();
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
    });

    test('エンターキー押下でconfirmDeleteが呼ばれ、ConfirmDeletePopupが閉じる', async () => {
      const mockConfirmDelete = jest.fn();
      render(
        <TogglePopup {...dataTestIds} confirmDelete={mockConfirmDelete} />
      );
      // ConfirmDeletePopupを開く
      clickToggleButton();
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      expect(mockConfirmDelete).not.toBeCalled();
      // DeleteButtonにフォーカス当ててエンターキー押下
      const deleteButton = await getDeleteButton();
      deleteButton.focus();
      userEvent.keyboard('{enter}');
      // confirmDeleteが呼ばれていることを確認
      expect(mockConfirmDelete).toBeCalled();
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
    });

    test('スペースキー押下でconfirmDeleteが呼ばれ、ConfirmDeletePopupが閉じる', async () => {
      const mockConfirmDelete = jest.fn();
      render(
        <TogglePopup {...dataTestIds} confirmDelete={mockConfirmDelete} />
      );
      // ConfirmDeletePopupを開く
      clickToggleButton();
      const popup = screen.getByTestId(TESTID_POPUP);
      expect(popup).toBeInTheDocument();
      expect(mockConfirmDelete).not.toBeCalled();
      // DeleteButtonにフォーカス当ててスペースキー押下
      const deleteButton = await getDeleteButton();
      deleteButton.focus();
      userEvent.keyboard('{space}');
      // confirmDeleteが呼ばれていることを確認
      expect(mockConfirmDelete).toBeCalled();
      // ConfirmDeletePopupが閉じていることを確認
      expect(popup).not.toBeInTheDocument();
    });
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
