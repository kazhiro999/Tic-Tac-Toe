/**
 * @fileoverview aria-hiddenのつけ外しが正常に行われているかを確認するテスト
 * ドキュメントに記載されている動作仕様よりも細かいもの
 * see: https://github.com/kintone-private/kintone-Design-System/issues/537
 */

import * as stories from '../stories/ToggleDialog.stories';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

const { ToggleDialog } = composeStories(stories);

describe('ダイアログ', () => {
  test('すでにaria-hiddenが付与された要素がある場合は、ダイアログを閉じたときに元の値になる', async () => {
    const body = document.body;
    // NOTE: Dialogによって変更されるaria-hiddenはbody直下のDOMのみなので、ここで追加する
    body.insertAdjacentHTML(
      'afterbegin',
      '<div aria-hidden="true" data-testid="AriaHiddenTrue" />'
    );
    body.insertAdjacentHTML(
      'afterbegin',
      '<div aria-hidden="false" data-testid="AriaHiddenFalse" />'
    );
    body.insertAdjacentHTML(
      'afterbegin',
      '<div data-testid="AriaHiddenNull" />'
    );

    const { getByRole, queryByRole, getByTitle } = render(<ToggleDialog />, {
      // REF: https://testing-library.com/docs/react-testing-library/api#container
      baseElement: body
    });

    expect(queryByRole('dialog')).not.toBeInTheDocument();

    const openBtn = getByRole('button');
    userEvent.click(openBtn);
    expect(getByRole('dialog')).toBeInTheDocument();

    // Dialogが表示されている間は全てtrue
    expect(screen.getByTestId('AriaHiddenTrue')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(screen.getByTestId('AriaHiddenFalse')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(screen.getByTestId('AriaHiddenNull')).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    const closeBtn = getByTitle('close');
    userEvent.click(closeBtn);

    // Dialogが非表示になったときに元のaria-hiddenが維持されているかどうか
    expect(screen.getByTestId('AriaHiddenTrue')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(screen.getByTestId('AriaHiddenFalse')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
    expect(
      screen.getByTestId('AriaHiddenNull').getAttribute('aria-hidden')
    ).toBeNull();
  });
});
