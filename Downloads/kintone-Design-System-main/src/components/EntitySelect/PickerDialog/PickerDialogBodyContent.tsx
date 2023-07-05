import * as React from 'react';
import styled from 'styled-components';
import { LeftPane } from './panes/LeftPane';
import { RightPane } from './panes/RightPane';
import { TabList } from './TabList';
import { PropsForStyled } from '../../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  return (
    <>
      <TabList />
      <div className={className} role="tabpanel">
        <LeftPane />
        <RightPane />
      </div>
    </>
  );
};

const StyledComponent: React.VFC = styled(Component)`
  display: flex;
  height: 440px;
`;

export const PickerDialogBodyContent = StyledComponent;
