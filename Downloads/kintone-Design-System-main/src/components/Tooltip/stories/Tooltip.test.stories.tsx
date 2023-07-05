import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Tooltip } from '..';
import { IconButton } from '../../IconButton';
import { TooltipHelpIcon } from '../../../icons';

export default {
  title: 'Components/Tooltip/test',
  component: Tooltip
} as ComponentMeta<typeof Tooltip>;

const HelpIconButton = () => (
  <IconButton
    alternativeText="ヒント"
    hasButtonTitle={false}
    width={16}
    height={16}
    iconWidth={16}
    iconHeight={16}
    icon={<TooltipHelpIcon />}
  />
);

type storyType = ComponentStoryObj<typeof Tooltip>;
const message = 'これはツールチップ本体です';

export const WithIconToTheUpperLeft: storyType = {
  args: {
    children: message
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <div style={{ position: 'relative' }}>
          <HelpIconButton />
          <Story />
        </div>
      </div>
    )
  ]
};

export const WithIconToTheUpperRight: storyType = {
  args: {
    children: message
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <div style={{ position: 'relative' }}>
          <HelpIconButton />
          <Story />
        </div>
      </div>
    )
  ]
};

export const WithIconToTheLowerLeft: storyType = {
  args: {
    children: message
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
        <div style={{ position: 'relative' }}>
          <HelpIconButton />
          <Story />
        </div>
      </div>
    )
  ]
};

export const WithIconToTheLowerRight: storyType = {
  args: {
    children: message
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <div style={{ position: 'relative' }}>
          <HelpIconButton />
          <Story />
        </div>
      </div>
    )
  ]
};

export const LongHelperText: storyType = {
  args: {
    children: '少し長めのツールチップ、少し長めのツールチップ'
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', top: 50, left: 50 }}>
        <div style={{ position: 'relative' }}>
          <HelpIconButton />
          <Story />
        </div>
      </div>
    )
  ]
};

export const WrapHelperText: storyType = {
  args: {
    children: (
      <p>
        HelperText内に改行がある
        <br />
        3段落で構成される
        <br />
        ツールチップ
      </p>
    )
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', top: 50, left: 50 }}>
        <div style={{ position: 'relative' }}>
          <HelpIconButton />
          <Story />
        </div>
      </div>
    )
  ]
};
