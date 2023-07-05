import React, { AriaAttributes, useCallback, useState } from 'react';
import styled from 'styled-components';
import { convertISODateStringToLocalDateString } from '../../functions/datetime/convertISODateStringToLocalDateString';
import { convertLocalDateStringToISODateString } from '../../functions/datetime/convertLocalDateStringToISODateString';
import { getFormattedLocalDate } from '../../functions/datetime/getFormattedLocalDate';
import { isValidLocalDateString } from '../../functions/datetime/validateLocalDateString';
import { isEscKey } from '../../functions/key';
import { useOutsideTargetElementOnClick } from '../../hooks/useOutsideTargetElementOnClick';
import { InputText } from '../InputText';
import { DatePickerOpenSupportButton } from './DatePickerOpenSupportButton';
import { DatePickerPopup } from './DatePickerPopup';
import { CalendarHeadCellLabels, ISODateString } from './modules/types';
import { PropsForStyled } from '../../typings/propsForStyled';

export const DATA_TESTID = 'shared-forms-InputDate';

type Props = {
  value: string;
  changeValue: (value: string) => void;
  isUSDateFormat: boolean;
  isOrderOfMonthAndYear: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onDateSelect: (dateStr: ISODateString) => void;
  popupShown: boolean;
  hidePopup: (option?: { forceFocusInput?: boolean }) => void;
  onClickDatePickerOpenSupportButton: () => void;
  shouldFocusInput: boolean;
  clearShouldFocusInput: () => void;
  datePickerOpenSupportButtonLabel: string;
  popupAriaLabel: string;
  previousMonthButtonAlternativeText: string;
  followingMonthButtonAlternativeText: string;
  yearDropdownItemSuffix: string;
  monthLabels: string[];
  calendarHeadCellLabels: CalendarHeadCellLabels;
  todayButtonLabel: string;
  noneButtonLabel: string;
} & Pick<AriaAttributes, 'aria-labelledby'>;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  value,
  changeValue,
  isUSDateFormat,
  isOrderOfMonthAndYear,
  onClick,
  onBlur,
  onFocus,
  onKeyDown,
  onDateSelect,
  popupShown,
  hidePopup,
  onClickDatePickerOpenSupportButton,
  shouldFocusInput,
  clearShouldFocusInput,
  'aria-labelledby': ariaLabelledby,
  datePickerOpenSupportButtonLabel,
  popupAriaLabel,
  previousMonthButtonAlternativeText,
  followingMonthButtonAlternativeText,
  yearDropdownItemSuffix,
  monthLabels,
  calendarHeadCellLabels,
  todayButtonLabel,
  noneButtonLabel
}) => {
  const targetRef = useOutsideTargetElementOnClick<HTMLDivElement>(() => {
    hidePopup({ forceFocusInput: false });
  });

  return (
    <div className={className} ref={targetRef} data-testid={DATA_TESTID}>
      <InputText
        value={value}
        changeValue={changeValue}
        aria-labelledby={ariaLabelledby}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        shouldFocus={shouldFocusInput}
        clearShouldFocus={clearShouldFocusInput}
        onKeyDown={onKeyDown}
      />
      <DatePickerOpenSupportButton
        popupShown={popupShown}
        onClickButton={onClickDatePickerOpenSupportButton}
        label={datePickerOpenSupportButtonLabel}
      />
      {popupShown && (
        <DatePickerPopup
          value={convertLocalDateStringToISODateString(value, isUSDateFormat)}
          isOrderOfMonthAndYear={isOrderOfMonthAndYear}
          onDateSelect={onDateSelect}
          hidePopup={hidePopup}
          popupAriaLabel={popupAriaLabel}
          previousMonthButtonAlternativeText={
            previousMonthButtonAlternativeText
          }
          followingMonthButtonAlternativeText={
            followingMonthButtonAlternativeText
          }
          yearDropdownItemSuffix={yearDropdownItemSuffix}
          monthLabels={monthLabels}
          calendarHeadCellLabels={calendarHeadCellLabels}
          todayButtonLabel={todayButtonLabel}
          noneButtonLabel={noneButtonLabel}
        />
      )}
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: inline-block;
  width: 104px;
  position: relative;
  height: min-content;
`;

type OuterProps = {
  value: string;
  changeValue: (value: string) => void;
  // 言語がenでlocaleもenの時US表記(mm/dd/yyyy)になる
  isUSDateFormat: boolean;
  // 言語が日本語でも中国語でもない時、英語表記とみなしドロップダウンの並び順がmm/yyyyになる。
  isOrderOfMonthAndYear: boolean;
  onValidate: (validationData: { hasValidationError: boolean }) => void;
  datePickerOpenSupportButtonLabel: string;
  popupAriaLabel: string;
  previousMonthButtonAlternativeText: string;
  followingMonthButtonAlternativeText: string;
  yearDropdownItemSuffix: string;
  monthLabels: string[];
  calendarHeadCellLabels: CalendarHeadCellLabels;
  todayButtonLabel: string;
  noneButtonLabel: string;
} & Pick<AriaAttributes, 'aria-labelledby'>;

export type InputDateProps = OuterProps;

const Container: React.VFC<OuterProps> = ({
  value,
  changeValue,
  isUSDateFormat,
  isOrderOfMonthAndYear,
  onValidate,
  'aria-labelledby': ariaLabelledby,
  ...props
}) => {
  const [localDate, setLocalDate] = useState(
    convertISODateStringToLocalDateString(value, isUSDateFormat)
  );
  const [popupShown, setPopupShown] = useState(false);
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const clearShouldFocusInput = () => {
    setShouldFocusInput(false);
  };

  const showPopup = useCallback(() => {
    if (!popupShown) {
      setPopupShown(true);
    }
  }, [popupShown]);

  const hidePopup = useCallback(
    (option?: { forceFocusInput?: boolean }) => {
      // hidePopupをuseOutsideTargetElementOnClickの引数に渡しているため、外側をクリック時に毎度呼ばれてしまう
      // そのため popupShown を確認している
      if (popupShown) {
        setPopupShown(false);
        if (option?.forceFocusInput) {
          setShouldFocusInput(true);
        }
      }
    },
    [popupShown]
  );

  const handleClick = useCallback(() => {
    const formattedLocalDate = getFormattedLocalDate(localDate, isUSDateFormat);
    setLocalDate(formattedLocalDate);
    showPopup();
  }, [isUSDateFormat, localDate, showPopup]);

  const handleFocus = useCallback(() => {
    const formattedLocalDate = getFormattedLocalDate(localDate, isUSDateFormat);
    setLocalDate(formattedLocalDate);
  }, [isUSDateFormat, localDate]);

  const handleBlur = useCallback(() => {
    const formattedLocalDate = getFormattedLocalDate(localDate, isUSDateFormat);
    setLocalDate(formattedLocalDate);
    if (isValidLocalDateString(formattedLocalDate, isUSDateFormat)) {
      onValidate({ hasValidationError: false });
    } else {
      onValidate({
        hasValidationError: !(formattedLocalDate === '')
      });
    }
  }, [isUSDateFormat, localDate, onValidate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isEscKey(e)) {
        hidePopup({ forceFocusInput: true });
      }
    },
    [hidePopup]
  );

  const handleChangeValue = useCallback(
    (textValue: string) => {
      setLocalDate(textValue);
      const trimmedTextValue = textValue.trimStart();
      if (
        isValidLocalDateString(trimmedTextValue, isUSDateFormat) ||
        trimmedTextValue === ''
      ) {
        changeValue(
          convertLocalDateStringToISODateString(
            trimmedTextValue,
            isUSDateFormat
          )
        );
      }
    },
    [changeValue, isUSDateFormat]
  );

  const handleClickDatePickerOpenSupportButton = useCallback(() => {
    if (popupShown) {
      hidePopup({ forceFocusInput: true });
    } else {
      showPopup();
    }
  }, [hidePopup, popupShown, showPopup]);

  const handleDateSelect = useCallback(
    (dateStr: ISODateString) => {
      const localDateStr = convertISODateStringToLocalDateString(
        dateStr,
        isUSDateFormat
      );
      handleChangeValue(localDateStr);
      hidePopup({ forceFocusInput: true });
    },
    [handleChangeValue, hidePopup, isUSDateFormat]
  );

  return (
    <StyledComponent
      value={localDate}
      changeValue={handleChangeValue}
      isUSDateFormat={isUSDateFormat}
      isOrderOfMonthAndYear={isOrderOfMonthAndYear}
      onClick={handleClick}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onDateSelect={handleDateSelect}
      aria-labelledby={ariaLabelledby}
      popupShown={popupShown}
      hidePopup={hidePopup}
      onClickDatePickerOpenSupportButton={
        handleClickDatePickerOpenSupportButton
      }
      shouldFocusInput={shouldFocusInput}
      clearShouldFocusInput={clearShouldFocusInput}
      {...props}
    />
  );
};

export const InputDate = Container;
