import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Tooltip } from '..';

export default {
  title: 'Components/Tooltip',
  component: Tooltip
} as ComponentMeta<typeof Tooltip>;

export const Normal: ComponentStoryObj<typeof Tooltip> = {
  args: {
    children: 'これはツールチップ本体です'
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <div style={{ position: 'relative' }}>
          <Story />
        </div>
      </div>
    )
  ]
};
