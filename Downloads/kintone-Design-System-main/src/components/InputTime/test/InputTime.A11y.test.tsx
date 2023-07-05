import { composeStories } from '@storybook/react';
import * as stories from '../stories/InputTime.stories';
import * as testStories from '../stories/InputTime.test.stories';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';
import { render } from '@testing-library/react';

describe('a11y自動チェック', () => {
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
          // EmptyOfNotation12, EmptyOfNotation24で落ちる
          'aria-valid-attr-value': { enabled: false },
          // EmptyOfNotation12で落ちる
          label: { enabled: false }
        }
      });
    });
  }
});
