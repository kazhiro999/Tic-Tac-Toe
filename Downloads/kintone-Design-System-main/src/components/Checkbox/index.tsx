import { designTokens } from '../../designTokens';
import clsx from 'clsx';
import * as React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { CheckboxCheckedIcon, CheckboxUncheckedIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

type DefaultProps = {
  disabled?: boolean;
};

type BaseProps<T extends string> = {
  label?: string;
  alternativeText?: string;
  name: T;
  value: boolean;
  changeValue: (name: T, value: boolean) => void;
  leftPadding?: boolean;
  testId?: string;
  inputTestId?: string;
  labelTextTestId?: string;
};
type Props<T extends string> = BaseProps<T> & Required<DefaultProps>;

const Component = <T extends string>({
  className,
  label,
  alternativeText,
  name,
  value,
  changeValue,
  disabled,
  testId,
  inputTestId,
  labelTextTestId
}: Props<T> & PropsForStyled) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(name, event.target.checked);
  };

  return (
    <label
      className={clsx(className, [
        {
          [`${className}__checked`]: value,
          [`${className}__disabled`]: disabled
        }
      ])}
      title={alternativeText}
      data-testid={testId}
    >
      <span className={`${className}__icon`}>
        {value ? (
          <Icon
            icon={<CheckboxCheckedIcon />}
            alternativeText=""
            width={20}
            height={20}
          />
        ) : (
          <Icon
            icon={<CheckboxUncheckedIcon />}
            alternativeText=""
            width={20}
            height={20}
          />
        )}
      </span>
      <input
        className={`${className}__input`}
        type="checkbox"
        name={name}
        checked={value}
        onChange={handleChange}
        aria-label={alternativeText}
        disabled={disabled}
        data-testid={inputTestId}
      />
      {label && (
        <span className={`${className}__text`} data-testid={labelTextTestId}>
          {label}
        </span>
      )}
    </label>
  );
};

const StyledComponent: <T extends string>(
  props: OuterProps<T>
) => JSX.Element = styled(Component)`
  display: inline-block;
  height: 20px; /* 潰れないように高さを確保 */
  min-width: 20px;
  font-size: ${designTokens.fonts.size[4]};
  padding: 4px 4px 4px 0;
  border: 1px solid transparent;
  cursor: pointer;
  position: relative;
  outline: none;
  color: ${designTokens.colors.mineShaft};
  word-wrap: break-word;
  line-height: 1.5;
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

  &:focus-within {
    border: 1px solid ${designTokens.colors.curiousBlue};
  }

  &__disabled {
    cursor: not-allowed;
    color: ${designTokens.colors.gray};
  }

  &__icon {
    vertical-align: top;
  }

  &__input {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    cursor: inherit;
  }

  &__text {
    margin-left: 10px;
    padding-left: ${({ leftPadding = false }) => (leftPadding ? '4px' : '0')};
  }
`;

type OuterProps<T extends string> = DefaultProps & BaseProps<T>;

export type CheckboxProps<T extends string> = OuterProps<T>;

const GenericsComponent = <T extends string>({
  disabled = false,
  ...props
}: OuterProps<T>): JSX.Element => (
  <StyledComponent disabled={disabled} {...props} />
);

export const Checkbox = GenericsComponent;
