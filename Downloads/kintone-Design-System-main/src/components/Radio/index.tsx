import { designTokens } from '../../designTokens';
import clsx from 'clsx';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props<T extends string> = {
  value: T;
  label: string;
  name: string;
  checked: boolean;
  changeValue: (value: T) => void;
  disabled: boolean;
  dataTestId?: string;
  inputDataTestId?: string;
  labelDataTestId?: string;
};

export type RadioProps<T extends string> = Props<T>;

// Genericsとの併用ができないので、React.VFCで型をつけていない
// ファイルの下部で定義されているGenericsComponentについても同様
// https://sharedoc.atlassian.net/wiki/spaces/Frorea/pages/2540568698
const Component = <T extends string>({
  value,
  className,
  label,
  name,
  checked,
  changeValue,
  disabled,
  dataTestId,
  inputDataTestId,
  labelDataTestId
}: Props<T> & PropsForStyled): JSX.Element => {
  return (
    <span className={className}>
      <label
        className={clsx(`${className}__label`, {
          [`${className}__label-checked`]: checked,
          [`${className}__label-disabled`]: disabled
        })}
        data-testid={dataTestId}
      >
        <input
          data-testid={inputDataTestId}
          value={value}
          className={clsx(`${className}__input`, {
            [`${className}__input-disabled`]: disabled
          })}
          type="radio"
          name={name}
          checked={checked}
          onChange={() => changeValue(value)}
          disabled={disabled}
        />
        <span data-testid={labelDataTestId}>{label}</span>
      </label>
    </span>
  );
};

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  display: inline-flex;
  align-items: center;
  padding: 4px 4px 4px 0;
  border: 1px solid transparent;
  color: ${designTokens.colors.mineShaft};
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

  & input:hover,
  & input:focus {
    border: 1px solid ${designTokens.colors.curiousBlue};
  }

  &__label {
    cursor: pointer;
    position: relative;
    margin-left: 32px;
    font-size: ${designTokens.fonts.size[4]};
    white-space: nowrap;
    outline: none;

    &:before {
      position: absolute;
      top: 50%;
      left: -30px;
      margin-top: -11px;
      width: 21px;
      height: 21px;
      box-sizing: border-box;
      border: 1px solid ${designTokens.colors.porcelain};
      border-radius: 50%;
      background-color: ${designTokens.colors.snow};
      box-shadow: 1px 1px 3px ${designTokens.colors.wildSand} inset,
        -1px -1px 3px ${designTokens.colors.wildSand} inset;
      content: '';
    }

    &-checked {
      &:after {
        position: absolute;
        top: 50%;
        left: -26px;
        margin-top: -7px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: ${designTokens.colors.curiousBlue};
        content: '';
      }
    }

    &-disabled {
      color: ${designTokens.colors.gray};
      cursor: not-allowed;
      &:after {
        background-color: ${designTokens.colors.porcelain};
      }
    }
  }

  &__input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    &-disabled {
      cursor: not-allowed;
    }
  }
`;

// StyledComponentにdisplayNameをそのまま付与することはできなかったため、Wrapper関数を作成した
const GenericsComponent = <T extends string>(props: Props<T>): JSX.Element => (
  <StyledComponent {...props} />
);

export const Radio = GenericsComponent;
