import * as React from 'react';
import { EntitySelectValue } from '../modules/types';
import { SelectedEntityItem } from './SelectedEntityItem';
import { isSameEntitySelectValue } from '../functions/isSameEntitySelectValue';
import { EntitySelectContext } from '../EntitySelectContext';
import { getEntityTypeId } from '../../../functions/entity';
import styled from 'styled-components';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  values: EntitySelectValue[];
  changeValues: (values: EntitySelectValue[]) => void;
};

export const Component: React.VFC<Props & PropsForStyled> = ({
  values,
  changeValues,
  className
}) => {
  const deleteValue = (targetValue: EntitySelectValue) => {
    const newValues = values.filter(
      (value) => !isSameEntitySelectValue(value, targetValue)
    );
    changeValues(newValues);
  };

  return (
    <ul
      className={className}
      data-testid="shared-EntitySelect-SelectedEntityList"
    >
      {values.map((value) => (
        <SelectedEntityItem
          key={getEntityTypeId(value)}
          value={value}
          onDeleteButtonClick={() => deleteValue(value)}
        />
      ))}
    </ul>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Container: React.VFC = () => {
  const { values, changeValues } = React.useContext(EntitySelectContext);

  return <StyledComponent values={values} changeValues={changeValues} />;
};

export const SelectedEntityList = Container;
