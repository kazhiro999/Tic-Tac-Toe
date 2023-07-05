import styled from 'styled-components';
import { Radio, RadioProps } from '../Radio';
import { PropsForStyled } from '../../typings/propsForStyled';

export type RadioContent<T extends string> = Pick<
  RadioProps<T>,
  'value' | 'label'
>;

type Props<T extends string> = {
  value: T;
  groupName: string;
  radioContents: Array<RadioContent<T>>;
  changeValue: (value: T) => void;
  disabled?: boolean;
};

export type RadioGroupProps<T extends string> = Props<T>;

// Genericsとの併用ができないので、React.VFCで型をつけていない
// ファイルの下部で定義されているGenericsComponentについても同様
// https://sharedoc.atlassian.net/wiki/spaces/Frorea/pages/2540568698
const Component = <T extends string>({
  value,
  groupName,
  className,
  radioContents,
  changeValue,
  disabled = false
}: Props<T> & PropsForStyled): JSX.Element => (
  <div className={className}>
    {radioContents.map((content) => (
      <span className={`${className}__radio-container`} key={content.value}>
        <Radio
          {...content}
          name={groupName}
          checked={value === content.value}
          changeValue={changeValue}
          disabled={disabled}
        />
      </span>
    ))}
  </div>
);

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  display: inline-block;

  &__radio-container {
    display: inline-block;
    margin-right: 16px;
  }
`;

// StyledComponentにdisplayNameをそのまま付与することはできなかったため、Wrapper関数を作成した
const GenericsComponent = <T extends string>(props: Props<T>): JSX.Element => (
  <StyledComponent {...props} />
);

export const RadioGroup = GenericsComponent;
