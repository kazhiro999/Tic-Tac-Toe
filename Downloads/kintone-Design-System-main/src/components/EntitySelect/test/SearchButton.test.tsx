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
import { act } from 'react-dom/test-utils';

describe('SearchButton', () => {
  let entitySelectRenderResult: ReturnType<typeof entitySelectRenderer>;
  const term = 'test';
  const mockApiFn = jest.fn();

  beforeEach(() => {
    mockApiFn.mockReset();
    entitySelectRenderResult = entitySelectRenderer({
      ...entitySelectRenderInitialProps,
      repositories: {
        ...emptyRepositories,
        searchDirectory: (text) => {
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
      }
    });
  });

  const clickSearchButton = async () => {
    await act(async () => {
      userEvent.click(await entitySelectRenderResult.getSearchButton());
    });
  };

  const pressSpaceWithSearchButton = async () => {
    await act(async () => {
      const searchButton = entitySelectRenderResult.getSearchButton();
      searchButton.focus();
      // userEvent.keyboardだとスペースを押せないので、userEvent.typeでスペースを押す
      userEvent.type(searchButton, '{Space}');
    });
  };

  const pressEnterWithSearchButton = async () => {
    await act(async () => {
      const searchButton = entitySelectRenderResult.getSearchButton();
      searchButton.focus();
      userEvent.keyboard('{Enter}');
    });
  };

  describe('SearchResultEntityがヒットする場合', () => {
    const checkOnSearchButton = async () => {
      // SearchButtonを押すとSearchBoxのValueで再検索される
      await waitFor(() =>
        expect(mockApiFn).toHaveBeenCalledTimes(term.length + 1)
      );
      expect(mockApiFn.mock.calls[mockApiFn.mock.calls.length - 1][0]).toBe(
        term
      );
      // ヒットしたユーザー/組織/グループがSearchResultEntityPopupに表示される
      expect(
        await entitySelectRenderResult.getSearchResultEntities()
      ).toHaveLength(3);
    };

    test('クリックするとSearchBoxのValueでインクリメンタルサーチを実行し、結果がSearchResultPopupに表示される', async () => {
      await entitySelectRenderResult.search();
      await waitFor(() => {
        expect(mockApiFn).toBeCalledTimes(4);
      });
      expect(mockApiFn).lastCalledWith(term);
      await clickSearchButton();
      await checkOnSearchButton();
    });

    test('Enterキーを押すとSearchBoxのValueでインクリメンタルサーチを実行し、結果がSearchResultPopupに表示される', async () => {
      await entitySelectRenderResult.search(term);
      await pressEnterWithSearchButton();
      await checkOnSearchButton();
    });

    test('Spaceキーを押すとSearchBoxのValueでインクリメンタルサーチを実行し、結果がSearchResultPopupに表示される', async () => {
      await entitySelectRenderResult.search(term);
      await pressSpaceWithSearchButton();
      await checkOnSearchButton();
    });
  });

  describe('SearchResultEntityがヒットしない場合', () => {
    const searchText = 'abc';
    const checkOnSearchButton = async () => {
      // SearchButtonを押すとSearchBoxのValueで再検索される
      await waitFor(() =>
        expect(mockApiFn).toHaveBeenCalledTimes(searchText.length + 1)
      );
      expect(mockApiFn.mock.calls[mockApiFn.mock.calls.length - 1][0]).toBe(
        searchText
      );
      // term以外の文字列の場合、ヒットしないため、SearchResultPopupはClose状態のまま
      expect(
        await entitySelectRenderResult.isSearchResultEntityPopupEmpty()
      ).toBeTruthy();
    };

    test('クリックするとSearchBoxのValueでインクリメンタルサーチされるが、ヒットしないためClose状態のまま', async () => {
      await entitySelectRenderResult.search(searchText);
      await clickSearchButton();
      await checkOnSearchButton();
    });

    test('Enterキーを押すとSearchBoxのValueでインクリメンタルサーチされるが、ヒットしないためClose状態のまま', async () => {
      await entitySelectRenderResult.search(searchText);
      await pressEnterWithSearchButton();
      await checkOnSearchButton();
    });

    test('Spaceキーを押すとSearchBoxのValueでインクリメンタルサーチされるが、ヒットしないためClose状態のまま', async () => {
      await entitySelectRenderResult.search(searchText);
      await pressSpaceWithSearchButton();
      await checkOnSearchButton();
    });
  });
});
