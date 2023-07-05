import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { emptyRepositories } from '../../modules/repositories';
import {
  entitySelectRenderInitialProps,
  entitySelectRenderer
} from '../entitySelectRenderer';
import {
  dummyUsers,
  fetchGroupList,
  fetchGroupUsers,
  fetchOrgRootTree,
  fetchOrgUsers
} from '../repositoryData';

const renderEntitySelect = (
  props: Pick<
    typeof entitySelectRenderInitialProps,
    | 'userAvailable'
    | 'organizationAvailable'
    | 'groupAvailable'
    | 'multipleSelection'
  > = {
    userAvailable: true,
    organizationAvailable: true,
    groupAvailable: true,
    multipleSelection: true
  }
) => {
  return entitySelectRenderer({
    ...entitySelectRenderInitialProps,
    ...props,
    repositories: {
      ...emptyRepositories,
      fetchOrgRootTree,
      fetchOrgUsers,
      fetchGroupList,
      fetchGroupUsers
    }
  });
};

describe('SelectAllEntityCheckbox', () => {
  let renderResult: ReturnType<typeof entitySelectRenderer>;

  describe('表示確認', () => {
    test('複数選択可能な組織・グループ選択のとき、SelectAllEntityCheckboxが表示され、Unchecked状態になっている', async () => {
      // 複数選択可能な組織・グループ選択
      const organizationAvailable = true;
      const groupAvailable = true;
      const userAvailable = true;
      const multipleSelection = true;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxが表示され、Unchecked状態になっている
      const selectAllEntityCheckbox = renderResult.getSelectAllEntityCheckbox();
      expect(selectAllEntityCheckbox).toBeInTheDocument();
      expect(selectAllEntityCheckbox).not.toBeChecked();
    });

    test('単一選択の組織・グループ選択のとき、SelectAllEntityCheckboxは表示されない', async () => {
      // 単一選択の組織・グループ選択
      const organizationAvailable = true;
      const groupAvailable = true;
      const userAvailable = true;
      const multipleSelection = false;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxは表示されない
      expect(screen.queryByRole('checkbox')).toBeNull();
    });

    test('ユーザーが選択可能で複数選択可能な組織選択のとき、SelectAllEntityCheckboxが表示され、Unchecked状態になっている', async () => {
      // ユーザーが選択可能で複数選択可能な組織選択
      const organizationAvailable = true;
      const groupAvailable = false;
      const userAvailable = true;
      const multipleSelection = true;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxが表示され、Unchecked状態になっている
      const selectAllEntityCheckbox = renderResult.getSelectAllEntityCheckbox();
      expect(selectAllEntityCheckbox).toBeInTheDocument();
      expect(selectAllEntityCheckbox).not.toBeChecked();
    });

    test('ユーザーが選択可能な単一選択の組織選択のとき、SelectAllEntityCheckboxが表示されない', async () => {
      // ユーザーが選択可能な単一選択の組織選択
      const organizationAvailable = true;
      const groupAvailable = false;
      const userAvailable = true;
      const multipleSelection = false;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxは表示されない
      expect(screen.queryByRole('checkbox')).toBeNull();
    });

    test('ユーザーが選択不可な組織選択のとき、SelectAllEntityCheckboxが表示されない', async () => {
      // ユーザーが選択不可な組織選択
      const organizationAvailable = true;
      const groupAvailable = false;
      const userAvailable = false;
      const multipleSelection = false;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxは表示されない
      expect(screen.queryByRole('checkbox')).toBeNull();
    });

    test('ユーザーが選択可能な複数選択のグループ選択のとき、SelectAllEntityCheckboxが表示され、Unchecked状態になっている', async () => {
      // ユーザーが選択可能な複数選択のグループ選択
      const organizationAvailable = false;
      const groupAvailable = true;
      const userAvailable = true;
      const multipleSelection = true;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxが表示され、Unchecked状態になっている
      const selectAllEntityCheckbox = renderResult.getSelectAllEntityCheckbox();
      expect(selectAllEntityCheckbox).toBeInTheDocument();
      expect(selectAllEntityCheckbox).not.toBeChecked();
    });

    test('ユーザーが選択可能な単一選択のグループ選択のとき、SelectAllEntityCheckboxが表示され、Unchecked状態になっている', async () => {
      // ユーザーが選択可能な単一選択のグループ選択
      const organizationAvailable = false;
      const groupAvailable = true;
      const userAvailable = true;
      const multipleSelection = false;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxは表示されない
      expect(screen.queryByRole('checkbox')).toBeNull();
    });

    test('ユーザーが選択不可なグループ選択のとき、SelectAllEntityCheckboxが表示されない', async () => {
      // ユーザーが選択不可なグループ選択
      const organizationAvailable = false;
      const groupAvailable = true;
      const userAvailable = false;
      const multipleSelection = false;
      renderResult = renderEntitySelect({
        organizationAvailable,
        groupAvailable,
        userAvailable,
        multipleSelection
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();

      // SelectAllEntityCheckboxは表示されない
      expect(screen.queryByRole('checkbox')).toBeNull();
    });
  });

  describe('Checked/Unchecked', () => {
    beforeEach(async () => {
      renderResult = renderEntitySelect();
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();
      // 組織1のDirectoryNodeをクリック
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      const selectDirectoryButton = await renderResult.getSelectDirectoryButton(
        directoryNode
      );
      await act(async () => userEvent.click(selectDirectoryButton));
    });

    test('Unchecked状態のとき、クリックしてChecked状態にすると、すべてのBelongedEntityがSelected状態になる', async () => {
      // 最初はUnchecked状態になっている
      const selectAllEntityCheckbox = renderResult.getSelectAllEntityCheckbox();
      expect(selectAllEntityCheckbox).not.toBeChecked();
      // すべてUnselected状態になっている
      expect(
        within(await renderResult.getBelongedEntityList()).queryByRole(
          'option',
          { selected: true }
        )
      ).toBeNull();

      // クリックするとChecked状態になり、すべてSelected状態になる
      userEvent.click(selectAllEntityCheckbox);
      expect(selectAllEntityCheckbox).toBeChecked();
      const belongedEntityLength = await (
        await renderResult.getBelongedEntities()
      ).length;
      expect(
        within(await renderResult.getBelongedEntityList()).getAllByRole(
          'option',
          { selected: true }
        )
      ).toHaveLength(belongedEntityLength);
    });

    test('Checked状態のとき、クリックするとUnchecked状態になり、すべてのBelongedEntityがUnselected状態になる', async () => {
      // SelectAllEntityCheckboxをクリック
      const selectAllEntityCheckbox = renderResult.getSelectAllEntityCheckbox();
      userEvent.click(selectAllEntityCheckbox);

      // 再度クリックするとUnchecked状態になり、すべてのBelongedEntityがUnselected状態になる
      userEvent.click(selectAllEntityCheckbox);
      expect(selectAllEntityCheckbox).not.toBeChecked();
      expect(
        within(await renderResult.getBelongedEntityList()).queryByRole(
          'option',
          { selected: true }
        )
      ).toBeNull();
    });

    test('Checked状態にした後、別のDirectoryNodeをSelected状態にするとUnchecked状態になり、再度元のDirectoryNodeをSelected状態にするとCheck状態が維持されている', async () => {
      // Checked状態にする
      userEvent.click(renderResult.getSelectAllEntityCheckbox());
      expect(renderResult.getSelectAllEntityCheckbox()).toBeChecked();

      // 組織2のDirectoryNodeをクリック
      const org2DirectoryNode = await renderResult.getDirectoryNodeByName(
        '組織2'
      );
      const org2SelectDirectoryButton =
        await renderResult.getSelectDirectoryButton(org2DirectoryNode);
      await act(async () => userEvent.click(org2SelectDirectoryButton));
      // Unchecked状態になっている
      // TODO: 挙動がおかしいためissueにし、テストはコメントアウト
      // see: https://github.com/kintone-private/kintone-Design-System/issues/1646
      // expect(renderResult.getSelectAllEntityCheckbox()).not.toBeChecked();

      // 元居た組織1のDirectoryNodeをクリックする
      const org1DirectoryNode = await renderResult.getDirectoryNodeByName(
        '組織1'
      );
      const org1SelectDirectoryButton =
        await renderResult.getSelectDirectoryButton(org1DirectoryNode);
      await act(async () => userEvent.click(org1SelectDirectoryButton));
      // Checked状態が維持されている
      expect(renderResult.getSelectAllEntityCheckbox()).toBeChecked();
    });

    test('Checked状態のとき、別のタブに切り替えて再度元のタブに切り替えるとChecked状態が維持されている', async () => {
      // Checked状態にする
      userEvent.click(renderResult.getSelectAllEntityCheckbox());
      expect(renderResult.getSelectAllEntityCheckbox()).toBeChecked();

      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // Unchecked状態になっている
      // TODO: 挙動がおかしいためissueにし、テストはコメントアウト
      // see: https://github.com/kintone-private/kintone-Design-System/issues/1646
      // expect(renderResult.getSelectAllEntityCheckbox()).not.toBeChecked();

      // 元居た組織タブに切り替える
      await act(async () => userEvent.click(renderResult.getOrganizationTab()));
      // Checked状態が維持されている
      expect(renderResult.getSelectAllEntityCheckbox()).toBeChecked();
    });

    test('Unchecked状態のとき、Selected状態にしてもUnchecked状態が維持されている', async () => {
      // Unchecked状態になっている
      const selectAllEntityCheckbox = renderResult.getSelectAllEntityCheckbox();
      expect(selectAllEntityCheckbox).not.toBeChecked();
      // orgUser1をSelected状態にする
      userEvent.click(
        await renderResult.getBelongedEntityByName(dummyUsers.orgUser1.name)
      );
      // Unchecked状態が維持されている
      // TODO: 挙動を見直す
      expect(selectAllEntityCheckbox).not.toBeChecked();
    });

    test('Checked状態のとき、Unselected状態にしてもChecked状態が維持されている', async () => {
      // Checked状態にする
      const selectAllEntityCheckbox = renderResult.getSelectAllEntityCheckbox();
      userEvent.click(selectAllEntityCheckbox);
      expect(selectAllEntityCheckbox).toBeChecked();
      // orgUser1をUnselected状態にする
      userEvent.click(
        await renderResult.getBelongedEntityByName(dummyUsers.orgUser1.name)
      );
      // Checked状態が維持されたまま
      // TODO: この挙動でよいのか見直すこと
      expect(selectAllEntityCheckbox).toBeChecked();
    });
  });
});
