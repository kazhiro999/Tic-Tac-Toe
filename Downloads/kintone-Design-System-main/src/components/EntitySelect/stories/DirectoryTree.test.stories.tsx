import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { userEvent, within, screen } from '@storybook/testing-library';
import { TripleTabLayout } from './PickerDialog.test.stories';
import { PickerDialogComponent } from './pickerDialog.component';
import { findDialog } from '../../Dialog/stories/Dialog.test.stories';

export default {
  component: PickerDialogComponent,
  title: 'Components/EntitySelect⚠️/test/PickerDialog/DirectoryTree',
  argTypes: { changeValues: { action: 'changeValues' } }
} as ComponentMeta<typeof PickerDialogComponent>;

type storyType = ComponentStoryObj<typeof PickerDialogComponent>;

const getFirstDirectoryNode = async () => {
  const dialog = await findDialog();
  const directoryTree = await within(dialog).findByRole('tree');
  return within(directoryTree).findByRole('treeitem', {
    name: '組織1'
  });
};

const getFirstBelongedEntity = async () => {
  const tabPanel = await screen.findByRole('tabpanel');
  const belongedEntityList = await within(tabPanel).findByRole('listbox');
  return within(belongedEntityList).findByRole('option', {
    name: '組織1'
  });
};

export const InactiveAndUnselected: storyType = {
  ...TripleTabLayout
};

export const InactiveAndSelected: storyType = {
  ...TripleTabLayout,
  play: async () => {
    const firstDirectoryNode = await getFirstDirectoryNode();
    firstDirectoryNode.focus();
    expect(firstDirectoryNode).toHaveFocus();
    userEvent.keyboard('{enter}');
    // Inactive状態のスタイルを見たいため、フォーカスを外す
    firstDirectoryNode.blur();
    expect(firstDirectoryNode).not.toHaveFocus();
    expect(await getFirstBelongedEntity()).toBeVisible();
  }
};

export const ActiveAndUnselected: storyType = {
  ...TripleTabLayout,
  play: async () => {
    (await getFirstDirectoryNode()).focus();
  }
};

export const ActiveAndSelected: storyType = {
  ...TripleTabLayout,
  play: async () => {
    (await getFirstDirectoryNode()).focus();
    userEvent.keyboard('{enter}');
    expect(await getFirstBelongedEntity()).toBeVisible();
  }
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
// 5階層まですべて開いた状態
export const Expanded: storyType = {
  ...TripleTabLayout,
  play: async () => {
    const collapsedDirectoryNode = await screen.findByRole('treeitem', {
      name: '長い名前の組織2 長い名前の組織2 長い名前の組織2'
    });
    collapsedDirectoryNode.focus();
    expect(collapsedDirectoryNode).toHaveFocus();
    const dir = [
      '長い名前の組織2-1 長い名前の組織2-1 長い名前の組織2-1',
      '長い名前の組織2-1-1 長い名前の組織2-1-1 長いな目の組織2-1-1',
      '長い名前の組織2-1-1-1 長い名前の組織2-1-1-1 長い名前の組織2-1-1-1',
      '長い名前の組織2-1-1-1-1 長い名前の組織2-1-1-1-1 長い名前の組織2-1-1-1-1'
    ];
    // すべての階層をキーボード操作で開く
    for (let i = 0; i < 4; i++) {
      userEvent.keyboard('{arrowright}{arrowdown}');
      await wait(500);
      const node = await screen.findByRole('treeitem', {
        name: dir[i]
      });
      expect(node).toBeVisible();
      expect(node).toHaveFocus();
    }
  },
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
};
