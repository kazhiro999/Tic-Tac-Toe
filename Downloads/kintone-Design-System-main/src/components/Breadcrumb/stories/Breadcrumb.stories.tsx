import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Breadcrumb } from '..';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb
} as ComponentMeta<typeof Breadcrumb>;

export const Normal: ComponentStoryObj<typeof Breadcrumb> = {
  args: {
    breadcrumbStructure: {
      portalUrl: '',
      items: [
        {
          title: 'スペース',
          label: 'スペース名',
          href: '/spaceId'
        },
        {
          title: 'アプリ',
          label: 'アプリ名',
          href: '/appId'
        },
        {
          label: 'アプリの設定',
          href: '/hoge2'
        },
        {
          label: 'デザインテーマの設定',
          current: true
        }
      ]
    },
    portalLabel: 'ポータル'
  }
};
