import { designTokens } from '../../../designTokens';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { assertExists } from '../../../functions/asserts/assertExists';
import {
  isArrowDownKey,
  isArrowUpKey,
  isEndKey,
  isEnterKey,
  isEscKey,
  isHomeKey,
  isSpaceKey,
  isTabKey
} from '../../../functions/key';
import { useAdjustAbsolutePosition } from '../../../hooks/useAdjustAbsolutePosition';
import { useChangeFocus, useFocus } from '../FocusContext';
import { useInputTimeContext } from '../hooks/useInputTimeContext';
import { useTimePickerOptions } from '../hooks/useTimePickerOptions';
import { AMPMType, TimePickerOption } from '../modules/types';
import { TimePickerItem } from './TimePickerItem';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  options: TimePickerOption[];
  displayedInTheCenterOptionId: string | null;
  focusedOptionId: string | null;
  setFocusedOptionId: (value: string) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentOptionId: string
  ) => void;
  handleSelected: (value: {
    hour: string;
    minute: string;
    ampm: AMPMType;
  }) => void;
  menuitemFocusedKeyDown: boolean;
  setMenuitemFocusedKeydown: (isFocusedKeyDown: boolean) => void;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  options,
  displayedInTheCenterOptionId,
  focusedOptionId,
  setFocusedOptionId,
  handleKeyDown,
  handleSelected,
  menuitemFocusedKeyDown,
  setMenuitemFocusedKeydown
}) => {
  const targetRef = useRef<HTMLUListElement>(null);

  useAdjustAbsolutePosition(targetRef);

  return (
    <ul className={className} role="menu" ref={targetRef}>
      {options.map((option, index) => (
        <TimePickerItem
          key={index}
          id={option.id}
          label={option.label}
          displayedInTheCenter={option.id === displayedInTheCenterOptionId}
          focused={option.id === focusedOptionId}
          setFocusedOptionId={setFocusedOptionId}
          handleKeyDown={(e) => handleKeyDown(e, option.id)}
          handleClick={() => handleSelected(option.value)}
          menuitemFocusedKeyDown={menuitemFocusedKeyDown}
          setMenuitemFocusedKeydown={setMenuitemFocusedKeydown}
        />
      ))}
    </ul>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  list-style: none;
  background-color: ${designTokens.colors.snow};
  width: 280px;
  height: 165px;
  border: 1px solid ${designTokens.colors.porcelain};
  overflow-y: scroll;
  visibility: visible;
  margin: 0;
  padding: 8px 0;
  position: absolute;
  z-index: ${designTokens.zIndex.popup};
`;

const Container: React.VFC = () => {
  const {
    hour,
    minute,
    ampm,
    isAMPMNotation,
    isEmpty,
    changeInputTextValues,
    hideTimePicker
  } = useInputTimeContext();
  const options = useTimePickerOptions(isAMPMNotation);
  const displayedInTheCenterOption = isEmpty
    ? options[0]
    : getMatchedOption(options, hour, minute, ampm);

  const [focusedOptionId, setFocusedOptionId] = useState<string | null>(null);

  const { changeFocus } = useChangeFocus();

  // ListboxOptionがキーボード操作によってフォーカスされたかどうかの状態を管理する。
  // キーボード操作によるフォーカス処理とMouseEnterなどのイベントによるフォーカス処理の競合を解消するための仕組み。
  const [menuitemFocusedKeyDown, setMenuitemOptionFocusedKeydown] =
    useState(false);

  useFocus('TIME_PICKER', () => {
    assertExists(displayedInTheCenterOption);
    setFocusedOptionId(displayedInTheCenterOption.id);
  });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentOptionId: string
  ) => {
    const currentIndex = options.findIndex((o) => o.id === currentOptionId);
    if (isArrowUpKey(e)) {
      const index = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
      setFocusedOptionId(options[index].id);
      setMenuitemOptionFocusedKeydown(true);
      e.preventDefault();
    }

    if (isArrowDownKey(e)) {
      const index = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
      setFocusedOptionId(options[index].id);
      setMenuitemOptionFocusedKeydown(true);

      e.preventDefault();
    }

    if (isEnterKey(e) || isSpaceKey(e)) {
      const option = options[currentIndex];
      changeInputTextValues(
        option.value.hour,
        option.value.minute,
        option.value.ampm
      );
      hideTimePicker();
      changeFocus('HOUR');
      e.preventDefault();
    }

    if (isHomeKey(e)) {
      setFocusedOptionId(options[0].id);
      setMenuitemOptionFocusedKeydown(true);
      e.preventDefault();
    }

    if (isEndKey(e)) {
      setFocusedOptionId(options[options.length - 1].id);
      setMenuitemOptionFocusedKeydown(true);
      e.preventDefault();
    }

    // InputTimeコンポーネントからフォーカスアウトするときにTimePickerを閉じる
    // ShiftTabも含む
    if (isTabKey(e)) {
      hideTimePicker();
    }

    if (isEscKey(e)) {
      e.preventDefault();
      hideTimePicker();
      changeFocus('HOUR');
    }
  };

  const handleSelected = (value: {
    hour: string;
    minute: string;
    ampm: AMPMType;
  }) => {
    // キーボード操作でListboxOptionにフォーカスしていた場合、MouseEnterを一度だけ無効にする。
    // キーボード操作で画面スクロールが発生した際に、マウスカーソル位置のListboxOptionにフォーカスが奪われるのを回避するため。
    if (menuitemFocusedKeyDown) {
      setMenuitemOptionFocusedKeydown(false);
      return;
    }
    changeInputTextValues(value.hour, value.minute, value.ampm);
    hideTimePicker();
  };

  return (
    <StyledComponent
      options={options}
      displayedInTheCenterOptionId={displayedInTheCenterOption.id}
      focusedOptionId={focusedOptionId}
      setFocusedOptionId={setFocusedOptionId}
      handleSelected={handleSelected}
      handleKeyDown={handleKeyDown}
      menuitemFocusedKeyDown={menuitemFocusedKeyDown}
      setMenuitemFocusedKeydown={setMenuitemOptionFocusedKeydown}
    />
  );
};

export const TimePicker = Container;

const getMatchedOption = (
  options: TimePickerOption[],
  hour: string,
  minute: string,
  ampm: AMPMType
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return options.find((option) => {
    const { value } = option;
    if (value.hour === hour && value.minute === minute && value.ampm === ampm) {
      return true;
    }

    if (Number(minute) < 30) {
      return (
        value.hour === hour && value.minute === '00' && value.ampm === ampm
      );
    }

    return value.hour === hour && value.minute === '30' && value.ampm === ampm;
  })!;
};
