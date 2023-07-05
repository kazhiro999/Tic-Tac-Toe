import { within } from '@testing-library/react';
import { EntitySelectValue } from '../modules/types';
import userEvent from '@testing-library/user-event';
import { createDummyUser } from '../../../functions/testing/users';
import {
  entitySelectRenderer,
  entitySelectRenderInitialProps
} from './entitySelectRenderer';

const changeValues = jest.fn<void, [EntitySelectValue[]]>();

describe('SelectedEntityList', () => {
  let entitySelectRenderResult: ReturnType<typeof entitySelectRenderer>;
  const dummyUser1 = createDummyUser({ id: '1', name: 'ダミーユーザー1' });
  const dummyUser2 = createDummyUser({ id: '2', name: 'ダミーユーザー2' });

  beforeEach(() => {
    changeValues.mockReset();
  });

  describe('表示確認', () => {
    test('表示内容', async () => {
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        values: [dummyUser1],
        changeValues
      });
      expect(
        await within(
          entitySelectRenderResult.getSelectedEntityList()
        ).findByText(dummyUser1.name)
      ).toBeVisible();
    });

    test('SelectedEntityは末尾に追加される', async () => {
      const values = [dummyUser1, dummyUser2];
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        values,
        changeValues
      });
      const selectedEntities =
        await entitySelectRenderResult.getSelectedEntities(); // 親要素経由でリストの表示順序を確認
      expect(selectedEntities[0].textContent).toBe(values[0].name);
      expect(selectedEntities[1].textContent).toBe(values[1].name);
    });

    test('ホバーするとツールチップでEntityLabelの値が表示される', async () => {
      const values = [dummyUser1, dummyUser2];
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        values,
        changeValues
      });
      const selectedEntities =
        await entitySelectRenderResult.getSelectedEntities(); // 親要素経由でSelectedEntity内にtitle属性が設定されているか確認する
      expect(
        within(selectedEntities[0]).getByTitle(values[0].name)
      ).toBeVisible();
      expect(
        within(selectedEntities[1]).getByTitle(values[1].name)
      ).toBeVisible();
    });
  });

  describe('RemoveEntityButton', () => {
    let removeEntityButton: HTMLElement;
    beforeEach(async () => {
      entitySelectRenderResult = entitySelectRenderer({
        ...entitySelectRenderInitialProps,
        values: [dummyUser1],
        changeValues
      });
      const removeEntityButtons =
        await entitySelectRenderResult.getRemoveEntityButtons();
      removeEntityButton = removeEntityButtons[0];
    });

    test('クリックすると該当のSelectedEntityが削除される', async () => {
      userEvent.click(removeEntityButton);
      expect(changeValues).toHaveBeenCalledWith([]);
    });

    test('フォーカスしてEnterキーを押すと、該当のSelectedEntityが削除される', async () => {
      removeEntityButton.focus();
      userEvent.keyboard('{Enter}');
      expect(changeValues).lastCalledWith([]);
    });

    test('フォーカスしてSpaceキーを押すと、該当のSelectedEntityが削除される', async () => {
      removeEntityButton.focus();
      // userEvent.keyboardではスペースキーを押せないので、userEvent.typeで実行する
      userEvent.type(removeEntityButton, '{Space}');
      expect(changeValues).lastCalledWith([]);
    });
  });
});
