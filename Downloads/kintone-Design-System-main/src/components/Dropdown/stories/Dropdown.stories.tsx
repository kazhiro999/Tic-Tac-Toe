import { useState } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Dropdown, DropdownProps } from '..';

type Props = { initialValue: string } & DropdownProps<string>;

const Component = ({ initialValue, ...args }: Props) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div style={{ minHeight: 200 }}>
      <Dropdown
        {...args}
        changeValue={(v) => {
          args.changeValue(v);
          setValue(v);
        }}
        value={value}
      />
    </div>
  );
};

export default {
  title: 'Components/Dropdown',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as ComponentMeta<typeof Component>;

export const Normal: ComponentStoryObj<typeof Component> = {
  args: {
    options: [
      { label: '項目1', value: 'option1' },
      { label: '項目2', value: 'option2' },
      { label: '項目3', value: 'option3' }
    ],
    initialValue: 'option2'
  }
};

export const Disabled: ComponentStoryObj<typeof Component> = {
  args: {
    ...Normal.args,
    disabled: true
  }
};

export const Placement: ComponentStoryObj<typeof Component> = {
  args: {
    ...Normal.args,
    placement: 'top-start'
  },
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '200px' }} />
        <Story />
      </>
    )
  ]
};

// @deprecated inputのheightを統一する際に、既存UIに影響させないための暫定フラグ(see:https://github.com/kintone-private/kintone-Design-System/issues/1073)
export const LegacyHeight: ComponentStoryObj<typeof Component> = {
  args: {
    ...Normal.args,
    isLegacyHeight: true
  }
};
