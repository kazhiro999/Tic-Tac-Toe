import { composeStories } from '@storybook/react';
import { RenderResult, act, render, screen } from '@testing-library/react';
import * as stories from '../stories/Menu.stories';
import * as testStories from '../stories/Menu.test.stories';
import { userEvent, waitFor } from '@storybook/testing-library';

import { MenuLinkItem } from '../MenuLinkItem';
import { MenuActionItem } from '../MenuActionItem';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

const { Close, Hover } = composeStories(stories);

describe('MenuButton', () => {
  describe('操作', () => {
    let menuButton: HTMLElement;
    let externalPopup: HTMLElement;
    let onClickSpy: VoidFunction;

    beforeEach(() => {
      onClickSpy = jest.fn();
      render(
        <>
          <Close onClickMenuButton={onClickSpy} />
          <div data-testid="external-popup" />
          {/* タブキーのテストのためダミーのフォーカス可能要素を置く */}
          <button>dummy</button>
        </>
      );
      menuButton = getMenuButton();
      externalPopup = screen.getByTestId('external-popup');
      // useOutsideTargetElementOnClickでsetTimeOutを使用しているためモック
      jest.useFakeTimers();
    });

    afterEach(() => jest.useRealTimers());

    test('クリックでMenuPopupが開閉され、割り当てられたアクションが実行される', async () => {
      // 初期状態はMenuPopupがClose状態になっている
      expect(getMenuPopup()).toBeNull();
      // 初期状態では割り当てられたアクションは実行されない
      expect(onClickSpy).not.toHaveBeenCalled();
      // MenuButtonをクリック
      userEvent.click(menuButton);
      // MenuPopupがOpen状態になる
      expect(getMenuPopup()).toBeVisible();
      // 割り当てられたアクションが実行される
      expect(onClickSpy).toHaveBeenCalledTimes(1);
      // 再度MenuButtonをクリック
      jest.runAllTimers();
      userEvent.click(menuButton);
      // MenuPopupがClose状態になる
      expect(getMenuPopup()).toBeNull();
      // 割り当てられたアクションが実行される
      expect(onClickSpy).toHaveBeenCalledTimes(2);
    });

    test('枠外クリックでMenuPopupがClose状態になる', async () => {
      // MenuButtonをクリック
      userEvent.click(menuButton);
      // MenuPopupがOpen状態になる
      expect(getMenuPopup()).toBeVisible();
      // 枠外クリック
      jest.runAllTimers();
      userEvent.click(externalPopup);
      // MenuPopupがClose状態になる
      expect(getMenuPopup()).toBeNull();
    });

    test('エンターでMenuPopupが開閉され、割り当てられたアクションが実行される', async () => {
      // 初期状態はMenuPopupがClose状態になっている
      expect(getMenuPopup()).toBeNull();
      // 初期状態では割り当てられたアクションは実行されない
      expect(onClickSpy).not.toHaveBeenCalled();
      // MenuButtonにフォーカスしてエンターを押す
      menuButton.focus();
      userEvent.keyboard('{enter}');
      // MenuPopupがOpen状態になる
      expect(getMenuPopup()).toBeVisible();
      // 割り当てられたアクションが実行される
      expect(onClickSpy).toHaveBeenCalledTimes(1);
      // フォーカスはMenuButtonのまま
      expect(menuButton).toHaveFocus();
      // 再度エンターを押す
      userEvent.keyboard('{enter}');
      // MenuPopupがClose状態になる
      expect(getMenuPopup()).toBeNull();
      // 割り当てられたアクションが実行される
      expect(onClickSpy).toHaveBeenCalledTimes(2);
      // フォーカスはMenuButtonのまま
      expect(menuButton).toHaveFocus();
    });

    test('スペースでMenuPopupが開閉され、割り当てられたアクションが実行される', async () => {
      // 初期状態はMenuPopupがClose状態になっている
      expect(getMenuPopup()).toBeNull();
      // 初期状態では割り当てられたアクションは実行されない
      expect(onClickSpy).not.toHaveBeenCalled();
      // MenuButtonにフォーカスしてスペース
      menuButton.focus();
      userEvent.keyboard('{space}');
      // MenuPopupがOpen状態になる
      expect(getMenuPopup()).toBeVisible();
      // 割り当てられたアクションが実行される
      expect(onClickSpy).toHaveBeenCalledTimes(1);
      // フォーカスはMenuButtonのまま
      expect(menuButton).toHaveFocus();
      // 再度スペース
      userEvent.keyboard('{space}');
      // MenuPopupがClose状態になる
      expect(getMenuPopup()).toBeNull();
      // 割り当てられたアクションが実行される
      expect(onClickSpy).toHaveBeenCalledTimes(2);
      // フォーカスはMenuButtonに残ったまま
      expect(menuButton).toHaveFocus();
    });

    test('下矢印で先頭のMenuItemがActive状態になる', async () => {
      // MenuButtonにフォーカスして下矢印
      menuButton.focus();

      await act(async () => {
        await userEvent.keyboard('{arrowdown}');
      });
      await act(async () => {
        // focus処理にsetTimeoutを利用しているためtimerを進める
        jest.runAllTimers();
      });
      expect(getMenuPopup()).toBeVisible();
      expect(getMenuItems()[0]).toHaveFocus();
    });

    test('上矢印で末尾のMenuItemがActive状態になる', async () => {
      // MenuButtonにフォーカスして上矢印
      menuButton.focus();

      await act(async () => {
        await userEvent.keyboard('{arrowup}');
      });
      await act(async () => {
        // focus処理にsetTimeoutを利用しているためtimerを進める
        jest.runAllTimers();
      });
      expect(getMenuPopup()).toBeVisible();
      const menuItems = getMenuItems();
      const lastMenuItem = menuItems[menuItems.length - 1];
      expect(lastMenuItem).toHaveFocus();
    });

    test('エスケープを押すとMenuPopupがClose状態になる', async () => {
      // MenuButtonにフォーカスしてエンターを押す
      menuButton.focus();
      userEvent.keyboard('{enter}');
      // MenuPopupがOpen状態になる
      expect(getMenuPopup()).toBeVisible();
      // エスケープを押す
      userEvent.keyboard('{escape}');
      // MenuPopupがClose状態になる
      expect(getMenuPopup()).toBeNull();
      // エスケープを押した後、フォーカスはMenuButtonのまま
      expect(menuButton).toHaveFocus();
    });

    test('タブを押すと、MenuPopupがClose状態になり、MenuButtonからフォーカスが外れる', async () => {
      // MenuButtonにフォーカスしてエンターを押す
      menuButton.focus();
      userEvent.keyboard('{enter}');
      // MenuPopupがOpen状態になる
      expect(getMenuPopup()).toBeVisible();
      // タブを押す
      userEvent.tab();
      // MenuPopupがClose状態になる
      expect(getMenuPopup()).toBeNull();
      // MenuButtonにはフォーカスしない
      expect(menuButton).not.toHaveFocus();
    });
  });

  describe('見た目', () => {
    test('任意の幅・高さを設定できる', async () => {
      // 幅40px、高さ50pxを指定
      render(<Close width={40} height={50} />);
      // CSSで、MenuButtonのwidthが40px、heightが50pxに設定されている
      const menuButton = getMenuButton();
      expect(menuButton).toHaveStyle({ width: '40px', height: '50px' });
    });

    test('カーソルがpointerになっている', async () => {
      render(<Close />);
      // MenuButtonにカーソルをpointerにするCSSが設定されている
      expect(getMenuButton()).toHaveStyle({ cursor: 'pointer' });
    });

    test('ホバーすると、Menuの役割がツールチップとして表示される', async () => {
      render(<Close alt="ツールチップのテスト" />);
      // title属性がついているか確認
      // title属性があれば、ブラウザのふるまいでツールチップが表示される
      expect(getMenuButton()).toHaveAttribute('title', 'ツールチップのテスト');
    });
  });
});

