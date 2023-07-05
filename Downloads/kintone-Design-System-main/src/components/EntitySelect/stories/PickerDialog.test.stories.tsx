import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ENTITY_SELECT_OTHER_TYPE } from '../modules/types';
import { PickerDialogComponent } from './pickerDialog.component';
import { defaultLocales } from '../EntitySelectContext';
import { act } from 'react-dom/test-utils';
import { findDialog } from '../../Dialog/stories/Dialog.test.stories';

export default {
  component: PickerDialogComponent,
  title: 'Components/EntitySelect⚠️/test/PickerDialog',
  argTypes: { changeValues: { action: 'changeValues' } }
} as ComponentMeta<typeof PickerDialogComponent>;

type storyType = ComponentStoryObj<typeof PickerDialogComponent>;

export const TripleTabLayout: storyType = {
  args: {
    organizationAvailable: true,
    groupAvailable: true,
    userAvailable: true,
    otherTypes: [ENTITY_SELECT_OTHER_TYPE.APP_CREATOR]
  }
};

export const DoubleTabLayout: storyType = {
  args: {
    organizationAvailable: true,
    groupAvailable: false,
    userAvailable: true,
    otherTypes: [ENTITY_SELECT_OTHER_TYPE.APP_CREATOR]
  }
};

export const SingleTabLayout: storyType = {
  args: {
    organizationAvailable: false,
    groupAvailable: true,
    userAvailable: true,
    otherTypes: []
  }
};

// その他タブのレイアウトのデザイン確認用
export const OtherTabLayout: storyType = {
  ...TripleTabLayout,
  play: async () => {
    const dialog = await findDialog();
    const tab = await within(dialog).findByRole('tab', {
      name: defaultLocales.otherTabLabel
    });
    act(() => userEvent.click(tab));
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveFocus();
  }
};

export const FocusOnTab: storyType = {
  ...TripleTabLayout,
  play: async () => {
    const dialog = await findDialog();
    const tab = await within(dialog).findByRole('tab', {
      name: defaultLocales.organizationTabLabel
    });
    tab.focus();
    expect(tab).toHaveFocus();
  }
};

export const WithoutSelectAllEntityCheckbox: storyType = {
  args: {
    ...SingleTabLayout.args,
    userAvailable: false
  }
};
