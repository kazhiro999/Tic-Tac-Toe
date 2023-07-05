import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ShimaShimaList, ShimaShimaListProps } from '..';
import { ShimaShimaListItem } from '../ShimaShimaListItem';
import { ShimaShimaListMoreButtonLayout } from '../modules/types';

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
  title: 'Components/ShimaShimaList',
  component: ShimaShimaList,
  subcomponents: { ShimaShimaListItem },
  render: renderFn,
  argTypes: {
    onClickMoreButton: {
      action: 'onClick MoreButton'
    }
  }
} as ComponentMeta<typeof ShimaShimaList>;

type storyType = ComponentStoryObj<typeof ShimaShimaList>;

export const Normal: storyType = {
  args: {
    shouldShowMoreButton: true,
    moreButtonLabel: 'さらに表示'
  }
};

export const MoreButtonAlignCenter: storyType = {
  args: {
    ...Normal.args,
    moreButtonLayout: ShimaShimaListMoreButtonLayout.CENTER
  }
};

export const MoreButtonHeight: storyType = {
  args: {
    ...Normal.args,
    moreButtonListItemHeight: '56px'
  }
};

export const MoreButtonHidden: storyType = {
  args: {
    ...Normal.args,
    shouldShowMoreButton: false
  }
};
