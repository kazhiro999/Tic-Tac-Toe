import * as React from 'react';
import { Organization } from '../../../../models/organization';
import { OrganizationStructure } from '../../modules/types';
import { OrganizationItem } from './OrganizationItem';
import styled from 'styled-components';
import { EntitySelectContext } from '../../EntitySelectContext';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  organizations: Record<string, Organization> | null;
  structure: OrganizationStructure | null;
  'aria-labelledby': string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  organizations,
  structure,
  'aria-labelledby': ariaLabelledby
}) => {
  if (organizations === null || structure === null) {
    return null;
  }

  return (
    <ul className={className} role="tree" aria-labelledby={ariaLabelledby}>
      {structure.childStructures.map((childStructure) => (
        <OrganizationItem
          key={childStructure.organizationId}
          organizations={organizations}
          structure={childStructure}
        />
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
  const { organizations, organizationStructure } = state.pickerDialog;

  return (
    <StyledComponent
      organizations={organizations}
      structure={organizationStructure}
      aria-labelledby={ariaLabelledby}
    />
  );
};

export const OrganizationList = Container;
