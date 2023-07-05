import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { userEvent, within, screen, waitFor } from '@storybook/testing-library';
import { PickerDialogComponent } from './pickerDialog.component';
import { TripleTabLayout } from './PickerDialog.test.stories';
import { findDialog } from '../../Dialog/stories/Dialog.test.stories';

const wait = (ms: number = 10) => new Promise((r) => setTimeout(r, ms));

export default {
  component: PickerDialogComponent,
  title: 'Components/EntitySelect⚠️/test/PickerDialog/BelongedEntityList',
  argTypes: { changeValues: { action: 'changeValues' } }
} as ComponentMeta<typeof PickerDialogComponent>;

type storyType = ComponentStoryObj<typeof PickerDialogComponent>;

const selectDirectoryNode = async () => {
  const dialog = await findDialog();
  const directoryTree = await within(dialog).findByRole('tree');
  const firstDirectoryNode = await within(directoryTree).findByRole(
    'treeitem',
    {
      name: '組織1'
    }
  );
  firstDirectoryNode.focus();
  expect(firstDirectoryNode).toHaveFocus();
  await userEvent.keyboard('{enter}');
};

const getFirstBelongedEntity = async ({ selected } = { selected: false }) => {
  const tabPanel = await screen.findByRole('tabpanel');
  const belongedEntityList = await within(tabPanel).findByRole('listbox');
  return within(belongedEntityList).findByRole('option', {
    name: '組織1',
    selected
  });
};

export const InactiveAndUnselected: storyType = {
  ...TripleTabLayout,
  play: async () => {
    await selectDirectoryNode();
  }
};

export const WrapEntityLabel: storyType = {
  args: {
    ...TripleTabLayout.args,
    wrapEntityLabel: true
  },
  play: async () => {
    const dialog = await findDialog();
    const directoryTree = await within(dialog).findByRole('tree');
    const directoryNodeWithLongLabel = await within(directoryTree).findByRole(
      'treeitem',
      {
        name: 'LONG_NAME_ORGANIZATION_ORGANIZATION_ORGANIZATION'
      }
    );
    directoryNodeWithLongLabel.focus();
    expect(directoryNodeWithLongLabel).toHaveFocus();
    await userEvent.keyboard('{enter}');
  }
};

export const InactiveAndSelected: storyType = {
  ...TripleTabLayout,
  play: async () => {
    await selectDirectoryNode();
    const firstBelongedEntity = await getFirstBelongedEntity();
    firstBelongedEntity.focus();
    expect(firstBelongedEntity).toHaveFocus();
    userEvent.click(firstBelongedEntity);
    firstBelongedEntity.blur();
    expect(firstBelongedEntity).not.toHaveFocus();
    expect(await getFirstBelongedEntity({ selected: true })).toBeVisible();
  }
};

export const ActiveAndUnselected: storyType = {
  ...TripleTabLayout,
  play: async () => {
    await selectDirectoryNode();
    const firstBelongedEntity = await getFirstBelongedEntity();
    firstBelongedEntity.focus();
    expect(firstBelongedEntity).toHaveFocus();
  }
};

export const ActiveAndSelected: storyType = {
  ...TripleTabLayout,
  play: async () => {
    await selectDirectoryNode();
    const firstBelongedEntity = await getFirstBelongedEntity();
    firstBelongedEntity.focus();
    expect(firstBelongedEntity).toHaveFocus();
    userEvent.click(firstBelongedEntity);
    expect(await getFirstBelongedEntity({ selected: true })).toBeVisible();
  }
};

export const ReadMoreButton: storyType = {
  ...TripleTabLayout,
  play: async () => {
    await selectDirectoryNode();
    const readMoreButton = await screen.findByRole('option', {
      name: 'さらに表示'
    });
    // ReadMoreButtonが画面外にあるため、フォーカスすることでスクロールさせる
    readMoreButton.focus();
    // Inactive状態のスタイルを見たいため、フォーカスを外す
    readMoreButton.blur();
    await waitFor(() => {
      expect(readMoreButton).toBeVisible();
    });
    // visible後スクロール完了を確実に待つためにdelay
    await wait(1000);
  },
  // TODO: 不安定なテストのためdisableSnapshotする。以下のissueで解消する予定。
  // https://github.com/kintone-private/kintone-Design-System/issues/1695
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};

export const ReadMoreButtonWithActive: storyType = {
  ...TripleTabLayout,
  play: async () => {
    await selectDirectoryNode();
    const firstBelongedEntity = await getFirstBelongedEntity();
    firstBelongedEntity.focus();
    userEvent.keyboard('{arrowUp}');
    const readMoreButton = await screen.findByRole('option', {
      name: 'さらに表示'
    });
    await waitFor(() => {
      expect(readMoreButton).toBeVisible();
    });
    // visible後スクロール完了を確実に待つためにdelay
    await wait(500);
  },
  // TODO: 不安定なテストのためdisableSnapshotする。以下のissueで解消する予定。
  // https://github.com/kintone-private/kintone-Design-System/issues/1695
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
