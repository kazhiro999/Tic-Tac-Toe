import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Radio } from '..';
import { Checked } from './Radio.stories';

export default {
  title: 'Components/Radio/test',
  component: Radio
} as ComponentMeta<typeof Radio>;

export const Focus: ComponentStoryObj<typeof Radio> = {
  ...Checked,
  play: async ({ canvasElement }) => {
    const radio = await within(canvasElement).findByRole('radio');
    radio.focus();
    expect(radio).toHaveFocus();
  }
};
