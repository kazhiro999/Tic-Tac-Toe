import { assertExists, visibleForTesting } from '../assertExists';
import { mockIsDevelopmentBuild } from './mockIsDevelopmentBuild';

describe('assertExists', () => {
  beforeAll(() => {
    mockIsDevelopmentBuild(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [0],
    [1],
    [''],
    ['a'],
    [true],
    [false],
    [Symbol('a')],
    [() => console.log()],
    [[]],
    [{ key: 'value' }],
    [new Date()],
    [NaN]
  ])('undefined, null ではないとき何もしない', (value) => {
    expect(() => assertExists(value)).not.toThrow();
  });

  test.each([[undefined], [null]])(
    'undefined、null のときにエラーを投げる',
    (value) => {
      expect(() => assertExists(value)).toThrow(
        new Error(visibleForTesting.ERROR_MESSAGE)
      );
    }
  );

  test.each([
    [0],
    [1],
    [''],
    ['a'],
    [true],
    [false],
    [Symbol('a')],
    [() => console.log()],
    [[]],
    [{ key: 'value' }],
    [new Date()],
    [NaN],
    [undefined],
    [null]
  ])('Production build のときは何もしない', (value) => {
    mockIsDevelopmentBuild(false);
    expect(() => assertExists(value)).not.toThrow();
  });
});
