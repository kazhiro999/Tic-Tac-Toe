module.exports = {
  plugins: {
    '@textlint/markdown': {
      extensions: ['.mdx']
    }
  },
  filters: {
    allowlist: {
      allow: [
        // 属性の値など、HTMLタグ内はチェックしない
        '/<[^]*?>/',
        // コメントはチェックしない
        '/\\{\\/\\*[^]*?\\*\\/\\}/'
      ]
    }
  },
  rules: {
    'preset-ja-technical-writing': {
      // 読点をは3つまで
      'max-ten': true,
      // 敬体と常体を混在させない
      'no-mix-dearu-desumasu': {
        preferInHeader: '',
        preferInBody: 'ですます',
        preferInList: 'ですます'
      },
      // 文末に句点（。）またはコロン（：）をつける
      'ja-no-mixed-period': {
        periodMark: '。',
        allowPeriodMarks: ['：']
      },
      // 二重否定は使用しない
      'no-double-negative-ja': true,
      // ら抜き言葉を使用しない
      'no-dropping-the-ra': true,
      // 以下のルールは無効にする（今後徐々に制約を強めていく）
      'sentence-length': false,
      'no-unmatched-pair': false,
      'max-comma': false,
      'max-kanji-continuous-len': false,
      'arabic-kanji-numbers': false,
      'no-doubled-conjunctive-particle-ga': false,
      'no-doubled-conjunction': false,
      'no-doubled-joshi': false,
      'no-nfd': false,
      'no-invalid-control-character': false,
      'no-zero-width-spaces': false,
      'no-exclamation-question-mark': false,
      'no-hankaku-kana': false,
      'ja-no-weak-phrase': false,
      'ja-no-successive-word': false,
      'ja-no-abusage': false,
      'ja-no-redundant-expression': false,
      'ja-unnatural-alphabet': false
    },
    'preset-ja-spacing': {
      // 半角文字と全角文字の間にスペースを入れない
      'ja-space-between-half-and-full-width': true,
      // 以下のルールは無効にする（今後徐々に制約を強めていく）
      'ja-no-space-between-full-width': false,
      'ja-nakaguro-or-halfwidth-space-between-katakana': false,
      'ja-no-space-around-parentheses': false,
      'ja-space-after-exclamation': false,
      'ja-space-after-question': false,
      'ja-space-around-code': false
    }
  }
};
