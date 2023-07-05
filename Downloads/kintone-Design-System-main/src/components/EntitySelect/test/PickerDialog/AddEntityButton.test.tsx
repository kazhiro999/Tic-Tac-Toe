import { emptyRepositories } from '../../modules/repositories';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from '../entitySelectRenderer';
import {
  dummyUsers,
  fetchGroupList,
  fetchGroupUsers,
  fetchOrgRootTree,
  fetchOrgUsers
} from '../repositoryData';
import {
  EntitySelectValue,
  ENTITY_SELECT_OTHER_TYPE
} from '../../modules/types';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { defaultLocales } from '../../EntitySelectContext';
import { getAppCreator } from '../../../../functions/entity';

const changeValues = jest.fn<void, [EntitySelectValue[]]>();

const renderEntitySelect = (
  props: Pick<
    typeof entitySelectRenderInitialProps,
    'multipleSelection' | 'values' | 'changeValues'
  > = {
    multipleSelection: true,
    values: [],
    changeValues: jest.fn<void, [EntitySelectValue[]]>()
  }
) => {
  return entitySelectRenderer({
    ...entitySelectRenderInitialProps,
    ...props,
    otherTypes: [ENTITY_SELECT_OTHER_TYPE.APP_CREATOR],
    repositories: {
      ...emptyRepositories,
      fetchOrgRootTree,
      fetchOrgUsers,
      fetchGroupList,
      fetchGroupUsers
    }
  });
};

