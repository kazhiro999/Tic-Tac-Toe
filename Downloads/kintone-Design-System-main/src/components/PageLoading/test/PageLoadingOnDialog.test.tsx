import * as stories from '../stories/PageLoadingOnDialog.stories';
import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

const { PageLoadingOnDialog } = composeStories(stories);

const TESTID_DIALOG = 'dialog-pageloading-on-dialog';

describe('Loadingを伴うDialog', () => {
  test('Loadingを開くとキーボード操作でダイアログが閉じない', async () => {
    const body = document.body;

    const { getByRole, getByTestId } = render(
      <PageLoadingOnDialog dataTestIdDialog={TESTID_DIALOG} />,
      {
        // REF: https://testing-library.com/docs/react-testing-library/api#container
        baseElement: body
      }
    );
    const openButton = getByRole('button');
    userEvent.click(openButton);
    const okButton = getByTestId('shared-Dialog-DialogActions-ok-button');
    userEvent.click(okButton);

    // wicg-inertではinertの効果が即時反映されない。そのため非同期に検証する必要がある。
    // https://github.com/WICG/inert#performance-and-gotchas
    return Promise.resolve().then(() => {
      userEvent.keyboard('{escape}');
      expect(getByTestId(TESTID_DIALOG)).toBeInTheDocument();
    });
  });

  test('Loadingを開くとダイアログにフォーカスできない', async () => {
    const body = document.body;

    const { getByRole, getByTestId } = render(
      <PageLoadingOnDialog dataTestIdDialog={TESTID_DIALOG} />,
      {
        // REF: https://testing-library.com/docs/react-testing-library/api#container
        baseElement: body
      }
    );
    const openButton = getByRole('button');
    userEvent.click(openButton);
    const okButton = getByTestId('shared-Dialog-DialogActions-ok-button');
    userEvent.click(okButton);

    // wicg-inertではinertの効果が即時反映されない。そのため非同期に検証する必要がある。
    // https://github.com/WICG/inert#performance-and-gotchas
    return Promise.resolve().then(() => {
      const dialogEl = getByTestId(TESTID_DIALOG);
      dialogEl.focus();
      expect(dialogEl).not.toHaveFocus();
    });
  });
});
