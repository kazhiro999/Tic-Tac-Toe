import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { defaultLocales } from '../EntitySelectContext';
import { emptyRepositories } from '../modules/repositories';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from './entitySelectRenderer';
import { dummyUsers, fetchOrgRootTree, fetchOrgUsers } from './repositoryData';

describe('キーボードのフォーカス順序の確認', () => {
  let renderResult: ReturnType<typeof entitySelectRenderer>;

  beforeEach(() => {
    // orgUser0、orgUser1をSelectedEntityListに追加した状態にしておく
    renderResult = entitySelectRenderer({
      ...entitySelectRenderInitialProps,
      values: [dummyUsers.orgUser0, dummyUsers.orgUser1],
      repositories: {
        ...emptyRepositories,
        fetchOrgRootTree,
        fetchOrgUsers
      }
    });
  });

  test('PickerDialog外', async () => {
    // Tabキーを押すとSearchBoxにフォーカスする
    userEvent.tab();
    expect(await renderResult.getSearchBox()).toHaveFocus();

    // Tabキーを押すとSearchButtonにフォーカス
    userEvent.tab();
    expect(renderResult.getSearchButton()).toHaveFocus();

    // Tabキーを押すとOpenPickerDialogButtonにフォーカス
    userEvent.tab();
    expect(renderResult.getOpenPickerDialogButton()).toHaveFocus();

    // Tabキーを押すと、orgUser0のRemoveEntityButtonにフォーカス
    const removeEntityButtons = await renderResult.getRemoveEntityButtons();
    userEvent.tab();
    expect(removeEntityButtons[0]).toHaveFocus();
    expect(removeEntityButtons[0]).toHaveAccessibleDescription(
      dummyUsers.orgUser0.name
    );

    // Tabキーを押すとorgUser1のRemoveEntityButtonにフォーカス
    userEvent.tab();
    expect(removeEntityButtons[1]).toHaveFocus();
    expect(removeEntityButtons[1]).toHaveAccessibleDescription(
      dummyUsers.orgUser1.name
    );
  });

  test('PickerDialog内（DeirectoryNodeを選択しない場合）', async () => {
    // PickerDialogをOpen状態にしておく
    await renderResult.waitDialogShown();

    // Tabキーを押すとClosePickerDialogButtonにフォーカス
    userEvent.tab();
    expect(renderResult.getClosePickerDialogButton()).toHaveFocus();

    // Tabキーを押すとTab（組織）にフォーカス
    userEvent.tab();
    expect(renderResult.getOrganizationTab()).toHaveFocus();

    // Tabキーを押すと先頭のDirectoryNode（組織1）にフォーカス
    userEvent.tab();
    expect(await renderResult.getDirectoryNodeByName('組織1')).toHaveFocus();

    // Tabキーを押すとSelectAllEntityCheckboxにフォーカス
    userEvent.tab();
    expect(renderResult.getSelectAllEntityCheckbox()).toHaveFocus();

    // Tabキーを押すとCancelButtonにフォーカス
    userEvent.tab();
    expect(
      screen.getByRole('button', { name: defaultLocales.cancelButtonLabel })
    ).toHaveFocus();
  });

  test('PickerDialog内（DirectoryNodeを選択した場合）', async () => {
    // PickerDialogをOpen状態にしておく
    await renderResult.waitDialogShown();

    // Tabキーを押すとClosePickerDialogButtonにフォーカス
    userEvent.tab();
    expect(renderResult.getClosePickerDialogButton()).toHaveFocus();

    // Tabキーを押すとTab（組織）にフォーカス
    userEvent.tab();
    expect(renderResult.getOrganizationTab()).toHaveFocus();

    // Tabキーを押すと先頭のDirectoryNode（組織1）にフォーカス
    userEvent.tab();
    expect(await renderResult.getDirectoryNodeByName('組織1')).toHaveFocus();

    // Enterキーを押す
    await act(async () => {
      userEvent.keyboard('{enter}');
    });
    // Tabキーを押すとSelectAllEntityCheckboxにフォーカス
    userEvent.tab();
    expect(renderResult.getSelectAllEntityCheckbox()).toHaveFocus();

    // Tabキーを押すと先頭のBelongedEntity（組織1）にフォーカス
    userEvent.tab();
    expect(await renderResult.getBelongedEntityByName('組織1')).toHaveFocus();

    // Tabキーを押すとCancelButtonにフォーカス
    userEvent.tab();
    expect(
      screen.getByRole('button', { name: defaultLocales.cancelButtonLabel })
    ).toHaveFocus();
  });
});
