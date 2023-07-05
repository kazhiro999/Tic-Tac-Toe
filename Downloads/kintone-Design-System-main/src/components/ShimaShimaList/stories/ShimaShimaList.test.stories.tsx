import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ShimaShimaList, ShimaShimaListProps } from '..';
import { Normal } from './ShimaShimaList.stories';

const renderFn = (args: ShimaShimaListProps) => (
  <ShimaShimaList {...args}>
    {Array.from(Array(10).keys()).map((i) => (
      <a href="/" key={i}>
        Link{i}
      </a>
    ))}
  </ShimaShimaList>
);

export default {
  title: 'Components/ShimaShimaList/test',
  component: ShimaShimaList
} as ComponentMeta<typeof ShimaShimaList>;

type storyType = ComponentStoryObj<typeof ShimaShimaList>;

export const HoverMoreButton: storyType = {
  args: {
    ...Normal.args
  },
  parameters: {
    pseudo: { hover: true }
  },
  render: renderFn
};

export const FocusMoreButton: storyType = {
  args: {
    ...Normal.args
  },
  play: async ({ canvasElement }) => {
    const button = await within(canvasElement).findByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  },
  render: renderFn
};

export const MoreButtonLongLabel: storyType = {
  args: {
    ...Normal.args,
    moreButtonLabel: '長い長い長い長い長い長い長い長い長い長い長い長い文字列'
  },
  render: renderFn
};

export const ListItemLong: storyType = {
  args: {
    ...Normal.args,
    children: <p>長い長い長い長い長い長い長い長い長い長い文字列</p>
  }
};
