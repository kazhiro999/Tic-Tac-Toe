import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { IconLink } from '..';
import { Normal } from './IconLink.stories';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/IconLink/test',
  component: IconLink
} as ComponentMeta<typeof IconLink>;

export const NormalOnHover: ComponentStoryObj<typeof IconLink> = {
  args: {
    ...Normal.args
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.hover(await canvas.findByRole('link'));
  }
};

export const NormalOnFocus: ComponentStoryObj<typeof IconLink> = {
  args: {
    ...Normal.args,
    shouldFocus: true,
    clearShouldFocus: action('clearShouldFocus')
  }
};
