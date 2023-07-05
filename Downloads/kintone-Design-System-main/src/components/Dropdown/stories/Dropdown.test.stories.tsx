import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Dropdown } from '..';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Components/Dropdown/test',
  component: Dropdown,
  argTypes: {
    changeValue: {
      action: 'changeValue'
    }
  }
} as ComponentMeta<typeof Dropdown>;

export const Open: ComponentStoryObj<typeof Dropdown> = {
  args: {
    options: [
      { label: '項目1', value: 'option1' },
      { label: '項目2', value: 'option2' },
      { label: '項目3', value: 'option3' }
    ],
    value: 'option1'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const Focused: ComponentStoryObj<typeof Dropdown> = {
  ...Open,
  play: async ({ canvasElement }) => {
    const button = await within(canvasElement).findByRole('button');
    button.focus();
    await expect(button).toHaveFocus();
  }
};

export const TooLongLabel: ComponentStoryObj<typeof Dropdown> = {
  args: {
    options: [
      { value: 'option1', label: '項目1' },
      {
        value: 'option2',
        label: '長っっっっっっっっっっっっっっっっっいラベル'
      },
      { value: 'option3', label: '項目3' }
    ],
    value: 'option2'
  }
};

export const TooLongLabelOpen: ComponentStoryObj<typeof Dropdown> = {
  ...TooLongLabel,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const ManyOptions: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    options: [...Array(30).keys()].map((i) => ({
      value: `option${i}`,
      label: `項目${i}`
    }))
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const ListboxOptionActive: ComponentStoryObj<typeof Dropdown> = {
  ...Open,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await userEvent.hover((await canvas.findAllByRole('option'))[0]);
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const PositionBottom: ComponentStoryObj<typeof Dropdown> = {
  ...Open,
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '800px' }} />
        <Story />
      </>
    )
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const Width: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    width: 200
  }
};

export const ListboxPopupWidth: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    width: 500,
    isMenuPopupSameWidth: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const ListboxPopupMaxWidth: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...TooLongLabel.args,
    maxWidth: 300,
    isMenuPopupSameWidth: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const TitleAttr: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    dropdownTitle: 'ドロップダウンタイトル'
  }
};

export const PlacementTopStart: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    dropdownTitle: 'ドロップダウンタイトル',
    placement: 'top-start'
  },
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '200px' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
        <div style={{ height: '200px' }} />
      </>
    )
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const PlacementTopEnd: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    dropdownTitle: 'ドロップダウンタイトル',
    placement: 'top-end'
  },
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '200px' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
        <div style={{ height: '200px' }} />
      </>
    )
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const PlacementBottomStart: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    dropdownTitle: 'ドロップダウンタイトル',
    placement: 'bottom-start'
  },
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '200px' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
        <div style={{ height: '200px' }} />
      </>
    )
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};

export const PlacementBottomEnd: ComponentStoryObj<typeof Dropdown> = {
  args: {
    ...Open.args,
    dropdownTitle: 'ドロップダウンタイトル',
    placement: 'bottom-end'
  },
  decorators: [
    (Story) => (
      <>
        <div style={{ height: '200px' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
        <div style={{ height: '200px' }} />
      </>
    )
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button'));
    await expect(await canvas.findByRole('listbox')).toBeVisible();
  }
};
