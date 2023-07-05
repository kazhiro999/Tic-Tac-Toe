import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Menu } from '..';
import { MenuActionItem } from '../MenuActionItem';
import { MenuLinkItem } from '../MenuLinkItem';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';
import { Close } from './Menu.stories';

export default {
  title: 'Components/Menu/test',
  component: Menu,
  subcomponents: { MenuActionItem, MenuLinkItem },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative' }}>
        <Story />
      </div>
    )
  ]
} as ComponentMeta<typeof Menu>;

export const HoverMenuButton: ComponentStoryObj<typeof Menu> = {
  ...Close,
  parameters: {
    pseudo: { hover: true }
  }
};

// MenuButtonにキーボードでフォーカスしたとき、背景色が変化し、ブラウザ標準のフォーカスインジケーターが表示されます
export const FocusedMenuButtonWithKeyboard: ComponentStoryObj<typeof Menu> = {
  ...Close,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  }
};

// MenuButtonにマウスでフォーカスしたとき、背景色が変化します
export const FocusedMenuButtonWithMouse: ComponentStoryObj<typeof Menu> = {
  ...Close,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    userEvent.click(button); // マウスでフォーカス
    userEvent.click(button); // Close状態にするためもう一度クリックしておく
    expect(button).toHaveFocus();
  }
};

const openMenu = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  userEvent.click(button);
  const menu = await canvas.findByRole('menu');
  expect(menu).toBeVisible();
  return menu;
};

export const Open: ComponentStoryObj<typeof Menu> = {
  ...Close,
  play: async ({ canvasElement }) => {
    await openMenu(canvasElement);
  }
};

export const ActiveToMenuLinkItem: ComponentStoryObj<typeof Menu> = {
  ...Close,
  play: async ({ canvasElement }) => {
    const menu = await openMenu(canvasElement);
    const menuLinkItem = await within(menu).findByTestId('menu-link-item');
    userEvent.hover(menuLinkItem);
  }
};

export const ActiveToMenuActionItem: ComponentStoryObj<typeof Menu> = {
  ...Close,
  play: async ({ canvasElement }) => {
    const menu = await openMenu(canvasElement);
    const menuActionItem = await within(menu).findByTestId('menu-action-item');
    userEvent.hover(menuActionItem);
  }
};

// MenuItemの幅：ItemLabelが幅を超過する場合は折り返されます
export const LongItemLabel: ComponentStoryObj<typeof Menu> = {
  args: {
    ...Close.args,
    children: (
      <>
        <MenuActionItem onClick={action('click')}>
          長い長い長い長い長い長い長い長い長い長い長い長い長い長いテキスト
        </MenuActionItem>
        <MenuActionItem onClick={action('click')}>
          長い長い長い長い長い長い長い長い長い長い長い長い長い長い長いテキスト２
        </MenuActionItem>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    await openMenu(canvasElement);
  }
};
