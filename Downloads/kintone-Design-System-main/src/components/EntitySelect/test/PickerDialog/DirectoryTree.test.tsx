import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { emptyRepositories } from '../../modules/repositories';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from '../entitySelectRenderer';
import {
  fetchGroupList,
  fetchGroupUsers,
  fetchOrgRootTree,
  fetchOrgUsers
} from '../repositoryData';

const fetchOrgUsersFn = jest.fn();
const fetchGroupUsersFn = jest.fn();

const renderEntitySelect = (
  props: Pick<
    typeof entitySelectRenderInitialProps,
    'userAvailable' | 'organizationAvailable' | 'groupAvailable'
  > = { userAvailable: true, organizationAvailable: true, groupAvailable: true }
) => {
  return entitySelectRenderer({
    ...entitySelectRenderInitialProps,
    ...props,
    repositories: {
      ...emptyRepositories,
      fetchOrgRootTree,
      fetchOrgUsers: (organizationId, offset) => {
        fetchOrgUsersFn(organizationId, offset);
        return fetchOrgUsers(organizationId, offset);
      },
      fetchGroupList,
      fetchGroupUsers: (groupId, offset) => {
        fetchGroupUsersFn(groupId, offset);
        return fetchGroupUsers(groupId, offset);
      }
    }
  });
};

