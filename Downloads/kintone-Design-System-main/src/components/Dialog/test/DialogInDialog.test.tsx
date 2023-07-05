/**
 * @fileoverview Dialogの上にDialogを表示するパターンで、Dialogの開閉時のフォーカス制御等が正常に行われているかを確認するテスト
 * ドキュメントに記載されている動作仕様よりも細かいもの
 * see: https://github.com/kintone-private/kintone-Design-System/issues/525
 */

import * as stories from '../stories/DialogInDialog.stories';
import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

const { DialogInDialog } = composeStories(stories);

describe('ダイアログ内にダイアログがある時', () => {
  describe('focus', () => {
    const checkFocus = (howToCloseDialog: () => void) => {
      render(<DialogInDialog />);
      // 開閉ボタンをクリック
      const button = screen.getByRole('button');
      userEvent.click(button);
      // 外側のダイアログにフォーカスしていること
      const outsideDialog = within(
        screen.getByTestId('outside-dialog')
      ).getByRole('dialog');
      expect(outsideDialog).toBeInTheDocument();
      expect(outsideDialog).toHaveFocus();
      // OKボタンをクリック
      const okButton = within(outsideDialog).getByRole('button', {
        name: 'OK'
      });
      userEvent.click(okButton);
      // 外側のダイアログが消え、内側のダイアログにフォーカスしていること
      expect(outsideDialog).not.toBeInTheDocument();
      const insideDialog = within(
        screen.getByTestId('inside-dialog')
      ).getByRole('dialog');
      expect(insideDialog).toBeInTheDocument();
      expect(insideDialog).toHaveFocus();
      // 内側のダイアログをエスケープキー、キャンセルボタン、OKボタンのいずれかの方法で閉じる
      howToCloseDialog();
      const newOutsideDialog = within(
        screen.getByTestId('outside-dialog')
      ).getByRole('dialog');
      // 外側のダイアログにフォーカスしていること
      expect(newOutsideDialog).toHaveFocus();
      // 外側のダイアログをエスケープキー、キャンセルボタン、OKボタンのいずれかの方法で閉じる
      howToCloseDialog();
      // 開閉ボタンにフォーカスしていること
      expect(button).toHaveFocus();
    };

    it('エスケープキーで内側→外側の順に閉じ、外側のダイアログ→開閉ボタンの順にフォーカスする', async () => {
      checkFocus(() => {
        userEvent.keyboard('{escape}');
      });
    });

    it('Cancelボタンクリックで内側→外側の順に閉じ、外側のダイアログ→開閉ボタンの順にフォーカスする', async () => {
      checkFocus(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        userEvent.click(cancelButton);
      });
    });

    it('Closeボタンクリックで内側→外側の順に閉じ、外側のダイアログ→開閉ボタンの順にフォーカスする', async () => {
      checkFocus(() => {
        const closeButton = screen.getByTitle('close');
        userEvent.click(closeButton);
      });
    });

    it('DialogBody内のボタンで内側のダイアログを開いた時、内側のダイアログ→開閉ボタンの順にフォーカスする', async () => {
      const { getByRole, getByTestId } = render(<DialogInDialog />);
      // 開閉ボタンをクリック
      const button = getByRole('button');
      userEvent.click(button);
      // 外側のダイアログが開いていること
      const outsideDialog = within(getByTestId('outside-dialog')).getByRole(
        'dialog'
      );
      expect(outsideDialog).toBeVisible();
      // 外側のダイアログにフォーカスしていること
      expect(outsideDialog).toHaveFocus();
      // DialogBody内のボタンをクリック（内側のダイアログが開くボタン、例：ユーザー招待ダイアログ）
      const bodyButton = getByRole('button', { name: 'open inside dialog' });
      userEvent.click(bodyButton);
      // 外側のダイアログが閉じていること
      expect(outsideDialog).not.toBeVisible();
      // 内側のダイアログが開いていること
      const insideDialog = within(getByTestId('inside-dialog')).getByRole(
        'dialog'
      );
      expect(insideDialog).toBeVisible();
      // 内側のダイアログにフォーカスしていること
      expect(insideDialog).toHaveFocus();
      // 内側のダイアログを閉じる
      userEvent.keyboard('{escape}');
      // 外側のダイアログが開いていること
      const newOutsideDialog = within(getByTestId('outside-dialog')).getByRole(
        'dialog'
      );
      expect(newOutsideDialog).toBeVisible();
      // 外側のダイアログにフォーカスしていること
      expect(newOutsideDialog).toHaveFocus();
      // 外側のダイアログを閉じる
      userEvent.keyboard('{escape}');
      // ダイアログの開閉ボタンにフォーカスしていること
      expect(button).toHaveFocus();
    });
  });

  describe('ダイアログが開いているときはbodyの子要素にaria-hidden="true"がセットされ、ダイアログが閉じているときはaria-hiddenが削除されている', () => {
    const checkAriaHidden = (closeDialog: () => void) => {
      const { baseElement, getByRole, getByTestId } = render(
        <DialogInDialog />
      );
      // 開閉ボタンをクリック
      const button = getByRole('button');
      userEvent.click(button);
      // 外側のダイアログが開いていること
      const outsideDialog = within(getByTestId('outside-dialog')).getByRole(
        'dialog'
      );
      expect(outsideDialog).toBeVisible();
      // bodyの子要素にaria-hidden="true"がセットされていること
      expect(baseElement.firstChild).toHaveAttribute('aria-hidden', 'true');
      // OKボタンをクリック
      const okButton = getByRole('button', { name: 'OK' });
      userEvent.click(okButton);
      // 外側のダイアログが閉じていること
      expect(outsideDialog).not.toBeVisible();
      // 内側のダイアログが開いていること
      const insideDialog = within(getByTestId('inside-dialog')).getByRole(
        'dialog'
      );
      expect(insideDialog).toBeVisible();
      // bodyの子要素にaria-hidden="true"がセットされていること
      expect(baseElement.firstChild).toHaveAttribute('aria-hidden', 'true');
      // 内側のダイアログを閉じる
      closeDialog();
      // 内側のダイアログが閉じていること
      expect(insideDialog).not.toBeVisible();
      // 外側のダイアログが開いていること
      const newOutsideDialog = within(getByTestId('outside-dialog')).getByRole(
        'dialog'
      );
      expect(newOutsideDialog).toBeVisible();
      // bodyの子要素にaria-hidden="true"がセットされていること
      expect(baseElement.firstChild).toHaveAttribute('aria-hidden', 'true');
      // 外側のダイアログを閉じる
      closeDialog();
      // 外側のダイアログが閉じていること
      expect(newOutsideDialog).not.toBeVisible();
      // bodyの子要素のaria-hiddenが削除されていること
      expect(baseElement.firstChild).not.toHaveAttribute('aria-hidden');
    };

    it('エスケープキーでダイアログを閉じる場合', async () => {
      await checkAriaHidden(() => userEvent.keyboard('{escape}'));
    });

    it('Cancelボタンを押した場合', async () => {
      await checkAriaHidden(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        userEvent.click(cancelButton);
      });
    });

    it('closeボタンを押した場合', async () => {
      await checkAriaHidden(() => {
        const closeButton = screen.getByTitle('close');
        userEvent.click(closeButton);
      });
    });

    it('DialogBodyのボタンで内側のダイアログを開いた場合', async () => {
      const { baseElement, getByRole, getByTestId } = render(
        <DialogInDialog />
      );
      // 開閉ボタンをクリック
      const button = getByRole('button');
      userEvent.click(button);
      // 外側のダイアログが開いていること
      const outsideDialog = within(getByTestId('outside-dialog')).getByRole(
        'dialog'
      );
      expect(outsideDialog).toBeVisible();
      // bodyの子要素にaria-hidden="true"がセットされていること
      expect(baseElement.firstChild).toHaveAttribute('aria-hidden', 'true');
      // DialogBodyのボタンをクリック（内側のダイアログが開く（例：初心者ガイドダイアログ））
      const bodyButton = getByRole('button', { name: 'open inside dialog' });
      userEvent.click(bodyButton);
      // 外側のダイアログが閉じていること
      expect(outsideDialog).not.toBeVisible();
      // 内側のダイアログが開いていること
      const insideDialog = within(getByTestId('inside-dialog')).getByRole(
        'dialog'
      );
      expect(insideDialog).toBeVisible();
      // bodyの子要素にaria-hidden="true"がセットされていること
      expect(baseElement.firstChild).toHaveAttribute('aria-hidden', 'true');
      // エスケープキーを押す
      userEvent.keyboard('{escape}');
      // 内側のダイアログが閉じていること
      expect(insideDialog).not.toBeVisible();
      // 外側のダイアログが開いていること
      const newOutsideDialog = within(getByTestId('outside-dialog')).getByRole(
        'dialog'
      );
      expect(newOutsideDialog).toBeVisible();
      // bodyの子要素にaria-hidden="true"がセットされていること
      expect(baseElement.firstChild).toHaveAttribute('aria-hidden', 'true');
      // エスケープキーを押す
      userEvent.keyboard('{escape}');
      // 外側のダイアログが閉じていること
      expect(newOutsideDialog).not.toBeVisible();
      // bodyの子要素のaria-hiddenが削除されていること
      expect(baseElement.firstChild).not.toHaveAttribute('aria-hidden');
    });
  });
});
