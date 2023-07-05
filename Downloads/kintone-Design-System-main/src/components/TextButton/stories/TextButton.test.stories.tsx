import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TextButton } from '../';
import { Normal, Delete } from './TextButton.stories';

export default {
  title: 'Components/TextButton/test',
  component: TextButton
} as ComponentMeta<typeof TextButton>;

export const NormalLongText: ComponentStoryObj<typeof TextButton> = {
  args: {
    ...Normal.args,
    children: '123456789012345678901234567890'
  }
};

export const DeleteLongText: ComponentStoryObj<typeof TextButton> = {
  args: {
    ...Delete.args,
    children: '123456789012345678901234567890'
  }
};

export const NormalOnHover: ComponentStoryObj<typeof TextButton> = {
  ...Normal,
  parameters: {
    pseudo: { hover: true }
  }
};

const findButton = (canvasElement: HTMLElement) =>
  within(canvasElement).findByRole('button');

export const NormalOnActive: ComponentStoryObj<typeof TextButton> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    userEvent.click(button);
    expect(button).toHaveFocus();
  }
};

export const NormalOnFocus: ComponentStoryObj<typeof TextButton> = {
  ...Normal,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    button.focus();
    expect(button).toHaveFocus();
  }
};

export const DeleteOnHover: ComponentStoryObj<typeof TextButton> = {
  ...Delete,
  parameters: {
    pseudo: { hover: true }
  }
};

export const DeleteOnActive: ComponentStoryObj<typeof TextButton> = {
  ...Delete,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    userEvent.click(button);
    expect(button).toHaveFocus();
  }
};

export const DeleteOnFocus: ComponentStoryObj<typeof TextButton> = {
  ...Delete,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    button.focus();
    expect(button).toHaveFocus();
  }
};
