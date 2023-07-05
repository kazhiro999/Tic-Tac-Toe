import { render } from '@testing-library/react';
import * as stories from '../stories/IconLink.stories';
import * as testStories from '../stories/IconLink.test.stories';
import { composeStories } from '@storybook/react';
import { assertExists } from '../../../functions/asserts/assertExists';
import { checkA11y } from '../../../../jest.axe-helper';
import type { IconLinkProps } from '../index';
import { userEvent } from '@storybook/testing-library';

const IconLink = composeStories(stories).Normal;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const normalArgs = stories.Normal.args!;

describe('IconLink', () => {
  const renderIconLink = async (props: Partial<IconLinkProps> = {}) => {
    const { findByRole, rerender, ...rest } = render(<IconLink {...props} />);
    return [
      // link要素として取得
      await findByRole('link'),
      {
        findByRole,
        rerender: (rerenderProps: Partial<IconLinkProps> = {}) =>
          rerender(<IconLink {...rerenderProps} />),
        ...rest
      }
    ] as const;
  };

  describe('要素', () => {
    it('リンクになっている', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink();
      // IconLinkが表示されていることを確認
      expect(iconLink).toBeInTheDocument();
    });

    it('リンク先が指定したURLになっている', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink();
      // hrefを確認
      expect(iconLink).toHaveAttribute('href', normalArgs.url);
      // デフォルトの属性(target,relが付与されていない状態)を確認
      expect(iconLink).not.toHaveAttribute('target');
      expect(iconLink).not.toHaveAttribute('rel');
    });

    it('Iconの代替テキストがスクリーンリーダーに読み上げられる', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink();
      // アクセシブルな名前を確認する
      expect(iconLink).toHaveAccessibleName(normalArgs.alternativeText);
    });

    it('Tabキーでフォーカスできる', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink();
      // tabキー
      userEvent.tab();
      // フォーカスを確認
      expect(iconLink).toHaveFocus();
    });

    it('shouldOpenOtherTabを指定するとblankで開く', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink({ shouldOpenOtherTab: true });
      // target='_blank'が指定されている
      expect(iconLink).toHaveAttribute('target', '_blank');
    });

    it('externalSiteを指定すると外部サイト向けにnoopener noreferrerが付与される', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink({ externalSite: true });
      // noopener noreferrerが付与されている
      expect(iconLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('shouldFocusでfocusできる', async () => {
      // IconLinkを描画する
      const [iconLink, { rerender }] = await renderIconLink();
      // 未指定ではフォーカスされていない
      expect(iconLink).not.toHaveFocus();
      const spyFn = jest.fn();
      // shouldFocusを指定して更新
      rerender({ shouldFocus: true, clearShouldFocus: spyFn });
      // フォーカスされていることを確認
      expect(iconLink).toHaveFocus();
      // clearShouldFocusが呼び出されることも確認
      expect(spyFn).toHaveBeenCalled();
    });

    it('click時にonTrackingEventが呼び出される', async () => {
      const spyFn = jest.fn();
      // IconLinkを描画する
      const [iconLink] = await renderIconLink({
        onTrackingEvent: spyFn
      });
      // IconLinkをクリックする
      userEvent.click(iconLink);
      // onTrackingEventの呼び出しを確認
      expect(spyFn).toHaveBeenCalled();
    });
  });

  describe('見た目', () => {
    it('任意の幅・高さを設定できる', async () => {
      // 幅40px、高さ50px、Icon幅20px、Icon高さ30pxを指定して描画する
      const [iconLink, { findByRole }] = await renderIconLink({
        width: 40,
        height: 50,
        iconWidth: 20,
        iconHeight: 30
      });
      // CSSでIconLinkのwidthが40px、heightが50pxに設定されている
      expect(iconLink).toHaveStyle({ width: '40px', height: '50px' });
      // CSSでIconLink内Iconのwidthが20px、heightが30pxに設定されている
      expect(
        await findByRole('img', { name: normalArgs.alternativeText })
      ).toHaveStyle({ width: '20px', height: '30px' });
    });

    // FIXME kintone-ui内のstyleとして実装するか (現在はユーザエージェントスタイルに依存)
    it.skip('カーソルがpointerになっている', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink();
      // IconLinkにカーソルをpointerにするCSSが設定されている
      expect(iconLink).toHaveStyle({ cursor: 'pointer' });
    });

    it('ホバーすると、IconLinkの役割がツールチップとして表示される', async () => {
      // IconLinkを描画する
      const [iconLink] = await renderIconLink();
      // title属性がついているか確認
      // title属性があれば、ブラウザのふるまいでツールチップが表示される
      expect(iconLink).toHaveAttribute('title', normalArgs.alternativeText);
    });
  });

  describe('a11y', () => {
    const testingStories = {
      ...composeStories(stories),
      ...composeStories(testStories)
    };
    for (const Story of Object.values(testingStories)) {
      assertExists(Story.storyName);
      it(Story.storyName, async () => {
        const { container } = await render(<Story />);
        await Story.play?.({ canvasElement: container });
        await checkA11y(container);
      });
    }
  });
});
