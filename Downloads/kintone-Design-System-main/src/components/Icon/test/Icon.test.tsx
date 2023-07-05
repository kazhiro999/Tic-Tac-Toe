import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as testStories from '../stories/Icon.test.stories';

const { SvgIcon, SvgIconWithNoAlt, ImgIcon } = composeStories(testStories);

describe('Icon', () => {
  test('指定した代替テキストが、SvgIconのNameに設定されている', () => {
    const { getByRole } = render(<SvgIcon />);
    expect(getByRole('img')).toHaveAccessibleName('ホーム');
  });

  test('代替テキストを指定しないと、SvgIconが支援技術に認識されない', () => {
    const { queryByRole } = render(<SvgIconWithNoAlt />);
    expect(queryByRole('img')).toBeNull();
  });

  test('指定した代替テキストが、ImgIconのNameに設定されている', () => {
    const { getByRole } = render(<ImgIcon />);
    expect(getByRole('img')).toHaveAccessibleName('アプリ');
  });
});
