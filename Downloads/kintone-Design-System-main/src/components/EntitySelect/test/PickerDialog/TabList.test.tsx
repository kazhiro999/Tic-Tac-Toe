import { userEvent } from '@storybook/testing-library';
import { act } from 'react-dom/test-utils';
import { emptyRepositories } from '../../modules/repositories';
import { ENTITY_SELECT_OTHER_TYPE } from '../../modules/types';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from '../entitySelectRenderer';
import { fetchGroupList, fetchOrgRootTree } from '../repositoryData';

const fetchOrgRootTreeFn = jest.fn();
const fetchGroupListFn = jest.fn();
const fetchCustomItemsFn = jest.fn();

const repositories = {
  ...emptyRepositories,
  // 組織を返さないとpickerDialogを表示できない
  fetchOrgRootTree: () => {
    fetchOrgRootTreeFn();
    return fetchOrgRootTree();
  },
  // グループを返さないとPickerDialogを表示できない
  fetchGroupList: () => {
    fetchGroupListFn();
    return fetchGroupList();
  },
  // その他タブ（カスタムアイテム）表示用
  fetchCustomItems: () => {
    fetchCustomItemsFn();
    return Promise.resolve({
      items: []
    });
  }
};

const renderUserSelect = ({ otherAvailable }: { otherAvailable: boolean }) => {
  const otherTypes = otherAvailable
    ? [ENTITY_SELECT_OTHER_TYPE.CUSTOM_ITEM]
    : undefined;
  return entitySelectRenderer({
    ...entitySelectRenderInitialProps,
    repositories,
    userAvailable: true,
    groupAvailable: true,
    organizationAvailable: true,
    otherTypes
  });
};

const renderOrganizationSelect = ({
  otherAvailable
}: {
  otherAvailable: boolean;
}) => {
  const otherTypes = otherAvailable
    ? [ENTITY_SELECT_OTHER_TYPE.CUSTOM_ITEM]
    : undefined;
  return entitySelectRenderer({
    ...entitySelectRenderInitialProps,
    repositories,
    userAvailable: true,
    groupAvailable: false,
    organizationAvailable: true,
    otherTypes
  });
};

const renderGroupSelect = ({ otherAvailable }: { otherAvailable: boolean }) => {
  const otherTypes = otherAvailable
    ? [ENTITY_SELECT_OTHER_TYPE.CUSTOM_ITEM]
    : undefined;
  return entitySelectRenderer({
    ...entitySelectRenderInitialProps,
    repositories,
    userAvailable: true,
    groupAvailable: true,
    organizationAvailable: false,
    otherTypes
  });
};

