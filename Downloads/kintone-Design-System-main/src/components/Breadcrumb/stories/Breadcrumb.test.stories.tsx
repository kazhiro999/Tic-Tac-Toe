import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Normal } from './Breadcrumb.stories';
import { Breadcrumb } from '..';

export default {
  title: 'Components/Breadcrumb/test',
  component: Breadcrumb
} as ComponentMeta<typeof Breadcrumb>;

export const TooLong: ComponentStoryObj<typeof Breadcrumb> = {
  args: {
    breadcrumbStructure: {
      portalUrl: '',
      items: [
        {
          title: 'アプリ',
          label:
            'アプリ名アプリ名アプリ名アプリ名アプリ名アプリ名アプリ名アプリ名アプリ名',
          href: '/appId'
        },
        {
          label: '案件管理',
          current: true
        }
      ]
    },
    portalLabel: 'ポータル'
  }
};

export const Hover: ComponentStoryObj<typeof Breadcrumb> = {
  args: {
    ...Normal.args
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const FocusOnHomeLink: ComponentStoryObj<typeof Breadcrumb> = {
  args: {
    ...Normal.args
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: 'ポータル' });
    link.focus();
    expect(link).toHaveFocus();
  }
};

export const FocusOnBreadcrumbItemLink: ComponentStoryObj<typeof Breadcrumb> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = await canvas.findAllByRole('link');
    const itemLink = links[links.length - 1];
    itemLink.focus();
    expect(itemLink).toHaveFocus();
  }
};
