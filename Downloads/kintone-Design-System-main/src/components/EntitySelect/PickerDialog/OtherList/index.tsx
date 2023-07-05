import * as React from 'react';
import styled from 'styled-components';
import { EntitySelectContext } from '../../EntitySelectContext';
import { Other } from '../../modules/types';
import { OtherItem } from './OtherItem';
import { getEntityTypeId } from '../../../../functions/entity';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  others: Other[] | null;
  'aria-labelledby': string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  others,
  'aria-labelledby': ariaLabelledby
}) => {
  if (others === null) {
    return null;
  }

  return (
    <ul className={className} role="tree" aria-labelledby={ariaLabelledby}>
      {others.map((other) => (
        <OtherItem key={getEntityTypeId(other)} other={other} />
      ))}
    </ul>
  );
};

export const StyledComponent: React.VFC<Props> = styled(Component)`
  padding: 16px;
  margin: 0;
  list-style: none;
`;

type OuterProps = {
  'aria-labelledby': string;
};

const Container: React.VFC<OuterProps> = ({
  'aria-labelledby': ariaLabelledby
}) => {
  const { state } = React.useContext(EntitySelectContext);
  const { others } = state.pickerDialog;

  return <StyledComponent others={others} aria-labelledby={ariaLabelledby} />;
};

export const OtherList = Container;
