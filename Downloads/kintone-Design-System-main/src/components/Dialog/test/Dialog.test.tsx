/**
 * @fileoverview ドキュメントに記載されている動作を確認するテスト
 */

import React from 'react';
import * as stories from '../stories/Dialog.stories';
import * as testStories from '../stories/Dialog.test.stories';
import { render, waitFor } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';
import { composeStories } from '@storybook/react';

const Dialog = composeStories(testStories).Enabled;

describe('Dialog', () => {
  const renderDialog = ({
    onClose,
    onNormal,
    onPrimary
  }: {
    onClose?: () => void;
    onNormal?: React.MouseEventHandler<HTMLButtonElement>;
    onPrimary?: React.MouseEventHandler<HTMLButtonElement>;
  }) => {
    // Dialogを描画する
    const closeButtonLabel = 'close';
    const normalButtonLabel = 'normal';
    const primaryButtonLabel = 'ok';
    const { getByRole } = render(
      <Dialog
        onClose={onClose}
        onClickCancelButton={onNormal}
        onClickOkButton={onPrimary}
        headerCloseButtonAlternativeText={closeButtonLabel}
        labelCancelButton={normalButtonLabel}
        labelOkButton={primaryButtonLabel}
      />
    );
    return {
      dialogEl: getByRole('dialog'),
      closeButtonEl: getByRole('button', { name: closeButtonLabel }),
      normalButtonEl: getByRole('button', { name: normalButtonLabel }),
      primaryButtonEl: getByRole('button', { name: primaryButtonLabel })
    };
  };

  describe('CloseButton', () => {
    it('CloseButtonをクリックすると、割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onClose = jest.fn();
      // Dialogを描画する
      const { closeButtonEl } = renderDialog({ onClose });
      // CloseButtonをクリックする
      userEvent.click(closeButtonEl);
      // 割り当てられたアクションが実行されことを確認する
      expect(onClose).toHaveBeenCalled();
    });

    it('CloseButtonにフォーカスがあるとき、Enterキーを押すと割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onClose = jest.fn();
      // Dialogを描画する
      const { closeButtonEl } = renderDialog({ onClose });
      // CloseButtonにフォーカスする
      closeButtonEl.focus();
      // Enterキーを押す
      userEvent.keyboard('{enter}');
      // 割り当てられたアクションが実行されことを確認する
      expect(onClose).toHaveBeenCalled();
    });

    it('CloseButtonにフォーカスがあるとき、Spaceキーを押すと割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onClose = jest.fn();
      // Dialogを描画する
      const { closeButtonEl } = renderDialog({ onClose });
      // CloseButtonにフォーカスする
      closeButtonEl.focus();
      // Spaceキーを押す
      userEvent.keyboard('{space}');
      // 割り当てられたアクションが実行されことを確認する
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('NormalButton', () => {
    it('NormalButtonをクリックすると、割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onNormal = jest.fn();
      // Dialogを描画する
      const { normalButtonEl } = renderDialog({ onNormal });
      // NormalButtonをクリックする
      userEvent.click(normalButtonEl);
      // 割り当てられたアクションが実行されことを確認する
      expect(onNormal).toHaveBeenCalled();
    });

    it('NormalButtonにフォーカスがあるとき、Enterキーを押すと割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onNormal = jest.fn();
      // Dialogを描画する
      const { normalButtonEl } = renderDialog({ onNormal });
      // NormalButtonにフォーカスする
      normalButtonEl.focus();
      // Enterキーを押す
      userEvent.keyboard('{enter}');
      // 割り当てられたアクションが実行されことを確認する
      expect(onNormal).toHaveBeenCalled();
    });

    it('NormalButtonにフォーカスがあるとき、Spaceキーを押すと割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onNormal = jest.fn();
      // Dialogを描画する
      const { normalButtonEl } = renderDialog({ onNormal });
      // NormalButtonにフォーカスする
      normalButtonEl.focus();
      // Enterキーを押す
      userEvent.keyboard('{space}');
      // 割り当てられたアクションが実行されことを確認する
      expect(onNormal).toHaveBeenCalled();
    });
  });

  describe('PrimaryButton', () => {
    it('PrimaryButtonをクリックすると、割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onPrimary = jest.fn();
      // Dialogを描画する
      const { primaryButtonEl } = renderDialog({ onPrimary });
      // PrimaryButtonをクリックする
      userEvent.click(primaryButtonEl);
      // 割り当てられたアクションが実行されことを確認する
      expect(onPrimary).toHaveBeenCalled();
    });

    it('PrimaryButtonにフォーカスがあるとき、Enterキーを押すと割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onPrimary = jest.fn();
      // Dialogを描画する
      const { primaryButtonEl } = renderDialog({ onPrimary });
      // PrimaryButtonにフォーカスする
      primaryButtonEl.focus();
      // Enterキーを押す
      userEvent.keyboard('{enter}');
      // 割り当てられたアクションが実行されことを確認する
      expect(onPrimary).toHaveBeenCalled();
    });

    it('PrimaryButtonにフォーカスがあるとき、Spaceキーを押すと割り当てられたアクションが実行される', () => {
      // 割り当てるアクションを定義する
      const onPrimary = jest.fn();
      // Dialogを描画する
      const { primaryButtonEl } = renderDialog({ onPrimary });
      // PrimaryButtonにフォーカスする
      primaryButtonEl.focus();
      // Enterキーを押す
      userEvent.keyboard('{space}');
      // 割り当てられたアクションが実行されことを確認する
      expect(onPrimary).toHaveBeenCalled();
    });
  });

  it('ESCキーを押すとダイアログが閉じる', () => {
    // 割り当てるアクションを定義する
    const onClose = jest.fn();
    // Dialogを描画する
    const { dialogEl } = renderDialog({ onClose });
    // CloseButtonをクリックする
    dialogEl.focus();
    userEvent.keyboard('{escape}');
    // 割り当てられたアクションが実行されことを確認する
    expect(onClose).toHaveBeenCalled();
  });

  describe('ダイアログのフォーカス順序', () => {
    let firstFocusableEl: HTMLElement;
    let lastFocusableEl: HTMLElement;
    beforeEach(() => {
      const { dialogEl, primaryButtonEl } = renderDialog({});
      firstFocusableEl = dialogEl;
      lastFocusableEl = primaryButtonEl;
    });

    it('ダイアログ末尾の要素にフォーカスしているとき、Tabキーを押すと、ダイアログ先頭の要素にフォーカスする', async () => {
      // ダイアログ末尾の要素にフォーカスする
      lastFocusableEl.focus();
      // Tabキーを押す
      userEvent.tab();
      // ダイアログ末尾の要素にフォーカスする
      await waitFor(() => document.activeElement === firstFocusableEl);
    });

    it('ダイアログ先頭の要素にフォーカスしているとき、Shift+Tabキーを押すと、ダイアログ末尾の要素にフォーカスする', async () => {
      // ダイアログ先頭の要素にフォーカスする
      firstFocusableEl.focus();
      // Shift+Tabキーを押す
      userEvent.tab({ shift: true });
      // ダイアログ末尾の要素にフォーカスする
      await waitFor(() => document.activeElement === lastFocusableEl);
    });
  });

  // Dialogの外側の要素の上にOverlayがかかってクリックができないようになっていることのテストが現状の実装上難しい
  // 将来的にinert対応をいれれば解決されるのでそのときにテストを実装する
  // それまでは手動試験にて実施
  test.todo('Dialogの外側の要素をクリックできない');

  // 現状の実装だとDialogの外側の要素にフォーカスができる方法が残っているため、テストの実装が難しい
  // フォーカスループで大抵のケースはカバーできていて、それは他のテストにて実装済み
  // 将来的にinert対応をいれれば解決されるのでそのときにテストを実装する
  test.todo('Dialogの外側の要素にフォーカスできない');
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
      Story.play?.({ canvasElement: container });
      await checkA11y(container);
    });
  }
});
