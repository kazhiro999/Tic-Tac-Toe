import * as stories from '../stories/Radio.stories';
import * as testStories from '../stories/Radio.test.stories';
import { render } from '@testing-library/react';
import { Radio, RadioProps } from '..';
import { userEvent } from '@storybook/testing-library';
import { composeStories } from '@storybook/react';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

describe('Radio', () => {
  const renderRadio = ({
    value,
    label,
    name,
    checked,
    disabled,
    changeValue
  }: Partial<RadioProps<string>>) => {
    const dataTestId = 'dataTestId';
    const inputDataTestId = 'inputDataTestId';
    const labelDataTestId = 'labelDataTestId';
    const { getByTestId } = render(
      <Radio
        value={value || 'sample'}
        label={label || 'label'}
        name={name || 'name'}
        checked={!!checked}
        disabled={!!disabled}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeValue={changeValue || (() => {})}
        dataTestId={dataTestId}
        inputDataTestId={inputDataTestId}
        labelDataTestId={labelDataTestId}
      />
    );
    return {
      el: getByTestId(dataTestId),
      inputEl: getByTestId(inputDataTestId),
      labelEl: getByTestId(labelDataTestId)
    };
  };

  describe('Disabledではないとき', () => {
    test('タブフォーカスできる（Unchecked状態の場合）', () => {
      // Unchecked状態のラジオボタンを描画する
      const { inputEl } = renderRadio({ checked: false });
      // タブフォーカスする
      userEvent.tab();
      // RadioButtonInputにフォーカスしたことを確認する
      expect(inputEl).toHaveFocus();
    });

    test('タブフォーカスできる（Checked状態の場合）', () => {
      // Checked状態のラジオボタンを描画する
      const { inputEl } = renderRadio({ checked: true });
      // タブフォーカスする
      userEvent.tab();
      // RadioButtonInputにフォーカスしたことを確認する
      expect(inputEl).toHaveFocus();
    });

    test('RadioButtonInputをクリックするとchangeValueが実行される', () => {
      // changeValueを準備する
      const value = 'value';
      const changeValueSpy = jest.fn();
      // ラジオボタンを描画する
      const { inputEl } = renderRadio({ value, changeValue: changeValueSpy });
      // RadioButtonInputをクリックする
      userEvent.click(inputEl);
      // changeValueが実行されたことを確認する
      expect(changeValueSpy).toHaveBeenCalledWith(value);
    });

    test('RadioButtonLabelをクリックするとchangeValueが実行される', () => {
      // changeValueを準備する
      const value = 'value';
      const changeValueSpy = jest.fn();
      // ラジオボタンを描画する
      const { labelEl } = renderRadio({
        value,
        changeValue: changeValueSpy
      });
      // RadioButtonをクリックする
      userEvent.click(labelEl);
      // changeValueが実行されたことを確認する
      expect(changeValueSpy).toHaveBeenCalledWith(value);
    });

    test('RadioButtonInputにフォーカスしてスペースキーを押すとchangeValueが実行される', () => {
      // changeValueを準備する
      const value = 'value';
      const changeValueSpy = jest.fn();
      // ラジオボタンを描画する
      const { inputEl } = renderRadio({ value, changeValue: changeValueSpy });
      // RadioButtonInputにフォーカスする
      inputEl.focus();
      // スペースキーを押す
      userEvent.keyboard('{space}');
      // changeValueが実行されたことを確認する
      expect(changeValueSpy).toHaveBeenCalledWith(value);
    });

    describe('カーソル', () => {
      test('pointer', async () => {
        // ラジオボタンを描画する
        const { el, inputEl } = renderRadio({});
        // カーソルが'pointer'であることを確認する
        expect(el).toHaveStyle({ cursor: 'pointer' });
        expect(inputEl).toHaveStyle({ cursor: 'pointer' });
      });
    });
  });

  describe('Disabledのとき', () => {
    test('タブフォーカスできない', () => {
      // Disabled状態のラジオボタンを描画する
      const { inputEl } = renderRadio({ disabled: true });
      // タブフォーカスする
      userEvent.tab();
      // RadioButtonInputにフォーカスしていないことを確認する
      expect(inputEl).not.toHaveFocus();
    });

    test('スクリプトでフォーカスできない', () => {
      // Disabled状態のラジオボタンを描画する
      const { inputEl } = renderRadio({ disabled: true });
      // スクリプトでフォーカスする
      inputEl.focus();
      // RadioButtonInputにフォーカスしていないことを確認する
      expect(inputEl).not.toHaveFocus();
    });

    test('RadioButtonInputをクリックしてもchangeValueが実行されない', () => {
      // changeValueを準備する
      const changeValueSpy = jest.fn();
      // Disabled状態のラジオボタンを描画する
      const { inputEl } = renderRadio({
        disabled: true,
        changeValue: changeValueSpy
      });
      // RadioButtonInputをクリックする
      userEvent.click(inputEl);
      // changeValueが実行されていないことを確認する
      expect(changeValueSpy).not.toHaveBeenCalled();
    });

    test('RadioButtonLabelをクリックしてもchangeValueが実行されない', () => {
      // changeValueを準備する
      const changeValueSpy = jest.fn();
      // Disabled状態のラジオボタンを描画する
      const { labelEl } = renderRadio({
        disabled: true,
        changeValue: changeValueSpy
      });
      // RadioButtonLabelをクリックする
      userEvent.click(labelEl);
      // changeValueが実行されていないことを確認する
      expect(changeValueSpy).not.toHaveBeenCalled();
    });

    describe('カーソル', () => {
      test('not-allowed', async () => {
        // Disabled状態のラジオボタンを描画する
        const { el, inputEl } = renderRadio({ disabled: true });
        // カーソルが'not-allowed'であることを確認する
        expect(el).toHaveStyle({ cursor: 'not-allowed' });
        expect(inputEl).toHaveStyle({ cursor: 'not-allowed' });
      });
    });
  });

  // このコードは@testing-library v12.1.5でArrowDownが利かないため実行不可です。
  // issue: https://github.com/testing-library/user-event/issues/843 が出されており、
  // pull request: https://github.com/testing-library/user-event/issues/843 によりv14.3.0で修正されました。
  // テストにはRadioGroupのToggleRadioGroupを用いています。
  // describe('複数のRadioを並べた際の矢印キーによる操作', () => {
  //   test('下矢印キー押下時に、2番目がChecked、その他がUncheckedに、3回目押下時に、1番目がChecked、その他がUncheckedに', () => {
  //     const { getAllByRole } = render(<ToggleRadioGroup />);
  //     const radioButtons = getAllByRole('radio');
  //     userEvent.tab();
  //     expect(radioButtons[0]).toHaveFocus();
  //     userEvent.keyboard('{space}');
  //     expect(radioButtons[0]).toBeChecked();
  //     screen.debug();
  //     userEvent.keyboard('{ArrowDown}');

  //     userEvent.type(radioButtons[0], '{arrowdown}');
  //     fireEvent.keyDown(radioButtons[0], {
  //       key: 'ArrowDown',
  //       code: 'ArrowDown'
  //     });
  //     expect(radioButtons[0]).not.toBeChecked();
  //     expect(radioButtons[1]).toHaveFocus();
  //     expect(radioButtons[1]).toBeChecked();
  //   });

  //   test('右矢印キー押下時に、2番目がChecked、その他がUncheckedに、3回目押下時に、1番目がChecked、その他がUncheckedに', () => {});
  //   test('上矢印キー押下時に、3番目がChecked、その他がUncheckedに、3回目押下時に、1番目がChecked、その他がUncheckedに', () => {});
  //   test('左矢印キー押下時に、3番目がChecked、その他がUncheckedに、3回目押下時に、1番目がChecked、その他がUncheckedに', () => {});
  // });

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
        await checkA11y(container);
      });
    }
  });
});
