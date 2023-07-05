import styled from 'styled-components';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { PropsForStyled } from '../../typings/propsForStyled';

export type CheckboxContent<T extends string> = Pick<
  CheckboxProps<T>,
  'label' | 'name' | 'value' | 'disabled'
>;

type Props<T extends string> = {
  checkboxContents: Array<CheckboxContent<T>>;
  changeValue: (name: T, value: boolean) => void;
};

export type CheckboxGroupProps<T extends string> = Props<T>;

const Component = <T extends string>({
  className,
  checkboxContents,
  changeValue
}: Props<T> & PropsForStyled) => {
  return (
    <>
      {checkboxContents.map((content) => (
        <span className={className} key={content.name}>
          <Checkbox {...content} changeValue={changeValue} />
        </span>
      ))}
    </>
  );
};

const StyledComponent: <T extends string>(
  props: Props<T>
) => JSX.Element = styled(Component)`
  display: inline-block;
  margin-bottom: 4px;
  margin-right: 16px;
`;

const GenericsComponent = <T extends string>(props: Props<T>): JSX.Element => (
  <StyledComponent {...props} />
);

export const CheckboxGroup = GenericsComponent;
