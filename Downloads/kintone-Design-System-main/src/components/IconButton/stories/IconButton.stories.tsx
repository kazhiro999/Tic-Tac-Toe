import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { IconButton } from '..';
import { AddActiveIcon, AddIcon } from '../../../icons';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: { onClick: { action: 'onClick' } }
} as ComponentMeta<typeof IconButton>;

export const Normal: ComponentStoryObj<typeof IconButton> = {
  args: {
    alternativeText: '追加',
    width: 48,
    height: 48,
    iconWidth: 32,
    iconHeight: 32,
    icon: <AddIcon />,
    hoverIcon: <AddActiveIcon />
  }
};

export const AriaAttributes: ComponentStoryObj<typeof IconButton> = {
  args: {
    ...Normal.args,
    alternativeText: '追加',
    'aria-haspopup': true,
    'aria-expanded': true
  }
};
