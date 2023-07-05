import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../../../IconButton';
import { designTokens } from '../../../../designTokens';
import { YearDropdown } from './YearDropdown';
import { MonthDropdown } from './MonthDropdown';
import { FormArrowLeftIcon, FormArrowRightIcon } from '../../../../icons';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
  onPreviousMonthButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  isOrderOfMonthAndYear: boolean;
  previousMonthButtonAlternativeText: string;
  followingMonthButtonAlternativeText: string;
  yearDropdownItemSuffix: string;
  monthLabels: string[];
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  year,
  month,
  onChange,
  onPreviousMonthButtonKeyDown,
  isOrderOfMonthAndYear,
  previousMonthButtonAlternativeText,
  followingMonthButtonAlternativeText,
  yearDropdownItemSuffix,
  monthLabels
}) => {
  const handleChangeToPrevMonth = () => {
    // 1月の場合は前年12月にする
    onChange(month === 1 ? year - 1 : year, month === 1 ? 12 : month - 1);
  };

  const handleChangeToNextMonth = () => {
    // 12月の場合は翌年1月にする
    onChange(month === 12 ? year + 1 : year, month === 12 ? 1 : month + 1);
  };

  const YearAndMonth = [
    <YearDropdown
      value={year}
      changeValue={(newYear) => onChange(newYear, month)}
      key="YearDropdown"
      suffix={yearDropdownItemSuffix}
    />,
    <MonthDropdown
      value={month}
      changeValue={(newMonth) => onChange(year, newMonth)}
      key="MonthDropdown"
      itemLabels={monthLabels}
    />
  ];

  return (
    <div className={className}>
      <IconButton
        alternativeText={previousMonthButtonAlternativeText}
        width={32}
        height={32}
        iconWidth={9}
        iconHeight={13}
        icon={<FormArrowLeftIcon />}
        onClick={handleChangeToPrevMonth}
        onKeyDown={onPreviousMonthButtonKeyDown}
      />

      {isOrderOfMonthAndYear ? YearAndMonth.reverse() : YearAndMonth}

      <IconButton
        alternativeText={followingMonthButtonAlternativeText}
        width={32}
        height={32}
        iconWidth={9}
        iconHeight={13}
        icon={<FormArrowRightIcon />}
        onClick={handleChangeToNextMonth}
      />
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  border-bottom: 1px solid ${designTokens.colors.porcelain};
`;

export const DatePickerHeader = StyledComponent;
