import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { TextButton } from '../';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/TextButton',
  component: TextButton
} as ComponentMeta<typeof TextButton>;

export const Normal: ComponentStoryObj<typeof TextButton> = {
  args: {
    children: 'Click Me!',
    onClick: action('onClick'),
    color: 'primary'
  }
};

export const Delete: ComponentStoryObj<typeof TextButton> = {
  args: {
    children: 'Click Me!',
    onClick: action('onClick'),
    color: 'danger'
  }
};
