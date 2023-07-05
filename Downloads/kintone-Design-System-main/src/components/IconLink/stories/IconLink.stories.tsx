import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { IconLink } from '..';
import { AddActiveIcon, AddIcon, GuideHelpIcon } from '../../../icons';

export default {
  title: 'Components/IconLink',
  component: IconLink
} as ComponentMeta<typeof IconLink>;

export const Normal: ComponentStoryObj<typeof IconLink> = {
  args: {
    alternativeText: '追加',
    width: 48,
    height: 48,
    iconWidth: 32,
    iconHeight: 32,
    icon: <AddIcon />,
    hoverIcon: <AddActiveIcon />,
    url: '#',
    shouldOpenOtherTab: false,
    externalSite: false
  }
};

export const NormalGuideHelp: ComponentStoryObj<typeof IconLink> = {
  args: {
    alternativeText: 'ヘルプ',
    width: 48,
    height: 48,
    iconWidth: 32,
    iconHeight: 32,
    icon: <GuideHelpIcon />,
    url: '#',
    shouldOpenOtherTab: false,
    externalSite: false
  }
};
