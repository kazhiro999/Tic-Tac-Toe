import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { PageLoading } from '..';

export default {
  title: 'Components/PageLoading',
  component: PageLoading
} as ComponentMeta<typeof PageLoading>;

export const Normal: ComponentStoryObj<typeof PageLoading> = {
  args: {
    shown: true
  },
  parameters: {
    chromatic: { pauseAnimationAtEnd: true }
  }
};
