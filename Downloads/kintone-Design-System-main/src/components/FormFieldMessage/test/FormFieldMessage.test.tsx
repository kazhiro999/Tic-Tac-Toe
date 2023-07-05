import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';
import * as stories from '../stories/FormFieldMessage.stories';
import * as testStories from '../stories/FormFieldMessage.test.stories';

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
