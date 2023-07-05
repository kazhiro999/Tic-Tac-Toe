import { emptyRepositories } from '../../modules/repositories';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from '../entitySelectRenderer';
import userEvent from '@testing-library/user-event';
import { defaultLocales } from '../../EntitySelectContext';
import { fetchOrgRootTree } from '../repositoryData';
import { screen, within } from '@testing-library/react';

describe('ClosePickerDialogButton', () => {
  test('クリックするとPickerDialogがClose状態になり、OpenPickerDialogButtonにフォーカスする', async () => {
    const renderResult = entitySelectRenderer({
      ...entitySelectRenderInitialProps,
      repositories: {
        ...emptyRepositories,
        // 組織を返さないとpickerDialogを表示できない
        fetchOrgRootTree
      }
    });
    // PickerDialogを開いておく
    await renderResult.waitDialogShown();
    // ClosePickerDialogButtonをクリック
    const closePickerDialogButton = within(
      await renderResult.getDialog()
    ).getByRole('button', {
      name: defaultLocales.closeButtonAlternativeTextLabel
    });
    userEvent.click(closePickerDialogButton);
    // Close状態になる
    expect(
      screen.queryByRole('dialog', {
        name: defaultLocales.pickerShowDialogButtonLabel
      })
    ).toBeNull();
    // OpenPickerDialogButtonにフォーカスする
    expect(renderResult.getOpenPickerDialogButton()).toHaveFocus();
  });
});
