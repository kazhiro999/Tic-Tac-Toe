import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Spinner } from '..';

export default {
  title: 'Components/Spinner',
  component: Spinner
} as ComponentMeta<typeof Spinner>;

export const WithAltText: ComponentStoryObj<typeof Spinner> = {
  parameters: {
    chromatic: { pauseAnimationAtEnd: true }
  },
  args: {
    altText: 'Now loading...'
  }
};

export const WithoutAltText: ComponentStoryObj<typeof Spinner> = {
  parameters: {
    chromatic: { pauseAnimationAtEnd: true }
  },
  args: {
    altText: ''
  }
};
