import { useState } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { InputDate, InputDateProps } from '..';
import { NormalDateFormat } from './InputDate.stories';

type Props = InputDateProps & {
  initialValue: string;
};

const Component = (props: Props) => {
  const [value, setValue] = useState(props.initialValue);

  return <InputDate {...props} changeValue={setValue} value={value} />;
};

export default {
  title: 'Components/InputDate/test',
  component: Component,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as ComponentMeta<typeof Component>;

const disableChromatic = {
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};

const openPicker = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const inputDate = await canvas.findByRole('textbox');
  userEvent.click(inputDate);
  const pickerDialog = await canvas.findByRole('dialog');
  expect(pickerDialog).toBeVisible();
  return pickerDialog;
};

export const MonthAndYear: ComponentStoryObj<typeof Component> = {
  args: {
    ...NormalDateFormat.args,
    isUSDateFormat: true,
    isOrderOfMonthAndYear: true
  },
  play: ({ canvasElement }) => {
    openPicker(canvasElement);
  }
};

const today = new Date();
export const Today: ComponentStoryObj<typeof Component> = {
  args: {
    ...NormalDateFormat.args,
    initialValue: `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`
  },
  play: ({ canvasElement }) => {
    openPicker(canvasElement);
  },
  ...disableChromatic
};

export const ClickInScreenTop: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: ({ canvasElement }) => {
    openPicker(canvasElement);
  }
};

export const ClickInScreenMiddle: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', top: '50%' }}>
        <Story />
      </div>
    )
  ],
  play: ({ canvasElement }) => {
    openPicker(canvasElement);
  }
};

export const ClickInScreenBottom: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  decorators: [
    (Story) => (
      <div style={{ position: 'absolute', bottom: 0 }}>
        <Story />
      </div>
    )
  ],
  play: ({ canvasElement }) => {
    openPicker(canvasElement);
  }
};

export const ClickPreviousMonth: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    const pickerDialog = await openPicker(canvasElement);
    const prevMonth = await within(pickerDialog).findByRole('button', {
      name: '先月'
    });
    userEvent.click(prevMonth);
    expect(
      await within(pickerDialog).findByTestId('month-dropdown')
    ).toHaveTextContent('2月');
  }
};

export const ClickFollowingMonth: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    const pickerDialog = await openPicker(canvasElement);
    const prevMonth = await within(pickerDialog).findByRole('button', {
      name: '来月'
    });
    userEvent.click(prevMonth);
    expect(
      await within(pickerDialog).findByTestId('month-dropdown')
    ).toHaveTextContent('4月');
  }
};

export const ClickYearDropdown: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    const pickerDialog = await openPicker(canvasElement);
    const yearDropdownButton = await within(pickerDialog).findByRole('button', {
      name: '2022年'
    });
    userEvent.click(yearDropdownButton);
    expect(
      await within(
        await within(pickerDialog).findByTestId('year-dropdown')
      ).findByRole('listbox')
    ).toBeVisible();
  }
};

export const ClickMonthDropdown: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    const pickerDialog = await openPicker(canvasElement);
    const monthDropdownButton = await within(pickerDialog).findByRole(
      'button',
      {
        name: '3月'
      }
    );
    userEvent.click(monthDropdownButton);
    expect(
      await within(
        await within(pickerDialog).findByTestId('month-dropdown')
      ).findByRole('listbox')
    ).toBeVisible();
  }
};

export const SelectDate: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    const pickerDialog = await openPicker(canvasElement);
    const dateCell = await within(pickerDialog).findByRole('button', {
      name: '15 3月'
    });
    userEvent.click(dateCell);
    const canvas = within(canvasElement);
    expect(await canvas.findByRole('textbox')).toHaveValue('2022-03-15');
  }
};

export const Clear: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    const pickerDialog = await openPicker(canvasElement);
    const clearButton = await within(pickerDialog).findByRole('button', {
      name: '選択を解除'
    });
    userEvent.click(clearButton);
    const canvas = within(canvasElement);
    expect(await canvas.findByRole('textbox')).toHaveValue('');
  }
};

export const CloseOnEscape: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    await openPicker(canvasElement);
    userEvent.keyboard('{esc}');
    await waitFor(() => {
      expect(within(canvasElement).queryByRole('dialog')).toBeNull();
    });
  }
};

export const FocusAndEnter: ComponentStoryObj<typeof Component> = {
  ...NormalDateFormat,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', {
      name: 'カレンダーを開く'
    });
    button.focus();
    // chromaticのfirefoxでkeyboard enterが効かないためclickで代用
    // chromaticのfirefox環境が更新されたらkeyboardになおして試すと良さそう
    // userEvent.keyboard('{enter}');
    userEvent.click(button);
    expect(await canvas.findByRole('dialog')).toBeVisible();
  }
};

// FIXME: DateCellをタブで移動するstoryを作成できない (実際の操作では動作する)
