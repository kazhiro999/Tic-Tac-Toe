import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';
import { designTokens } from '../designTokens';

// TODO: createGlobalStyle を使うと、Prettierが効かない
export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    height: ${theme.kintoneHtml.height};
    &:lang(en) {
      font-family: ${designTokens.fonts.family.en};
    }
    &:lang(ja) {
      font-family: ${designTokens.fonts.family.ja};
    }
    &:lang(zh) {
      font-family: ${designTokens.fonts.family.zh};
    }
    &:lang(zh-TW) {
      font-family: ${designTokens.fonts.family.zhTW};
    }
  }

  body {
    margin: ${theme.kintoneBody.margin};
    padding: ${theme.kintoneBody.padding};
    height: ${theme.kintoneBody.height};
    min-width: ${theme.kintoneBody.minWidth};
    background-color: ${theme.kintoneBody.backgroundColor};
    color:  ${theme.kintoneBody.color};
    word-wrap: ${theme.kintoneBody.wordWrap};
    font-size: ${theme.kintoneBody.fontSize};
    line-height: ${theme.kintoneBody.lineHeight};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  ul, ol, li {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
  }

  select,
  input,
  button {
    :lang(en) & {
      font-family: ${designTokens.fonts.family.en};
    }
    font-size: ${designTokens.fonts.size[5]};
    line-height: 1.5;
  }

  a {
    color: ${designTokens.colors.curiousBlue};
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${designTokens.colors.darkenCuriousBlue10};
      cursor: pointer;
    }
  }

`;
