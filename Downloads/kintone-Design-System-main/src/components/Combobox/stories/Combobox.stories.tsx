import { VFC, useState, ComponentProps, CSSProperties } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { Combobox } from '../index';

const baseProps = {
  arrowDownButtonLabel: 'フィールド名を選択'
} as const;

const Component: VFC<
  ComponentProps<typeof Combobox> & {
    wrapperStyle?: CSSProperties;
  }
> = ({ value: inputValue, changeValue, wrapperStyle, ...rest }) => {
  const [value, setValue] = useState(inputValue);

  return (
    <div style={wrapperStyle}>
      <Combobox
        {...rest}
        value={value}
        changeValue={(v) => {
          setValue(v);
          changeValue(v);
        }}
      />
    </div>
  );
};

export default {
  title: 'Components/Combobox',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    },
    wrapperStyle: {
      control: false
    }
  }
} as ComponentMeta<typeof Component>;

type StoryObj = ComponentStoryObj<typeof Component>;

const disableChromatic = {
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};

export const Default: StoryObj = {
  args: {
    ...baseProps,
    options: [
      { label: '項目1', value: 'option1' },
      { label: '項目2', value: 'option2' },
      { label: '項目3', value: 'option3' }
    ],
    value: 'option2'
  }
};

const range = (num: number): number[] => Array.from(Array(num), (_, k) => k);

export const ManyOptions: StoryObj = {
  args: {
    ...Default.args,
    options: range(30).map((i) => ({ label: `項目${i}`, value: `option${i}` }))
  },
  ...disableChromatic
};

export const PositionMiddle: StoryObj = {
  args: {
    ...ManyOptions.args,
    wrapperStyle: {
      top: '40%',
      position: 'absolute'
    }
  },
  ...disableChromatic
};

export const PositionBottom: StoryObj = {
  args: {
    ...ManyOptions.args,
    wrapperStyle: {
      bottom: '5%',
      position: 'absolute'
    }
  },
  ...disableChromatic
};
