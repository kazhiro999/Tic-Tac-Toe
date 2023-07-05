import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputTimeProps } from '..';
import * as currentTime from '../../../functions/datetime/getCurrentTime';
import { composeStories } from '@storybook/react';
import * as stories from '../stories/InputTime.stories';

const { Notation12, Notation24, EmptyOfNotation12, EmptyOfNotation24 } =
  composeStories(stories);

describe('Timebox', () => {
  let changeValue: jest.Mock<InputTimeProps['changeValue']>;

  beforeEach(() => {
    changeValue = jest.fn();
  });

  describe('表示確認', () => {
    test('12時間表記で00:00の時、00:00 AMと表示される', async () => {
      render(<Notation12 value="00:00" />);
      const timebox = screen.getAllByRole('spinbutton');
      // Hour/Minute/AMPMの3つ表示されること
      expect(timebox.length).toBe(3);
      // Hourの値は00
      expect(timebox[0]).toHaveValue('00');
      // Minuteの値は00
      expect(timebox[1]).toHaveValue('00');
      // AMPMの値はAM
      expect(timebox[2]).toHaveValue('AM');
    });

    test('12時間表記で11:59の時、11:59 AMと表示される', async () => {
      render(<Notation12 value="11:59" />);
      const timebox = screen.getAllByRole('spinbutton');
      // Hour/Minute/AMPMの3つ表示されること
      expect(timebox.length).toBe(3);
      // Hourの値は11
      expect(timebox[0]).toHaveValue('11');
      // Minuteの値は59
      expect(timebox[1]).toHaveValue('59');
      // AMPMの値はAM
      expect(timebox[2]).toHaveValue('AM');
    });

    test('12時間表記で12:00の時、00:00 PMと表示される', async () => {
      render(<Notation12 value="12:00" />);
      const timebox = screen.getAllByRole('spinbutton');
      // Hour/Minute/AMPMの3つ表示される
      expect(timebox.length).toBe(3);
      // Hourの値は00
      expect(timebox[0]).toHaveValue('00');
      // Minuteの値は00
      expect(timebox[1]).toHaveValue('00');
      // AMPMの値はPM
      expect(timebox[2]).toHaveValue('PM');
    });

    test('12時間表記で23:59の時、11:59 PMと表示される', async () => {
      render(<Notation12 value="23:59" />);
      const timebox = screen.getAllByRole('spinbutton');
      // Hour/Minute/AMPMの3つ表示されること
      expect(timebox.length).toBe(3);
      // Hourの値は11
      expect(timebox[0]).toHaveValue('11');
      // Minuteの値は59
      expect(timebox[1]).toHaveValue('59');
      // AMPMの値はPM
      expect(timebox[2]).toHaveValue('PM');
    });

    test('24時間表記の時00:00と表示される', async () => {
      render(<Notation24 value="00:00" />);
      const timebox = screen.getAllByRole('spinbutton');
      // HourとMinuteの2つ表示されること
      expect(timebox.length).toBe(2);
      // Hourの値は00
      expect(timebox[0]).toHaveValue('00');
      // Minuteの値は00
      expect(timebox[1]).toHaveValue('00');
    });

    test('24時間表記の時23:59と表示される', async () => {
      render(<Notation24 value="23:59" />);
      const timebox = screen.getAllByRole('spinbutton');
      // HourとMinuteの2つ表示されること
      expect(timebox.length).toBe(2);
      // Hourの値が23
      expect(timebox[0]).toHaveValue('23');
      // Minuteの値は59
      expect(timebox[1]).toHaveValue('59');
    });
  });

  describe('Emptyの時', () => {
    beforeEach(() => {
      // Emptyの場合、初期値の入力に現在時刻を用いるためmockする
      jest
        .spyOn(currentTime, 'getCurrentTime')
        .mockReturnValue({ hour: '14', minute: '53' });
    });

    describe('12時間表記の時', () => {
      let hour: HTMLElement;
      let minute: HTMLElement;
      let ampm: HTMLElement;

      beforeEach(() => {
        render(<EmptyOfNotation12 changeValue={changeValue} />);
        [hour, minute, ampm] = screen.getAllByRole('spinbutton');
      });

      test('Hour/Minute/AMPMが空欄になっている', async () => {
        expect(hour).toHaveValue('');
        expect(minute).toHaveValue('');
        expect(ampm).toHaveValue('');
      });

      test('Hourを入力すると、現在時刻がMinuteとAMPMに自動入力される', async () => {
        // Hourに1を入力
        userEvent.type(hour, '1');
        // 現在時刻は14:53で固定
        // 01:53 PMと入力されていること
        expect(hour).toHaveValue('01');
        expect(minute).toHaveValue('53');
        expect(ampm).toHaveValue('PM');
        // changeValueが呼ばれ、アプリケーション側に 13:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('13:53');
      });

      test('Minuteを入力すると、現在時刻がHourとAMPMに自動入力される', async () => {
        // Minuteに1と入力
        userEvent.type(minute, '1');
        // 現在時刻は14:53で固定
        // 02:01 PMと入力されること
        expect(hour).toHaveValue('02');
        expect(minute).toHaveValue('01');
        expect(ampm).toHaveValue('PM');
        // changeValueが呼ばれ、アプリケーション側に 12:01 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('14:01');
      });

      test('AMPMをAMに切り替えると、現在時刻がHourとMinuteに自動入力される', async () => {
        // AMPMにaを入力→AMが入力される
        // userEventだと動かない
        // TODO: userEvent v14 にアップデートしたらuserEventで動くか確認する
        fireEvent.keyDown(ampm, { key: 'a', code: 'KeyA' });
        // 現在時刻は14:53で固定
        // 02:53 AMと入力されること
        expect(hour).toHaveValue('02');
        expect(minute).toHaveValue('53');
        expect(ampm).toHaveValue('AM');
        // changeValueが呼ばれ、アプリケーション側に 02:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('02:53');
      });

      test('AMPMをPMに切り替えると、現在時刻がHourとMinuteに自動入力される', async () => {
        // AMPMにpを入力→PMが入力される
        // userEventだと動かない
        // TODO: userEvent v14 にアップデートしたらuserEventで動くか確認する
        fireEvent.keyDown(ampm, { key: 'p', code: 'KeyP' });
        // 現在時刻は14:53で固定
        // 2:53 PMと入力されること
        expect(hour).toHaveValue('02');
        expect(minute).toHaveValue('53');
        expect(ampm).toHaveValue('PM');
        // changeValueが呼ばれ、アプリケーション側に 14:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('14:53');
      });

      test('Hourにフォーカスして上矢印を押すと、現在時刻がMinute/AMPMに自動入力される', async () => {
        // Hourにフォーカスして上矢印を押す
        hour.focus();
        userEvent.keyboard('{ArrowUp}');
        // 現在時刻は14:53で固定
        // Emptyの時に上矢印を押すと、02が入力される
        // 01:53 PMと入力されていること
        expect(hour).toHaveValue('01');
        expect(minute).toHaveValue('53');
        expect(ampm).toHaveValue('PM');
        // changeValueが呼ばれ、アプリケーション側に 13:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('13:53');
      });

      test('Hourにフォーカスして下矢印を押すと、現在時刻がMinute/AMPMに自動入力される', async () => {
        // Hourにフォーカスして下矢印を押す
        hour.focus();
        userEvent.keyboard('{ArrowDown}');
        // 現在時刻は14:53で固定
        // Emptyの時に下矢印を押すと、11が入力される
        // 11:53 PMと入力されていること
        expect(hour).toHaveValue('11');
        expect(minute).toHaveValue('53');
        expect(ampm).toHaveValue('PM');
        // changeValueが呼ばれ、アプリケーション側に 23:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('23:53');
      });

      test('Minuteにフォーカスして上矢印を押すと、現在時刻がHour/AMPMに自動入力される', async () => {
        // Minuteにフォーカスして上矢印を押す
        minute.focus();
        userEvent.keyboard('{ArrowUp}');
        // 現在時刻は14:53で固定
        // Emptyの時に上矢印を押すと、02が入力される
        // 02:01 PMと入力されていること
        expect(hour).toHaveValue('02');
        expect(minute).toHaveValue('01');
        expect(ampm).toHaveValue('PM');
        // changeValueが呼ばれ、アプリケーション側に 14:01 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('14:01');
      });

      test('Minuteにフォーカスして下矢印を押すと、現在時刻がHour/AMPMに自動入力される', async () => {
        // Minuteにフォーカスして下矢印を押す
        minute.focus();
        userEvent.keyboard('{ArrowDown}');
        // 現在時刻は14:53で固定
        // Emptyの時に下矢印を押すと、59が入力される
        // 02:59 PMと入力されていること
        expect(hour).toHaveValue('02');
        expect(minute).toHaveValue('59');
        expect(ampm).toHaveValue('PM');
        // changeValueが呼ばれ、アプリケーション側に 14:59 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('14:59');
      });

      test('AMPMにフォーカスし上矢印を押すと、現在時刻がHourとMinuteに自動入力される', async () => {
        // AMPMにフォーカスし、上矢印を押す
        // userEventだと動かない
        // TODO: userEvent v14 にアップデートしたらuserEventで動くか確認する
        fireEvent.keyDown(ampm, { key: 'ArrowUp', code: 'ArrowUp' });
        // 現在時刻は14:53で固定
        // Emptyの時に上矢印を押すとAMに切り替わる
        // 02:53 PMと入力されること
        expect(hour).toHaveValue('02');
        expect(minute).toHaveValue('53');
        expect(ampm).toHaveValue('AM');
        // changeValueが呼ばれ、アプリケーション側に 02:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('02:53');
      });

      test('AMPMにフォーカスし下矢印を押すと、現在時刻がHourとMinuteに自動入力される', async () => {
        // AMPMにフォーカスし、下矢印を押す
        // userEventだと動かない
        // TODO: userEvent v14 にアップデートしたらuserEventで動くか確認する
        fireEvent.keyDown(ampm, { key: 'ArrowDown', code: 'ArrowDown' });
        // 現在時刻は14:53で固定
        // Emptyの時に下矢印を押すとAMに切り替わる
        // 02:53 PMと入力されること
        expect(hour).toHaveValue('02');
        expect(minute).toHaveValue('53');
        expect(ampm).toHaveValue('AM');
        // changeValueが呼ばれ、アプリケーション側に 02:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('02:53');
      });
    });

    describe('24時間表記の時', () => {
      let hour: HTMLElement;
      let minute: HTMLElement;

      beforeEach(() => {
        render(<EmptyOfNotation24 changeValue={changeValue} />);
        [hour, minute] = screen.getAllByRole('spinbutton');
      });

      test('Hour/Minuteが空欄になっている', async () => {
        expect(hour).toHaveValue('');
        expect(minute).toHaveValue('');
      });

      test('Hourに入力すると、現在時刻がMinuteに自動入力される', async () => {
        // Hourに1と入力
        userEvent.type(hour, '1');
        // 現在時刻は14:53で固定
        // 01:53と入力されること
        expect(hour).toHaveValue('01');
        expect(minute).toHaveValue('53');
        // changeValueが呼ばれ、アプリケーション側に 01:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('01:53');
      });

      test('Minuteに入力すると、現在時刻がHourに自動入力される', async () => {
        // Minuteに1と入力
        userEvent.type(minute, '1');
        // 現在時刻は14:53で固定
        // 14:01と入力されること
        expect(hour).toHaveValue('14');
        expect(minute).toHaveValue('01');
        // changeValueが呼ばれ、アプリケーション側に 14:01 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('14:01');
      });

      test('Hourにフォーカスし上矢印を押すと、現在時刻がMinuteに自動入力される', async () => {
        // Hourにフォーカスして上矢印を押す
        hour.focus();
        userEvent.keyboard('{ArrowUp}');
        // 現在時刻は14:53で固定
        // Emptyの時に上矢印を押すと01が入力される
        // 01:53が入力されること
        expect(hour).toHaveValue('01');
        expect(minute).toHaveValue('53');
        // changeValueが呼ばれ、アプリケーション側に 01:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('01:53');
      });

      test('Hourにフォーカスし下矢印を押すと、現在時刻がMinuteに自動入力される', async () => {
        // Hourにフォーカスして下矢印を押す
        hour.focus();
        userEvent.keyboard('{ArrowDown}');
        // 現在時刻は14:53で固定
        // Emptyの時に下矢印を押すと23が入力される
        // 23:53が入力されること
        expect(hour).toHaveValue('23');
        expect(minute).toHaveValue('53');
        // changeValueが呼ばれ、アプリケーション側に 23:53 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('23:53');
      });

      test('Minuteにフォーカスし上矢印を押すと、現在時刻がHourに自動入力される', async () => {
        // Minuteにフォーカスして上矢印を押す
        minute.focus();
        userEvent.keyboard('{ArrowUp}');
        // 現在時刻は14:53で固定
        // Emptyの時に上矢印を押すと01が入力される
        // 14:01が入力されること
        expect(hour).toHaveValue('14');
        expect(minute).toHaveValue('01');
        // changeValueが呼ばれ、アプリケーション側に 14:01 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('14:01');
      });

      test('Minuteにフォーカスし下矢印を押すと、現在時刻がHourに自動入力される', async () => {
        // Minuteにフォーカスして下矢印を押す
        minute.focus();
        userEvent.keyboard('{ArrowDown}');
        // 現在時刻は14:53で固定
        // Emptyの時に下矢印を押すと59が入力される
        // 14:59が入力されること
        expect(hour).toHaveValue('14');
        expect(minute).toHaveValue('59');
        // changeValueが呼ばれ、アプリケーション側に 14:59 が渡される
        expect(changeValue).toBeCalledTimes(1);
        expect(changeValue).toBeCalledWith('14:59');
      });
    });
  });

  describe('Hourの入力', () => {
    describe('上下矢印', () => {
      test('Hourにフォーカスして上矢印を押すと +1 される', async () => {
        render(<Notation12 value="10:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは10:33
        // Hourにフォーカスし、上矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowup}');
        // changeValueが呼ばれ、アプリケーション側に 11:33 が渡される
        expect(changeValue).toBeCalledWith('11:33');
      });

      test('Hourにフォーカスして下矢印を押すと -1 される', async () => {
        render(<Notation12 value="10:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは10:33
        // Hourにフォーカスし下矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowdown}');
        // changeValueが呼ばれ、アプリケーション側に 09:33 が渡される
        expect(changeValue).toBeCalledWith('09:33');
      });

      test('12時間表記でAM且つHourが 11 の時、Hourにフォーカスして上矢印を押すと 00 AM になる', async () => {
        render(<Notation12 value="11:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは11:33 AM
        // Hourにフォーカスし上矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowup}');
        // changeValueが呼ばれ、アプリケーション側に 00:33 が渡される
        expect(changeValue).toBeCalledWith('00:33');
      });

      test('12時間表記でAM且つHourが 00 の時、Hourにフォーカスして下矢印を押すと 11 AM になる', async () => {
        render(<Notation12 value="00:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは00:33 AM
        // Hourにフォーカスして下矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowdown}');
        // changeValueが呼ばれ、アプリケーション側に 11:33 が渡される
        expect(changeValue).toBeCalledWith('11:33');
      });

      test('12時間表記でPM且つHourが 11 の時、Hourにフォーカスして上矢印を押すと 00 PM になる', async () => {
        render(<Notation12 value="23:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは11:33 PM
        // Hourにフォーカスし上矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowup}');
        // changeValueが呼ばれ、アプリケーション側に 12:33 が渡される
        expect(changeValue).toBeCalledWith('12:33');
      });

      test('12時間表記でPM且つHourが 00 の時、Hourにフォーカスして下矢印を押すと 11 PM になる', async () => {
        render(<Notation12 value="12:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは00:33 PM
        // Hourにフォーカスして下矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowdown}');
        // changeValueが呼ばれ、アプリケーション側に 23:33 が渡される
        expect(changeValue).toBeCalledWith('23:33');
      });

      test('24時間表記でHourが 23 の時、Hourにフォーカスして上矢印を押すと 00 になる', async () => {
        render(<Notation24 value="23:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは23:33
        // Hourにフォーカスし上矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowup}');
        // changeValueが呼ばれ、アプリケーション側に 00:33 が渡される
        expect(changeValue).toBeCalledWith('00:33');
      });

      test('24時間表記でHourが 00 の時、Hourにフォーカスして下矢印を押すと 23 になる', async () => {
        render(<Notation24 value="00:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは00:33
        // Hourにフォーカスし下矢印を押す
        hour.focus();
        userEvent.keyboard('{arrowdown}');
        // changeValueが呼ばれ、アプリケーション側に 23:33 が渡される
        expect(changeValue).toBeCalledWith('23:33');
      });
    });

    describe('Homeキーサポート', () => {
      test('12時間表記の時Homeキー押下でHourに00が入力される', () => {
        render(<Notation12 value="11:50" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは11:50 AM
        // HourにフォーカスしHomeキー押下
        hour.focus();
        userEvent.keyboard('{home}');
        // Hourの値が00になっていること
        expect(hour).toHaveValue('00');
        // changeValueが呼ばれ、アプリケーション側に 00:50がわたされること
        expect(changeValue).toBeCalledWith('00:50');
      });
      test('24時間表記の時Homeキー押下でHourに00が入力される', () => {
        render(<Notation24 value="17:50" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは17:50
        // HourにフォーカスしHomeキー押下
        hour.focus();
        userEvent.keyboard('{home}');
        // Hourの値が00になっていること
        expect(hour).toHaveValue('00');
        // changeValueが呼ばれ、アプリケーション側に 00:50がわたされること
        expect(changeValue).toBeCalledWith('00:50');
      });
    });

    describe('Endキーサポート', () => {
      test('12時間表記の時Endキー押下でHourに11が入力される', () => {
        render(<Notation12 value="10:50" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは10:50 AM
        // HourにフォーカスしEndキー押下
        hour.focus();
        userEvent.keyboard('{end}');
        // Hourの値が11になっていること
        expect(hour).toHaveValue('11');
        // changeValueが呼ばれ、アプリケーション側に 11:50がわたされること
        expect(changeValue).toBeCalledWith('11:50');
      });
      test('24時間表記の時Endキー押下でHourに23が入力される', () => {
        render(<Notation24 value="17:50" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは17:50
        // HourにフォーカスしEndキー押下
        hour.focus();
        userEvent.keyboard('{end}');
        // Hourの値が23になっていること
        expect(hour).toHaveValue('23');
        // changeValueが呼ばれ、アプリケーション側に 23:50がわたされること
        expect(changeValue).toBeCalledWith('23:50');
      });
    });

    describe('文字入力', () => {
      test('数値以外の文字列は入力できない', async () => {
        render(<Notation12 value="01:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        userEvent.type(hour, 'test');
        expect(changeValue).not.toBeCalled();
      });

      test('バックスペースを押すと 00 にクリアされる', async () => {
        render(<Notation12 value="01:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは01:33 AM
        // Hourにフォーカスしてバックスペースを押す
        hour.focus();
        userEvent.keyboard('{backspace}');
        // changeValueが呼ばれ、アプリケーション側に 00:33 が渡される
        expect(changeValue).toBeCalledWith('00:33');
      });

      test('入力した数値が1の位に表示される', async () => {
        render(<Notation12 value="00:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは00:33 AM
        // Hourに1と入力
        userEvent.type(hour, '1');
        // changeValueが呼ばれ、アプリケーション側に 01:33 が渡される
        expect(changeValue).toBeCalledWith('01:33');
      });

      test('すでに入力がある場合は、次の文字を入力すると1の位の値が10の位の値にスライドして表示される', async () => {
        render(<Notation12 value="01:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // InputTimeTextは01:33 AM
        // Hourに1と入力
        userEvent.type(hour, '1');
        // changeValueが呼ばれ、アプリケーション側に 11:33 が渡される
        expect(changeValue).toBeCalledWith('11:33');
      });

      test('12時間表記の場合、表示される値が12以上になる時は10の位が0になる', async () => {
        render(<Notation12 value="01:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // InputTimeTextは01:33 AM
        // Hourに2と入力
        userEvent.type(hour, '2');
        // changeValueが呼ばれ、アプリケーション側に 02:33 が渡される
        expect(changeValue).toBeCalledWith('02:33');
      });

      test('24時間表記の場合、表示される値が24以上の時10の位が0になる', async () => {
        render(<Notation24 value="02:33" changeValue={changeValue} />);
        const hour = screen.getAllByRole('spinbutton')[0];
        // TimeInputTextは02:33
        // Hourに4と入力
        userEvent.type(hour, '4');
        // changeValueが呼ばれ、アプリケーション側に 04:33 が渡される
        expect(changeValue).toBeCalledWith('04:33');
      });
    });
  });

  describe('Minuteの入力', () => {
    describe('上下矢印', () => {
      test('Minuteにフォーカスして上矢印を押すと +1 される', async () => {
        render(<Notation12 value="01:33" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは01:33 AM
        // Minuteにフォーカスして上矢印を押す
        minute.focus();
        userEvent.keyboard('{arrowup}');
        // changeValueが呼ばれ、アプリケーション側に 01:34 が渡される
        expect(changeValue).toBeCalledWith('01:34');
      });

      test('Minuteにフォーカスして下矢印を押すと -1 される', async () => {
        render(<Notation12 value="01:33" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは01:33 AM
        // Minuteにフォーカスして下矢印を押す
        minute.focus();
        userEvent.keyboard('{arrowdown}');
        // changeValueが呼ばれ、アプリケーション側に 01:32 が渡される
        expect(changeValue).toBeCalledWith('01:32');
      });

      test('Minuteが 59 の時、Minuteににフォーカスして上矢印を押すと 00 になる', async () => {
        render(<Notation12 value="01:59" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは01:59 AM
        // Minuteにフォーカスして上矢印を押す
        minute.focus();
        userEvent.keyboard('{arrowup}');
        // changeValueが呼ばれ、アプリケーション側に 01:00 が渡される
        expect(changeValue).toBeCalledWith('01:00');
      });

      test('Minuteが 00 の時に、Minuteにフォーカスして下矢印を押すと 59 になる', async () => {
        render(<Notation12 value="01:00" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは01:00 AM
        // Minuteにフォーカスして下矢印を押す
        minute.focus();
        userEvent.keyboard('{arrowdown}');
        // changeValueが呼ばれ、アプリケーション側に 01:59 が渡される
        expect(changeValue).toBeCalledWith('01:59');
      });
    });
    describe('Home/Endキーサポート', () => {
      test('Homeキー押下でMinuteに00が入力される', () => {
        render(<Notation12 value="11:50" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは11:50 AM
        // minuteにフォーカスしHomeキー押下
        minute.focus();
        userEvent.keyboard('{home}');
        // minuteの値が00になっていること
        expect(minute).toHaveValue('00');
        // changeValueが呼ばれ、アプリケーション側に 11:00がわたされること
        expect(changeValue).toBeCalledWith('11:00');
      });

      test('Endキー押下でMinuteに59が入力される', () => {
        render(<Notation12 value="10:50" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは10:50 AM
        // MinuteにフォーカスしEndキー押下
        minute.focus();
        userEvent.keyboard('{end}');
        // Minuteの値が59になっていること
        expect(minute).toHaveValue('59');
        // changeValueが呼ばれ、アプリケーション側に 10:59がわたされること
        expect(changeValue).toBeCalledWith('10:59');
      });
    });

    describe('文字入力', () => {
      test('数字以外の文字は入力できない', async () => {
        render(<Notation12 changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[0];
        userEvent.type(minute, 'test');
        expect(changeValue).not.toBeCalled();
      });

      test('バックスペースを押すと 00 になる', async () => {
        render(<Notation12 value="11:33" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは11:33 AM
        // Minuteにフォーカスしてバックスペースを押す
        minute.focus();
        userEvent.keyboard('{backspace}');
        // changeValueが呼ばれ、アプリケーション側に 11:00 が渡される
        expect(changeValue).toBeCalledWith('11:00');
      });

      test('入力した数値が1の位に表示される', async () => {
        render(<Notation12 value="11:00" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは11:00 AM
        // Minuteに1と入力
        userEvent.type(minute, '1');
        // changeValueが呼ばれ、アプリケーション側に 11:01 が渡される
        expect(changeValue).toBeCalledWith('11:01');
      });

      test('すでに入力がある場合は、次の文字を入力すると1の位の値が10の位の値にスライドして表示される', async () => {
        render(<Notation12 value="11:33" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは11:33 AM
        // Minuteに5と入力
        userEvent.type(minute, '5');
        // changeValueが呼ばれ、アプリケーション側に 11:35 が渡される
        expect(changeValue).toBeCalledWith('11:35');
      });

      test('表示される値が60以上の場合10の位が0になる', async () => {
        render(<Notation12 value="11:36" changeValue={changeValue} />);
        const minute = screen.getAllByRole('spinbutton')[1];
        // TimeInputTextは11:36 AM
        // Minuteに0と入力
        userEvent.type(minute, '0');
        // changeValueが呼ばれ、アプリケーション側に 11:00 が渡される
        expect(changeValue).toBeCalledWith('11:00');
      });
    });
  });

  describe('AMPMの入力', () => {
    test('上矢印が入力された場合現在時刻+12:00した値になる', async () => {
      render(<Notation12 value="01:33" changeValue={changeValue} />);
      const ampm = screen.getAllByRole('spinbutton')[2];
      // TimeInputTextは01:33 AM
      // AMPMにフォーカスし上矢印を押す
      ampm.focus();
      userEvent.keyboard('{arrowup}');
      // changeValueが呼ばれ、アプリケーション側に 13:33 が渡される
      expect(changeValue).toBeCalledWith('13:33');
    });

    test('下矢印が入力された場合現在時刻-12:00した値になる', async () => {
      render(<Notation12 value="23:33" changeValue={changeValue} />);
      const ampm = screen.getAllByRole('spinbutton')[2];
      // TimeInputTextは11:33 PM
      // AMPMにフォーカスし下矢印を押す
      ampm.focus();
      userEvent.keyboard('{arrowdown}');
      // changeValueが呼ばれ、アプリケーション側に 11:33 が渡される
      expect(changeValue).toBeCalledWith('11:33');
    });

    test('a/pを入力するとAM/PMに切り替わる', async () => {
      render(<Notation12 value="23:33" changeValue={changeValue} />);
      const ampm = screen.getAllByRole('spinbutton')[2];
      // TimeInputTextは11:33 PM
      // AMPMにaを入力
      userEvent.type(ampm, 'a');
      // changeValueが呼ばれ、アプリケーション側に 11:33 が渡される
      expect(changeValue).toBeCalledWith('11:33');
      // AMPMにpを入力
      userEvent.type(ampm, 'p');
      // changeValueが呼ばれ、アプリケーション側に 23:33 が渡される
      expect(changeValue).toBeCalledWith('23:33');
    });

    test('A/Pを入力するとAM/PMに切り替わる', async () => {
      render(<Notation12 value="23:33" changeValue={changeValue} />);
      const ampm = screen.getAllByRole('spinbutton')[2];
      // TimeInputTextは11:33 PM
      // AMPMにaを入力
      userEvent.type(ampm, 'A');
      // changeValueが呼ばれ、アプリケーション側に 11:33 が渡される
      expect(changeValue).toBeCalledWith('11:33');
      // AMPMにpを入力
      userEvent.type(ampm, 'P');
      // changeValueが呼ばれ、アプリケーション側に 23:33 が渡される
      expect(changeValue).toBeCalledWith('23:33');
    });
  });

  describe('フォーカス移動', () => {
    describe('12時間表記', () => {
      let hour: HTMLElement;
      let minute: HTMLElement;
      let ampm: HTMLElement;

      beforeEach(() => {
        render(<Notation12 />);
        [hour, minute, ampm] = screen.getAllByRole('spinbutton');
      });

      test('タブキーでHour⇔Minute⇔AMPMの順にフォーカスが移動すること', async () => {
        // HourをクリックするとHourにフォーカスする
        userEvent.click(hour);
        expect(hour).toHaveFocus();
        // タブキーを押すとMinuteにフォーカスする
        userEvent.tab();
        expect(minute).toHaveFocus();
        // タブキーを押すとAMPMにフォーカスする
        userEvent.tab();
        expect(ampm).toHaveFocus();
        // シフトタブを押すとMinuteにフォーカスする
        userEvent.tab({ shift: true });
        expect(minute).toHaveFocus();
        // シフトタブを押すとHourにフォーカスする
        userEvent.tab({ shift: true });
        expect(hour).toHaveFocus();
      });

      test('左右矢印で Hour⇔Minute⇔AMPMの順にフォーカスが移動する', async () => {
        // HourをクリックするとHourにフォーカスする
        userEvent.click(hour);
        expect(hour).toHaveFocus();
        // 右矢印を押すとMinuteにフォーカスする
        userEvent.keyboard('{arrowright}');
        expect(minute).toHaveFocus();
        // 右矢印を押すとAMPMにフォーカスする
        userEvent.keyboard('{arrowright}');
        expect(ampm).toHaveFocus();
        // 右矢印を押してもフォーカスはAMPMのまま
        userEvent.keyboard('{arrowright}');
        expect(ampm).toHaveFocus();
        // 左矢印を押すとMinuteにフォーカスする
        userEvent.keyboard('{arrowleft}');
        expect(minute).toHaveFocus();
        // 左矢印を押すとHourにフォーカスする
        userEvent.keyboard('{arrowleft}');
        expect(hour).toHaveFocus();
        // 左矢印を押してもフォーカスはHourにのこったまま
        userEvent.keyboard('{arrowleft}');
        expect(hour).toHaveFocus();
      });

      test('エンターでHour→Minute→AMPMの順にフォーカスが移動できる', async () => {
        // HourをクリックするとHourにフォーカスする
        userEvent.click(hour);
        expect(hour).toHaveFocus();
        // エンターを押すとMinuteにフォーカスする
        userEvent.type(hour, '{enter}');
        expect(minute).toHaveFocus();
        // エンターを押すとAMPMにフォーカスする
        userEvent.type(minute, '{enter}');
        expect(ampm).toHaveFocus();
        // エンターを押してもフォーカスはAMPMにのこったまま
        userEvent.type(ampm, '{enter}');
        expect(ampm).toHaveFocus();
      });
    });

    describe('24時間表記', () => {
      let hour: HTMLElement;
      let minute: HTMLElement;

      beforeEach(() => {
        render(<Notation24 />);
        [hour, minute] = screen.getAllByRole('spinbutton');
      });

      test('タブキーでHour⇔Minuteの順にフォーカスが移動すること', async () => {
        // HourをクリックするとHourにフォーカスする
        userEvent.click(hour);
        expect(hour).toHaveFocus();
        // タブキーを押すとMinuteにフォーカスする
        userEvent.tab();
        expect(minute).toHaveFocus();
        // シフトタブを押すとHourにフォーカスする
        userEvent.tab({ shift: true });
        expect(hour).toHaveFocus();
      });

      test('左右矢印で Hour⇔Minuteの順にフォーカスが移動する', async () => {
        // HourをクリックするとHourにフォーカスする
        userEvent.click(hour);
        expect(hour).toHaveFocus();
        // 右矢印を押すとMinuteにフォーカスする
        userEvent.keyboard('{arrowright}');
        expect(minute).toHaveFocus();
        // 右矢印を押してもフォーカスはMinuteのまま
        userEvent.keyboard('{arrowright}');
        expect(minute).toHaveFocus();
        // 左矢印を押すとHourにフォーカスする
        userEvent.keyboard('{arrowleft}');
        expect(hour).toHaveFocus();
        // 左矢印を押してもフォーカスはHourにのこったまま
        userEvent.keyboard('{arrowleft}');
        expect(hour).toHaveFocus();
      });

      test('エンターでHour→Minuteの順にフォーカスが移動できる', async () => {
        // HourをクリックするとHourにフォーカスする
        userEvent.click(hour);
        expect(hour).toHaveFocus();
        // エンターを押すとMinuteにフォーカスする
        userEvent.type(hour, '{enter}');
        expect(minute).toHaveFocus();
        // エンターを押してもフォーカスはAMPMにのこったまま
        userEvent.type(minute, '{enter}');
        expect(minute).toHaveFocus();
      });
    });
  });
});
