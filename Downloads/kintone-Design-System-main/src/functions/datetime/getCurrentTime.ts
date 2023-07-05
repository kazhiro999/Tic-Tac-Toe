import { dateTime } from './dateTime';

/**
 * ブラウザの現在（Slashのタイムゾーンを考慮しない）時刻を取得する関数
 */
export const getCurrentTime = () => {
  const [hour, minute] = dateTime.getCurrentTimeISOString().split(':');

  return {
    hour,
    minute
  };
};
