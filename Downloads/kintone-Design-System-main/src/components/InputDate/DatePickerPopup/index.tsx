import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../designTokens';
import { dateTime } from '../../../functions/datetime/dateTime';
import { isEscKey, isTabKey } from '../../../functions/key';
import { useAdjustAbsolutePosition } from '../../../hooks/useAdjustAbsolutePosition';
import { CalendarHeadCellLabels } from '../modules/types';
import { Calendar } from './Calendar';
import { DatePickerActions } from './DatePickerActions';
import { DatePickerBody } from './DatePickerBody';
import { DatePickerHeader } from './DatePickerHeader';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  selectedDay: string;
  viewYear: number;
  viewMonth: number;
  onDateSelect: (dateStr: string) => void;
  onChangeView: (newViewYear: number, newViewMonth: number) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  onClearButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onPreviousMonthButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  targetRef: React.Ref<HTMLDivElement>;
  isOrderOfMonthAndYear: boolean;
  popupAriaLabel: string;
  previousMonthButtonAlternativeText: string;
  followingMonthButtonAlternativeText: string;
  yearDropdownItemSuffix: string;
  monthLabels: string[];
  calendarHeadCellLabels: CalendarHeadCellLabels;
  todayButtonLabel: string;
  noneButtonLabel: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  selectedDay,
  viewYear,
  viewMonth,
  onDateSelect,
  onChangeView,
  onKeyDown,
  onClearButtonKeyDown,
  onPreviousMonthButtonKeyDown,
  targetRef,
  isOrderOfMonthAndYear,
  popupAriaLabel,
  previousMonthButtonAlternativeText,
  followingMonthButtonAlternativeText,
  yearDropdownItemSuffix,
  monthLabels,
  calendarHeadCellLabels,
  todayButtonLabel,
  noneButtonLabel
}) => {
  const today = dateTime.getTodayISOString();

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className={className}
      ref={targetRef}
      role="dialog"
      onKeyDown={onKeyDown}
      aria-label={popupAriaLabel}
    >
      <DatePickerHeader
        year={viewYear}
        month={viewMonth}
        onChange={onChangeView}
        onPreviousMonthButtonKeyDown={onPreviousMonthButtonKeyDown}
        isOrderOfMonthAndYear={isOrderOfMonthAndYear}
        previousMonthButtonAlternativeText={previousMonthButtonAlternativeText}
        followingMonthButtonAlternativeText={
          followingMonthButtonAlternativeText
        }
        yearDropdownItemSuffix={yearDropdownItemSuffix}
        monthLabels={monthLabels}
      />
      <DatePickerBody>
        <Calendar
          today={today}
          year={viewYear}
          month={viewMonth}
          selectedDay={selectedDay}
          onDateSelect={onDateSelect}
          calendarHeadCellLabels={calendarHeadCellLabels}
          monthLabels={monthLabels}
        />
      </DatePickerBody>
      <DatePickerActions
        onClickToday={() => onDateSelect(today)}
        onClickClear={() => onDateSelect('')}
        onClearButtonKeyDown={onClearButtonKeyDown}
        todayButtonLabel={todayButtonLabel}
        noneButtonLabel={noneButtonLabel}
      />
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  padding: 32px 32px 24px;
  box-shadow: 0 0 8px 2px ${designTokens.colors.transparentBlack10};
  background-color: ${designTokens.colors.snow};
  position: absolute;
  z-index: ${designTokens.zIndex.popup};
`;

type OuterProps = {
  value: string;
  isOrderOfMonthAndYear: boolean;
  onDateSelect: (dateStr: string) => void;
  hidePopup: (option?: { forceFocusInput?: boolean }) => void;
  popupAriaLabel: string;
  previousMonthButtonAlternativeText: string;
  followingMonthButtonAlternativeText: string;
  yearDropdownItemSuffix: string;
  monthLabels: string[];
  calendarHeadCellLabels: CalendarHeadCellLabels;
  todayButtonLabel: string;
  noneButtonLabel: string;
};

const Container: React.VFC<OuterProps> = ({
  value,
  isOrderOfMonthAndYear,
  onDateSelect,
  hidePopup,
  ...props
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useAdjustAbsolutePosition(targetRef);

  const initialDate = dateTime.parseISOString(
    dateTime.isValidISOString(value) ? value : dateTime.getTodayISOString()
  );

  const [viewYear, setViewYear] = useState(initialDate.year);
  const [viewMonth, setViewMonth] = useState(initialDate.month);

  const onChangeView = (newViewYear: number, newViewMonth: number) => {
    setViewYear(newViewYear);
    setViewMonth(newViewMonth);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isEscKey(e)) {
      hidePopup({ forceFocusInput: true });
    }
  };

  const handleClearButtonKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    // DatePickerからフォーカスアウトするときにTimePickerを閉じる
    if (isTabKey(e) && e.shiftKey === false) {
      hidePopup();
    }
  };

  const handlePreviousMonthButtonKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    // DatePickerからフォーカスアウトするときにTimePickerを閉じる
    if (isTabKey(e) && e.shiftKey === true) {
      hidePopup();
    }
  };

  return (
    <StyledComponent
      targetRef={targetRef}
      selectedDay={value}
      viewYear={viewYear}
      viewMonth={viewMonth}
      onDateSelect={onDateSelect}
      onChangeView={onChangeView}
      onKeyDown={handleKeyDown}
      onClearButtonKeyDown={handleClearButtonKeyDown}
      onPreviousMonthButtonKeyDown={handlePreviousMonthButtonKeyDown}
      isOrderOfMonthAndYear={isOrderOfMonthAndYear}
      {...props}
    />
  );
};

export const DatePickerPopup = Container;
