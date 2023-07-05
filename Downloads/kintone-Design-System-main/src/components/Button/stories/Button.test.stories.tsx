import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Button } from '..';
import {
  NormalSizeLarge,
  NormalSizeMedium,
  NormalSizeSmall,
  PrimarySizeLarge,
  DeleteSizeLarge
} from './Button.stories';

export default {
  title: 'Components/Button/test',
  component: Button
} as ComponentMeta<typeof Button>;

export const NormalSizeLargeLongText: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeLarge.args,
    children: 'すこし長めのボタンラベル'
  }
};

export const NormalSizeMediumLongText: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeMedium.args,
    children: 'すこし長めのボタンラベル'
  }
};

export const NormalSizeSmallLongText: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeSmall.args,
    children: 'すこし長めのボタンラベル'
  }
};

export const NormalOnHover: ComponentStoryObj<typeof Button> = {
  ...NormalSizeLarge,
  parameters: {
    pseudo: { hover: true }
  }
};

const findButton = async (canvasElement: HTMLElement) =>
  within(canvasElement).findByRole('button');

export const NormalOnActive: ComponentStoryObj<typeof Button> = {
  ...NormalSizeLarge,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    userEvent.click(button);
    expect(button).toBe(document.activeElement);
  }
};

export const NormalOnFocus: ComponentStoryObj<typeof Button> = {
  ...NormalSizeLarge,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    button.focus();
  }
};

export const PrimaryOnHover: ComponentStoryObj<typeof Button> = {
  ...PrimarySizeLarge,
  parameters: {
    pseudo: { hover: true }
  }
};

export const PrimaryOnActive: ComponentStoryObj<typeof Button> = {
  ...PrimarySizeLarge,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    userEvent.click(button);
    expect(button).toBe(document.activeElement);
  }
};

export const PrimaryOnFocus: ComponentStoryObj<typeof Button> = {
  ...PrimarySizeLarge,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    button.focus();
    expect(button).toHaveFocus();
  }
};

export const DeleteOnHover: ComponentStoryObj<typeof Button> = {
  ...DeleteSizeLarge,
  parameters: {
    pseudo: { hover: true }
  }
};

export const DeleteOnActive: ComponentStoryObj<typeof Button> = {
  ...DeleteSizeLarge,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    userEvent.click(button);
    expect(button).toBe(document.activeElement);
  }
};

export const DeleteOnFocus: ComponentStoryObj<typeof Button> = {
  ...DeleteSizeLarge,
  play: async ({ canvasElement }) => {
    const button = await findButton(canvasElement);
    button.focus();
    expect(button).toHaveFocus();
  }
};
