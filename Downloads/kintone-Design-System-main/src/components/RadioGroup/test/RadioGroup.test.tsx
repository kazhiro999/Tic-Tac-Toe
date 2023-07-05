import * as stories from '../stories/RadioGroup.stories';
import * as toggleRadioGroupStories from '../stories/ToggleRadioGroup.stories';
import { render } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { composeStories } from '@storybook/react';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

const { Normal, Disabled } = composeStories(stories);
const { ToggleRadioGroup } = composeStories(toggleRadioGroupStories);

describe('RadioGroup', () => {
  describe('Disabledではないとき', () => {
    test('マウスクリックですべてのRadioButtonが操作でき、その他がUnchecked状態に', () => {
      // ToggleRadioGroupでテスト
      const { getAllByRole } = render(<ToggleRadioGroup />);
      const radioButtons = getAllByRole('radio');
      for (let i = 0; i < radioButtons.length; i++) {
        // 初めの状態でUncheckedであることを確認
        expect(radioButtons[i]).not.toBeChecked();
        userEvent.click(radioButtons[i]);
        for (let j = 0; j < radioButtons.length; j++) {
          if (i === j) {
            // クリックしたものはChecked状態になっていること
            expect(radioButtons[j]).toBeChecked();
          } else {
            // クリックしていないものはUnchecked状態になっていること
            expect(radioButtons[j]).not.toBeChecked();
          }
        }
      }
    });

    test('スペースキー押下ですべてのRadioButtonが操作でき、その他がUnchecked状態に', () => {
      // ToggleRadioGroupでテスト
      const { getAllByRole } = render(<ToggleRadioGroup />);
      const radioButtons = getAllByRole('radio');
      for (let i = 0; i < radioButtons.length; i++) {
        // 初めの状態でUncheckedであることを確認
        expect(radioButtons[i]).not.toBeChecked();
        radioButtons[i].focus();
        userEvent.keyboard('{space}');
        for (let j = 0; j < radioButtons.length; j++) {
          if (i === j) {
            // クリックしたものはChecked状態になっていること
            expect(radioButtons[j]).toBeChecked();
          } else {
            // クリックしていないものはUnchecked状態になっていること
            expect(radioButtons[j]).not.toBeChecked();
          }
        }
      }
    });
  });

  describe('Disabledのとき', () => {
    test('マウスクリックですべてのRadioButtonが操作不可で、changeValueが呼ばれない', () => {
      const changeValueSpy = jest.fn();
      // Disabledでテスト
      const { getAllByRole } = render(
        <Disabled changeValue={changeValueSpy} />
      );
      const radioButtons = getAllByRole('radio');
      for (const Radio of radioButtons) {
        userEvent.click(Radio);
        expect(changeValueSpy).not.toHaveBeenCalled();
      }
    });

    test('スペースキー押下ですべてのRadioButtonが操作不可で、changeValueが呼ばれない', () => {
      const changeValueSpy = jest.fn();
      // Disabledでテスト
      const { getAllByRole } = render(
        <Disabled changeValue={changeValueSpy} />
      );
      const radioButtons = getAllByRole('radio');
      for (const Radio of radioButtons) {
        Radio.focus();
        expect(Radio).not.toHaveFocus();
        userEvent.keyboard('{space}');
        expect(changeValueSpy).not.toHaveBeenCalled();
      }
    });
  });

  describe('name属性の引き渡し', () => {
    test('子のRadioにもname属性にgroupNameが引き渡されるか', () => {
      const groupName = 'group-name';
      // Normalでテスト
      const { getAllByRole } = render(<Normal groupName={groupName} />);
      const radioButtons = getAllByRole('radio');
      for (const Radio of radioButtons) {
        expect(Radio).toHaveAttribute('name', groupName);
      }
    });
  });

  describe('a11y', () => {
    const testingStories = {
      ...composeStories(stories),
      ...composeStories(toggleRadioGroupStories)
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
