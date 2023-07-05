import { within, userEvent } from '@storybook/testing-library';
import { Combobox } from '..';
import { VFC, ComponentProps, useState } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

const Component: VFC<ComponentProps<typeof Combobox>> = ({
  value: inputValue,
  changeValue,

  ...rest
}) => {
  const [value, setValue] = useState(inputValue);

  return (
    <div style={{ display: 'flex' }}>
      <Combobox
        {...rest}
        value={value}
        changeValue={(v) => {
          setValue(v);
          changeValue(v);
        }}
      />
      <div
        style={{
          width: 150,
          height: 150,
          backgroundColor: '#888888',
          margin: 5
        }}
      />
    </div>
  );
};

export default {
  title: 'Components/Combobox/test',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as ComponentMeta<typeof Combobox>;

const baseProps = {
  arrowDownButtonLabel: 'フィールド名を選択',
  options: [
    { label: '項目1', value: 'option1' },
    { label: '項目2', value: 'option2' },
    { label: '項目3', value: 'option3' }
  ],
  value: 'option2'
};

const playComboboxOpen: ComponentStoryObj<typeof Combobox>['play'] = async ({
  canvasElement
}) => {
  const canvas = within(canvasElement);
  userEvent.click(await canvas.findByRole('combobox'));
};

/**
 * コンポーネントが含まれるフレックスアイテムの高さに応じて、ポップアップの表示位置がずれないことを検証
 * see: https://github.com/kintone-private/kintone-Design-System/issues/1224
 */
export const InFlexItem: ComponentStoryObj<typeof Component> = {
  args: {
    ...baseProps
  },
  play: playComboboxOpen
};