describe('AddEntityButton', () => {
  let renderResult: ReturnType<typeof entitySelectRenderer>;

  describe('表示', () => {
    test('最初はDisabled状態になっている', async () => {
      renderResult = renderEntitySelect();
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();
      // Disabled状態になっている
      const addEntityButton = renderResult.getAddEntityButton();
      expect(addEntityButton).toBeDisabled();
    });

    describe('MultipleSelection:trueのとき', () => {
      let addEntityButton: HTMLElement;
      let belongedEntities: HTMLElement[];

      beforeEach(async () => {
        renderResult = renderEntitySelect();
        // PickerDialogをOpen状態にしておく
        await renderResult.waitDialogShown();
        // 組織1のDirectoryNodeをクリック
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織1'
        );
        const selectDirectoryButton =
          await renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        addEntityButton = renderResult.getAddEntityButton();
        belongedEntities = await renderResult.getBelongedEntities();
      });

      test('BelongedEntityをSelected状態にすると、Selected状態の件数が表示される', async () => {
        // 1つSelected状態にすると、「追加（1）」と表示される
        userEvent.click(belongedEntities[0]);
        expect(addEntityButton).toHaveTextContent('追加（1）');

        // 2つSelected状態にすると、「追加（2）」と表示される
        userEvent.click(belongedEntities[1]);
        expect(addEntityButton).toHaveTextContent('追加（2）');

        // 3つSelected状態にすると、「追加（3）」と表示される
        userEvent.click(belongedEntities[2]);
        expect(addEntityButton).toHaveTextContent('追加（3）');
      });

      test('BelongedEntityをUnselected状態にすると、表示されている件数が減少し、すべてUnselected状態にするとDisabled状態になる', async () => {
        // 3つSelected状態にすると「追加（3）」と表示される
        userEvent.click(belongedEntities[0]);
        userEvent.click(belongedEntities[1]);
        userEvent.click(belongedEntities[2]);
        expect(addEntityButton).toHaveTextContent('追加（3）');

        // 1つUnselected状態にすると「追加（2）」と表示される
        userEvent.click(belongedEntities[0]);
        expect(addEntityButton).toHaveTextContent('追加（2）');

        // 2つUnselected状態にすると「追加（1）」と表示される
        userEvent.click(belongedEntities[1]);
        expect(addEntityButton).toHaveTextContent('追加（1）');

        // 3つUnselected状態にするとDisabled状態になり、「追加」と表示される
        userEvent.click(belongedEntities[2]);
        expect(addEntityButton).toBeDisabled();
        expect(addEntityButton).toHaveTextContent('追加');
      });

      test('SelectAllEntityCheckboxをクリックしてChecked状態にすると、件数が表示され、Unchecked状態にするとDisalbed状態になる', async () => {
        // クリックしてChecked状態にする
        userEvent.click(renderResult.getSelectAllEntityCheckbox());
        // 4つあるすべてがSelected状態になるため、「追加（4）」と表示される
        expect(addEntityButton).toHaveTextContent('追加（4）');

        // クリックしてUnchecked状態にする
        userEvent.click(renderResult.getSelectAllEntityCheckbox());
        // Disabled状態になり、「追加」と表示される
        expect(addEntityButton).toBeDisabled();
        expect(addEntityButton).toHaveTextContent('追加');
      });

      test('組織をまたいでSelected状態にした場合、すべての組織の合計の件数が表示される', async () => {
        // 組織1のDirectoryNodeがSelected状態になっている
        // 先頭のBelongedEntityをクリック
        userEvent.click(belongedEntities[0]);
        // 組織2のDirectoryNodeをクリックする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織2'
        );
        const selectDirectoryButton =
          await renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        // 先頭と2番目のBelongedEntityをクリック
        const newBelongedEntities = await renderResult.getBelongedEntities();
        userEvent.click(newBelongedEntities[0]);
        userEvent.click(newBelongedEntities[1]);

        // 組織1で1件、組織2で2件のため、「追加（3）」と表示される
        expect(addEntityButton).toHaveTextContent('追加（3）');
      });

      test('タブをまたいでSelected状態にした場合、すべてのタブのSelected状態の件数が表示される', async () => {
        // 組織1の先頭のBelongedEntityをクリック
        userEvent.click(belongedEntities[0]);
        // グループタブに切り替える
        await act(async () => userEvent.click(renderResult.getGroupTab()));
        // グループ1のDirectoryNodeをクリック
        const directoryNode = await renderResult.getDirectoryNodeByName(
          'グループ1'
        );
        const selectDirectoryButton =
          await renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        // 先頭と2番目のBelongedEntityをクリック
        const newBelongedEntities = await renderResult.getBelongedEntities();
        userEvent.click(newBelongedEntities[0]);
        userEvent.click(newBelongedEntities[1]);

        // 組織1で1件、グループ1で2件のため、「追加（3）」と表示される
        expect(addEntityButton).toHaveTextContent('追加（3）');
      });
    });

    describe('multipleSelection:falseのとき', () => {
      let addEntityButton: HTMLElement;
      let belongedEntities: HTMLElement[];

      beforeEach(async () => {
        renderResult = renderEntitySelect({
          multipleSelection: false,
          values: [],
          changeValues
        });
        // PickerDialogをOpen状態にしておく
        await renderResult.waitDialogShown();
        // 組織1のDirectoryNodeをクリック
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織1'
        );
        const selectDirectoryButton =
          await renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        addEntityButton = renderResult.getAddEntityButton();
        belongedEntities = await renderResult.getBelongedEntities();
      });

      test('複数回BelongedEntityをSelected状態にしても、件数は1になっている', async () => {
        // 先頭から3つBelongedEntityをクリック
        userEvent.click(belongedEntities[0]);
        userEvent.click(belongedEntities[1]);
        userEvent.click(belongedEntities[2]);
        // ひとつしか選択できないため、「追加（1）」と表示されている
        expect(addEntityButton).toHaveTextContent('追加（1）');
      });

      test('BelongedEntityをUnselected状態にすると、Disabled状態になる', async () => {
        // 先頭のBelongedEntityをクリック
        userEvent.click(belongedEntities[0]);
        // 「追加（1）」と表示される
        expect(addEntityButton).toHaveTextContent('追加（1）');

        // 再度先頭のBelongedEntityをクリック
        userEvent.click(belongedEntities[0]);
        // Disabled状態になり、「追加」と表示される
        expect(addEntityButton).toBeDisabled();
        expect(addEntityButton).toHaveTextContent('追加');
      });

      test('組織をまたいでSelected状態にした場合でも、件数は1になっている', async () => {
        // 組織1の先頭のBelongedEntityをクリック
        userEvent.click(belongedEntities[0]);
        // 組織2のDirectoryNodeをクリックする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織2'
        );
        const selectDirectoryButton =
          await renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        // 先頭と2番目のBelongedEntityをクリック
        const newBelongedEntities = await renderResult.getBelongedEntities();
        userEvent.click(newBelongedEntities[0]);
        userEvent.click(newBelongedEntities[1]);

        // 単一選択のため、「追加（1）」と表示される
        expect(addEntityButton).toHaveTextContent('追加（1）');
      });

      test('タブをまたいでSelected状態にした場合でも、件数は1になっている', async () => {
        // 組織1の先頭のBelongedEntityをクリック
        userEvent.click(belongedEntities[0]);
        // グループタブに切り替える
        await act(async () => userEvent.click(renderResult.getGroupTab()));
        // グループ1のDirectoryNodeをクリックする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          'グループ1'
        );
        const selectDirectoryButton =
          await renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        // 先頭と2番目のBelongedEntityをクリック
        const newBelongedEntities = await renderResult.getBelongedEntities();
        userEvent.click(newBelongedEntities[0]);
        userEvent.click(newBelongedEntities[1]);

        // 単一選択のため、「追加（1）」と表示される
        expect(addEntityButton).toHaveTextContent('追加（1）');
      });
    });
  });

  describe('SelectedEntityListへの追加', () => {
    const clickBelongedEntities = async (
      directoryLabel: string,
      ...entityLabels: string[]
    ) => {
      // 指定のDirectoryNodeをクリック
      const directoryNode = await renderResult.getDirectoryNodeByName(
        directoryLabel
      );
      const selectDirectoryButton = await renderResult.getSelectDirectoryButton(
        directoryNode
      );
      await act(async () => userEvent.click(selectDirectoryButton));
      // 指定のBelongedEntityをクリック
      for (const entityLabel of entityLabels) {
        userEvent.click(
          await renderResult.getBelongedEntityByName(entityLabel)
        );
      }
    };

    beforeEach(async () => {
      changeValues.mockReset();
      renderResult = renderEntitySelect({
        changeValues,
        // SelectedEntityListの末尾に追加されることを確認するため、初期データとして、orgUser０とgroupUser0を指定しておく
        values: [dummyUsers.orgUser0, dummyUsers.groupUser0]
      });
      // PickerDialogをOpen状態にしておく
      await renderResult.waitDialogShown();
    });

    test('クリックすると、PickerDialogがClose状態になり、OpenPickerDialogButtonにフォーカスする', async () => {
      // 組織1のDirectoryNodeをクリックする
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      const selectDirectoryButton = await renderResult.getSelectDirectoryButton(
        directoryNode
      );
      await act(async () => userEvent.click(selectDirectoryButton));
      // BelongedEntity「組織1」をクリックする
      userEvent.click(await renderResult.getBelongedEntityByName('組織1'));
      // AddEntityButtonをクリック
      userEvent.click(renderResult.getAddEntityButton());

      // PickerDialogがClose状態になっている
      expect(
        screen.queryByRole('dialog', {
          name: defaultLocales.pickerShowDialogButtonLabel
        })
      ).toBeNull();
      // OpenPickerDialogButtonにフォーカスする
      expect(renderResult.getOpenPickerDialogButton()).toHaveFocus();
    });

    test('組織をSelected状態にした後、AddEntityButtonをクリックすると、Selected状態の組織がSelectedEntityListの末尾に追加される', async () => {
      // 組織1のDirectoryNodeをクリック
      // orgUser1、orgUser2をクリック
      await clickBelongedEntities(
        '組織1',
        dummyUsers.orgUser1.name,
        dummyUsers.orgUser2.name
      );
      // AddEntityButtonをクリックしていないのでChangeValuesは呼ばれていない
      expect(changeValues).not.toHaveBeenCalled();
      // AddEntityButtonをクリック
      userEvent.click(renderResult.getAddEntityButton());

      // SelectedEntityListの末尾に追加される
      // ＝changeValuesの値の末尾に追加されている
      expect(changeValues).toHaveBeenCalled();
      expect(changeValues).lastCalledWith([
        // 下記はもともと追加されていたユーザー
        dummyUsers.orgUser0,
        dummyUsers.groupUser0,
        // 下記は今回追加したユーザー
        dummyUsers.orgUser1,
        dummyUsers.orgUser2
      ]);
    });

    test('グループをSelected状態にした後、AddEntityButtonをクリックすると、Selected状態のグループがSelectedEntityListの末尾に追加される', async () => {
      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // グループ1のDirectoryNodeをクリック
      // groupUser1、groupUser2をクリック
      await clickBelongedEntities(
        'グループ1',
        dummyUsers.groupUser1.name,
        dummyUsers.groupUser2.name
      );
      // AddEntityButtonをクリックしていないのでChangeValuesは呼ばれていない
      expect(changeValues).not.toHaveBeenCalled();
      // AddEntityButtonをクリック
      userEvent.click(renderResult.getAddEntityButton());

      // SelectedEntityListの末尾に追加される
      // ＝changeValuesの値の末尾に追加されている
      expect(changeValues).toHaveBeenCalled();
      expect(changeValues).lastCalledWith([
        // 下記はもともと追加されていたユーザー
        dummyUsers.orgUser0,
        dummyUsers.groupUser0,
        // 下記は今回追加したユーザー
        dummyUsers.groupUser1,
        dummyUsers.groupUser2
      ]);
    });

    test('その他のアイテムをSelected状態にした後、AddEntityButtonをクリックすると、Selected状態のその他のアイテムがSelectedEntityListの末尾に追加される', async () => {
      // その他タブに切り替える
      await act(async () => userEvent.click(renderResult.getOtherTab()));
      // アプリ作成者をクリック
      await clickBelongedEntities(
        defaultLocales.creatorNameLabel,
        defaultLocales.creatorNameLabel
      );
      // AddEntityButtonをクリックしていないのでChangeValuesは呼ばれていない
      expect(changeValues).not.toHaveBeenCalled();
      // AddEntityButtonをクリック
      userEvent.click(renderResult.getAddEntityButton());

      // SelectedEntityListの末尾に追加される
      // ＝changeValuesの値の末尾に追加されている
      expect(changeValues).toHaveBeenCalled();
      expect(changeValues).lastCalledWith([
        // 下記はもともと追加されていたユーザー
        dummyUsers.orgUser0,
        dummyUsers.groupUser0,
        // 下記は今回追加したユーザー
        getAppCreator(defaultLocales.creatorNameLabel)
      ]);
    });

    test('組織、グループ、その他のEntityをSelected状態にした後、AddEntityButtonをクリックすると、Selected状態の複数のEntityがSelectedEntityListの末尾に追加される', async () => {
      // 組織1のDirectoryNodeをクリック
      // orgUser2をクリック
      await clickBelongedEntities('組織1', dummyUsers.orgUser2.name);
      // その他タブに切り替える
      await act(async () => userEvent.click(renderResult.getOtherTab()));
      // アプリ作成者をクリック
      await clickBelongedEntities(
        defaultLocales.creatorNameLabel,
        defaultLocales.creatorNameLabel
      );
      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // グループ1のDirectoryNodeをクリック
      // groupUser2をクリック
      await clickBelongedEntities('グループ1', dummyUsers.groupUser2.name);
      // AddEntityButtonをクリックしていないのでChangeValuesは呼ばれていない
      expect(changeValues).not.toHaveBeenCalled();
      // AddEntityButtonをクリック
      userEvent.click(renderResult.getAddEntityButton());

      // SelectedEntityListの末尾に追加される
      // ＝changeValuesの値の末尾に追加されている
      expect(changeValues).toHaveBeenCalled();
      expect(changeValues).lastCalledWith([
        // 下記はもともと追加されていたユーザー
        dummyUsers.orgUser0,
        dummyUsers.groupUser0,
        // 下記は今回追加したユーザー
        dummyUsers.orgUser2,
        getAppCreator(defaultLocales.creatorNameLabel),
        dummyUsers.groupUser2
      ]);
    });

    test('すでにSelectedEntityListに追加済みの場合は、重複して追加されない', async () => {
      // 組織1のDirectoryNodeをクリックして、orgUser0とorgUser1をクリック
      await clickBelongedEntities(
        '組織1',
        dummyUsers.orgUser0.name,
        dummyUsers.orgUser1.name
      );
      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // グループ1のDirectoryNodeをクリックして、groupUser0、groupUser1をクリック
      await clickBelongedEntities(
        'グループ1',
        dummyUsers.groupUser0.name,
        dummyUsers.groupUser1.name
      );
      // AddEntityButtonをクリックしていないのでChangeValuesは呼ばれていない
      expect(changeValues).not.toHaveBeenCalled();
      // AddEntityButtonをクリック
      userEvent.click(renderResult.getAddEntityButton());

      // 重複することなく、SelectedEntityListの末尾に追加される
      // ＝changeValuesの値の末尾に追加されている
      expect(changeValues).toHaveBeenCalled();
      expect(changeValues).lastCalledWith([
        // 下記はもともと追加されていたユーザー
        dummyUsers.orgUser0,
        dummyUsers.groupUser0,
        // 下記は今回追加したユーザー
        // orgUser0、groupUser0は重複して追加されない
        dummyUsers.orgUser1,
        dummyUsers.groupUser1
      ]);
    });
  });
});
