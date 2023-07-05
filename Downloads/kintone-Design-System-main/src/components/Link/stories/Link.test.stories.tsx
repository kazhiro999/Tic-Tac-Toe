import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Link } from '..';
import { Normal, Underline } from './Link.stories';

export default {
  title: 'Components/Link/test',
  component: Link
} as ComponentMeta<typeof Link>;

export const NormalOnHover: ComponentStoryObj<typeof Link> = {
  args: {
    ...Normal.args
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const NormalOnFocus: ComponentStoryObj<typeof Link> = {
  args: {
    ...Normal.args,
    shouldFocus: true
  }
};

export const NormalOnHoverAndFocus: ComponentStoryObj<typeof Link> = {
  args: {
    ...Normal.args,
    shouldFocus: true
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const UnderlineOnHover: ComponentStoryObj<typeof Link> = {
  args: {
    ...Underline.args
  },
  parameters: {
    pseudo: { hover: true }
  }
};

export const UnderlineOnFocus: ComponentStoryObj<typeof Link> = {
  args: {
    ...Underline.args,
    shouldFocus: true
  }
};

export const UserlineOnHoverAndFocus: ComponentStoryObj<typeof Link> = {
  args: {
    ...Underline.args,
    shouldFocus: true
  },
  parameters: {
    pseudo: { hover: true }
  }
};
