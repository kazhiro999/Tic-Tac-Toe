import * as React from 'react';
import styled from 'styled-components';
import { Group } from '../../../../models/group';
import { EntitySelectContext } from '../../EntitySelectContext';
import { GroupItem } from './GroupItem';
import { getEntityTypeId } from '../../../../functions/entity';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  groups: Group[] | null;
  'aria-labelledby': string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  groups,
  'aria-labelledby': ariaLabelledby
}) => {
  if (groups === null) {
    return null;
  }

  return (
    <ul className={className} role="tree" aria-labelledby={ariaLabelledby}>
      {groups.map((group) => (
        <GroupItem key={getEntityTypeId(group)} group={group} />
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
  const { groups } = state.pickerDialog;

  return <StyledComponent groups={groups} aria-labelledby={ariaLabelledby} />;
};

export const GroupList = Container;
