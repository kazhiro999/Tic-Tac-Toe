import { EntitySelectValue } from '../modules/types';
import { EntitySelect } from '..';
import React from 'react';
import { emptyRepositories } from '../modules/repositories';
import { defaultLocales } from '../EntitySelectContext';
import { render, within } from '@testing-library/react';
import { UserSelectPickerButtonIcon } from '../../../icons';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

type EntitySelectRenderInitialProps = Omit<
  React.ComponentProps<typeof EntitySelect>,
  'locales' | 'pickerIconComponent' | 'shouldFocus'
>;

export const entitySelectRenderInitialProps: EntitySelectRenderInitialProps = {
  values: [],
  changeValues: jest.fn<void, [EntitySelectValue[]]>(),
  repositories: emptyRepositories,
  userAvailable: true,
  groupAvailable: true,
  organizationAvailable: true,
  otherTypes: [],
  multipleSelection: true,
  placeholder: 'placeholder',
  pickerDialogTitle: 'pickerDialogTitle',
  'aria-labelledby': 'aria-labelledby',
  getDisplayName: (entity) => entity.name,
  getLabelAddButton: (count) => {
    if (count && count > 0) {
      return `追加（${count}）`;
    }
    return '追加';
  },
  // KLOG-5698対応
  // 折り返し表示の提供を終了するときは次の行を削除すること
  wrapEntityLabel: false
};

export const entitySelectRenderer = (
  props: EntitySelectRenderInitialProps = { ...entitySelectRenderInitialProps }
) => {
  const { getByRole, getByTestId, findByRole, queryByRole } = render(
    <EntitySelect
      pickerIconComponent={<UserSelectPickerButtonIcon />}
      locales={defaultLocales}
      {...props}
    />
  );

  const getSearchBox = async () => {
    const searchBox = await findByRole('combobox');
    return searchBox;
  };

  const search = async (searchString: string = 'test') => {
    await act(async () => {
      userEvent.type(await getSearchBox(), searchString);
    });
  };

  const getSearchResultEntityPopup = async () => {
    const popup = await findByRole('listbox');
    return popup;
  };

  const getSearchResultEntities = async () => {
    const entities = within(await getSearchResultEntityPopup()).queryAllByRole(
      'option'
    );
    return entities;
  };

  const getSearchResultEntityByName = async (name: string) => {
    const option = within(await getSearchResultEntityPopup()).getByRole(
      'option',
      { name }
    );
    return option;
  };

  const isSearchResultEntityPopupClose = () => {
    return queryByRole('listbox') === null;
  };

  const isSearchResultEntityPopupEmpty = async () => {
    // 見た目Close状態になっていても、ul要素がrenderされたままのことがある
    // - マウス・キーボード操作したとき：ul要素はrenderされない
    // - インクリメンタルサーチを開始したとき：ヒットしたかにかかわらずul要素がrenderされる
    // - 検索結果がヒットしなくなったとき：ul要素はrenderされたまま
    // そのため、SearchResultEntityPopupではなく、SearchResultEntityの存在チェックで確認する
    const entities = await getSearchResultEntities();
    return entities.length === 0;
  };

  const getSearchButton = () =>
    getByRole('button', { name: defaultLocales.searchBoxButtonTitleLabel });

  const getOpenPickerDialogButton = () =>
    getByRole('button', { name: defaultLocales.pickerShowDialogButtonLabel });

  const getSelectedEntityList = () =>
    getByTestId('shared-EntitySelect-SelectedEntityList');

  const getSelectedEntities = async () => {
    const entities = await within(getSelectedEntityList()).findAllByTestId(
      'shared-EntitySelect-SelectedEntity'
    );
    return entities;
  };

  const getRemoveEntityButtons = async () => {
    const buttons = await within(getSelectedEntityList()).findAllByRole(
      'button',
      { name: defaultLocales.deleteButtonAlternativeText }
    );
    return buttons;
  };

  const getDialog = async () => {
    const dialog = await findByRole('dialog', {
      name: entitySelectRenderInitialProps.pickerDialogTitle
    });
    return dialog;
  };

  const waitDialogShown = async () => {
    userEvent.click(getOpenPickerDialogButton());
    await getDialog();
  };

  const getClosePickerDialogButton = () =>
    getByRole('button', {
      name: defaultLocales.closeButtonAlternativeTextLabel
    });

  const getAddEntityButton = () =>
    getByTestId('shared-Dialog-DialogActions-ok-button');

  const getTabList = () => getByRole('tablist');

  const getTabs = () => within(getTabList()).getAllByRole('tab');

  const getOrganizationTab = () =>
    within(getTabList()).getByRole('tab', {
      name: defaultLocales.organizationTabLabel
    });

  const getGroupTab = () =>
    within(getTabList()).getByRole('tab', {
      name: defaultLocales.groupTabLabel
    });

  const getOtherTab = () =>
    within(getTabList()).getByRole('tab', {
      name: defaultLocales.otherTabLabel
    });

  const getDirectoryTree = async () => {
    const tree = await findByRole('tree');
    return tree;
  };

  const getDirectoryNodes = async () => {
    const nodes = within(await getDirectoryTree()).getAllByRole('treeitem');
    return nodes;
  };

  const getDirectoryNodeByName = async (name: string) => {
    const node = within(await getDirectoryTree()).getByRole('treeitem', {
      name
    });
    return node;
  };

  const getSelectDirectoryButton = (targetDirectoryNode: HTMLElement) => {
    return within(targetDirectoryNode).getAllByRole('button')[0];
  };

  const getCollapseAndExpandChildNodeButton = (
    targetDirectoryNode: HTMLElement
  ) => {
    return within(targetDirectoryNode).getAllByRole('button')[1];
  };

  const getSelectAllEntityCheckbox = () => getByRole('checkbox');

  const getBelongedEntityList = async () => {
    const list = await findByRole('listbox');
    return list;
  };

  const getBelongedEntities = async () => {
    const entities = within(await getBelongedEntityList()).getAllByRole(
      'option'
    );
    return entities;
  };

  const getBelongedEntityByName = async (name: string) => {
    const entity = within(await getBelongedEntityList()).getByRole('option', {
      name
    });
    return entity;
  };

  const getReadMoreButton = async () => {
    const button = within(await getBelongedEntityList()).getByRole('option', {
      name: defaultLocales.readMoreButtonLabel
    });
    return button;
  };

  return {
    getSearchBox,
    search,
    getSearchResultEntities,
    getSearchResultEntityByName,
    isSearchResultEntityPopupClose,
    isSearchResultEntityPopupEmpty,
    getSearchButton,
    getOpenPickerDialogButton,
    getSelectedEntityList,
    getSelectedEntities,
    getRemoveEntityButtons,
    getDialog,
    waitDialogShown,
    getClosePickerDialogButton,
    getAddEntityButton,
    getTabs,
    getOrganizationTab,
    getGroupTab,
    getOtherTab,
    getDirectoryNodes,
    getDirectoryNodeByName,
    getSelectDirectoryButton,
    getCollapseAndExpandChildNodeButton,
    getSelectAllEntityCheckbox,
    getBelongedEntityList,
    getBelongedEntities,
    getBelongedEntityByName,
    getReadMoreButton
  };
};
