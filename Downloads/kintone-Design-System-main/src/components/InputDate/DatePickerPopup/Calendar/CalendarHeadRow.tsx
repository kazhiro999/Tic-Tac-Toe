import React from 'react';
import { CalendarHeadCellLabels } from '../../modules/types';
import { CalendarHeadCell } from './CalendarHeadCell';

type Props = {
  carendarHeadCellLabels: CalendarHeadCellLabels;
};

const Component: React.VFC<Props> = ({ carendarHeadCellLabels }) => {
  return (
    <tr>
      <CalendarHeadCell weekend>{carendarHeadCellLabels.sun}</CalendarHeadCell>
      <CalendarHeadCell>{carendarHeadCellLabels.mon}</CalendarHeadCell>
      <CalendarHeadCell>{carendarHeadCellLabels.tue}</CalendarHeadCell>
      <CalendarHeadCell>{carendarHeadCellLabels.wed}</CalendarHeadCell>
      <CalendarHeadCell>{carendarHeadCellLabels.thu}</CalendarHeadCell>
      <CalendarHeadCell>{carendarHeadCellLabels.fri}</CalendarHeadCell>
      <CalendarHeadCell weekend>{carendarHeadCellLabels.sat}</CalendarHeadCell>
    </tr>
  );
};

export const CalendarHeadRow = Component;
