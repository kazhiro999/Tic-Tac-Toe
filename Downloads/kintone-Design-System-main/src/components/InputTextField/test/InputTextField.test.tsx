import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from '../stories/InputTextField.stories';
import * as testStories from '../stories/InputTextField.test.stories';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';

const { Normal } = composeStories(stories);

const InputTextField = Normal;

describe('InputTextField', () => {
  test('指定されたlabelがInputTextのアクセシブルな名前になる(Labelが表示される場合)', () => {
    // Labelを表示したInputTextFieldを描画する
    const label = 'label';
    render(<InputTextField label={label} labelShown />);
    // InputTextのアクセシブルな名前が、指定された値であることを確認する
    expect(getInputText()).toHaveAccessibleName(label);
  });

  test('指定されたlabelがInputTextのアクセシブルな名前になる(Labelが表示されない場合)', () => {
    // Labelを表示しないInputTextFieldを描画する
    const label = 'label';
    render(<InputTextField label={label} labelShown={false} />);
    // InputTextのアクセシブルな名前が、指定された値であることを確認する
    expect(getInputText()).toHaveAccessibleName(label);
  });

  test('HelperTextがInputTextのアクセシブルな説明になる(Successの場合)', () => {
    // SuccessのHelperTextを表示したInputTextFieldを描画する
    const successMessage = 'success';
    render(<InputTextField successMessage={successMessage} />);
    // InputTextのアクセシブルな説明が、HelperTextの文字列であることを確認する
    expect(getInputText()).toHaveAccessibleDescription(successMessage);
  });

  test('HelperTextがInputTextのアクセシブルな説明になる(Errorの場合)', () => {
    // ErrorのHelperTextを表示したInputTextFieldを描画する
    const errorMessage = 'error';
    render(<InputTextField errorMessage={errorMessage} />);
    // InputTextのアクセシブルな説明が、HelperTextの文字列であることを確認する
    expect(getInputText()).toHaveAccessibleDescription(errorMessage);
    // InputTextが不正な値であることが支援技術に通知されていることを確認する
    expect(getInputText()).toBeInvalid();
  });

  test('入力必須であることがマークアップされている', () => {
    // 入力必須のInputTextFieldを描画する
    render(<InputTextField required />);
    // 入力必須であることがマークアップされていることを確認する
    expect(getInputText()).toBeRequired();
  });

  test('入力必須でないことがマークアップされている', () => {
    // 入力必須のInputTextFieldを描画する
    render(<InputTextField required={false} />);
    expect(getInputText()).not.toBeRequired();
  });

  const getInputText = () => {
    return screen.getByRole('textbox');
  };

  describe('a11y', () => {
    const testingStories = {
      ...composeStories(stories),
      ...composeStories(testStories)
    };
    for (const Story of Object.values(testingStories)) {
      assertExists(Story.storyName);
      test(Story.storyName, async () => {
        const { container } = await render(<Story />);
        await Story.play?.({ canvasElement: container });
        await checkA11y(container);
      });
    }
  });
});
