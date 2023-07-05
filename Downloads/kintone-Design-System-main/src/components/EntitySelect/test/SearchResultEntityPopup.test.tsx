import { waitFor, within } from '@testing-library/react';
import { EntitySelectValue } from '../modules/types';
import userEvent from '@testing-library/user-event';
import { createDummyOrganization } from '../../../functions/testing/organizations';
import { createDummyGroup } from '../../../functions/testing/groups';
import { createDummyUser } from '../../../functions/testing/users';
import { emptyRepositories } from '../modules/repositories';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from './entitySelectRenderer';

const changeValues = jest.fn<void, [EntitySelectValue[]]>();

describe('SearchResultPopup', () => {
  let entitySelectRenderResult: ReturnType<typeof entitySelectRenderer>;
  const dummyUserName = 'ダミーユーザ1';
  const dummyOrgName = 'ダミー組織1';
  const dummyGroupName = 'ダミーグループ1';
  const repositories = {
    ...emptyRepositories,
    searchDirectory: () =>
      Promise.resolve({
        users: [createDummyUser({ id: '1', name: dummyUserName })],
        orgs: [createDummyOrganization({ id: '1', name: dummyOrgName })],
        groups: [createDummyGroup({ id: '1', name: dummyGroupName })]
      })
  };

  beforeEach(() => {
    changeValues.mockReset();
  });

  test('SearchResultEntityにホバーすると、EntityLabelがツールチップで表示される', async () => {
    entitySelectRenderResult = entitySelectRenderer({
      ...entitySelectRenderInitialProps,
      changeValues,
      repositories
    });
    await entitySelectRenderResult.search();
    const tooltipValues = [dummyOrgName, dummyGroupName, dummyUserName];
    const searchResultEntities =
      await entitySelectRenderResult.getSearchResultEntities();
    tooltipValues.forEach((tooltipValue, index) => {
      // SearchResultEntity内にEntityLabelを値にとるtitle属性があれば、ツールチップとして表示される
      expect(
        within(searchResultEntities[index]).getByTitle(tooltipValue)
      ).toBeVisible();
    });
  });

  describe('Close状態にする', () => {
    beforeEach(async () => {
      jest.useFakeTimers();
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        changeValues,
        repositories
      });
      // SearchBoxに文字を入力してOpen状態にしておく
      await entitySelectRenderResult.search();
      // useOutsideTargetElementOnClickでsetTimeOutを使っているためモックする
      jest.runAllTimers();
    });

    afterEach(() => jest.useRealTimers());

    test('枠外をクリックするとClose状態になる', () => {
      userEvent.click(document.body);
      expect(
        entitySelectRenderResult.isSearchResultEntityPopupClose()
      ).toBeTruthy();
    });

    test('ESCキーを押すとClose状態になる', () => {
      userEvent.keyboard('{escape}');
      expect(
        entitySelectRenderResult.isSearchResultEntityPopupClose()
      ).toBeTruthy();
    });

    test('Tabキーを押すとClose状態になる', () => {
      userEvent.tab();
      expect(
        entitySelectRenderResult.isSearchResultEntityPopupClose()
      ).toBeTruthy();
    });
  });

  describe('Active状態にする', () => {
    beforeEach(async () => {
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        changeValues,
        repositories
      });
      // SearchBoxに文字を入力してOpen状態にしておく
      await entitySelectRenderResult.search();
    });

    // マウスホバーでActive状態になることはVRTで保証する

    test('上下矢印キーを押すと、前・次のSearchResultEntityがActive状態になる', async () => {
      const searchResultEntities =
        await entitySelectRenderResult.getSearchResultEntities();
      const searchBox = await entitySelectRenderResult.getSearchBox();
      for (const searchResultEntity of searchResultEntities) {
        // 下矢印キーを押す
        userEvent.keyboard('{arrowdown}');
        // 先頭の項目がActive状態になっている
        expect(searchBox).toHaveAttribute(
          'aria-activedescendant',
          searchResultEntity.getAttribute('id')
        );
        // aria-selected属性は false のままであること
        expect(searchResultEntity).toHaveAttribute('aria-selected', 'false');
      }

      for (const searchResultEntity of searchResultEntities.reverse()) {
        // 該当の項目がActive状態になっている
        expect(searchBox).toHaveAttribute(
          'aria-activedescendant',
          searchResultEntity.getAttribute('id')
        );
        // aria-selected属性は false のままであること
        expect(searchResultEntity).toHaveAttribute('aria-selected', 'false');
        // 上矢印キーを押す
        userEvent.keyboard('{arrowup}');
      }
    });
  });

  describe('SelectedEntityListに追加する', () => {
    beforeEach(async () => {
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        changeValues,
        repositories
      });
      // SearchBoxに文字を入力してOpen状態にしておく
      await entitySelectRenderResult.search();
    });

    const clickSearchResultEntity = (target: HTMLElement) =>
      userEvent.click(target);

    const pressEnterWithSearchResultEntity = (target: HTMLElement) => {
      target.focus();
      userEvent.keyboard('{Enter}');
    };

    const prepare = async (
      entityLabel: string,
      activateSearchResultEntity: (target: HTMLElement) => void
    ) => {
      const searchResultEntity =
        await entitySelectRenderResult.getSearchResultEntityByName(entityLabel);
      activateSearchResultEntity(searchResultEntity);
    };

    const checkOnSelectedEntityList = async (selectedName: string) => {
      // Close状態になる
      expect(
        entitySelectRenderResult.isSearchResultEntityPopupClose()
      ).toBeTruthy();
      // Valueの値がクリアされる（非同期処理を待つ）
      await waitFor(async () => {
        expect(await entitySelectRenderResult.getSearchBox()).toHaveValue('');
      });
      // SelectedEntityListに追加される = 変更がコールバックされる
      expect(changeValues).toHaveBeenCalled();
      expect(changeValues.mock.calls.length).toBe(1);
      expect(changeValues.mock.calls[0][0][0].name).toBe(selectedName);
    };

    test('クリックでユーザーを追加する', async () => {
      await prepare(dummyUserName, clickSearchResultEntity);
      await checkOnSelectedEntityList(dummyUserName);
    });

    test('Enterキーでユーザーを追加する', async () => {
      await prepare(dummyUserName, pressEnterWithSearchResultEntity);
      await checkOnSelectedEntityList(dummyUserName);
    });

    test('クリックで組織を追加する', async () => {
      await prepare(dummyOrgName, clickSearchResultEntity);
      await checkOnSelectedEntityList(dummyOrgName);
    });

    test('Enterキーで組織を追加する', async () => {
      await prepare(dummyOrgName, pressEnterWithSearchResultEntity);
      await checkOnSelectedEntityList(dummyOrgName);
    });

    test('クリックでグループを追加する', async () => {
      await prepare(dummyGroupName, clickSearchResultEntity);
      await checkOnSelectedEntityList(dummyGroupName);
    });

    test('Enterキーでグループを追加する', async () => {
      await prepare(dummyGroupName, pressEnterWithSearchResultEntity);
      await checkOnSelectedEntityList(dummyGroupName);
    });
  });

  describe('SelectedEntityListにすでに追加済みのEntityをクリックする', () => {
    const prepareSelectedValues = async (selectedData: EntitySelectValue) => {
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        values: [selectedData],
        changeValues,
        repositories
      });
      // 検索ボックスに文字を入力してポップアップを表示しておく
      await entitySelectRenderResult.search();
    };

    const checkOnSelect = async (selectedName: string) => {
      const targetSearchResultEntity =
        await entitySelectRenderResult.getSearchResultEntityByName(
          selectedName
        );
      userEvent.click(targetSearchResultEntity);

      // Close状態になる
      expect(
        entitySelectRenderResult.isSearchResultEntityPopupClose()
      ).toBeTruthy();

      // 検索ボックスが空文字にクリアされる (非同期処理を待つためのチェック)
      await waitFor(async () => {
        expect(await entitySelectRenderResult.getSearchBox()).toHaveValue('');
      });
      // SelectedEntityListに重複して追加されない = 変更がコールバックされない
      expect(changeValues).not.toHaveBeenCalled();
    };

    (
      [
        ['ユーザー', createDummyUser({ id: '1', name: dummyUserName })],
        ['組織', createDummyOrganization({ id: '1', name: dummyOrgName })],
        ['グループ', createDummyGroup({ id: '1', name: dummyGroupName })]
      ] as const
    ).forEach(([testTitle, dummyData]) => {
      describe(testTitle, () => {
        beforeEach(async () => {
          await prepareSelectedValues(dummyData);
        });

        test('選択済みリストに重複して追加されない', () =>
          checkOnSelect(dummyData.name));
      });
    });
  });

  describe('検索結果の表示順', () => {
    beforeEach(async () => {
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        changeValues,
        repositories
      });
      // 検索ボックスに文字を入力してポップアップを表示しておく
      await entitySelectRenderResult.search();
    });

    test('検索結果は組織、グループ、ユーザー毎に纏められて表示される', async () => {
      const searchResultEntities =
        await entitySelectRenderResult.getSearchResultEntities();
      // 検索結果は、上から順に、組織、グループ、ユーザー毎に纏められて表示される
      expect(searchResultEntities[0]).toHaveTextContent(dummyOrgName);
      expect(searchResultEntities[1]).toHaveTextContent(dummyGroupName);
      expect(searchResultEntities[2]).toHaveTextContent(dummyUserName);
    });
  });
});