describe('TabList', () => {
  describe('表示確認', () => {
    test('ユーザー選択でotherTypesのpropsを指定しない場合、組織タブ・グループタブの2つが表示される', async () => {
      // EntitySelectを描画する（ユーザー選択／その他を指定しない）
      const result = renderUserSelect({ otherAvailable: false });

      // PickerDialogを開く
      await result.waitDialogShown();

      // 組織タブ・グループタブの2つが表示される
      expect(result.getTabs()).toHaveLength(2);
      expect(result.getOrganizationTab()).toBeVisible();
      expect(result.getGroupTab()).toBeVisible();
    });

    test('ユーザー選択でotherTypesのPropsを指定した場合、組織タブ・グループタブ・その他タブの3つが表示される', async () => {
      // EntitySelectを描画する（ユーザー選択／その他を指定する）
      const result = renderUserSelect({ otherAvailable: true });

      // PickerDialogを開く
      await result.waitDialogShown();

      // 組織タブ・グループタブ・その他タブの3つが表示される
      expect(result.getTabs()).toHaveLength(3);
      expect(result.getOrganizationTab()).toBeVisible();
      expect(result.getGroupTab()).toBeVisible();
      expect(result.getOtherTab()).toBeVisible();
    });

    test('組織選択でotherTypesのPropsを指定しない場合、組織タブのみが表示される', async () => {
      // EntitySelectを描画する（組織選択／その他を指定しない）
      const result = renderOrganizationSelect({ otherAvailable: false });

      // PickerDialogを開く
      await result.waitDialogShown();

      // 組織タブのみが表示される
      expect(result.getTabs()).toHaveLength(1);
      expect(result.getOrganizationTab()).toBeVisible();
    });

    test('組織選択でotherTypesのPropsを指定した場合、組織タブ・その他タブの2つが表示される', async () => {
      // EntitySelectを描画する（組織選択／その他を指定する）
      const result = renderOrganizationSelect({ otherAvailable: true });

      // PickerDialogを開く
      await result.waitDialogShown();

      // 組織タブ・その他タブの2つが表示される
      expect(result.getTabs()).toHaveLength(2);
      expect(result.getOrganizationTab()).toBeVisible();
      expect(result.getOtherTab()).toBeVisible();
    });

    test('グループ選択でotherTypesのPropsを指定しない場合、グループタブのみが表示される', async () => {
      // EntitySelectを描画する（グループ選択／その他を指定しない）
      const result = renderGroupSelect({ otherAvailable: false });

      // PickerDialogを開く
      await result.waitDialogShown();

      // グループタブのみが表示される
      expect(result.getTabs()).toHaveLength(1);
      expect(result.getGroupTab()).toBeVisible();
    });

    test('グループ選択でotherTypesのPropsを指定した場合、グループタブ・その他タブの2つが表示される', async () => {
      //  EntitySelectを描画する（グループ選択／その他を指定する）
      const result = renderGroupSelect({ otherAvailable: true });

      // PickerDialogを開く
      await result.waitDialogShown();

      // グループタブ・その他タブの2つが表示される
      expect(result.getTabs()).toHaveLength(2);
      expect(result.getGroupTab()).toBeVisible();
      expect(result.getOtherTab()).toBeVisible();
    });
  });

  describe('Selected状態とフォーカス', () => {
    // Selectedの検証方法が変わることを見越して共通化しておく
    const expectTabSelected = (tab: HTMLElement) => {
      expect(tab).toHaveAttribute('aria-selected', 'true');
    };

    test('ユーザー選択の場合、PickerDialogがOpen状態になった直後は、先頭の組織タブがSelected状態になる', async () => {
      // EntitySelectを描画する（ユーザー選択）
      const { waitDialogShown, getTabs, getOrganizationTab } = renderUserSelect(
        {
          otherAvailable: true
        }
      );

      // PickerDialogを開く
      await waitDialogShown();

      // 先頭のTabが組織タブで、Selected状態になっている
      const firstTab = getTabs()[0];
      expect(firstTab).toEqual(getOrganizationTab());
      expectTabSelected(firstTab);
    });

    test('組織選択の場合、PickerDialogがOpen状態になった直後は、先頭の組織タブがSelected状態になる', async () => {
      // EntitySelectを描画する（組織選択）
      const { waitDialogShown, getTabs, getOrganizationTab } =
        renderOrganizationSelect({
          otherAvailable: true
        });

      // PickerDialogを開く
      await waitDialogShown();

      // 先頭のTabが組織タブで、Selected状態になっている
      const firstTab = getTabs()[0];
      expect(firstTab).toEqual(getOrganizationTab());
      expectTabSelected(firstTab);
      expect(firstTab).not.toHaveFocus();
    });

    test('グループ選択の場合、PickerDialogがOpen状態になった直後は、先頭のグループタブがSelected状態になる', async () => {
      // EntitySelectを描画する（ユーザー選択）
      const { waitDialogShown, getTabs, getGroupTab } = renderGroupSelect({
        otherAvailable: true
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 先頭のTabがグループタブで、Selected状態になっている
      const firstTab = getTabs()[0];
      expect(firstTab).toEqual(getGroupTab());
      expectTabSelected(firstTab);
      expect(firstTab).not.toHaveFocus();
    });

    test('クリックすると、Selected状態になりフォーカスされる', async () => {
      // EntitySelectを描画する
      const { waitDialogShown, getTabs } = renderUserSelect({
        otherAvailable: true
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 2番目のTabをクリックする
      const selectingTab = getTabs()[1];
      await act(async () => userEvent.click(selectingTab));

      // クリックしたTabがSelected状態になる
      expectTabSelected(selectingTab);
      // クリックしたTabにフォーカスされる
      expect(selectingTab).toHaveFocus();
    });

    test('フォーカスして右矢印キーを押すと、次のTabがSelected状態になりフォーカスされる', async () => {
      // EntitySelectを描画する
      const { waitDialogShown, getTabs } = renderUserSelect({
        otherAvailable: true
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 2番目のTabをクリックしてフォーカスする
      await act(async () => userEvent.click(getTabs()[1]));

      // 右矢印キーを押す
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });

      // 3番目のTabがSelected状態になる
      expectTabSelected(getTabs()[2]);

      // 3番目のTabにフォーカスされる
      expect(getTabs()[2]).toHaveFocus();
    });

    test('フォーカスして左矢印キーを押すと、前のTabがSelected状態になりフォーカスされる', async () => {
      // EntitySelectを描画する
      const { waitDialogShown, getTabs } = renderUserSelect({
        otherAvailable: true
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 2番目のTabをクリックしてフォーカスする
      await act(async () => userEvent.click(getTabs()[1]));

      // 左矢印キーを押す
      await act(async () => {
        userEvent.keyboard('{arrowleft}');
      });

      // 1番目のTabがSelected状態になりフォーカスされる
      expectTabSelected(getTabs()[0]);

      // 1番目のTabにフォーカスされる
      expect(getTabs()[0]).toHaveFocus();
    });

    test('末尾のタブにフォーカスして右矢印キーを押しても、末尾のタブがSelected状態でフォーカスされたまま', async () => {
      // EntitySelectを描画する
      const { waitDialogShown, getTabs } = renderUserSelect({
        otherAvailable: true
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 末尾のTabをクリックしてフォーカスする
      const lastTab = getTabs()[getTabs().length - 1];
      await act(async () => userEvent.click(lastTab));

      // 右矢印キーを押す
      await act(async () => {
        userEvent.keyboard('{arrowright}');
      });

      // 末尾のTabがSelected状態のまま
      expectTabSelected(lastTab);

      // 末尾のTabにフォーカスがあたったまま
      expect(lastTab).toHaveFocus();
    });

    test('先頭のタブにフォーカスして左矢印キーを押しても、先頭のタブがSelected状態でフォーカスされたまま', async () => {
      // EntitySelectを描画する
      const { waitDialogShown, getTabs } = renderUserSelect({
        otherAvailable: true
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 一番最後のTabをクリックしてフォーカスする
      const firstTab = getTabs()[0];
      await act(async () => userEvent.click(firstTab));

      // 右矢印キーを押す
      await act(async () => {
        userEvent.keyboard('{arrowleft}');
      });

      // 先頭のTabがSelected状態でフォーカスされたまま
      expectTabSelected(firstTab);

      // 先頭のTabにフォーカスがあたったまま
      expect(firstTab).toHaveFocus();
    });

    test('フォーカスしてTabキーを押すと、TabListの次の要素にフォーカスする', async () => {
      // EntitySelectを描画する
      const { waitDialogShown, getTabs, getDirectoryNodes } = renderUserSelect({
        otherAvailable: false
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 2番目のTabをクリックしてフォーカスする
      await act(async () => userEvent.click(getTabs()[1]));

      // Tabキーを押す
      userEvent.tab();

      // TabListの次の要素（先頭のDirectoryNode）にフォーカスする
      const directoryNodes = await getDirectoryNodes();
      const nextFocusableElement = directoryNodes[0];
      expect(nextFocusableElement).toHaveFocus();
    });

    test('フォーカスしてShift+Tabキーを押すと、TabListの前の要素にフォーカスする', async () => {
      // EntitySelectを描画する
      const { waitDialogShown, getTabs, getClosePickerDialogButton } =
        renderUserSelect({ otherAvailable: true });

      // PickerDialogを開く
      await waitDialogShown();

      // 2番目のTabをクリックしてフォーカスする
      await act(async () => userEvent.click(getTabs()[1]));

      // Shift+Tabキーを押す
      userEvent.tab({ shift: true });

      // TabListの前の要素（ダイアログを閉じるボタン）にフォーカスする
      const previousFocusableElement = getClosePickerDialogButton();
      expect(previousFocusableElement).toHaveFocus();
    });
  });

  describe('API呼び出し確認', () => {
    beforeEach(() => {
      fetchOrgRootTreeFn.mockReset();
      fetchGroupListFn.mockReset();
      fetchCustomItemsFn.mockReset();
    });

    test('組織選択の場合、PickerDialogがOpen状態になると組織検索のAPIが実行される', async () => {
      // EntitySelectを描画する（組織選択）
      const { waitDialogShown } = renderOrganizationSelect({
        otherAvailable: false
      });

      // PickerDialogを開く
      await waitDialogShown();

      // 組織検索のAPIが実行される
      expect(fetchOrgRootTreeFn).toHaveBeenCalled();
      expect(fetchOrgRootTreeFn).toHaveBeenCalledTimes(1);
    });

    test('グループ選択の場合、PickerDialogがOpen状態になると、グループ検索のAPIが実行される', async () => {
      // EntitySelectを描画する（グループ選択）
      const { waitDialogShown } = renderGroupSelect({ otherAvailable: false });

      // PickerDialogを開く
      await waitDialogShown();

      // グループ検索のAPIが実行される
      expect(fetchGroupListFn).toHaveBeenCalled();
      expect(fetchGroupListFn).toHaveBeenCalledTimes(1);
    });

    test('グループタブに切り替えると、グループ検索のAPIが実行される', async () => {
      // EntitySelectを描画（ユーザー選択）
      const { waitDialogShown, getGroupTab } = renderUserSelect({
        otherAvailable: false
      });

      // PickerDialogを開く
      await waitDialogShown();

      // グループタブに切り替える
      await act(async () => userEvent.click(getGroupTab()));

      // グループ検索のAPIが実行される
      expect(fetchGroupListFn).toHaveBeenCalled();
      expect(fetchGroupListFn).toHaveBeenCalledTimes(1);
    });

    test('組織タブに切り替えると、組織検索のAPIが実行される', async () => {
      // EntitySelectを描画（ユーザー選択）
      const { waitDialogShown, getOrganizationTab, getGroupTab } =
        renderUserSelect({ otherAvailable: false });

      // PickerDialogを開く
      await waitDialogShown();

      // グループタブに切り替えてから組織タブに切り替える
      await act(async () => userEvent.click(getGroupTab()));
      await act(async () => userEvent.click(getOrganizationTab()));

      // 組織検索のAPIが実行される
      // Open直後と組織タブ切り替え直後の2回呼ばれている
      expect(fetchOrgRootTreeFn).toHaveBeenCalled();
      expect(fetchOrgRootTreeFn).toHaveBeenCalledTimes(2);
    });

    test('その他タブに切り替えると、カスタムアイテム検索のAPIが実行される', async () => {
      // EntitySelectを描画（ユーザー選択）
      const { waitDialogShown, getOtherTab } = renderUserSelect({
        otherAvailable: true
      });

      // PickerDialogを開く
      await waitDialogShown();

      // その他タブに切り替える
      await act(async () => userEvent.click(getOtherTab()));

      // カスタムアイテム検索のAPIが実行される
      expect(fetchCustomItemsFn).toHaveBeenCalled();
      expect(fetchCustomItemsFn).toHaveBeenCalledTimes(1);
    });
  });
});
