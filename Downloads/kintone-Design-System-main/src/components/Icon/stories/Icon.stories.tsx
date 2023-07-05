import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Icon } from '..';
import { AddIcon, HeaderHomeIcon } from '../../../icons';

export default {
  title: 'Components/Icon',
  component: Icon
} as ComponentMeta<typeof Icon>;

export const Normal: ComponentStoryObj<typeof Icon> = {
  args: {
    alternativeText: 'ホーム',
    width: 32,
    height: 32,
    icon: <HeaderHomeIcon />
  }
};

export const Add: ComponentStoryObj<typeof Icon> = {
  args: {
    alternativeText: '追加',
    width: 32,
    height: 32,
    icon: <AddIcon />
  }
};

export const Large: ComponentStoryObj<typeof Icon> = {
  args: {
    alternativeText: 'ホーム',
    width: 32 * 2,
    height: 32 * 2,
    icon: <HeaderHomeIcon />
  }
};

export const Rotate: ComponentStoryObj<typeof Icon> = {
  args: {
    alternativeText: 'ホーム',
    width: 32,
    height: 32,
    icon: <HeaderHomeIcon />,
    rotate: 90
  }
};
