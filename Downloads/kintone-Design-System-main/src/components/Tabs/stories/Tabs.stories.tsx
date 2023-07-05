import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Tabs } from '..';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { TabList, TabPanel },
  excludeStories: ['tabItems']
} as ComponentMeta<typeof Tabs>;

export const tabItems = [
  {
    id: 'tab1',
    label: 'タブ1'
  },
  {
    id: 'tab2',
    label: 'タブ2'
  },
  {
    id: 'tab3',
    label: 'タブ3'
  }
];

export const Normal: ComponentStoryObj<typeof Tabs> = {
  render: ({ selectedTabId: initialSelectedTabId, changeTab, ...rest }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedTabId, setSelectedTabId] = useState(initialSelectedTabId);
    const content = `タブパネル(${selectedTabId})`;
    return (
      <Tabs
        {...rest}
        selectedTabId={selectedTabId}
        tabPanelContent={content}
        changeTab={(value) => {
          setSelectedTabId(value);
          return changeTab(value);
        }}
      />
    );
  },
  args: {
    selectedTabId: tabItems[1].id,
    tabItems: tabItems,
    changeTab: action('changeTab')
  }
};
