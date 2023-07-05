import * as React from 'react';
import { initialState, State } from './modules/reducer';
import { EntitySelectAction } from './modules/actions';
import { EntitySelectOtherType, EntitySelectValue } from './modules/types';
import { Repositories, emptyRepositories } from './modules/repositories';
import { Entity } from '../../models/entity';

export type Locales = {
  pickerShowDialogButtonLabel: string;
  searchBoxButtonTitleLabel: string;
  closeButtonAlternativeTextLabel: string;
  cancelButtonLabel: string;
  readMoreButtonLabel: string;
  organizationTabLabel: string;
  organizationTitleLabel: string;
  organizationDescriptionLabel: string;
  organizationSelectAllAlternativeTextLabel: string;
  groupTabLabel: string;
  groupTitleLabel: string;
  groupDescriptionLabel: string;
  groupSelectAllAlternativeTextLabel: string;
  otherTabLabel: string;
  otherTitleLabel: string;
  otherDescriptionLabel: string;
  otherSelectAllAlternativeTextLabel: string;
  expandButtonLabel: string;
  collapseButtonLabel: string;
  selectAllLabel: string;
  deleteButtonAlternativeText: string;
  creatorNameLabel: string;
};

export type EntitySelectContextType = {
  state: State;
  dispatch: React.Dispatch<EntitySelectAction>;
  values: EntitySelectValue[];
  changeValues: (values: EntitySelectValue[]) => void;
  placeholder: string;
  pickerDialogTitle: string;
  pickerIconComponent: React.ReactNode;
  userAvailable: boolean;
  organizationAvailable: boolean;
  groupAvailable: boolean;
  otherTypes: EntitySelectOtherType[];
  multipleSelection: boolean;
  shouldFocus: boolean;
  repositories: Repositories;
  locales: Locales;
  getDisplayName: (entity: Entity) => string;
  getLabelAddButton: (count?: number) => string;
  // KLOG-5698対応
  wrapEntityLabel: boolean;
} & Pick<React.AriaAttributes, 'aria-labelledby' | 'aria-required'>;

export const defaultLocales: Locales = {
  pickerShowDialogButtonLabel: '組織やグループから選択',
  searchBoxButtonTitleLabel: '検索',
  closeButtonAlternativeTextLabel: '閉じる',
  cancelButtonLabel: 'キャンセル',
  readMoreButtonLabel: 'さらに表示',
  organizationTabLabel: '組織',
  organizationTitleLabel: '組織一覧',
  organizationDescriptionLabel: '組織やユーザーを選択',
  organizationSelectAllAlternativeTextLabel:
    '表示中の組織やユーザーをすべて選択',
  groupTabLabel: 'グループ',
  groupTitleLabel: 'グループ一覧',
  groupDescriptionLabel: 'グループやユーザーを選択',
  groupSelectAllAlternativeTextLabel: '表示中のグループやユーザーをすべて選択',
  otherTabLabel: 'その他',
  otherTitleLabel: 'その他の一覧',
  otherDescriptionLabel: 'その他の項目を選択',
  otherSelectAllAlternativeTextLabel: '表示中の項目をすべて選択',
  expandButtonLabel: '下の階層を閉じる',
  collapseButtonLabel: '下の階層を開く',
  selectAllLabel: 'すべて選択',
  deleteButtonAlternativeText: '選択解除',
  creatorNameLabel: 'アプリ作成者'
};

export const EntitySelectContext =
  /* @__PURE__ */ React.createContext<EntitySelectContextType>({
    state: initialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => {},
    values: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeValues: () => {},
    placeholder: '',
    pickerDialogTitle: '',
    pickerIconComponent: null,
    userAvailable: false,
    organizationAvailable: false,
    groupAvailable: false,
    otherTypes: [],
    multipleSelection: true,
    shouldFocus: false,
    repositories: emptyRepositories,
    locales: defaultLocales,
    getDisplayName: (entity: Entity) => entity.name,
    getLabelAddButton: (count) => {
      if (count && count > 0) {
        return `追加（${count}）`;
      }
      return '追加';
    },
    // KLOG-5698対応
    wrapEntityLabel: true
  });
