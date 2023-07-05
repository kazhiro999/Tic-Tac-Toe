import { userEvent } from '@storybook/testing-library';
import { composeStories } from '@storybook/react';
import { render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { Checkbox } from '..';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';
import * as stories from '../stories/Checkbox.stories';
import * as testStories from '../stories/Checkbox.test.stories';

describe('Checkbox', () => {
  const CHECKBOX_TESTID = 'checkbox';
  const LABEL_TEXT_TESTID = 'checkbox-label-text';
  const INPUT_TESTID = 'checkbox-input';

  type TestProps = {
    initialValue: boolean;
    disabled?: boolean;
    label?: string;
    alternativeText?: string;
  };

  const TestCheckbox: React.VFC<TestProps> = ({
    initialValue,
    label,
    disabled,
    alternativeText
  }) => {
    const [checked, setChecked] = useState(initialValue);
    const changeValue = (_: string, value: boolean) => setChecked(value);
    return (
      <Checkbox
        name="test"
        label={label}
        alternativeText={alternativeText}
        value={checked}
        changeValue={changeValue}
        disabled={disabled}
        testId={CHECKBOX_TESTID}
        inputTestId={INPUT_TESTID}
        labelTextTestId={LABEL_TEXT_TESTID}
      />
    );
  };

  describe('disabledでないとき', () => {
    let checkboxEl: HTMLElement;
    let checkboxInputEl: HTMLInputElement;
    let checkboxLabelTextEl: HTMLElement;

    beforeEach(() => {
      // Checkbox(Unchecked)を描画
      const { getByTestId } = render(
        <TestCheckbox label="option" initialValue={false} />
      );
      checkboxEl = getByTestId(CHECKBOX_TESTID);
      checkboxInputEl = getByTestId(INPUT_TESTID) as HTMLInputElement;
      checkboxLabelTextEl = getByTestId(LABEL_TEXT_TESTID);
    });

    it('inputをマウスクリックすると状態が切り替わる', async () => {
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
      // Checkbox Inputをクリック
      userEvent.click(checkboxInputEl);
      // CheckboxがChecked状態であること
      expect(checkboxInputEl).toBeChecked();
      // Checkbox inputをクリック
      userEvent.click(checkboxInputEl);
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
    });
    it('labelをマウスクリックすると状態が切り替わる', async () => {
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
      // Checkbox Label(文字列部分)をクリック
      userEvent.click(checkboxLabelTextEl);
      // CheckboxがChecked状態であること
      expect(checkboxInputEl).toBeChecked();
      // Checkbox Label(文字列部分)をクリック
      userEvent.click(checkboxInputEl);
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
    });
    it('マウスホバーするとカーソルがpointerになる', async () => {
      await waitFor(() => checkboxEl);
      // CSSでcursor:pointerが指定されていること
      expect(checkboxEl).toHaveStyle({ cursor: 'pointer' });
    });
    it('フォーカスしてスペースキーを押すと状態が切り替わる', async () => {
      // Checkbox Inputにフォーカス
      checkboxInputEl.focus();
      // スペースキーを押す
      userEvent.keyboard('{space}');
      // CheckboxがChecked状態であること
      expect(checkboxInputEl).toBeChecked();
    });
  });

  describe('disabledのとき', () => {
    let checkboxEl: HTMLElement;
    let checkboxInputEl: HTMLInputElement;
    let checkboxLabelTextEl: HTMLElement;

    beforeEach(() => {
      // Checkbox(Unchecked Disabled)を描画
      const { getByTestId } = render(
        <TestCheckbox label="option" initialValue={false} disabled />
      );
      checkboxEl = getByTestId(CHECKBOX_TESTID);
      checkboxInputEl = getByTestId(INPUT_TESTID) as HTMLInputElement;
      checkboxLabelTextEl = getByTestId(LABEL_TEXT_TESTID);
    });

    it('inputをマウスクリックしても状態が切り替わらない', async () => {
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
      // Checkbox Inputをクリック
      userEvent.click(checkboxInputEl);
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
    });
    it('labelをマウスクリックしても状態が切り替わらない', async () => {
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
      // Checkbox Inputをクリック
      userEvent.click(checkboxLabelTextEl);
      // CheckboxがUnchecked状態であること
      expect(checkboxInputEl).not.toBeChecked();
    });
    it('inputをマウスホバーするとカーソルがnot-allowedになる', async () => {
      await waitFor(() => checkboxEl);
      // CSSでcursor:not-allowedが指定されていること
      expect(checkboxEl).toHaveStyle({ cursor: 'not-allowed' });
    });
    it('inputにフォーカスできない', async () => {
      // Checkbox Inputにフォーカスしようとする
      checkboxInputEl.focus();
      // Checkboxにフォーカスできない
      expect(checkboxInputEl).not.toHaveFocus();
    });
  });

  describe('スクリーンリーダー', () => {
    it('ラベルがあるときCheckboxのラベルが読み上げられる', async () => {
      const label = 'option';
      // Checkbox(Unchecked、ラベルあり)を描画
      const { getByTestId } = render(
        <TestCheckbox label={label} initialValue={false} />
      );
      // CheckboxのAccessible NameがLabel(文字列)と一致している
      expect(getByTestId(INPUT_TESTID)).toHaveAccessibleName(label);
    });
    it('ラベルがないときCheckboxのツールチップが読み上げられる', async () => {
      const alternativeText = 'title';
      // Checkbox(Unchecked、ラベルなし、ツールチップあり)を描画
      const { getByTestId } = render(
        <TestCheckbox alternativeText={alternativeText} initialValue={false} />
      );
      // CheckboxのAccessible Nameがツールチップ(文字列)と一致している
      expect(getByTestId(INPUT_TESTID)).toHaveAccessibleName(alternativeText);
    });
  });
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
      await checkA11y(container);
    });
  }
});
