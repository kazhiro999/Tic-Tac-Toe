import {
  getAllByRole,
  getByText,
  render,
  screen,
  fireEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from '../stories/InputTime.stories';

const { Notation12, Notation24, EmptyOfNotation12 } = composeStories(stories);

const getSupportButton = () => {
  const button = screen.getByText('時刻を選択');
  return button;
};

const getHourEl = () => screen.getAllByRole('spinbutton')[0];

const getMinuteEl = () => screen.getAllByRole('spinbutton')[1];

const getAMPMEl = () => screen.getAllByRole('spinbutton')[2];

describe('MenuPopup', () => {
  describe('MenuPopupの開閉', () => {
    test('HourをクリックするとMenuPopupがOpen状態になる', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // HourをクリックしてMenuPopupを開く
      userEvent.click(getHourEl());
      // MenuPopupが開いていることを確認
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
    });

    test('MinuteをクリックするとMenuPopupがOpen状態になる', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // MinuteをクリックしてMenuPopupを開く
      userEvent.click(getMinuteEl());
      // MenuPopupが開いていることを確認
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
    });

    test('AMPMをクリックするとMenuPopupがOpen状態になる', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // AMPMをクリックしてMenuPopupを開く
      userEvent.click(getAMPMEl());
      // MenuPopupが開いていることを確認
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
    });

    test('MenuPopupの外側をクリックするとMenuPopupがClose状態になる', async () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // HourをクリックしてMenuPopupを開く
      userEvent.click(getHourEl());
      // MenuPopupが開いていることを確認
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
      // MenuPopupの外をクリック
      // useOutsideTargetElementOnClickが10ミリ秒waitしてイベントを発火している
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
      userEvent.click(document.body);
      // MenuPopupが閉じていること
      expect(MenuPopup).not.toBeInTheDocument();
    });
  });

  describe('アクセシビリティ支援用MenuPopup開閉ボタン', () => {
    test('DOM上存在すること', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      const button = getSupportButton();
      // 開閉ボタンがDOM上存在すること
      expect(button).toBeInTheDocument();
    });

    test('上矢印でMenuPopupがOpen状態になる', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      const button = getSupportButton();
      // フォーカスして上矢印キー押下
      button.focus();
      userEvent.keyboard('{arrowup}');
      // MenuPopupがOpen状態になっていること
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
    });

    test('下矢印でMenuPopupがOpen状態になる', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      const button = getSupportButton();
      // フォーカスして下矢印キー押下
      button.focus();
      userEvent.keyboard('{arrowdown}');
      // MenuPopupがOpen状態になっていること
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
    });

    test('エンターでMenuPopupが開閉する', () => {
      jest.useFakeTimers();

      // InputTimeをrender
      render(<Notation12 value="13:00" changeValue={jest.fn()} />);
      const button = getSupportButton();
      // ボタンにフォーカスしてエンターキー押下
      button.focus();
      userEvent.keyboard('{enter}');
      // MenuPopupがOpen状態になっていること
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
      // ボタンにフォーカスしてエンターキー押下
      jest.runAllTimers();
      button.focus();
      userEvent.keyboard('{enter}');
      // MenuPopupがClose状態になっていること
      expect(screen.queryByRole('menu')).toBeNull();

      jest.useRealTimers();
    });

    test('スペースでMenuPopupが開閉する', () => {
      jest.useFakeTimers();

      // InputTimeをrender
      render(<Notation12 value="13:00" changeValue={jest.fn()} />);
      const button = getSupportButton();
      // ボタンにフォーカスしてスペースキー押下
      button.focus();
      userEvent.keyboard('{space}');
      // MenuPopupがOpen状態になっていること
      const MenuPopup = screen.queryByRole('menu');
      expect(MenuPopup).toBeInTheDocument();
      // ボタンにフォーカスしてスペースキー押下
      jest.runAllTimers();
      button.focus();
      userEvent.keyboard('{space}');
      // MenuPopupがClose状態になっていること
      expect(screen.queryByRole('menu')).toBeNull();

      jest.useRealTimers();
    });
  });

  describe('Menuitem', () => {
    test('Menuitemの時刻のフォーマットは h:mm と AM/PM で表記される', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // HourをクリックしてMenuPopupをOpen状態にする
      userEvent.click(getHourEl());
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      // 選択肢の時刻のフォーマットは h:mm と AM/PM で表記されること
      const item = getByText(menu, '0:00 AM');
      expect(item).toBeTruthy(); // menu の中に '0:00 AM' の要素があること
    });

    test('AMPM表記の場合00:00 ~ 11:30を30分毎にMenuitemを表示する', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // HourをクリックしてMenuPopupをOpen状態にする
      userEvent.click(getHourEl());
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      const menuItems = getAllByRole(menu, 'menuitem');
      // AMPM表記の場合00:00 ~ 11:30を30分毎にMenuitemを表示すること
      expect(menuItems.length).toBe(48);
      expect(menuItems[0].textContent).toBe('0:00 AM');
      expect(menuItems[47].textContent).toBe('11:30 PM');
    });

    test('24時間表記の場合00:00 ~ 23:30を30分毎にMenuitemを表示する', () => {
      // InputTimeをrender
      render(<Notation24 value="13:00" />);
      // HourをクリックしてMenuPopupをOpen状態にする
      userEvent.click(getHourEl());
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      const menuItems = getAllByRole(menu, 'menuitem');
      // 24時間表記の場合00:00 ~ 23:30を30分毎にMenuitemを表示すること
      expect(menuItems.length).toBe(48);
      expect(menuItems[0].textContent).toBe('0:00');
      expect(menuItems[47].textContent).toBe('23:30');
    });

    test('MenuPopupをOpen状態にしたときTimeboxの値に近い時刻を中央に表示する', () => {
      // InputTimeをrender
      // Timeboxの値を10:47にする
      const scrollIntoViewMock = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      render(<Notation24 value="10:47" />);
      // HourをクリックしてMenuPopupをOpen状態にする
      userEvent.click(getHourEl());
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      // Timeboxの値に近い時刻を中央に表示するためにscrollInToViewが呼ばれたことを確認
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ block: 'center' });
    });

    test('アクセシビリティ支援用MenuPopup開閉ボタンでMenuPopupをOpenにした場合、Timeboxの値に近い時刻にフォーカスする', () => {
      // InputTimeをrender
      render(<Notation12 value="10:47" />);
      // ボタンにフォーカスしてエンターキー押下
      const button = getSupportButton();
      userEvent.click(button);
      // MenuPopupが開いていることを確認
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      // Timeboxの値に近い時刻のMenuitemにフォーカスがあること
      // 10:30のMenuitemにフォーカスがあることを確認
      const item = getByText(menu, '10:30 AM');
      expect(item).toHaveFocus();
    });

    test('Empty状態でMenuPopupをOpen状態にしたときMenuPopupはスクロールされない', () => {
      // EmptyなInputTimeをrender
      const scrollIntoViewMock = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      render(<EmptyOfNotation12 />);
      // HourをクリックしてMenuPopupをOpen状態にする
      userEvent.click(getHourEl());
      // MenuPopupが開いていることを確認
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      // MenuPopupがスクロールされていないこと
      // 0:00 AMのmenuitemを表示するためにscrollInToViewが呼ばれたことを確認
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    });

    test('Empty状態でアクセシビリティ支援用MenuPopup開閉ボタンでMenuPopupをOpenにした場合、一番上のmenuitemにフォーカスする', () => {
      // EmptyなInputTimeをrender
      render(<EmptyOfNotation12 />);
      // ボタンにフォーカスしてエンターキー押下
      const button = getSupportButton();
      userEvent.click(button);
      // MenuPopupが開いていることを確認
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      // 一番上のMenuitemにフォーカスがあること
      // 0:00 AM のMenuitemにフォーカスがあることで確認
      const item = getByText(menu, '0:00 AM');
      expect(item).toHaveFocus();
    });

    test('Menuitemにホバーするとフォーカスがあたる', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // HourをクリックしてMenuPopupを開く
      userEvent.click(getHourEl());
      expect(screen.queryByRole('menu')).toBeInTheDocument();
      // Menuitemにホバーする
      const menuitems = screen.getAllByRole('menuitem');
      userEvent.hover(menuitems[1]);
      // Menuitemにフォーカスがあたっていること
      expect(menuitems[1]).toHaveFocus();
    });

    test('MenuitemをクリックするとTimeBoxの値にそのMenuitemが選択され、MenuPopupがClose状態になる', () => {
      // InputTimeをrender
      const mockChangeValue = jest.fn();
      render(<Notation12 value="13:00" changeValue={mockChangeValue} />);
      // HourをクリックしてMenuPopupを開く
      userEvent.click(getHourEl());
      expect(screen.queryByRole('menu')).toBeInTheDocument();
      // 上から2番目（0:30 AM）のMenuitemをクリックする
      const menuitems = screen.getAllByRole('menuitem');
      userEvent.click(menuitems[1]);
      // Timeboxの値が0:30 AMになっていること
      // Hour, Minute, AMPMの値と、changeValueが呼ばれた値で確認
      expect(getHourEl()).toHaveValue('00');
      expect(getMinuteEl()).toHaveValue('30');
      expect(getAMPMEl()).toHaveValue('AM');
      expect(mockChangeValue).toBeCalledWith('00:30');
      // MenuPopupがClose状態になっていること
      expect(screen.queryByRole('menu')).toBeNull();
    });

    test('上下矢印キー押下でフォーカスをもつMenuitemが移動する', () => {
      // InputTimeをrender
      render(<Notation12 value="00:00" />);
      // アクセシビリティ支援用MenuPopup開閉ボタンでMenuPopupをOpen状態にする
      const button = getSupportButton();
      button.focus();
      userEvent.keyboard('{enter}');
      expect(screen.queryByRole('menu')).toBeInTheDocument();
      // 上から1番目のMenuitemにフォーカスがあること
      const menu = screen.getByRole('menu');
      const menuItems = getAllByRole(menu, 'menuitem');
      expect(menuItems[0]).toHaveFocus();
      // 下矢印キー押下で上から2番目のMenuitemにフォーカスがあること
      userEvent.keyboard('{arrowdown}');
      expect(menuItems[1]).toHaveFocus();
      // 上矢印キー押下で上から1番目のMenuitemにフォーカスがあること
      userEvent.keyboard('{arrowup}');
      expect(menuItems[0]).toHaveFocus();
      // 上から1番目のMenuitemにフォーカスがある状態で上矢印キー押下すると、一番下のMenuitemにフォーカスを移動する
      userEvent.keyboard('{arrowup}');
      expect(menuItems[47]).toHaveFocus();
      // 一番下のMenuitemにフォーカスがある状態で下矢印キー押下すると、一番上のMenuitemにフォーカスを移動する
      userEvent.keyboard('{arrowdown}');
      expect(menuItems[0]).toHaveFocus();
    });

    test('Home, Endキーでの一番上と下のMenuitemにフォーカス移動する', () => {
      // InputTimeをrender
      render(<Notation12 value="00:00" />);
      // アクセシビリティ支援用MenuPopup開閉ボタンでMenuPopupをOpen状態にする
      const button = getSupportButton();
      button.focus();
      userEvent.keyboard('{enter}');
      expect(screen.queryByRole('menu')).toBeInTheDocument();
      // 上から1番目のMenuitemにフォーカスがあること
      const menu = screen.getByRole('menu');
      const menuItems = getAllByRole(menu, 'menuitem');
      expect(menuItems[0]).toHaveFocus();
      // Endキー押下で一番下のMenuitemにフォーカスが移動すること
      userEvent.keyboard('{end}');
      expect(menuItems[47]).toHaveFocus();
      // Homeキー押下で一番上のMenuitemにフォーカスが移動すること
      userEvent.keyboard('{home}');
      expect(menuItems[0]).toHaveFocus();
    });

    test('Enterキー押下で値がTimeboxに反映され、MenuPopupがClose状態になり、Hourにフォーカスが移る', () => {
      // InputTimeをrender
      const mockChangeValue = jest.fn();
      render(<Notation12 value="00:00" changeValue={mockChangeValue} />);
      // アクセシビリティ支援用MenuPopup開閉ボタンでMenuPopupをOpen状態にする
      const button = getSupportButton();
      button.focus();
      userEvent.keyboard('{enter}');
      expect(screen.queryByRole('menu')).toBeInTheDocument();
      // 上から1番目のMenuitemにフォーカスがあること
      const menu = screen.getByRole('menu');
      const menuItems = getAllByRole(menu, 'menuitem');
      expect(menuItems[0]).toHaveFocus();
      // エンターキーを押す
      // userEventだと動かない
      // TODO: userEvent v14 にアップデートしたらuserEventで動くか確認する
      fireEvent.keyDown(menuItems[1], { key: 'Enter', code: 'Enter' });
      // 現在選択している項目を時刻入力フィールドに反映する
      // Hour, Minute, AMPMの値と、changeValueが呼ばれた値で確認
      expect(screen.getAllByRole('spinbutton')[0]).toHaveValue('00');
      expect(screen.getAllByRole('spinbutton')[1]).toHaveValue('30');
      expect(screen.getAllByRole('spinbutton')[2]).toHaveValue('AM');
      expect(mockChangeValue).toHaveBeenCalledWith('00:30');
      // MenuPopupがClose状態になっていること
      expect(menu).not.toBeInTheDocument();
      // フォーカスがHourにあること
      const hour = screen.getAllByRole('spinbutton')[0];
      expect(hour).toHaveFocus();
    });

    test('Spaceキー押下で値がTimeboxに反映され、MenuPopupがClose状態になり、Hourにフォーカスが移る', () => {
      // InputTimeをrender
      const mockChangeValue = jest.fn();
      render(<Notation12 value="00:00" changeValue={mockChangeValue} />);
      // アクセシビリティ支援用MenuPopup開閉ボタンでMenuPopupをOpen状態にする
      const button = getSupportButton();
      button.focus();
      userEvent.keyboard('{enter}');
      expect(screen.queryByRole('menu')).toBeInTheDocument();
      // 上から1番目のMenuitemにフォーカスがあること
      const menu = screen.getByRole('menu');
      const menuItems = getAllByRole(menu, 'menuitem');
      expect(menuItems[0]).toHaveFocus();
      // Spaceキー押下
      // userEventだと動かない
      // TODO: userEvent v14 にアップデートしたらuserEventで動くか確認する
      fireEvent.keyDown(menuItems[1], { key: ' ', code: 'Space' });
      // 現在選択している項目を時刻入力フィールドに反映する
      // Hour, Minute, AMPMの値と、changeValueが呼ばれた値で確認
      expect(screen.getAllByRole('spinbutton')[0]).toHaveValue('00');
      expect(screen.getAllByRole('spinbutton')[1]).toHaveValue('30');
      expect(screen.getAllByRole('spinbutton')[2]).toHaveValue('AM');
      expect(mockChangeValue).toHaveBeenCalledWith('00:30');
      // MenuPopupがClose状態になっていること
      expect(menu).not.toBeInTheDocument();
      // フォーカスがHourにあること
      const hour = screen.getAllByRole('spinbutton')[0];
      expect(hour).toHaveFocus();
    });

    test('Escキー押下でMenuPopupがClose状態になること', () => {
      // InputTimeをrender
      render(<Notation12 value="13:00" />);
      // アクセシビリティ支援用MenuPopup開閉ボタンでMenuPopupをOpen状態にする
      const button = getSupportButton();
      button.focus();
      userEvent.keyboard('{enter}');
      expect(screen.queryByRole('menu')).toBeInTheDocument();
      // MenuPopupがOpen状態になっていることを確認
      const menu = screen.queryByRole('menu');
      expect(menu).toBeInTheDocument();
      // escキー押下
      userEvent.keyboard('{esc}');
      // MenuPopupがClose状態になっていること
      expect(screen.queryByRole('menu')).toBeNull();
    });
  });
});
