import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Menu } from '..';
import { MenuActionItem } from '../MenuActionItem';
import { MenuLinkItem } from '../MenuLinkItem';
import { MenuSeparator } from '../MenuSeparator';
import { action } from '@storybook/addon-actions';
import { HeaderHelpIcon } from '../../../icons';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: { MenuActionItem, MenuLinkItem },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 200 }}>
        <div style={{ position: 'relative' }}>
          <Story />
        </div>
      </div>
    )
  ]
} as ComponentMeta<typeof Menu>;

export const Close: ComponentStoryObj<typeof Menu> = {
  args: {
    width: 48,
    height: 48,
    icon: <HeaderHelpIcon />,
    alt: 'ツアーやヘルプを表示する',
    onClickMenuButton: action('onClickMenuButton'),
    'data-testid': 'menu',
    children: (
      <>
        <MenuLinkItem url="/" data-testid="menu-link-item">
          リンクメニュー項目（内部サイト）
        </MenuLinkItem>
        <MenuLinkItem
          url="/"
          shouldOpenOtherTab
          externalSite
          data-testid="menu-link-item-external"
        >
          リンクメニュー項目（外部サイト）
        </MenuLinkItem>
        <MenuSeparator />
        <MenuActionItem
          onClick={action('click')}
          data-testid="menu-action-item"
        >
          メニューアクション項目
        </MenuActionItem>
      </>
    )
  }
};

export const Hover: ComponentStoryObj<typeof Menu> = {
  args: {
    ...Close.args,
    triggerOnHover: true
  }
};
