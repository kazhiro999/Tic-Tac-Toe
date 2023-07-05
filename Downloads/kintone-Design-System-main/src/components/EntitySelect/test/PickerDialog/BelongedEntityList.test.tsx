import { waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { defaultLocales } from '../../EntitySelectContext';
import { emptyRepositories } from '../../modules/repositories';
import {
  entitySelectRenderInitialProps,
  entitySelectRenderer
} from '../entitySelectRenderer';
import {
  fetchGroupList,
  fetchGroupUsers,
  fetchGroupUsersWithManyUsers,
  fetchOrgRootTree,
  fetchOrgUsers,
  fetchOrgUsersWithManyUsers
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

describe('BelongedEntityList', () => {
  let renderResult: ReturnType<typeof entitySelectRenderer>;

  describe('BelongedEntityListの表示確認', () => {
    const expectTabSelected = (tab: HTMLElement) => {
      expect(tab).toHaveAttribute('aria-selected', 'true');
    };

    test('organizationAvailable:true、userAvailable:trueのとき、組織タブ内のDirectoryNodeをクリックすると、対応する組織と組織に所属するユーザーが表示される', async () => {
      renderResult = renderEntitySelect({
        organizationAvailable: true,
        userAvailable: true
      });
      await renderResult.waitDialogShown();

      // 組織タブになっていることを確認
      expectTabSelected(renderResult.getOrganizationTab());
      // 「組織1」のDirectoryNodeをクリック
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      const selectDirectoryButton =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButton));
      // BelongedEntityListに、組織1と、組織に所属する3ユーザーが表示される
      const belongedEntities = Array.from(
        await renderResult.getBelongedEntities()
      );
      // 先頭に「組織1」
      expect(belongedEntities.shift()).toHaveTextContent('組織1');
      // 先頭を除くBelongedEntityは、組織に所属するユーザーが3件
      expect(belongedEntities).toHaveLength(3);
      expect(belongedEntities[0]).toHaveTextContent('組織に所属するユーザー0');
      expect(belongedEntities[1]).toHaveTextContent('組織に所属するユーザー1');
      expect(belongedEntities[2]).toHaveTextContent('組織に所属するユーザー2');
    });

    test('organizationAvailable:true、userAvailable:falseのとき、組織タブ内のDirectoryNodeをクリックすると、対応する組織が表示される', async () => {
      renderResult = renderEntitySelect({
        organizationAvailable: true,
        userAvailable: false
      });
      await renderResult.waitDialogShown();

      // 組織タブになっていることを確認
      expectTabSelected(renderResult.getOrganizationTab());
      // 組織1のDirectoryNodeをクリック
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      const selectDirectoryButton =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButton));
      // BelongedEntityListに、組織1のひとつのみ表示される
      const belongedEntityList = await renderResult.getBelongedEntities();
      expect(belongedEntityList).toHaveLength(1);
      expect(belongedEntityList[0]).toHaveTextContent('組織1');
    });

    test('GroupAvailable:true、userAvailable:trueのとき、グループタブ内の任意のDirectoryNodeをクリックすると、対応するグループとグループに所属するユーザーが表示される', async () => {
      renderResult = renderEntitySelect({
        groupAvailable: true,
        userAvailable: true
      });
      await renderResult.waitDialogShown();

      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // DirectoryNode（グループ1）をクリック
      const directoryNode = await renderResult.getDirectoryNodeByName(
        'グループ1'
      );
      const selectDirectoryButton =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButton));
      // BelongedEntityListに、グループ1と、グループに所属する3ユーザーが表示される
      const belongedEntities = Array.from(
        await renderResult.getBelongedEntities()
      );
      // 先頭に「グループ1」
      expect(belongedEntities.shift()).toHaveTextContent('グループ1');
      // 先頭を除くBelongedEntityは、グループに所属するユーザーが3件
      expect(belongedEntities).toHaveLength(3);
      expect(belongedEntities[0]).toHaveTextContent(
        'グループに所属するユーザー0'
      );
      expect(belongedEntities[1]).toHaveTextContent(
        'グループに所属するユーザー1'
      );
      expect(belongedEntities[2]).toHaveTextContent(
        'グループに所属するユーザー2'
      );
    });

    test('groupAvailable:true、userAvailable:falseのとき、グループタブ内の任意のDirectoryNodeをクリックすると、対応するグループが表示される', async () => {
      renderResult = renderEntitySelect({
        groupAvailable: true,
        userAvailable: false
      });
      await renderResult.waitDialogShown();

      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // DirectoryNode（グループ1）をクリック
      const directoryNode = await renderResult.getDirectoryNodeByName(
        'グループ1'
      );
      const selectDirectoryButton =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButton));
      // BelongedEntityListには、グループ1のひとつのみ表示される
      const belongedEntityList = await renderResult.getBelongedEntities();
      expect(belongedEntityList).toHaveLength(1);
      expect(belongedEntityList[0]).toHaveTextContent('グループ1');
    });

    test('BelongedEntityをホバーすると、EntityLabelが書かれたツールチップが表示される', async () => {
      renderResult = renderEntitySelect();
      await renderResult.waitDialogShown();
      // DirectoryNode（組織1）をクリック
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      const selectDirectoryButton =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButton));
      // BelongedEntityに、EntityLabelが書かれたツールチップ（title属性）が設定されている
      const belongedEntityList = await renderResult.getBelongedEntities();
      expect(within(belongedEntityList[0]).getByTitle('組織1')).toBeVisible();
      expect(
        within(belongedEntityList[1]).getByTitle('組織に所属するユーザー0')
      ).toBeVisible();
      expect(
        within(belongedEntityList[2]).getByTitle('組織に所属するユーザー1')
      ).toBeVisible();
      expect(
        within(belongedEntityList[3]).getByTitle('組織に所属するユーザー2')
      ).toBeVisible();
    });
  });

  describe('Active状態', () => {
    let belongedEntities: HTMLElement[];

    const expectBelongedEntityBeActive = async (targetNode: HTMLElement) => {
      // フォーカス且つtabindex属性が0であること
      expect(targetNode).toHaveFocus();
      expect(targetNode).toHaveAttribute('tabindex', '0');
      // 現在ActiveのBelongedEntity以外のノードは、フォーカスを受け取らない（tabindex属性が-1）
      const inactiveNodes = await (
        await renderResult.getBelongedEntities()
      ).filter((belongedEntity) => belongedEntity !== targetNode);
      inactiveNodes.forEach((inactiveNode) => {
        expect(inactiveNode).toHaveAttribute('tabindex', '-1');
      });
    };

    beforeEach(async () => {
      renderResult = renderEntitySelect();
      await renderResult.waitDialogShown();
      // DirectoryNodeをSelected状態にする
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      const selectDirectoryButton =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButton));
      belongedEntities = await renderResult.getBelongedEntities();
    });

    // ホバーするとActive状態になることはVRTで保証する
    // TODO: 以下のissueを実装したらホバーのテストを追加する
    // https://github.com/kintone-private/kintone-Design-System/issues/367

    test('上矢印を押すと、前のBelongedEntityがActive状態になる', async () => {
      // 2番目のBelongedEntityにフォーカスして上矢印を押す
      await act(async () => {
        belongedEntities[1].focus();
        userEvent.keyboard('{arrowup}');
      });
      // 先頭のBelongedEntityがActive状態になる
      expectBelongedEntityBeActive(belongedEntities[0]);
    });

    test('下矢印を押すと、次のBelongedEntityがActive状態になる', async () => {
      // 2番目のBelongedEntityにフォーカスして下矢印を押す
      await act(async () => {
        belongedEntities[1].focus();
        userEvent.keyboard('{arrowdown}');
      });
      // 3番目のBelongedEntityがActive状態になる
      expectBelongedEntityBeActive(belongedEntities[2]);
    });

    test('先頭のBelongedEntityがActive状態のときに上矢印を押すと、末尾のBelongedEntityがActive状態になる', async () => {
      // 先頭のBelongedEntityにフォーカスして上矢印を押す
      await act(async () => {
        belongedEntities[0].focus();
        userEvent.keyboard('{arrowup}');
      });
      // 末尾のBelongedEntityがActive状態になる
      expectBelongedEntityBeActive(
        belongedEntities[belongedEntities.length - 1]
      );
    });

    test('末尾のBelongedEntityがActive状態のときに下矢印を押すと、先頭のBelongedEntityがActive状態になる', async () => {
      // 末尾のBelongedEntityにフォーカスして下矢印を押す
      await act(async () => {
        belongedEntities[belongedEntities.length - 1].focus();
        userEvent.keyboard('{arrowdown}');
      });
      // 先頭のBelongedEntityがActive状態になる
      expectBelongedEntityBeActive(belongedEntities[0]);
    });
  });

  describe('Selected状態', () => {
    const expectBelongedEntitySelected = (belongedEntity: HTMLElement) => {
      expect(belongedEntity).toHaveAttribute('aria-selected', 'true');
    };

    const expectBelongedEntityUnselected = (belongedEntity: HTMLElement) => {
      expect(belongedEntity).toHaveAttribute('aria-selected', 'false');
    };

    describe('MultipleSelection:trueのとき', () => {
      let belongedEntities: HTMLElement[];
      beforeEach(async () => {
        renderResult = renderEntitySelect({ multipleSelection: true });
        await renderResult.waitDialogShown();
        // DirectoryNodeをSelected状態にする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織1'
        );
        const selectDirectoryButton =
          renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        belongedEntities = await renderResult.getBelongedEntities();
      });

      test('Unselected状態の場合、クリックするとSelected状態になる（複数選択可能）', async () => {
        // 最初は先頭のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[0]);
        // クリックするとSelected状態になる
        userEvent.click(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[0]);

        // 最初は、2番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[1]);
        // クリックするとSelected状態になる
        userEvent.click(belongedEntities[1]);
        expectBelongedEntitySelected(belongedEntities[1]);

        // 最初は3番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[2]);
        // クリックするとSelected状態になる
        userEvent.click(belongedEntities[2]);
        expectBelongedEntitySelected(belongedEntities[2]);
        // 先頭と2番目のBelongedEntityもSelected状態が維持されている（複数選択できている）
        expectBelongedEntitySelected(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[1]);
      });

      test('Unselected状態の場合、フォーカスしてEnterを押すとSelected状態になる（複数選択可能）', async () => {
        // 最初は先頭のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[0]);
        // フォーカスしてEnterを押すとSelected状態になる
        await act(async () => {
          belongedEntities[0].focus();
          userEvent.keyboard('{enter}');
        });
        expectBelongedEntitySelected(belongedEntities[0]);

        // 最初は、2番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[1]);
        // フォーカスしてEnterを押すとSelected状態になる
        await act(async () => {
          belongedEntities[1].focus();
          userEvent.keyboard('{enter}');
        });
        expectBelongedEntitySelected(belongedEntities[1]);

        // 最初は3番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[2]);
        // フォーカスしてEnterを押すとSelected状態になる
        await act(async () => {
          belongedEntities[2].focus();
          userEvent.keyboard('{enter}');
        });
        expectBelongedEntitySelected(belongedEntities[2]);
        // 先頭と2番目のBelongedEntityもSelected状態が維持されている（複数選択できている）
        expectBelongedEntitySelected(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[1]);
      });

      test('Unselected状態の場合、フォーカスしてSpaceを押すとSelected状態になる（複数選択可能）', async () => {
        // 最初は先頭のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[0]);
        // フォーカスしてSpaceを押すとSelected状態になる
        await act(async () => {
          belongedEntities[0].focus();
          userEvent.keyboard('{space}');
        });
        expectBelongedEntitySelected(belongedEntities[0]);

        // 最初は、2番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[1]);
        // フォーカスしてSpaceを押すとSelected状態になる
        await act(async () => {
          belongedEntities[1].focus();
          userEvent.keyboard('{space}');
        });
        expectBelongedEntitySelected(belongedEntities[1]);

        // 最初は3番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[2]);
        // フォーカスしてSpaceを押すとSelected状態になる
        await act(async () => {
          belongedEntities[2].focus();
          userEvent.keyboard('{space}');
        });
        expectBelongedEntitySelected(belongedEntities[2]);
        // 先頭と2番目のBelongedEntityもSelected状態が維持されている（複数選択できている）
        expectBelongedEntitySelected(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[1]);
      });

      test('Selected状態の場合、クリックするとUnselected状態になる', async () => {
        // 先頭のBelongedEntityをクリックするとSelected状態になる
        userEvent.click(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[0]);
        // 再度クリックするとUnselected状態になる
        userEvent.click(belongedEntities[0]);
        expectBelongedEntityUnselected(belongedEntities[0]);
      });

      test('Selected状態の場合、フォーカスしてEnterを押すとUnselected状態になる', async () => {
        // 先頭のBelongedEntityにフォーカスしてEnterを押すとSelected状態になる
        await act(async () => {
          belongedEntities[0].focus();
          userEvent.keyboard('{enter}');
        });
        expectBelongedEntitySelected(belongedEntities[0]);
        // 再度Enterを押すとUnselected状態になる
        await act(async () => {
          userEvent.keyboard('{enter}');
        });
        expectBelongedEntityUnselected(belongedEntities[0]);
      });

      test('Selected状態の場合、フォーカスしてSpaceを押すとUnselected状態になる', async () => {
        // 先頭のBelongedEntityにフォーカスしてSpaceを押すとSelected状態になる
        await act(async () => {
          belongedEntities[0].focus();
          userEvent.keyboard('{space}');
        });
        expectBelongedEntitySelected(belongedEntities[0]);
        // 再度Spaceを押すとUnselected状態になる
        await act(async () => {
          userEvent.keyboard('{space}');
        });
        expectBelongedEntityUnselected(belongedEntities[0]);
      });
    });

    describe('multipleSelection:falseのとき', () => {
      let belongedEntities: HTMLElement[];
      beforeEach(async () => {
        renderResult = renderEntitySelect({ multipleSelection: false });
        await renderResult.waitDialogShown();
        // DirectoryNodeをSelected状態にする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織1'
        );
        const selectDirectoryButton =
          renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        belongedEntities = await renderResult.getBelongedEntities();
      });

      test('Unselected状態の場合、クリックするとSelected状態になる（単一選択）', async () => {
        // 最初は、先頭のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[0]);
        // クリックするとSelected状態になる
        userEvent.click(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[0]);

        // 最初は、2番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[1]);
        // クリックするとSelected状態になる
        userEvent.click(belongedEntities[1]);
        expectBelongedEntitySelected(belongedEntities[1]);
        // 先頭のBelongedEntityはUnselected状態になる
        expectBelongedEntityUnselected(belongedEntities[0]);

        // 最初は、3番目のBelongedEntityはUnselected状態
        expectBelongedEntityUnselected(belongedEntities[2]);
        // クリックするとSelected状態になる
        userEvent.click(belongedEntities[2]);
        expectBelongedEntitySelected(belongedEntities[2]);
        // 先頭、2番目ともにUnselected状態
        expectBelongedEntityUnselected(belongedEntities[0]);
        expectBelongedEntityUnselected(belongedEntities[1]);
      });

      test('Selected状態のとき、クリックするとUnselected状態になる', async () => {
        // 先頭のBelongedEntityをクリックするとSelected状態になる
        userEvent.click(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[0]);
        // 再度クリックするとUnselected状態になる
        userEvent.click(belongedEntities[0]);
        expectBelongedEntityUnselected(belongedEntities[0]);
      });
    });

    describe('Selected状態の維持', () => {
      let belongedEntities: HTMLElement[];
      beforeEach(async () => {
        renderResult = renderEntitySelect();
        await renderResult.waitDialogShown();
        // 子ノードを持つDirectoryNodeをSelected状態にする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織2'
        );
        const selectDirectoryButton =
          renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
        belongedEntities = await renderResult.getBelongedEntities();
      });

      test('Selected状態にした後に、対応するDirectoryNodeをExpanded状態にしてもSelected状態が維持される', async () => {
        // 先頭のBelongedEntityをSelected状態にする
        userEvent.click(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[0]);
        // 対応するDirectoryNodeをExpanded状態にする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織2'
        );
        const collapseAndExpandChildNodeButton =
          renderResult.getCollapseAndExpandChildNodeButton(directoryNode);
        await act(async () =>
          userEvent.click(collapseAndExpandChildNodeButton)
        );
        // Selected状態が維持されている
        expectBelongedEntitySelected(belongedEntities[0]);
      });

      test('Selected状態にした後に、対応するDirectoryNodeをCollapse状態にしてもSelected状態が維持される', async () => {
        // Expanded状態にしておく
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織2'
        );
        const collapseAndExpandChildNodeButton =
          renderResult.getCollapseAndExpandChildNodeButton(directoryNode);
        await act(async () =>
          userEvent.click(collapseAndExpandChildNodeButton)
        );
        // 先頭のBelongedEntityをSelected状態にする
        userEvent.click(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[0]);
        // Collapse状態にする
        await act(async () =>
          userEvent.click(collapseAndExpandChildNodeButton)
        );
        // Selected状態が維持されている
        expectBelongedEntitySelected(belongedEntities[0]);
      });

      test('Selected状態で別タブに切り替えた後、再度元のタブに切り替えた場合、Selected状態が維持される', async () => {
        // 先頭のBelongedEntityをSelected状態にする
        userEvent.click(belongedEntities[0]);
        expectBelongedEntitySelected(belongedEntities[0]);
        // 別タブ（グループタブ）に切り替える
        await act(async () => userEvent.click(renderResult.getGroupTab()));
        // 元のタブ（組織タブ）に切り替える
        await act(async () =>
          userEvent.click(renderResult.getOrganizationTab())
        );
        // Selected状態が維持されている
        expectBelongedEntitySelected(belongedEntities[0]);
      });
    });
  });

  describe('ReadMoreButton', () => {
    // タイムアウトしてしまうため設定を更新
    // TODO: ビルド時間が長くなったり不安定になったりする可能性があるため、パフォーマンス改善タスクで検討する
    // https://github.com/kintone-private/kintone-Design-System/issues/1625
    jest.setTimeout(20000);

    const fetchOrgUsersFn = jest.fn();
    const fetchGroupUsersFn = jest.fn();

    const renderEntitySelectWithManyUsers = () => {
      return entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        repositories: {
          ...emptyRepositories,
          fetchOrgRootTree,
          fetchOrgUsers: (organizationId, offset) => {
            fetchOrgUsersFn(organizationId, offset);
            return fetchOrgUsersWithManyUsers(organizationId, offset);
          },
          fetchGroupList,
          fetchGroupUsers: (groupId, offset) => {
            fetchGroupUsersFn(groupId, offset);
            return fetchGroupUsersWithManyUsers(groupId, offset);
          }
        }
      });
    };

    describe('組織タブ', () => {
      const checkOnReadMoreButton = async (
        actionReadMoreButton: VoidFunction
      ) => {
        // 組織タブ表示直後にユーザー検索APIが実行される（組織2の0番目のユーザー以降を取得）
        await waitFor(async () =>
          expect(fetchOrgUsersFn).lastCalledWith('2', 0)
        );
        // 最初は、組織2、ユーザー100件、ReadMoreButtonあわせて102件表示されている
        const belongedEntities = await renderResult.getBelongedEntities();
        expect(belongedEntities).toHaveLength(102);
        expect(belongedEntities[101]).toEqual(
          await renderResult.getReadMoreButton()
        );

        // スクロールしてReadMoreButtonを表示させておく（そうしないとフォーカスのテストで失敗する）
        await act(async () => {
          belongedEntities[0].focus();
          userEvent.keyboard('{arrowup}');
        });
        // ReadMoreButtonを押す（クリック、Enter、Space）
        await actionReadMoreButton();
        // ユーザー検索APIが実行される（組織2の100番目以降のユーザーを取得）
        await waitFor(async () => {
          expect(fetchOrgUsersFn).toHaveBeenCalledTimes(2);
          expect(fetchOrgUsersFn).lastCalledWith('2', 100);
        });
        // 組織2、ユーザー110件あわせて111件表示される
        const newBelongedEntities = await renderResult.getBelongedEntities();
        expect(newBelongedEntities).toHaveLength(111);
        expect(newBelongedEntities[110]).not.toHaveTextContent(
          defaultLocales.readMoreButtonLabel
        );
        // 読み込んだ最初のユーザーである、102件目にフォーカスしている
        await waitFor(() => expect(newBelongedEntities[101]).toHaveFocus());
        expect(newBelongedEntities[101]).toHaveTextContent(
          '組織2に所属するユーザー100'
        );
      };

      beforeEach(async () => {
        fetchOrgUsersFn.mockReset();
        renderResult = renderEntitySelectWithManyUsers();
        await renderResult.waitDialogShown();
        // DirectoryNodeをSelected状態にする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          '組織2'
        );
        const selectDirectoryButton =
          renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
      });

      test('110ユーザーの場合、組織タブでReadMoreButtonをクリックすると、さらに+10ユーザー表示される', async () => {
        await checkOnReadMoreButton(async () => {
          await act(async () =>
            userEvent.click(await renderResult.getReadMoreButton())
          );
        });
      });

      test('110ユーザーの場合、組織タブのReadMoreButtonにフォーカスしてEnterを押すと、さらに+10ユーザー表示される', async () => {
        await checkOnReadMoreButton(async () => {
          await act(async () => {
            userEvent.keyboard('{enter}');
          });
        });
      });

      test('110ユーザーの場合、組織タブでReadMoreButtonにフォーカスしてSpaceを押すと、さらに+10ユーザー表示される', async () => {
        await checkOnReadMoreButton(async () => {
          await act(async () => {
            userEvent.keyboard('{space}');
          });
        });
      });
    });

    describe('グループタブ', () => {
      const checkOnReadMoreButtonBy = async (
        actionReadMoreButton: VoidFunction
      ) => {
        // グループタブ表示直後にユーザー検索APIが実行される（グループ2の0番目のユーザー以降を取得）
        await waitFor(async () =>
          expect(fetchGroupUsersFn).lastCalledWith('2', 0)
        );
        // 最初は、グループ2、ユーザー100件、ReadMoreButtonあわせて102件表示されている
        const belongedEntities = await renderResult.getBelongedEntities();
        expect(belongedEntities).toHaveLength(102);
        expect(belongedEntities[101]).toEqual(
          await renderResult.getReadMoreButton()
        );

        // スクロールしてReadMoreButtonを表示しておく（そうしないとフォーカスのテストで失敗する）
        await act(async () => {
          belongedEntities[0].focus();
          userEvent.keyboard('{arrowup}');
        });
        // ReadMoreButtonを押す（クリック、Enter、Space）
        await actionReadMoreButton();
        // ユーザー検索APIが実行される（グループ2の100番目以降のユーザーを取得）
        await waitFor(async () => {
          expect(fetchGroupUsersFn).toHaveBeenCalledTimes(2);
          expect(fetchGroupUsersFn).lastCalledWith('2', 100);
        });
        // グループ2、ユーザー110件あわせて111件表示される
        const newBelongedEntities = await renderResult.getBelongedEntities();
        expect(newBelongedEntities).toHaveLength(111);
        expect(newBelongedEntities[110]).not.toHaveTextContent(
          defaultLocales.readMoreButtonLabel
        );
        // 読み込まれた先頭のユーザーにフォーカスしている
        await waitFor(() => expect(newBelongedEntities[101]).toHaveFocus());
        expect(newBelongedEntities[101]).toHaveTextContent(
          'グループ2に所属するユーザー100'
        );
      };

      beforeEach(async () => {
        fetchGroupUsersFn.mockReset();
        renderResult = renderEntitySelectWithManyUsers();
        await renderResult.waitDialogShown();
        // グループタグに切り替える
        await act(async () => userEvent.click(renderResult.getGroupTab()));
        // DirectoryNode（グループ2）をSelected状態にする
        const directoryNode = await renderResult.getDirectoryNodeByName(
          'グループ2'
        );
        const selectDirectoryButton =
          renderResult.getSelectDirectoryButton(directoryNode);
        await act(async () => userEvent.click(selectDirectoryButton));
      });

      test('110ユーザーの場合、グループタブでReadMoreButtonをクリックすると、さらに+10ユーザー表示される', async () => {
        await checkOnReadMoreButtonBy(async () => {
          await act(async () =>
            userEvent.click(await renderResult.getReadMoreButton())
          );
        });
      });

      test('110ユーザーの場合、グループタブのReadMoreButtonにフォーカスしてEnterを押すと、さらに+10ユーザー表示される', async () => {
        await checkOnReadMoreButtonBy(async () => {
          await act(async () => {
            userEvent.keyboard('{enter}');
          });
        });
      });

      test('110ユーザーの場合、グループタブでReadMoreButtonにフォーカスしてSpaceを押すと、さらに+10ユーザー表示される', async () => {
        await checkOnReadMoreButtonBy(async () => {
          await act(async () => {
            userEvent.keyboard('{space}');
          });
        });
      });
    });
  });
});
