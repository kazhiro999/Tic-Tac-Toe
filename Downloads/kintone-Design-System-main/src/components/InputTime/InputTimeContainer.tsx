import React from 'react';
import styled from 'styled-components';
import { useOutsideTargetElementOnClick } from '../../hooks/useOutsideTargetElementOnClick';
import { InputText } from './InputText';
import { useInputTimeContext } from './hooks/useInputTimeContext';
import { TimePicker } from './TimePicker';
import { TimePickerOpenSupportButton } from './TimePickerOpenSupportButton';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  hideTimePicker: () => void;
  timePickerShown: boolean;
  timePickerOpenSupportButtonLabel: string;
} & React.ComponentProps<typeof InputText>;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  hideTimePicker,
  timePickerShown,
  timePickerOpenSupportButtonLabel,
  ...inputTextProps
}) => {
  const targetRef =
    useOutsideTargetElementOnClick<HTMLDivElement>(hideTimePicker);

  return (
    <div ref={targetRef} className={className}>
      <InputText {...inputTextProps} />
      <TimePickerOpenSupportButton
        buttonLabel={timePickerOpenSupportButtonLabel}
      />
      {timePickerShown && <TimePicker />}
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: inline-block;
  position: relative;
  height: min-content;

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
  font-size: ${designTokens.fonts.size[5]};
  color: ${designTokens.colors.mineShaft};
  line-height: 1.5;
`;

const Container: React.VFC<
  Omit<Props, 'hideTimePicker' | 'timePickerShown'>
> = (props) => {
  const { hideTimePicker, timePickerShown } = useInputTimeContext();

  return (
    <StyledComponent
      {...props}
      hideTimePicker={hideTimePicker}
      timePickerShown={timePickerShown}
    />
  );
};

export const InputTimeContainer = Container;
