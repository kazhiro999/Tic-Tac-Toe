import { assert, visibleForTesting } from '../assert';
import { mockIsDevelopmentBuild } from './mockIsDevelopmentBuild';

describe('assert', () => {
  beforeAll(() => {
    mockIsDevelopmentBuild(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [1],
    ['a'],
    [true],
    [Symbol('a')],
    [() => console.log()],
    [[]],
    [{ [Symbol('key')]: 'value' }],
    [{ key: 'value' }],
    [new Date()]
  ])('truthyな値のときは何もしない', (value) => {
    expect(() => assert(value)).not.toThrow();
  });

  test.each([[undefined], [null], [NaN], [0], [''], [false]])(
    'falsyな値のときはエラーを投げる',
    (value) => {
      expect(() => assert(value)).toThrow(
        new Error(visibleForTesting.ERROR_MESSAGE)
      );
    }
  );

  test.each([
    [1],
    ['a'],
    [true],
    [Symbol('a')],
    [() => console.log()],
    [[]],
    [{ [Symbol('key')]: 'value' }],
    [{ key: 'value' }],
    [new Date()],
    [undefined],
    [null],
    [NaN],
    [0],
    [''],
    [false]
  ])('Production build のときは何もしない', (value) => {
    mockIsDevelopmentBuild(false);
    expect(() => assert(value)).not.toThrow();
  });
});
