import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Tabs } from '..';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Normal } from './Tabs.stories';

export default {
  title: 'Components/Tabs/test',
  component: Tabs,
  subcomponents: { TabList, TabPanel }
} as ComponentMeta<typeof Tabs>;

export const TabWidth: ComponentStoryObj<typeof Tabs> = {
  args: {
    ...Normal.args,
    tabWidth: 300
  }
};

export const LongTabLabel: ComponentStoryObj<typeof Tabs> = {
  args: {
    ...Normal.args,
    tabItems: [
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
      },
      { id: 'tab4', label: 'タブ4は長めのタブラベル' }
    ]
  }
};

export const FocusOnActiveTab: ComponentStoryObj<typeof Tabs> = {
  args: {
    ...Normal.args
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const activeTab = await canvas.findByRole('tab', { selected: true });
    activeTab.focus();
    expect(activeTab).toHaveFocus();
  }
};

export const FocusOnNonActiveTab: ComponentStoryObj<typeof Tabs> = {
  args: {
    ...Normal.args
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const notActiveTab = (
      await canvas.findAllByRole('tab', { selected: false })
    )[0];
    notActiveTab.focus();
    expect(notActiveTab).toHaveFocus();
  }
};
