import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Link } from '..';

export default {
  title: 'Components/Link',
  component: Link
} as ComponentMeta<typeof Link>;

export const Normal: ComponentStoryObj<typeof Link> = {
  args: {
    url: 'https://cybozu.co.jp/',
    children: 'クリック'
  }
};

export const External: ComponentStoryObj<typeof Link> = {
  args: {
    url: 'https://cybozu.co.jp/',
    shouldOpenOtherTab: true,
    externalSite: true,
    children: 'クリック'
  }
};

export const Underline: ComponentStoryObj<typeof Link> = {
  args: {
    url: 'https://cybozu.co.jp/',
    children: 'クリック',
    underline: true
  }
};
