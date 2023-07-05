import * as React from 'react';
import { AriaAttributes } from 'react';
import styled from 'styled-components';
import { Tab } from './Tab';
import { PropsForStyled } from '../../../typings/propsForStyled';
import { useHandleKeyDownTabList } from '../../../hooks/TabList/useHandleKeyDownTabList';

export type TabItem = {
  id: string;
  label: string;
};

type Props = {
  selectedTabId: string;
  changeTab: (id: string) => void;
  onKeyDown: React.KeyboardEventHandler;
  tabItems: TabItem[];
  tabWidth?: number;
} & Pick<AriaAttributes, 'aria-label' | 'aria-labelledby'>;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  selectedTabId,
  changeTab,
  onKeyDown,
  tabItems,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  tabWidth
}) => {
  return (
    <ul
      role="tablist"
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {tabItems.map((tabItem) => (
        <Tab
          key={tabItem.id}
          id={tabItem.id}
          label={tabItem.label}
          selected={tabItem.id === selectedTabId}
          onClick={() => changeTab(tabItem.id)}
          onKeyDown={onKeyDown}
          width={tabWidth}
        />
      ))}
    </ul>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  flex: 1;
  padding: 16px 16px 0 16px;
  margin: 0;
  list-style: none;
`;

const Container: React.VFC<Omit<Props, 'onKeyDown'>> = ({
  tabItems,
  selectedTabId,
  changeTab,
  ...rest
}) => {
  const selectedIndex = tabItems.findIndex((item) => item.id === selectedTabId);
  const handleKeyDown = useHandleKeyDownTabList(
    tabItems.length,
    selectedIndex,
    (nextIndex) => changeTab(tabItems[nextIndex].id)
  );

  return (
    <StyledComponent
      tabItems={tabItems}
      selectedTabId={selectedTabId}
      changeTab={changeTab}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
};

export const TabList = Container;
