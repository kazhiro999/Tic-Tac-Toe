import { ComponentStoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { InputTime, InputTimeProps } from '../index';
import { userEvent, within } from '@storybook/testing-library';

const Component = ({
  value: inputValue,
  changeValue,
  ...rest
}: InputTimeProps) => {
  const [value, setValue] = useState(inputValue);
  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <div style={{ display: 'flex' }}>
      <InputTime
        value={value}
        changeValue={(v) => {
          setValue(v);
          changeValue(v);
        }}
        {...rest}
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
  title: 'Components/InputTime/test',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
};

/**
 * コンポーネントが含まれるフレックスアイテムの高さに応じて、ポップアップの表示位置がずれないことを検証
 * see: https://github.com/kintone-private/kintone-Design-System/issues/1224
 */
export const InFlexItem: ComponentStoryObj<typeof Component> = {
  args: {
    isAMPMNotation: true,
    value: '13:32',
    hourAriaLabel: '時',
    minuteAriaLabel: '分',
    getAMPMLabel: (value) => value,
    inputTextAriaLabel: '時刻',
    timePickerOpenSupportButtonLabel: '時刻を選択'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Timeboxに相当するdiv[role=group]をクリック（Hour/Minute/AMPMをクリックするとFocused状態になってしまうのを避ける）
    await userEvent.click(await canvas.findByRole('group'));
  },
  parameters: {
    chromatic: {
      // OptionLabelが数PXずれるflakyなテストになっているため、diffThresholdで表示位置のずれの検出範囲を適切な値に拡張する
      // See: https://www.chromatic.com/docs/threshold#setting-the-threshold
      // Chromaticのdiff thresholdチェックツールによると、0.8が妥当
      diffThreshold: 0.8
    }
  }
};
