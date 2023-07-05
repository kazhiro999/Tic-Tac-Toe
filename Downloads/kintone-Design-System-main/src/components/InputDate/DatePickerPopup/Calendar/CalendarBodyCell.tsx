import React from 'react';
import styled from 'styled-components';
import { CalendarDateContent } from '../../modules/types';
import clsx from 'clsx';
import { designTokens } from '../../../../designTokens';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  dateContent: CalendarDateContent;
  currentMonth: number;
  selectedDay: string;
  today: string;
  onClick: (dateStr: string) => void;
  monthLabels: string[];
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  dateContent,
  currentMonth,
  selectedDay,
  today,
  onClick,
  monthLabels
}) => {
  const { dateStr, date, month } = dateContent;

  return (
    <td className={className}>
      <button
        className={clsx(`${className}__button`, {
          [`${className}__button-currentMonth`]: currentMonth === month,
          [`${className}__button-selectedDay`]: dateStr === selectedDay,
          [`${className}__button-today`]: dateStr === today
        })}
        type="button"
        aria-label={`${date} ${monthLabels[month - 1]}`}
        aria-current={dateStr === today ? 'date' : false}
        onClick={() => onClick(dateStr)}
      >
        {date}
      </button>
    </td>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  padding: 0;

  &__button {
    width: 100%;
    padding: 8px 0;
    font-size: ${designTokens.fonts.size[1]};
    &:lang(en) {
      font-family: ${designTokens.fonts.family.en};
    }
    &:lang(ja) {
      font-family: ${designTokens.fonts.family.ja};
    }
    &:lang(zh) {
      font-family: ${designTokens.fonts.family.zh};
    }
    &:lang(zh-TW) {
      font-family: ${designTokens.fonts.family.zhTW};
    }
    background-color: transparent;
    color: ${designTokens.colors.iron};
    text-align: center;
    border: 1px solid transparent;
    box-sizing: border-box;
    cursor: pointer;
    word-wrap: break-word;
    line-height: 1.5;

    &-currentMonth {
      color: ${designTokens.colors.mineShaft};
    }

    &-selectedDay {
      border-color: ${designTokens.colors.curiousBlue};
    }

    &-today {
      color: ${designTokens.colors.snow};
      background: ${designTokens.colors.gray};
    }
  }
`;

export const CalendarBodyCell = StyledComponent;
