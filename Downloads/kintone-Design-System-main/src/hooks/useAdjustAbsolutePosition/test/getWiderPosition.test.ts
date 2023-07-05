import * as getWindowInnerHeightModule from '../../../functions/window/getWindowInnerHeight';
import * as getWindowInnerWidthModule from '../../../functions/window/getWindowInnerWidth';
import { getWiderPosition } from '../getWiderPosition';

describe('getWiderPosition', () => {
  const WINDOW_WIDTH = 2000;
  const WINDOW_HEIGHT = 400;

  const LEFT = WINDOW_WIDTH * 0.25;
  const RIGHT = WINDOW_WIDTH * 0.75;
  const UPPER = WINDOW_HEIGHT * 0.25;
  const LOWER = WINDOW_HEIGHT * 0.75;

  const mockWindowInnerSize = (width: number, height: number) => {
    jest
      .spyOn(getWindowInnerWidthModule, 'getWindowInnerWidth')
      .mockReturnValue(width);
    jest
      .spyOn(getWindowInnerHeightModule, 'getWindowInnerHeight')
      .mockReturnValue(height);
  };

  beforeEach(() => {
    mockWindowInnerSize(WINDOW_WIDTH, WINDOW_HEIGHT);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('左上の点を指定すると右下の領域が返る', () => {
    expect(getWiderPosition(LEFT, UPPER)).toBe('bottom-start');
  });

  test('右上の点を指定すると左下の領域が返る', () => {
    expect(getWiderPosition(RIGHT, UPPER)).toBe('bottom-end');
  });

  test('左下の点を指定すると右上の領域が返る', () => {
    expect(getWiderPosition(LEFT, LOWER)).toBe('top-start');
  });

  test('右下の点を指定すると左上の領域が返る', () => {
    expect(getWiderPosition(RIGHT, LOWER)).toBe('top-end');
  });
});
