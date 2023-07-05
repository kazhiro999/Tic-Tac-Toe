import * as React from 'react';
import { assert } from '../../../../functions/asserts/assert';
import { Organization } from '../../../../models/organization';
import { EntitySelectContext } from '../../EntitySelectContext';
import { shouldFetchPickerDialogDescendentOrganizations } from '../../modules/functions';
import { buildEntitySelectOperations } from '../../modules/operations';
import { OrganizationStructure } from '../../modules/types';
import { LeftPaneEntityItem } from '../panes/LeftPaneEntityItem';
import { OrganizationSubList } from './OrganizationSubList';
import { isOrganizationExpanded } from '../../modules/selectors';
import {
  isArrowDownKey,
  isArrowLeftKey,
  isArrowRightKey,
  isArrowUpKey,
  isEnterKey,
  isSpaceKey
} from '../../../../functions/key';
import { getEntityTypeId } from '../../../../functions/entity';

type Props = {
  organization: Organization;
  organizations: Record<string, Organization>;
  structure: OrganizationStructure;
  selected: boolean;
  focusable: boolean;
  shouldFocus: boolean;
  clearShouldFocus: () => void;
  expanded: boolean;
  onNameButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onExpandButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLLIElement>;
};

const Component: React.VFC<Props> = ({
  organization,
  organizations,
  structure,
  selected,
  focusable,
  shouldFocus,
  clearShouldFocus,
  expanded,
  onNameButtonClick,
  onExpandButtonClick,
  onKeyDown
}) => {
  const entityTypeId = getEntityTypeId(organization);
  const subListId = `entityselect-pickerdialog-sublist-${entityTypeId}`;
  const hasSubList = organization.hasChildren;

  return (
    <LeftPaneEntityItem
      entity={organization}
      selected={selected}
      focusable={focusable}
      shouldFocus={shouldFocus}
      clearShouldFocus={clearShouldFocus}
      expandButtonShown={hasSubList}
      expanded={expanded}
      aria-owns={hasSubList ? subListId : undefined}
      onNameButtonClick={onNameButtonClick}
      onExpandButtonClick={onExpandButtonClick}
      onKeyDown={onKeyDown}
    >
      {hasSubList && expanded && (
        <OrganizationSubList
          organizations={organizations}
          structure={structure}
          subListId={subListId}
        />
      )}
    </LeftPaneEntityItem>
  );
};

type OuterProps = {
  organizations: Record<string, Organization>;
  structure: OrganizationStructure;
};

const Container: React.VFC<OuterProps> = ({ organizations, structure }) => {
  const { state, dispatch, repositories, locales, userAvailable } =
    React.useContext(EntitySelectContext);
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  const organization = organizations[structure.organizationId];
  assert(organization);

  const expanded = isOrganizationExpanded(state, organization.id);

  const fetchPickerDialogDescendentOrganizations = async () => {
    if (
      shouldFetchPickerDialogDescendentOrganizations(organization, structure)
    ) {
      await entitySelectOperations.fetchPickerDialogDescendentOrganizations(
        dispatch,
        organization.id
      );
    }
  };

  const expandOrganizationInPickerDialog = () => {
    entitySelectOperations.expandOrganizationInPickerDialog(
      dispatch,
      organization.id
    );
  };

  const collapseOrganizationInPickerDialog = () => {
    entitySelectOperations.collapseOrganizationInPickerDialog(
      dispatch,
      organization.id
    );
  };

  const selectOrganization = () => {
    entitySelectOperations.selectOrganizationInPickerDialog(
      dispatch,
      organization.id
    );

    buildEntitySelectOperations(repositories, {
      creatorNameLabel: locales.creatorNameLabel
    }).fetchOrganizationUsersInPickerDialog(
      dispatch,
      organizations[organization.id],
      userAvailable
    );
  };

  const handleNameButtonClick = async () => {
    expandOrganizationInPickerDialog();
    await fetchPickerDialogDescendentOrganizations();
    selectOrganization();
  };

  const handleExpandButtonClick = async () => {
    if (expanded) {
      collapseOrganizationInPickerDialog();
    } else {
      expandOrganizationInPickerDialog();
    }
    await fetchPickerDialogDescendentOrganizations();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLLIElement>) => {
    // 子組織でキーボード操作したときに、親組織にイベント伝搬しないように止める
    e.stopPropagation();

    if (isArrowDownKey(e)) {
      entitySelectOperations.focusNextOrganizationInPickerDialog(
        dispatch,
        organization.id
      );
    }

    if (isArrowUpKey(e)) {
      entitySelectOperations.focusPreviousOrganizationInPickerDialog(
        dispatch,
        organization.id
      );
    }

    // 右キーを押したら子組織を開く
    if (isArrowRightKey(e)) {
      if (organization.hasChildren && !expanded) {
        expandOrganizationInPickerDialog();
        await fetchPickerDialogDescendentOrganizations();
      }
    }

    // 左キーを押したら
    // - 子組織が開いているなら子組織を閉じる
    // - そうでなければ、親組織にフォーカス移動
    if (isArrowLeftKey(e)) {
      if (organization.hasChildren && expanded) {
        collapseOrganizationInPickerDialog();
      } else {
        entitySelectOperations.focusParentOrganizationInPickerDialog(
          dispatch,
          organization.id
        );
      }
    }

    if (isEnterKey(e) || isSpaceKey(e)) {
      // スペースキーを押したときにスクロールが発生するのを防ぐ
      e.preventDefault();

      selectOrganization();
    }
  };

  const clearShouldFocus = () => {
    entitySelectOperations.clearShouldFocusOrganizationInPickerDialog(dispatch);
  };

  return (
    <Component
      organization={organization}
      organizations={organizations}
      structure={structure}
      selected={organization.id === state.pickerDialog.selectedOrganizationId}
      focusable={organization.id === state.pickerDialog.focusableOrganizationId}
      shouldFocus={state.pickerDialog.shouldFocusOrganization}
      clearShouldFocus={clearShouldFocus}
      expanded={expanded}
      onNameButtonClick={handleNameButtonClick}
      onExpandButtonClick={handleExpandButtonClick}
      onKeyDown={handleKeyDown}
    />
  );
};

export const OrganizationItem = Container;