describe('DirectoryTree', () => {
  let renderResult: ReturnType<typeof entitySelectRenderer>;

  const getParentNode = async () => {
    const node = await renderResult.getDirectoryNodeByName('組織2');
    return node;
  };

  const getChildNodes = async () => {
    const nodes = within(await getParentNode()).getAllByRole('treeitem');
    return nodes;
  };

  const expectTabSelected = (tab: HTMLElement) => {
    expect(tab).toHaveAttribute('aria-selected', 'true');
  };

  const expectDirectoryNodeExpanded = (node: HTMLElement) => {
    expect(node).toHaveAttribute('aria-expanded', 'true');
  };

  const expectDirectoryNodeCollapse = (node: HTMLElement) => {
    expect(node).toHaveAttribute('aria-expanded', 'false');
  };

  describe('DirectoryTreeの表示確認', () => {
    beforeEach(async () => {
      renderResult = renderEntitySelect();
      await renderResult.waitDialogShown();
    });

    test('組織タブの場合、DirectoryTreeに組織が表示される', async () => {
      // 組織1、組織2、組織3の3つ表示される
      expect(await renderResult.getDirectoryNodes()).toHaveLength(3);
      expect(await renderResult.getDirectoryNodeByName('組織1')).toBeVisible();
      expect(await renderResult.getDirectoryNodeByName('組織2')).toBeVisible();
      expect(await renderResult.getDirectoryNodeByName('組織3')).toBeVisible();
    });

    test('グループタブの場合、DirectoryTreeにグループが表示される', async () => {
      // グループタブに切り替える
      await act(async () => userEvent.click(await renderResult.getGroupTab()));
      // グループ1、グループ2、グループ3の3つ表示される
      expect(await renderResult.getDirectoryNodes()).toHaveLength(3);
      expect(
        await renderResult.getDirectoryNodeByName('グループ1')
      ).toBeVisible();
      expect(
        await renderResult.getDirectoryNodeByName('グループ2')
      ).toBeVisible();
      expect(
        await renderResult.getDirectoryNodeByName('グループ3')
      ).toBeVisible();
    });

    test('DirectoryNodeをホバーするとDirectoryLabelが書かれたツールチップが表示される', async () => {
      // title属性で、組織1、組織2、組織3という値が指定されている
      const node1 = await renderResult.getDirectoryNodeByName('組織1');
      const node2 = await renderResult.getDirectoryNodeByName('組織2');
      const node3 = await renderResult.getDirectoryNodeByName('組織3');
      expect(within(node1).getByTitle('組織1')).toBeVisible();
      expect(within(node2).getByTitle('組織2')).toBeVisible();
      expect(within(node3).getByTitle('組織3')).toBeVisible();
    });
  });

  describe('DirectoryNodeの開閉', () => {
    let parentNode: HTMLElement;

    beforeEach(async () => {
      renderResult = renderEntitySelect();
      await renderResult.waitDialogShown();
      parentNode = await getParentNode();
    });

    test('Open直後はCollapse状態になっている', async () => {
      expectDirectoryNodeCollapse(await getParentNode());
    });

    test('Collapse状態のとき、クリックするとExpanded状態になる', async () => {
      // 最初はCollapse状態
      expectDirectoryNodeCollapse(parentNode);
      // CollapseAndExpandChildNodeButtonをクリックするとExpanded状態になる
      const buttonEl =
        renderResult.getCollapseAndExpandChildNodeButton(parentNode);
      await act(async () => userEvent.click(buttonEl));
      expectDirectoryNodeExpanded(parentNode);
    });

    test('Expanded状態のとき、クリックするとCollapse状態になる', async () => {
      // クリックしてExpanded状態にする
      const buttonEl =
        renderResult.getCollapseAndExpandChildNodeButton(parentNode);
      await act(async () => userEvent.click(buttonEl));
      // 再度クリックするとCollapse状態になる
      await act(async () => userEvent.click(buttonEl));
      expectDirectoryNodeCollapse(parentNode);
    });

    test('Collapse状態のとき、右矢印を押すとExpanded状態になる', async () => {
      // 最初はCollapse状態
      expectDirectoryNodeCollapse(parentNode);
      // フォーカスして右矢印を押す
      parentNode.focus();
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });
      // Expanded状態になっている
      expectDirectoryNodeExpanded(parentNode);
    });

    test('Expanded状態のとき、左矢印を押すとCollapse状態になる', async () => {
      // フォーカスして右矢印を押す
      parentNode.focus();
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });
      // 左矢印を押すとCollapse状態になる
      await act(async () => {
        userEvent.keyboard('{arrowleft}');
      });
      expectDirectoryNodeCollapse(parentNode);
    });

    test('Expanded状態で別タブに切り替え、再度元のタブに切り替えた場合、Expanded状態が維持される', async () => {
      // あらかじめ組織タブが選択されていることを確認する
      expectTabSelected(renderResult.getOrganizationTab());
      // クリックしてExpanded状態にする
      const buttonEl =
        renderResult.getCollapseAndExpandChildNodeButton(parentNode);
      await act(async () => userEvent.click(buttonEl));
      expectDirectoryNodeExpanded(parentNode);
      // 別タブ（グループタブ）に切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // 元居た組織タブに切り替える
      await act(async () => userEvent.click(renderResult.getOrganizationTab()));
      // Expanded状態が維持されている
      expectDirectoryNodeExpanded(parentNode);
    });
  });

  describe('Active状態', () => {
    const expectDirectoryNodeBeActive = async (targetNode: HTMLElement) => {
      // フォーカス且つtabindex属性が0であること
      expect(targetNode).toHaveFocus();
      expect(targetNode).toHaveAttribute('tabindex', '0');
      // 現在ActiveのDirectoryNode以外のノードは、フォーカスを受け取らない（tabindex属性が-1）
      const inactiveNodes = await (
        await renderResult.getDirectoryNodes()
      ).filter((directoryNode) => directoryNode !== targetNode);
      inactiveNodes.forEach((inactiveNode) => {
        expect(inactiveNode).toHaveAttribute('tabindex', '-1');
      });
    };

    beforeEach(async () => {
      renderResult = renderEntitySelect();
      await renderResult.waitDialogShown();
    });

    // マウスホバーによるActiveはVRTで保証する
    test('上矢印を押すと、前のDirectoryNodeがActive状態になる', async () => {
      const directoryNodes = await renderResult.getDirectoryNodes();
      // 最初のDirectoryNodeにフォーカス
      directoryNodes[0].focus();
      // 上矢印を押すごとに、3番目→2番目→1番目の順にActive状態になる
      await act(async () => {
        userEvent.keyboard('{arrowup}');
      });
      await expectDirectoryNodeBeActive(directoryNodes[2]);
      await act(async () => {
        userEvent.keyboard('{arrowup}');
      });
      await expectDirectoryNodeBeActive(directoryNodes[1]);
      await act(async () => {
        userEvent.keyboard('{arrowup}');
      });
      await expectDirectoryNodeBeActive(directoryNodes[0]);
    });

    test('下矢印を押すと、次のDirectoryNodeがActive状態になる', async () => {
      const directoryNodes = await renderResult.getDirectoryNodes();
      // 末尾のDirectoryNodeにフォーカス
      directoryNodes[2].focus();
      // 下矢印を押すごとに、1番目→2番目→3番目の順にActive状態になる
      await act(async () => {
        userEvent.keyboard('{arrowdown}');
      });
      await expectDirectoryNodeBeActive(directoryNodes[0]);
      await act(async () => {
        userEvent.keyboard('{arrowdown}');
      });
      await expectDirectoryNodeBeActive(directoryNodes[1]);
      await act(async () => {
        userEvent.keyboard('{arrowdown}');
      });
      await expectDirectoryNodeBeActive(directoryNodes[2]);
    });

    test('Expanded状態の親ノードがActive状態のとき、下矢印キーを押すと、子ノードの最初のノードがActive状態になり、上矢印を押すと再度親ノードがActive状態になる', async () => {
      // 親ノードにフォーカス
      (await getParentNode()).focus();
      // 右矢印を押してExpanded状態にする
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });
      // 下矢印を押すと、子ノードの最初のノードがActive状態になる
      await act(async () => {
        userEvent.keyboard('{arrowdown}');
      });
      const childNodes = await getChildNodes();
      await expectDirectoryNodeBeActive(childNodes[0]);
      // 上矢印を押すと、親ノードがActive状態になる
      await act(async () => {
        userEvent.keyboard('{arrowup}');
      });
      await expectDirectoryNodeBeActive(await getParentNode());
    });

    // サブツリーとは、親ノード＞子ノードをまとめたノードの集まりのこと
    test('サブツリーの最深部がActive状態のとき、下矢印を押すと、次のサブツリーの最上部がActive状態になり、上矢印を押すと再度サブツリーの最深部がActive状態になる', async () => {
      // 親ノードにフォーカスする
      (await getParentNode()).focus();
      // 右矢印を押してExpanded状態にする
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });
      // 子ノードの最深部をActive状態にする
      const childNodes = await getChildNodes();
      const lastChildNode = childNodes[childNodes.length - 1];
      await act(async () => {
        userEvent.keyboard('{arrowdown}');
      });
      await expectDirectoryNodeBeActive(lastChildNode);
      // 下矢印を押すと、次のサブツリーの最上部がActive状態になる
      const nextSubTree = await renderResult.getDirectoryNodeByName('組織3');
      await act(async () => {
        userEvent.keyboard('{arrowdown}');
      });
      await expectDirectoryNodeBeActive(nextSubTree);
      // 上矢印を押すと、再度子ノードの最深部がActive状態になる
      await act(async () => {
        userEvent.keyboard('{arrowup}');
      });
      await expectDirectoryNodeBeActive(lastChildNode);
    });

    test('Collapse状態のとき、左矢印を押すと親ノードがActive状態になる', async () => {
      // 親ノードにフォーカスする
      (await getParentNode()).focus();
      // 右矢印を押してExpanded状態にする
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });
      // 下矢印を押して子ノードの最初のノードにフォーカスする
      await act(async () => {
        userEvent.keyboard('{arrowdown}');
      });
      // 左矢印を押すとひとつ上のノード（親ノード）がActive状態になる
      await act(async () => {
        userEvent.keyboard('{arrowleft}');
      });
      await expectDirectoryNodeBeActive(await getParentNode());
    });
  });

  describe('Selected状態', () => {
    const expectDirectoryNodeUnselected = (targetNode: HTMLElement) => {
      expect(targetNode).toHaveAttribute('aria-selected', 'false');
    };

    const expectDirectoryNodeSelected = (targetNode: HTMLElement) => {
      expect(targetNode).toHaveAttribute('aria-selected', 'true');
    };

    beforeEach(async () => {
      renderResult = renderEntitySelect();
      await renderResult.waitDialogShown();
    });

    test('子ノードをもたないとき、クリックするとSelected状態になる', async () => {
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(directoryNode);
      // クリックするとSelected状態になる
      const selectDirectoryButtonEl =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      expectDirectoryNodeSelected(directoryNode);
    });

    test('子ノードをもたないとき、Spaceを押すと、Selected状態になる', async () => {
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(directoryNode);
      // フォーカスしてSpaceを押すとSelected状態になる
      directoryNode.focus();
      await act(async () => {
        userEvent.keyboard('{space}');
      });
      expectDirectoryNodeSelected(directoryNode);
    });

    test('子ノードをもたないとき、Enterを押すと、Selected状態になる', async () => {
      const directoryNode = await renderResult.getDirectoryNodeByName('組織1');
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(directoryNode);
      // フォーカスしてEnterを押すとSelected状態になる
      directoryNode.focus();
      await act(async () => {
        userEvent.keyboard('{enter}');
      });
      expectDirectoryNodeSelected(directoryNode);
    });

    test('Collapse状態のとき、クリックするとSelected状態になる', async () => {
      const collapseDirectoryNode = await getParentNode();
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(collapseDirectoryNode);
      // クリックするとSelected状態になる
      const selectDirectoryButtonEl = renderResult.getSelectDirectoryButton(
        collapseDirectoryNode
      );
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      expectDirectoryNodeSelected(collapseDirectoryNode);
    });

    test('Collapse状態のとき、Spaceを押すとSelected状態になる', async () => {
      const collapseDirectoryNode = await getParentNode();
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(collapseDirectoryNode);
      // フォーカスしてSpaceを押すとSelected状態になる
      collapseDirectoryNode.focus();
      await act(async () => {
        userEvent.keyboard('{space}');
      });
      expectDirectoryNodeSelected(collapseDirectoryNode);
    });

    test('Collapse状態のとき、Enterを押すとSelected状態になる', async () => {
      const collapseDirectoryNode = await getParentNode();
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(collapseDirectoryNode);
      // フォーカスしてEnterを押すとSelected状態になる
      collapseDirectoryNode.focus();
      await act(async () => {
        userEvent.keyboard('{enter}');
      });
      expectDirectoryNodeSelected(collapseDirectoryNode);
    });

    test('Expanded状態のとき、クリックするとSelected状態になる', async () => {
      const directoryNode = await getParentNode();
      // Expanded状態にする
      const buttonEl =
        renderResult.getCollapseAndExpandChildNodeButton(directoryNode);
      await act(async () => userEvent.click(buttonEl));
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(directoryNode);
      // クリックするとSelected状態になる
      const selectDirectoryButtonEl =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      expectDirectoryNodeSelected(directoryNode);
    });

    test('Expanded状態のとき、Spaceを押すとSelected状態になる', async () => {
      const directoryNode = await getParentNode();
      // フォーカスして右矢印を押し、Expanded状態にする
      directoryNode.focus();
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(directoryNode);
      // Spaceを押すとSelected状態になる
      await act(async () => {
        userEvent.keyboard('{space}');
      });
      expectDirectoryNodeSelected(directoryNode);
    });

    test('Expanded状態のとき、Enterを押すとSelected状態になる', async () => {
      const directoryNode = await getParentNode();
      // フォーカスして右矢印を押して、Expanded状態にする
      directoryNode.focus();
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });
      // 最初はUnselected状態
      expectDirectoryNodeUnselected(directoryNode);
      // Enterを押すとSelected状態になる
      await act(async () => {
        userEvent.keyboard('{enter}');
      });
      expectDirectoryNodeSelected(directoryNode);
    });

    test('Selected状態にした後にExpanded状態にしたとき、Selected状態が維持される', async () => {
      const directoryNode = await getParentNode();
      // あらかじめDirectoryNodeがCollapse状態であることを確認する
      expectDirectoryNodeCollapse(directoryNode);
      // クリックしてSelected状態にする
      const selectDirectoryButtonEl =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      expectDirectoryNodeSelected(directoryNode);
      // CollapseAndExpandChildButtonをクリックしてExpanded状態にする
      const buttonEl =
        renderResult.getCollapseAndExpandChildNodeButton(directoryNode);
      await act(async () => userEvent.click(buttonEl));
      // Selected状態が維持されている
      expectDirectoryNodeSelected(directoryNode);
    });

    test('Selected状態にした後にCollapse状態にしたとき、Selected状態が維持される', async () => {
      const directoryNode = await getParentNode();
      // CollapseAndExpandChildButtonをクリックしてExpanded状態にする
      const buttonEl =
        renderResult.getCollapseAndExpandChildNodeButton(directoryNode);
      await act(async () => userEvent.click(buttonEl));
      // クリックしてSelected状態にする
      const selectDirectoryButtonEl =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      expectDirectoryNodeSelected(directoryNode);
      // 再度CollapseAndExpandChildButtonをクリックしてCollapse状態にする
      await act(async () => userEvent.click(buttonEl));
      // Selected状態が維持されている
      expectDirectoryNodeSelected(directoryNode);
    });

    test('Selected状態で別タブに切り替えた後、再度元のタブに切り替えた場合、Selected状態が維持される', async () => {
      const directoryNode = await getParentNode();
      // クリックしてSelected状態にする
      const selectDirectoryButtonEl =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      expectDirectoryNodeSelected(directoryNode);
      // 別タブ（グループタブ）に切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // 元居た組織タブに切り替える
      await act(async () => userEvent.click(renderResult.getOrganizationTab()));
      // Selected状態が維持されている
      expectDirectoryNodeSelected(directoryNode);
    });
  });

  describe('API呼び出し', () => {
    beforeEach(async () => {
      fetchOrgUsersFn.mockReset();
      fetchGroupUsersFn.mockReset();
    });

    test('organizationAvailable:true、userAvailable:falseのとき、組織タブ内のSelectDirectoryButtonをクリックしても、ユーザー検索のAPIは実行されない', async () => {
      renderResult = renderEntitySelect({
        organizationAvailable: true,
        userAvailable: false
      });
      await renderResult.waitDialogShown();
      // 初期状態ではAPIは呼ばれていない
      expect(fetchOrgUsersFn).not.toHaveBeenCalled();
      // Selected状態にする
      const selectDirectoryButtonEl = renderResult.getSelectDirectoryButton(
        await getParentNode()
      );
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      // APIが実行されない
      expect(fetchOrgUsersFn).not.toHaveBeenCalled();
    });

    test('organizationAvailable:true、userAvailable:trueのとき、組織タブ内のSelectDirectoryButtonをクリックすると、組織に紐づくユーザーを検索するAPIが実行される', async () => {
      renderResult = renderEntitySelect({
        organizationAvailable: true,
        userAvailable: true
      });
      await renderResult.waitDialogShown();
      // 初期状態ではAPIは呼ばれていない
      expect(fetchOrgUsersFn).not.toHaveBeenCalled();
      // Selected状態にする
      const selectDirectoryButtonEl = renderResult.getSelectDirectoryButton(
        await getParentNode()
      );
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      // APIが実行される
      // 引数にクリックしたDirectoryNodeの組織IDとoffset（0）が渡される
      expect(fetchOrgUsersFn).toHaveBeenCalledTimes(1);
      expect(fetchOrgUsersFn).lastCalledWith('2', 0);
    });

    test('groupAvailable:true、userAvailable:falseのとき、グループタブ内のSelectDirectoryButtonをクリックしても、ユーザー検索のAPIは実行されない', async () => {
      renderResult = renderEntitySelect({
        groupAvailable: true,
        userAvailable: false
      });
      await renderResult.waitDialogShown();
      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // 初期状態ではAPIは呼ばれていない
      expect(fetchGroupUsersFn).not.toHaveBeenCalled();
      const directoryNode = await renderResult.getDirectoryNodeByName(
        'グループ1'
      );
      const selectDirectoryButtonEl =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      // APIが実行されない
      expect(fetchGroupUsersFn).not.toHaveBeenCalled();
    });

    test('groupAvailable:true、userAvailable:trueのとき、グループタブ内のSelectDirectoryButtonをクリックすると、グループに紐づくユーザーを検索するAPIが実行される', async () => {
      renderResult = renderEntitySelect({
        groupAvailable: true,
        userAvailable: true
      });
      await renderResult.waitDialogShown();
      // グループタブに切り替える
      await act(async () => userEvent.click(renderResult.getGroupTab()));
      // 初期状態ではAPIは呼ばれていない
      expect(fetchGroupUsersFn).not.toHaveBeenCalled();
      // Selected状態にする
      const directoryNode = await renderResult.getDirectoryNodeByName(
        'グループ1'
      );
      const selectDirectoryButtonEl =
        renderResult.getSelectDirectoryButton(directoryNode);
      await act(async () => userEvent.click(selectDirectoryButtonEl));
      // APIが実行される
      // 引数にクリックしたDirectoryNodeのグループIDとoffset(0)が渡される
      expect(fetchGroupUsersFn).toHaveBeenCalledTimes(1);
      expect(fetchGroupUsersFn).lastCalledWith('1', 0);
    });
  });
});
