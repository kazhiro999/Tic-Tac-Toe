import React, { AriaAttributes, useCallback } from 'react';
import { isArrowDownKey, isArrowUpKey } from '../../functions/key';
import { AssistiveText } from '../a11y/AssistiveText';
import { useChangeFocus } from './FocusContext';
import { useInputTimeContext } from './hooks/useInputTimeContext';

type Props = {
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  buttonLabel: string;
} & Pick<AriaAttributes, 'aria-expanded'>;

const Component: React.VFC<Props> = ({
  onClickButton,
  onKeyDown,
  'aria-expanded': ariaExpanded,
  buttonLabel
}) => {
  return (
    <AssistiveText>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={ariaExpanded}
        onClick={onClickButton}
        onKeyDown={onKeyDown}
      >
        {buttonLabel}
      </button>
    </AssistiveText>
  );
};

const Container: React.VFC<
  Omit<Props, 'aria-expanded' | 'onClickButton' | 'onKeyDown'>
> = (props) => {
  const { timePickerShown, showTimePicker, hideTimePicker } =
    useInputTimeContext();
  const { changeFocus } = useChangeFocus();

  const toggleTimePicker = useCallback(() => {
    if (timePickerShown) {
      hideTimePicker();
    } else {
      showTimePicker();
      changeFocus('TIME_PICKER');
    }
  }, [changeFocus, hideTimePicker, showTimePicker, timePickerShown]);

  const handleClickButton = () => {
    toggleTimePicker();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isArrowUpKey(e) || isArrowDownKey(e)) {
      toggleTimePicker();
      e.preventDefault();
    }
  };

  return (
    <Component
      {...props}
      aria-expanded={timePickerShown}
      onClickButton={handleClickButton}
      onKeyDown={handleKeyDown}
    />
  );
};

export const TimePickerOpenSupportButton = Container;
