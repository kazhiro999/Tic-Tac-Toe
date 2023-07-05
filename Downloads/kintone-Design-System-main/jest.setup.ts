import '@testing-library/jest-dom';
import './jest.axe-helper';
import { ignoreReactActWarning } from './src/functions/testing/ignoreReactActWarning';

let cleanupIgnoreWarning: VoidFunction;

beforeAll(() => {
  // IconButtonコンポーネントはfocus/blurで内部状態を変えるためactなしの動作が起きやすい
  // テスト内容に影響はないのでwarningから除外しておく
  cleanupIgnoreWarning = ignoreReactActWarning('IconButton');
});

afterAll(() => {
  cleanupIgnoreWarning();
});
