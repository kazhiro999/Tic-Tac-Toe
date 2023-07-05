import MockDate from 'mockdate';
import { getCurrentTime } from '../getCurrentTime';

describe('getCurrentTime', () => {
  beforeEach(() => {
    MockDate.set(new Date('2020-01-01T09:21:00'));
  });

  afterEach(() => {
    MockDate.reset();
  });

  test('etCurrentTime', () => {
    expect(getCurrentTime()).toEqual({ hour: '09', minute: '21' });
  });
});
