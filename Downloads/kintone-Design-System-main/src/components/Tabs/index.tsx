import React from 'react';
import { TabPanel } from './TabPanel';
import { TabItem, TabList } from './TabList/index';

type Props = {
  selectedTabId: string;
  changeTab: (id: string) => void;
  tabItems: TabItem[];
  tabPanelContent: React.ReactNode;
  tabWidth?: number;
  tabListAriaLabel?: string;
  tabListAriaLabelledBy?: string;
};

export type TabsProps = Props;
export type TabItemProps = TabItem;

const Component: React.VFC<Props> = ({
  selectedTabId,
  changeTab,
  tabItems,
  tabPanelContent,
  tabWidth,
  tabListAriaLabel,
  tabListAriaLabelledBy
}) => {
  return (
    <>
      <TabList
        selectedTabId={selectedTabId}
        changeTab={changeTab}
        tabItems={tabItems}
        tabWidth={tabWidth}
        aria-label={tabListAriaLabel}
        aria-labelledby={tabListAriaLabelledBy}
      />
      <TabPanel>{tabPanelContent}</TabPanel>
    </>
  );
};

export const Tabs = Component;
