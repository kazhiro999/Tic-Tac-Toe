import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createDummyOrganization } from '../../../functions/testing/organizations';
import { createDummyGroup } from '../../../functions/testing/groups';
import { createDummyUser } from '../../../functions/testing/users';
import { emptyRepositories } from '../modules/repositories';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from './entitySelectRenderer';

describe('SearchBox', () => {
  let entitySelectRenderResult: ReturnType<typeof entitySelectRenderer>;
  const term = 'test';
  const mockApiFn = jest.fn();
  const repositories = {
    ...emptyRepositories,
    searchDirectory: (text: string) => {
      mockApiFn(text);
      if (text === term) {
        // 文字列がterm=testの時
        return Promise.resolve({
          users: [createDummyUser()],
          orgs: [createDummyOrganization()],
          groups: [createDummyGroup()]
        });
      }
      return Promise.resolve({
        users: [],
        orgs: [],
        groups: []
      });
    }
  };

  beforeEach(async () => {
    mockApiFn.mockReset();
    entitySelectRenderResult = entitySelectRenderer({
      ...entitySelectRenderInitialProps,
      repositories
    });
  });

  test('SearchBoxがDOM上存在する', async () => {
    expect(await entitySelectRenderResult.getSearchBox()).toBeInTheDocument();
  });

  test('組織やグループから選択する旨のプレースホルダーが表示される', async () => {
    expect(await entitySelectRenderResult.getSearchBox()).toHaveAttribute(
      'placeholder',
      entitySelectRenderInitialProps.placeholder
    );
  });

  test('TabキーでSearchBoxにフォーカスできる', async () => {
    userEvent.tab();
    expect(await entitySelectRenderResult.getSearchBox()).toHaveFocus();
  });

  describe('インクリメンタルサーチ', () => {
    test('文字を入力するとSearchResultEntityPopupにヒットしたユーザー、組織、グループが表示される', async () => {
      await entitySelectRenderResult.search(term);
      // 文字を入力するとインクリメンタルサーチが実行される
      await waitFor(() => expect(mockApiFn).toHaveBeenCalledTimes(term.length));
      // APIに入力した文字が送信されている
      expect(mockApiFn.mock.calls[mockApiFn.mock.calls.length - 1][0]).toBe(
        term
      );
      // SearchResultEntityPopupに、ヒットしたユーザー、組織、グループが各1件ずつ表示される
      expect(
        await entitySelectRenderResult.getSearchResultEntities()
      ).toHaveLength(3);
    });

    test('文字入力の結果ヒットしない場合、Close状態になる', async () => {
      await entitySelectRenderResult.search(term);
      // SearchResultEntityPopupに、ヒットしたユーザー、組織、グループが各1件ずつ表示される
      expect(
        await entitySelectRenderResult.getSearchResultEntities()
      ).toHaveLength(3);

      // 一文字消す
      await entitySelectRenderResult.search('{backspace}');
      // 文字を入力するとインクリメンタルサーチが実行される
      // 文字削除でもAPIが呼び出されている
      await waitFor(() =>
        expect(mockApiFn).toHaveBeenCalledTimes(term.length + 1)
      );
      // Valueがtermではない場合、SearchResultEntityは返さないようにしているため、Close状態になる
      expect(
        await entitySelectRenderResult.isSearchResultEntityPopupEmpty()
      ).toBeTruthy();
    });
  });
});
