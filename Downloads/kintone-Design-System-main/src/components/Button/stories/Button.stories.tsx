import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Button } from '..';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'onClick'
    }
  }
} as ComponentMeta<typeof Button>;

export const NormalSizeLarge: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Click Me!',
    color: 'normal',
    size: 'large',
    disabled: false
  }
};

export const PrimarySizeLarge: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeLarge.args,
    color: 'primary'
  }
};

export const DeleteSizeLarge: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeLarge.args,
    color: 'delete'
  }
};

export const NormalSizeMedium: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeLarge.args,
    size: 'medium'
  }
};

export const PrimarySizeMedium: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeMedium.args,
    color: 'primary'
  }
};

export const DeleteSizeMedium: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeMedium.args,
    color: 'delete'
  }
};

export const NormalSizeSmall: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeLarge.args,
    size: 'small'
  }
};

export const PrimarySizeSmall: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeSmall.args,
    color: 'primary'
  }
};

export const DeleteSizeSmall: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeSmall.args,
    color: 'delete'
  }
};

export const Disabled: ComponentStoryObj<typeof Button> = {
  args: {
    ...NormalSizeLarge.args,
    disabled: true
  }
};
