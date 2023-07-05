import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { InputDate, InputDateProps } from '..';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

type Props = {
  initialValue: string;
} & InputDateProps;

const Component = (props: Props) => {
  const [value, setValue] = useState(props.initialValue);

  return (
    <div style={{ display: 'flex' }}>
      <InputDate
        {...props}
        changeValue={(v) => {
          props.changeValue(v);
          setValue(v);
        }}
        value={value}
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
  title: 'Components/InputDate/test',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  },
  excludeStories: ['args']
} as ComponentMeta<typeof Component>;

const openPicker = async ({
  canvasElement
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const inputDate = await canvas.findByRole('textbox');
  userEvent.click(inputDate);
  const pickerDialog = await canvas.findByRole('dialog');
  expect(pickerDialog).toBeVisible();
};

export const args = {
  initialValue: '2022-03-01',
  isUSDateFormat: false,
  isOrderOfMonthAndYear: false,
  onValidate: action('onValidate'),
  datePickerOpenSupportButtonLabel: 'カレンダーを開く',
  popupAriaLabel: 'カレンダー',
  previousMonthButtonAlternativeText: '先月',
  followingMonthButtonAlternativeText: '来月',
  yearDropdownItemSuffix: '年',
  monthLabels: [...Array(12).keys()].map((i) => `${i + 1}月`),
  calendarHeadCellLabels: {
    sun: '日',
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
    sat: '土'
  },
  todayButtonLabel: '今日',
  noneButtonLabel: '選択を解除'
};

/**
 * コンポーネントが含まれるフレックスアイテムの高さに応じて、ポップアップの表示位置がずれないことを検証
 * see: https://github.com/kintone-private/kintone-Design-System/issues/1224
 */
export const InFlexItem: ComponentStoryObj<typeof Component> = {
  args,
  play: openPicker
};
