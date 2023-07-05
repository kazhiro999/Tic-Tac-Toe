import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Center } from '..';

export default {
  title: 'Components/Center',
  component: Center
} as ComponentMeta<typeof Center>;

const generateBox = (size: number) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: '#888888',
        margin: 5
      }}
    />
  );
};

const children = (
  <>
    {generateBox(100)}
    {generateBox(200)}
    {generateBox(300)}
  </>
);

export const Horizontal: ComponentStoryObj<typeof Center> = {
  args: {
    vertical: false,
    horizontal: true,
    children: children
  }
};

export const Vertical: ComponentStoryObj<typeof Center> = {
  args: {
    vertical: true,
    horizontal: false,
    children: children
  }
};

export const AbsoluteCenter: ComponentStoryObj<typeof Center> = {
  args: {
    vertical: true,
    horizontal: true,
    children: children
  }
};
