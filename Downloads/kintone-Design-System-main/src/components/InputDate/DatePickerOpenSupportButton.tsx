import React, { AriaAttributes } from 'react';
import { AssistiveText } from '../a11y/AssistiveText';

type Props = {
  popupShown: boolean;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
} & Pick<AriaAttributes, 'aria-expanded'>;

const Component: React.VFC<Props> = ({ popupShown, onClickButton, label }) => {
  return (
    <AssistiveText>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={popupShown}
        onClick={onClickButton}
      >
        {label}
      </button>
    </AssistiveText>
  );
};

export const DatePickerOpenSupportButton = Component;
