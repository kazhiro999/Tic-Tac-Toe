import * as stories from '../stories/Breadcrumb.stories';
import * as testStories from '../stories/Breadcrumb.test.stories';
import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { BreadcrumbStructure } from '../modules/types';
import { checkA11y } from '../../../../jest.axe-helper';
import { assertExists } from '../../../functions/asserts/assertExists';

const breadcrumbStructure: BreadcrumbStructure = {
  portalUrl: '/portal',
  items: [
    { label: 'app', href: '/app' },
    { label: 'setting', href: '/setting' },
    { label: 'Now Page', current: true }
  ]
};

const { Normal } = composeStories(stories);

test('Home Linkにアプリケーション側から指定されたurlが設定されており、同一タブで遷移する', async () => {
  const { getByRole } = render(
    <Normal breadcrumbStructure={breadcrumbStructure} />
  );
  const homeLink = getByRole('link', { name: 'ポータル' });
  // 指定したurlが設定されていること
  expect(homeLink).toHaveAttribute('href', breadcrumbStructure.portalUrl);
  // 同一タブで開くよう設定されていること
  expect(homeLink).not.toHaveAttribute('rel');
  expect(homeLink).not.toHaveAttribute('target');
  // マウスクリックおよびエンターによる画面遷移は、リンクが提供するふるまいのため保証される
});

test('Breadcrumb Itemの各リンクにアプリケーション側から渡されたurlが設定されており、同一タブで遷移する', async () => {
  const { getAllByRole } = render(
    <Normal breadcrumbStructure={breadcrumbStructure} />
  );
  const links = getAllByRole('link');
  links.shift();
  for (let i = 0; i < links.length; i++) {
    // 各リンクにアプリケーション側から渡されたurlが設定されていること
    expect(links[i]).toHaveAttribute('href', breadcrumbStructure.items[i].href);
    // 同一タブで開くよう設定されていること
    expect(links[i]).not.toHaveAttribute('rel');
    expect(links[i]).not.toHaveAttribute('target');
    // マウスクリックおよびエンターによる画面遷移は、リンクが提供するふるまいのため保証される
  }
});

test('最後のBreadcrumb Itemに、現在ページを表す属性がマークアップされている', async () => {
  const { getAllByRole } = render(
    <Normal breadcrumbStructure={breadcrumbStructure} />
  );
  // 最後のBreadcrumb Itemを取得
  const listItems = getAllByRole('listitem');
  const lastBreadcrumbItem = listItems[listItems.length - 1];
  // 現在ページであることを支援技術につたえる属性が設定されていること
  expect(lastBreadcrumbItem.firstChild).toHaveAttribute('aria-current', 'page');
});

test('Breadcrumb Itemのlinkにホバーするとツールチップが表示される', async () => {
  const { getAllByRole } = render(<Normal />);
  // すべてのBreadcrumb Itemのリンクを取得
  const links = getAllByRole('link');
  links.shift();
  for (const link of links) {
    // title属性がついていること
    // ブラウザのふるまいで、ホバー時にツールチップが表示される
    expect(link).toHaveAttribute('title');
  }
});

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
