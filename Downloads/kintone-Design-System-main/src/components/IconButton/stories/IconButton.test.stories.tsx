import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { IconButton } from '..';
import { Normal } from './IconButton.stories';

export default {
  title: 'Components/IconButton/test',
  component: IconButton,
  argTypes: { onClick: { action: 'onClick' } }
} as ComponentMeta<typeof IconButton>;

const findButton = async (canvasElement: HTMLElement) =>
  within(canvasElement).findByRole('button');

export const NormalOnHover: ComponentStoryObj<typeof IconButton> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    userEvent.hover(await findButton(canvasElement));
  }
};

export const NormalOnFocus: ComponentStoryObj<typeof IconButton> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    button.focus();
    expect(button).toHaveFocus();
  }
};

export const NormalOnActive: ComponentStoryObj<typeof IconButton> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    button.click();
    expect(button).toHaveFocus();
  }
};
