/**
 * @fileOverview 日時操作を行う3rd partyライブラリを隠蔽する。
 * このファイルはdatetimeディレクトリの他関数からのみ参照してください。
 */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * ISO_8601形式の日時文字列を、指定されたタイムゾーンとフォーマットで変換する
 */
const formatFromISOString = (
  isoString: string,
  offset: number,
  format: string
) => dayjs(isoString).utcOffset(offset).format(format);

/**
 * localDateTimeを、指定されたOffsetで補正したISOStringに変換する
 */
const convertToISOStringByOffset = (localDateTime: Date, offset: number) =>
  dayjs(localDateTime).utcOffset(offset).toISOString();

/**
 * 協定世界時 (UTC) 1970 年 1 月 1 日 00:00:00 からの経過時間をミリ秒単位で返す。
 */
const getMillisecondsSinceUnixEpoch = (isoString: string) => {
  return dayjs(isoString).valueOf();
};

const getUTCISOStringFromMillisecondsSinceUnixEpoch = (timeInMs: number) => {
  return dayjs(timeInMs).toISOString();
};

/**
 * ISO_8601形式の日時文字列の文字列 isoStringFrom から isoStringTo まで日数で差分を返す。
 * isoStringFrom > isoStringTo の場合負の値が返る。
 */
const differenceInDays = (isoStringTo: string, isoStringFrom: string) => {
  return dayjs(isoStringTo).diff(isoStringFrom, 'day');
};

/**
 * ISO_8601形式の日時文字列の文字列 isoStringFrom から isoStringTo まで1時間単位で差分を返す。
 * isoStringFrom > isoStringTo の場合負の値が返る。
 */
const differenceInHours = (isoStringTo: string, isoStringFrom: string) => {
  return dayjs(isoStringTo).diff(isoStringFrom, 'hour');
};

/**
 * ISO_8601形式の日時文字列の文字列をハイフンでパースしてオブジェクトで返す
 * @param isoString
 */
const splitISOString = (isoString: string) => {
  const [yearString, monthString, dateString] = isoString.split('-');
  const year = Number(yearString);
  const month = Number(monthString);
  const date = Number(dateString);
  return {
    year,
    month,
    date
  };
};

/**
 * MM/DD/YYYY形式の日時文字列をスラッシュでパースしてオブジェクトで返す
 * @param isoString
 */
const splitEnDateString = (isoString: string) => {
  const [monthString, dateString, yearString] = isoString.split('/');
  const year = Number(yearString);
  const month = Number(monthString);
  const date = Number(dateString);
  return {
    year,
    month,
    date
  };
};

/**
 * ISO_8601形式の日時文字列の文字列を年月日にパースしてオブジェクトで返す。
 * ※ month は 1-12の範囲の値を取る
 */
const parseISOString = (isoString: string) => {
  if (!isValidISOString(isoString)) {
    throw new Error(`Invalid date string format : "${isoString}"`);
  }

  const { year, month, date } = splitISOString(isoString);
  const day = dayjs()
    .year(year)
    .month(month - 1)
    .date(date);

  return {
    year: day.get('year'),
    month: day.get('month') + 1,
    date: day.get('date')
  };
};

/**
 * 現在日時のISO_8601形式(YYYY-MM-DD)の日時文字列を返す。
 */
const getTodayISOString = () => dayjs().format('YYYY-MM-DD');

/**
 * 現在時刻の24時間表記(HH:mm)の時刻文字列を返す。
 */
const getCurrentTimeISOString = () => dayjs().format('HH:mm');

/**
 * DateObjectからISOStringを返す
 */
const convertDateToISOString = (date: Date) => dayjs(date).toISOString();

/**
 * 指定年月の1日の週の日曜日を起点として、指定範囲の週の日付を得る
 * @param year 年
 * @param month 月 (1-12)
 * @param weekCount 生成する週 (省略時は6週分生成する)
 */
