import * as stories from '../stories/Spinner.stories';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

const { WithAltText, WithoutAltText } = composeStories(stories);

describe('Spinner', () => {
  it('altTextが指定された場合、aria-labelがレンダリングされ、aria-hiddenは存在しない', () => {
    // Forbidden non-null assertionを回避するため、WithAltText.argsが存在するか確認する
    if (WithAltText.args) {
      // Spinnerコンポーネントをレンダリングし、altTextを指定する
      const { getByRole } = render(<WithAltText />);
      // img要素を取得する
      const spinner = getByRole('img');
      // imgのaria-labelが指定したaltTextと一致することを確認する
      expect(spinner.getAttribute('aria-label')).toBe(WithAltText.args.altText);
      // imgのaria-hiddenが存在しないことを確認する
      expect(spinner.getAttribute('aria-hidden')).toBeNull();
    }
  });

  it('altTextが指定されていない場合、aria-labelなしでレンダリングされ、aria-hiddenはtrue', () => {
    // Spinnerコンポーネントをレンダリングし、altTextを指定しない
    const { getByRole } = render(<WithoutAltText />);
    // img要素を取得する
    const spinner = getByRole('img', { hidden: true });
    // imgのaria-labelが存在しないことを確認する
    expect(spinner.getAttribute('aria-label')).toBeNull();
    // imgのaria-hiddenがtrueであることを確認する
    expect(spinner.getAttribute('aria-hidden')).toBe('true');
  });
});
