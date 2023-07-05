import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Icon } from '..';
import { HeaderHomeIcon } from '../../../icons';

export default {
  title: 'Components/Icon',
  component: Icon
} as ComponentMeta<typeof Icon>;

export const SvgIcon: ComponentStoryObj<typeof Icon> = {
  args: {
    alternativeText: 'ホーム',
    width: 32,
    height: 32,
    icon: <HeaderHomeIcon />
  }
};

export const SvgIconWithNoAlt: ComponentStoryObj<typeof Icon> = {
  args: {
    ...SvgIcon.args,
    alternativeText: undefined
  }
};

export const ImgIcon: ComponentStoryObj<typeof Icon> = {
  args: {
    alternativeText: 'アプリ',
    width: 32,
    height: 32,
    iconUrl:
      'https://static.cybozu.com/contents/k/image/argo/uiparts/widget/apps_56.png'
  }
};