export const createWeeksContents = (
  year: number,
  month: number,
  weekCount = 6
) => {
  // 該当年月の1日の週の日曜日に該当する日付を得る
  let dayjsInstance = dayjs()
    .year(year)
    .month(month - 1)
    .date(1)
    .day(0);

  const weeks: Array<
    Array<{
      dateStr: string;
      year: number;
      month: number;
      date: number;
      day: number;
    }>
  > = [];

  for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
    const week: (typeof weeks)[number] = [];

    for (let day = 0; day < 7; day++) {
      // 0-999年向けに年のみ手動で結合する
      const yearString = String(dayjsInstance.year()).padStart(4, '0');
      week.push({
        dateStr: `${yearString}-${dayjsInstance.format('MM-DD')}`,
        year: dayjsInstance.year(),
        month: dayjsInstance.month() + 1,
        date: dayjsInstance.date(),
        day: dayjsInstance.day()
      });
      dayjsInstance = dayjsInstance.add(1, 'day');
    }

    weeks.push(week);
  }

  return weeks;
};

/**
 * 指定された文字列がISO_8601形式の年月日として正常なものか判別する
 * @param value
 */
export const isValidISOString = (value: string) => {
  // dayjsが0-99年をそのままではパースできないため、
  // 正規表現でフォーマットを検証する
  if (!value.match(/^(\d{1,4}-\d{1,2}-\d{1,2})$/)) {
    return false;
  }

  const { year, month, date } = splitISOString(value);

  return isValidDate(year, month, date);
};

/**
 * 指定された文字列がISO_8601形式の年月日として正常なものか判別する
 * @param value
 */
const isValidEnDateString = (value: string) => {
  // dayjsが0-99年をそのままではパースできないため、
  // 正規表現でフォーマットを検証する
  if (!value.match(/^(\d{1,2}\/\d{1,2}\/\d{1,4})$/)) {
    return false;
  }

  const { year, month, date } = splitEnDateString(value);

  return isValidDate(year, month, date);
};

/**
 * 指定された年月日が正常なものか判別する
 * @param year
 * @param month
 * @param date
 */
const isValidDate = (year: number, month: number, date: number) => {
  // 年の範囲
  if (!(year >= 1 && year <= 9999)) {
    return false;
  }
  // 月の範囲
  if (!(month >= 1 && month <= 12)) {
    return false;
  }
  // 日の範囲 (年月に応じて切替)
  if (month === 2) {
    // 閏年で切替
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      if (!(date >= 1 && date <= 29)) {
        return false;
      }
    } else if (!(date >= 1 && date <= 28)) {
      return false;
    }
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    if (!(date >= 1 && date <= 30)) {
      return false;
    }
  } else if (!(date >= 1 && date <= 31)) {
    return false;
  }

  return true;
};

/**
 * 日付と時刻の情報からISO_8601形式の日時を返す
 */
const formatToISOString = (
  year: number,
  month: number,
  date: number,
  hours: number,
  minutes: number
) =>
  dayjs(`${year}-${month}-${date} ${hours}:${minutes}`, 'YYYY-M-D H:m').format(
    'YYYY-MM-DDTHH:mm:ss.SSS'
  ) + 'Z';

/**
 * 日付の情報からISO_8601形式の日付を返す
 */
const formatToISODateString = (year: number, month: number, date: number) =>
  [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(date).padStart(2, '0')
  ].join('-');

export const dateTime = {
  formatFromISOString,
  getMillisecondsSinceUnixEpoch,
  differenceInDays,
  differenceInHours,
  parseISOString,
  getTodayISOString,
  convertToISOStringByOffset,
  getCurrentTimeISOString,
  isValidISOString,
  isValidEnDateString,
  splitISOString,
  splitEnDateString,
  convertDateToISOString,
  formatToISOString,
  formatToISODateString,
  getUTCISOStringFromMillisecondsSinceUnixEpoch
};
