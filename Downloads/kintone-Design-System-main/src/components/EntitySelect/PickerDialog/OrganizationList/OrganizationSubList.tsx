import * as React from 'react';
import { Organization } from '../../../../models/organization';
import { OrganizationStructure } from '../../modules/types';
import { OrganizationItem } from './OrganizationItem';
import styled from 'styled-components';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  organizations: Record<string, Organization>;
  structure: OrganizationStructure;
  subListId: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  organizations,
  structure,
  subListId
}) => (
  <ul className={className} role="group" id={subListId}>
    {structure.childStructures.map((childStructure) => (
      <OrganizationItem
        key={childStructure.organizationId}
        organizations={organizations}
        structure={childStructure}
      />
    ))}
  </ul>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  margin: 0;
  padding: 0;
  padding-left: 16px;
  list-style: none;
`;

export const OrganizationSubList = StyledComponent;
