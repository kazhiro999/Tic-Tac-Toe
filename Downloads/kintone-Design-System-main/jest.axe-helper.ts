import { configureAxe, toHaveNoViolations } from 'jest-axe';

// axeのGlobal Optionsの設定
// 以下で設定したoptionsがすべてのストーリーで検証される
// 設定できるOptionsについては、「Axe API Documentation」の「axe.run」 > 「Options Parameter」を参照：
// https://www.deque.com/axe/core-documentation/api-documentation/#user-content-api-name-axerun
// ルールの一覧は以下を参照： https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
const axe = configureAxe({
  // WCAG2.0のレベルa、WCAG2.1のレベルAのルールを有効にする
  runOnly: ['wcag2a', 'wcag21a'],
  rules: {
    // 以下のルールは、ページ全体に対してのチェック項目のため無効にする
    bypass: { enabled: false },
    'document-title': { enabled: false },
    'html-has-lang': { enabled: false },
    'html-lang-valid': { enabled: false },
    'html-xml-lang-mismatch': { enabled: false },
    'meta-refresh': { enabled: false },
    // Iconのsvgタグでid属性が使われている。同じIconを複数回使うとid重複エラーになる。
    // 本来はid属性値はユニークでなければならないが、Iconが大量にありid属性を消してまわるのはたいへんなためルールを無効にする。
    'duplicate-id': { enabled: false },
    // 以下のルールは、axeのBest Practices Rulesの内、ImpactがSeriousかCriticalのもの
    // 深刻度が高いためルールを有効にする
    // ただし、ページ全体に対してのチェック項目（accesskeys/meta-viewport）は除外
    'aria-dialog-name': { enabled: true },
    'aria-treeitem-name': { enabled: true },
    'frame-tested': { enabled: true },
    'frame-title-unique': { enabled: true },
    'label-title-only': { enabled: true },
    'scope-attr-valid': { enabled: true },
    tabindex: { enabled: true },
    // 以下のルールは、axeのBest Practices Rulesの内、深刻度は高くないが重要と判断したもの
    'aria-allowed-role': { enabled: true },
    'empty-heading': { enabled: true },
    'heading-order': { enabled: true }
  }
});

expect.extend(toHaveNoViolations);

/**
 * axeによるアクセシビリティ自動チェックを行う。
 * 違反した場合、問題の概要・該当するHTML・解決方法の概要・詳細ドキュメントのURLをコンソールに出力する。
 *
 * @param html コンポーネントをrenderしたHTML
 * @param options axeのoptions。GlobalのOptionsを個別で上書きする場合に指定。See: https://www.deque.com/axe/core-documentation/api-documentation/#user-content-options-parameter
 */
export const checkA11y = async (html: Element | string, options?: object) => {
  const result = await axe(html, options);
  expect(result).toHaveNoViolations();
};