describe('MenuItem', () => {
  describe('Active', () => {
    let menuItems: HTMLElement[];

    beforeEach(() => {
      render(<Close />);
      userEvent.click(getMenuButton());
      menuItems = getMenuItems();
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    test('ホバーするとActive状態になる', async () => {
      // 先頭のMenuItemをホバー
      userEvent.hover(menuItems[0]);
      // 先頭のMenuItemがActive状態になる
      expect(menuItems[0]).toHaveFocus();
      // 末尾のMenuItemをホバー
      const lastMenuItem = menuItems[menuItems.length - 1];
      userEvent.hover(lastMenuItem);
      // 末尾のMenuItemがActive状態になる
      expect(lastMenuItem).toHaveFocus();
    });

    test('下矢印を押すと次のMenuItemがActive状態になる', async () => {
      // 以下の動作をMenuItemの個数分繰り返す
      const runAllTimers = jest.runAllTimers;
      for (const item of menuItems) {
        // 下矢印を押す
        await act(async () => {
          await userEvent.keyboard('{arrowdown}');
          runAllTimers();
        });
        // 次ののMenuItemがActive状態になる
        expect(item).toHaveFocus();
      }
    });

    test('上矢印を押すと前のMenuItemがActive状態になる', async () => {
      const runAllTimers = jest.runAllTimers;
      // 以下の操作をMenuItemの個数分繰り返す
      for (const item of menuItems.reverse()) {
        // 上矢印を押す
        await act(async () => {
          await userEvent.keyboard('{arrowup}');
          runAllTimers();
        });
        // 前のMenuItemがActive状態になる
        expect(item).toHaveFocus();
      }
    });

    test('上下矢印でフォーカスループする', async () => {
      const firstMenuItem = menuItems[0];
      const lastMenuItem = menuItems[menuItems.length - 1];
      // 先頭のMenuItemをホバー
      userEvent.hover(firstMenuItem);
      // 先頭のMenuItemがActive状態になる
      expect(firstMenuItem).toHaveFocus();
      // 上矢印を押す
      userEvent.keyboard('{arrowup}');
      // 末尾のMenuItemがActive状態になる
      expect(lastMenuItem).toHaveFocus();
      // 下矢印を押す
      userEvent.keyboard('{arrowdown}');
      // 先頭のMenuItemがActive状態になる
      expect(firstMenuItem).toHaveFocus();
    });
  });

  describe('Action', () => {
    test('MenuLinkItemを押すと、同一タブで遷移する', async () => {
      const url = 'http://cybozu.co.jp/';
      const { getByRole } = render(
        <Close>
          <MenuLinkItem url={url}>link</MenuLinkItem>
        </Close>
      );
      userEvent.click(getMenuButton());
      const menuLinkItem = getByRole('menuitem');
      // aタグであること、URLが設定されていること、同一タブで開く設定がされていることを確認
      expect(menuLinkItem.tagName).toEqual('A');
      expect(menuLinkItem).toHaveAttribute('href', url);
      expect(menuLinkItem).not.toHaveAttribute('rel');
      expect(menuLinkItem).not.toHaveAttribute('target');
      // クリック・エンターで遷移することは、リンクのふるまいのため保証される
    });

    test('MenuLinkItemを押すと、別タブで遷移する', async () => {
      const url = 'http://cybozu.co.jp/';
      const { getByRole } = render(
        <Close>
          <MenuLinkItem url={url} shouldOpenOtherTab>
            link
          </MenuLinkItem>
        </Close>
      );
      userEvent.click(getMenuButton());
      const menuLinkItem = getByRole('menuitem');
      // aタグであること、URLが設定されていること、別タブ遷移の設定がされていることを確認
      expect(menuLinkItem.tagName).toEqual('A');
      expect(menuLinkItem).toHaveAttribute('href', url);
      expect(menuLinkItem).toHaveAttribute('target', '_blank');
      // クリック・エンターで遷移することは、リンクのふるまいのため保証される
    });

    test('MenuActionItemをクリックすると、割り当てられたアクションが実行される', () => {
      const onClickSpy = jest.fn();
      const { getByRole } = render(
        <Close>
          <MenuActionItem onClick={onClickSpy}>button</MenuActionItem>
        </Close>
      );
      // MenuButtonをクリック
      userEvent.click(getMenuButton());
      const menuActionItem = getByRole('menuitem');
      // MenuActionItemをクリック
      userEvent.click(menuActionItem);

      // 割り当てられたアクションが実行される
      expect(onClickSpy).toBeCalled();
      // MenuPopupが閉じる
      expect(getMenuPopup()).toBeNull();
    });

    test('MenuActionItemでエンターを押すと、割り当てられたアクションが実行される', () => {
      const onClickSpy = jest.fn();
      const { getByRole } = render(
        <Close>
          <MenuActionItem onClick={onClickSpy}>button</MenuActionItem>
        </Close>
      );
      // MenuButtonをクリック
      userEvent.click(getMenuButton());
      const menuActionItem = getByRole('menuitem');
      // MenuActionItemにフォーカスした状態でエンター押す
      menuActionItem.focus();
      userEvent.keyboard('{enter}');

      // 割り当てられたアクションが実行される
      expect(onClickSpy).toBeCalled();
      // MenuPopupが閉じる
      expect(getMenuPopup()).toBeNull();
    });

    test('MenuActionItemでスペースを押すと、割り当てられたアクションが実行される', () => {
      const onClickSpy = jest.fn();
      const { getByRole } = render(
        <Close>
          <MenuActionItem onClick={onClickSpy}>button</MenuActionItem>
        </Close>
      );
      // MenuButtonをクリック
      userEvent.click(getMenuButton());
      const menuActionItem = getByRole('menuitem');
      // MenuActionItemにフォーカスした状態でエンター押す
      menuActionItem.focus();
      userEvent.keyboard('{space}');

      // 割り当てられたアクションが実行される
      expect(onClickSpy).toBeCalled();
      // MenuPopupが閉じる
      expect(getMenuPopup()).toBeNull();
    });
  });

  test('エスケープを押すと、MenuPopupがClose状態になる', async () => {
    render(<Close />);
    // MenuButtonをクリック
    userEvent.click(getMenuButton());
    // MenuPopupがOpen状態になる
    expect(getMenuPopup()).toBeVisible();
    // 先頭のMenuItemをホバー
    const menuItem = getMenuItems()[0];
    userEvent.hover(menuItem);
    // 先頭のMenuItemがActive状態になる
    expect(menuItem).toHaveFocus();
    // エスケープを押す
    userEvent.keyboard('{escape}');
    // MenuPopupがClose状態になる
    expect(getMenuPopup()).toBeNull();
    // MenuButtonがFocused状態になる
    expect(getMenuButton()).toHaveFocus();
  });

  test('タブを押すと、MenuPopupがClose状態になる', async () => {
    const { getByRole } = render(
      <>
        <Close />
        <button>dummy</button>
      </>
    );
    // MenuButtonをクリック
    userEvent.click(getMenuButton());
    // MenuPopupがOpen状態になる
    expect(getMenuPopup()).toBeVisible();
    // 先頭のMenuItemをホバー
    const menuItem = getMenuItems()[0];
    userEvent.hover(menuItem);
    // 先頭のMenuItemがActive状態になる
    expect(menuItem).toHaveFocus();
    // タブを押す
    userEvent.tab();
    // MenuPopupがClose状態になる
    expect(getMenuPopup()).toBeNull();
    // 次の要素にフォーカスする
    expect(getByRole('button', { name: 'dummy' })).toHaveFocus();
  });

  test('カーソルがpointerになっている', async () => {
    render(<Close />);
    userEvent.click(getMenuButton());
    // MenuActionItemに、カーソルがpointerになるCSS設定がされている
    expect(screen.getByTestId('menu-action-item')).toHaveStyle({
      cursor: 'pointer'
    });
    // MenuLinkItemはデフォルトがpointerなので保証される
  });
});

describe('triggerOnHover = true', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Hover />);
  });

  describe('マウスホバーしたとき', () => {
    beforeEach(async () => {
      // 初期状態はMenuPopupがClose状態になっている
      expect(getMenuPopup()).toBeNull();
      // MenuButtonにホバー
      userEvent.hover(
        await renderResult.findByRole('button', {
          name: 'ツアーやヘルプを表示する'
        })
      );
    });

    test('ポップアップが表示される', async () => {
      const menuPopup = await renderResult.findByRole('menu');
      // MenuPopupが表示される
      expect(menuPopup).toBeVisible();

      // MenuPopupにホバー
      userEvent.hover(menuPopup);
      // MenuPopupは開いたまま
      expect(menuPopup).toBeVisible();
    });

    test('メニューのクリックでポップアップが非表示になる', async () => {
      // MenuActionItem項目が表示されている
      const menuActionItem = await renderResult.findByRole('menuitem', {
        name: 'メニューアクション項目'
      });
      expect(menuActionItem).toBeVisible();

      // MenuActionItemをクリック
      userEvent.click(menuActionItem);

      // MenuPopupが非表示になる
      await waitFor(() => {
        expect(renderResult.queryByRole('menu')).toBeNull();
      });
    });

    test('マウスアンホバーでポップアップが非表示になる', async () => {
      const menuButton = await renderResult.findByRole('button', {
        name: 'ツアーやヘルプを表示する'
      });
      // MenuPopupが表示される
      expect(await renderResult.findByRole('menu')).toBeVisible();

      // MenuButtonをアンホバー
      userEvent.unhover(menuButton);

      // MenuPopupが非表示になる
      await waitFor(() => {
        expect(renderResult.queryByRole('menu')).toBeNull();
      });
    });

    // hoverでopenした状態でクリックするとtoggleされてcloseになる
    test('MenuButtonをそのままクリックするとポップアップが非表示になる', async () => {
      const menuButton = await renderResult.findByRole('button', {
        name: 'ツアーやヘルプを表示する'
      });
      // MenuPopupが表示される
      expect(await renderResult.findByRole('menu')).toBeVisible();

      // MenuButtonをクリック
      userEvent.click(menuButton);

      // MenuPopupが非表示になる
      await waitFor(() => {
        expect(renderResult.queryByRole('menu')).toBeNull();
      });
    });
  });

  test.each(['enter', 'space'])(
    '%sでMenuPopupが開閉され、割り当てられたアクションが実行される',
    async (key) => {
      // 初期状態はMenuPopupがClose状態になっている
      expect(getMenuPopup()).toBeNull();
      // MenuButtonにフォーカスしてEnter/Spaceを押す
      (
        await renderResult.findByRole('button', {
          name: 'ツアーやヘルプを表示する'
        })
      ).focus();
      userEvent.keyboard(`{${key}}`);

      // MenuPopupが表示される
      expect(await renderResult.findByRole('menu')).toBeVisible();

      // 再度Enter/Spaceを押す
      userEvent.keyboard(`{${key}}`);

      // MenuPopupが非表示になる
      await waitFor(() => {
        expect(renderResult.queryByRole('menu')).toBeNull();
      });
    }
  );
});

describe('a11y', () => {
  const testingStories = {
    ...composeStories(stories),
    ...composeStories(testStories)
  };
  for (const Story of Object.values(testingStories)) {
    assertExists(Story.storyName);
    test(Story.storyName, async () => {
      const { container } = render(<Story />);
      await Story.play?.({ canvasElement: container });
      await checkA11y(container, {
        rules: {
          // Issue解決待ち (https://github.com/dequelabs/axe-core/issues/3758)
          'aria-required-children': { enabled: false }
        }
      });
    });
  }
});

const getMenuButton = () => screen.getByTestId('menu-button');

const getMenuPopup = () => screen.queryByRole('menu');

const getMenuItems = () => screen.getAllByRole('menuitem');
