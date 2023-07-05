import { useContext, useState } from 'react';
import { assert } from '../../../functions/asserts/assert';
import { InputTimeContext } from '../InputTimeContextProvider';
import { makeCalculatedValue } from '../modules/functions';
import { AMPMType } from '../modules/types';
import { getCurrentTime } from '../../../functions/datetime/getCurrentTime';

export type InputTimeContextType = {
  // InputText
  hour: string;
  minute: string;
  ampm: AMPMType;
  isEmpty: boolean;
  isAMPMNotation: boolean;
  changeInputTextValues: (hour: string, minute: string, ampm: AMPMType) => void;
  changeHourValue: (value: string) => void;
  changeMinuteValue: (value: string) => void;
  changeAmpmValue: (value: AMPMType) => void;

  // TimePicker
  timePickerShown: boolean;
  showTimePicker: () => void;
  hideTimePicker: () => void;
};

/**
 * 時刻入力パーツ全体で利用する値の初期値参照用hooks
 *
 * ※
 * 直接 useContext を利用箇所で呼ぶことも可能だが、
 * 型定義の都合上、毎回 non-null assertion が必要になるため、
 * 本メソッド経由で参照することを推奨する
 */
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useInputTimeContext = () => useContext(InputTimeContext)!;

/**
 * 時刻入力パーツ全体で利用する値の初期値生成用hooks
 */
export const useInputTimeContextInitialValue = (
  timeStringHHmm: string,
  isAMPMNotation: boolean,
  changeValue: (value: string) => void
): InputTimeContextType => {
  const [timePickerShown, setTimePickerShown] = useState(false);
  const showTimePicker = () => {
    setTimePickerShown(true);
  };
  const hideTimePicker = () => {
    setTimePickerShown(false);
  };

  const { hour, minute, ampm, isEmpty } = parseTimeString(
    timeStringHHmm,
    isAMPMNotation
  );

  const changeHourValue = (value: string) => {
    assert(value);

    if (isEmpty) {
      const { currentMinute, currentAmpmValue } = getCurrentTimeValue();
      changeValue(
        formatTimeValue(value, currentMinute, currentAmpmValue, isAMPMNotation)
      );
    } else {
      changeValue(formatTimeValue(value, minute, ampm, isAMPMNotation));
    }
  };

  const changeMinuteValue = (value: string) => {
    assert(value);

    if (isEmpty) {
      const { currentHour, currentAmpmValue } = getCurrentTimeValue();
      // 現在時刻は24時間表記なので、強制的に24時間表記として計算する
      changeValue(formatTimeValue(currentHour, value, currentAmpmValue, false));
    } else {
      changeValue(formatTimeValue(hour, value, ampm, isAMPMNotation));
    }
  };

  const changeAmpmValue = (value: AMPMType) => {
    assert(value);

    if (isEmpty) {
      const { currentHour, currentMinute } = getCurrentTimeValue();
      const currentHour12 =
        currentHour > '12'
          ? makeCalculatedValue(currentHour, -12)
          : currentHour;

      changeValue(
        formatTimeValue(currentHour12, currentMinute, value, isAMPMNotation)
      );
    } else {
      changeValue(formatTimeValue(hour, minute, value, isAMPMNotation));
    }
  };

  const changeInputTextValues = (
    newHour: string,
    newMinute: string,
    newAmpm: AMPMType
  ) => {
    changeValue(formatTimeValue(newHour, newMinute, newAmpm, isAMPMNotation));
  };

  return {
    hour,
    minute,
    ampm,
    isEmpty,
    isAMPMNotation,
    changeHourValue,
    changeMinuteValue,
    changeAmpmValue,
    changeInputTextValues,
    timePickerShown,
    showTimePicker,
    hideTimePicker
  };
};

const getCurrentTimeValue = (): {
  currentHour: string;
  currentMinute: string;
  currentAmpmValue: AMPMType;
} => {
  const { hour, minute } = getCurrentTime();
  return {
    currentHour: hour,
    currentMinute: minute,
    currentAmpmValue: Number(hour) < 12 ? 'AM' : 'PM'
  };
};

const parseTimeString = (
  timeString: string,
  isAMPMNotation: boolean
): Pick<InputTimeContextType, 'hour' | 'minute' | 'ampm' | 'isEmpty'> => {
  let [hour, minute] = timeString.split(':');
  let ampm: InputTimeContextType['ampm'] = '';
  let isEmpty = false;

  if (!hour || !minute) {
    hour = '';
    minute = '';
    ampm = '';
    isEmpty = true;
  } else if (isAMPMNotation) {
    if (hour >= '12') {
      // AMPMによる12時間表記かつ12時以降の場合
      hour = makeCalculatedValue(hour, -12);
      ampm = 'PM';
    } else {
      ampm = 'AM';
    }
  }

  return {
    hour,
    minute,
    ampm,
    isEmpty
  };
};

const formatTimeValue = (
  hour: string,
  minute: string,
  ampm: AMPMType,
  isAMPMNotation: boolean
) => {
  if (isAMPMNotation && ampm === 'PM') {
    // 12時間表記でのPMの場合、hour=01-11の値を取るので、24時間表記にするため12を足す
    return `${makeCalculatedValue(hour, 12)}:${minute}`;
  }
  return `${hour}:${minute}`;
};
