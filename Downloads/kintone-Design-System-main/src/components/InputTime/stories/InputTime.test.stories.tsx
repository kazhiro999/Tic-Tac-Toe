import { ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { InputTime } from '../index';
import { Notation12, EmptyOfNotation12 } from './InputTime.stories';

export default {
  title: 'Components/InputTime/test',
  component: InputTime,
  parameters: {
    backgrounds: {
      default: 'white'
    }
  },
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
};

export const FocusedHour: ComponentStoryObj<typeof InputTime> = {
  args: {
    ...Notation12.args
  },
  play: async () => {
    userEvent.tab();
  }
};

export const FocusedMinute: ComponentStoryObj<typeof InputTime> = {
  args: {
    ...Notation12.args
  },
  play: async () => {
    userEvent.tab();
    userEvent.tab();
  }
};

export const FocusedAMPM: ComponentStoryObj<typeof InputTime> = {
  args: {
    ...Notation12.args
  },
  play: async () => {
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
  }
};

// Timeboxに相当するdiv[role=group]をクリック（Hour/Minute/AMPMをクリックするとFocused状態になってしまうのを避ける）
const openTimeGroup = async (canvasElement: HTMLElement) => {
  const canvas = await within(canvasElement);
  userEvent.click(await within(canvasElement).findByRole('group'));
  expect(await canvas.findByRole('menu')).toBeVisible();
  return canvas;
};

export const Open: ComponentStoryObj<typeof InputTime> = {
  ...Notation12,
  play: async ({ canvasElement }) => {
    await openTimeGroup(canvasElement);
  }
};

export const Active: ComponentStoryObj<typeof InputTime> = {
  ...Notation12,
  play: async ({ canvasElement }) => {
    const canvas = await openTimeGroup(canvasElement);
    userEvent.hover((await canvas.findAllByRole('menuitem'))[0]);
  }
};

export const PositionBottom: ComponentStoryObj<typeof InputTime> = {
  ...Notation12,
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '800px' }} />
        <Story />
      </>
    )
  ],
  play: async ({ canvasElement }) => {
    await openTimeGroup(canvasElement);
  }
};

// EmptyでOpen状態にしたときに、一番上のmenuitemが表示されていることを確認する
export const EmptyOpen: ComponentStoryObj<typeof InputTime> = {
  ...EmptyOfNotation12,
  play: async ({ canvasElement }) => {
    const canvas = await openTimeGroup(canvasElement);
    expect((await canvas.findAllByRole('menuitem'))[0]).toBeVisible();
  }
};
