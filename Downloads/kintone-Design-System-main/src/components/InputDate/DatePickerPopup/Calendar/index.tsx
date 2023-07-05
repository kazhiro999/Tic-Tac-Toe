import React from 'react';
import styled from 'styled-components';
import { CalendarHeadRow } from './CalendarHeadRow';
import { CalendarBodyRow } from './CalendarBodyRow';
import {
  CalendarDateContent,
  CalendarHeadCellLabels
} from '../../modules/types';
import { createWeeksContents } from '../../../../functions/datetime/dateTime';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  today: string;
  year: number;
  month: number;
  selectedDay: string;
  onDateSelect: (dateStr: string) => void;
  calendarHeadCellLabels: CalendarHeadCellLabels;
  monthLabels: string[];
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  today,
  year,
  month,
  selectedDay,
  onDateSelect,
  calendarHeadCellLabels,
  monthLabels
}) => {
  const calendarDates: CalendarDateContent[][] = createWeeksContents(
    year,
    month
  );

  return (
    <table className={className} role="grid" aria-readonly="true">
      <thead>
        <CalendarHeadRow carendarHeadCellLabels={calendarHeadCellLabels} />
      </thead>
      <tbody>
        {calendarDates.map((week, index) => (
          <CalendarBodyRow
            row={week}
            currentMonth={month}
            selectedDay={selectedDay}
            today={today}
            key={`${year}-${month}-week${index}`}
            onDateSelect={onDateSelect}
            monthLabels={monthLabels}
          />
        ))}
      </tbody>
    </table>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  border-collapse: separate;
  border-spacing: 0;
`;

export const Calendar = StyledComponent;
