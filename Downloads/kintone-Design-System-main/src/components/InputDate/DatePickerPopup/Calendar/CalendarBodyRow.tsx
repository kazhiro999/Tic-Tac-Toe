import React from 'react';
import { CalendarBodyCell } from './CalendarBodyCell';
import { CalendarDateContent } from '../../modules/types';

type Props = {
  row: CalendarDateContent[];
  currentMonth: number;
  selectedDay: string;
  today: string;
  onDateSelect: (dateStr: string) => void;
  monthLabels: string[];
};

const Component: React.VFC<Props> = ({
  row,
  currentMonth,
  selectedDay,
  today,
  onDateSelect,
  monthLabels
}) => {
  return (
    <tr>
      {row.map((dateContent) => (
        <CalendarBodyCell
          dateContent={dateContent}
          currentMonth={currentMonth}
          selectedDay={selectedDay}
          today={today}
          key={dateContent.dateStr}
          onClick={onDateSelect}
          monthLabels={monthLabels}
        />
      ))}
    </tr>
  );
};

export const CalendarBodyRow = Component;
