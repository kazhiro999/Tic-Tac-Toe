import * as React from 'react';
import { Checkbox } from '../../../Checkbox';
import { EntitySelectContext } from '../../EntitySelectContext';
import { buildEntitySelectOperations } from '../../modules/operations';
import { EntityList } from '../EntityList';
import { Pane } from './Pane';
import { PaneActionBar } from './PaneActionBar';
import { PaneContent } from './PaneContent';
import { PaneTitle } from './PaneTitle';
import {
  PICKER_DIALOG_TAB_TYPE,
  PickerDialogTabType
} from '../../modules/types';
import { assert } from '../../../../functions/asserts/assert';
import { useComponentId } from '../../../../hooks/useComponentId';
import { shouldShowSelectAll } from '../../modules/functions';

const SELECT_ALL_NAME = 'entityselect-pickerdialog-panes-rightpane-selectall';

const TITLE = {
  [PICKER_DIALOG_TAB_TYPE.ORGANIZATION]: 'organizationDescriptionLabel',
  [PICKER_DIALOG_TAB_TYPE.GROUP]: 'groupDescriptionLabel',
  [PICKER_DIALOG_TAB_TYPE.OTHER]: 'otherDescriptionLabel'
} as const;

const SELECT_ALL_ALTERNATIVE_TEXT = {
  [PICKER_DIALOG_TAB_TYPE.ORGANIZATION]:
    'organizationSelectAllAlternativeTextLabel',
  [PICKER_DIALOG_TAB_TYPE.GROUP]: 'groupSelectAllAlternativeTextLabel',
  [PICKER_DIALOG_TAB_TYPE.OTHER]: 'otherSelectAllAlternativeTextLabel'
} as const;

type Props = {
  selectedTabType: PickerDialogTabType;
  selectAllShown: boolean;
  selectAllChecked: boolean;
  changeSelectAll: (name: string, value: boolean) => void;
  alternativeText: string;
  title: string;
  selectAllLabel: string;
};

const Component: React.VFC<Props> = ({
  selectedTabType,
  selectAllShown,
  selectAllChecked,
  changeSelectAll,
  alternativeText,
  title,
  selectAllLabel
}) => {
  const paneTitleId = useComponentId();
  return (
    <Pane width={476}>
      <PaneTitle title={title} id={paneTitleId} />
      <PaneActionBar>
        {selectAllShown && (
          <Checkbox
            label={selectAllLabel}
            name={SELECT_ALL_NAME}
            value={selectAllChecked}
            changeValue={changeSelectAll}
            alternativeText={alternativeText}
          />
        )}
      </PaneActionBar>
      <PaneContent position="right">
        <EntityList aria-labelledby={paneTitleId} />
      </PaneContent>
    </Pane>
  );
};

const Container: React.VFC = () => {
  const [selectAllChecked, setSelectAllChecked] = React.useState(false);

  const {
    state,
    dispatch,
    userAvailable,
    multipleSelection,
    repositories,
    locales
  } = React.useContext(EntitySelectContext);
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  const changeSelectAll = (name: string, value: boolean) => {
    if (value) {
      entitySelectOperations.selectAllEntitiesInPickerDialog(dispatch);
    } else {
      entitySelectOperations.unselectAllEntitiesInPickerDialog(dispatch);
    }
    setSelectAllChecked(value);
  };

  const { selectedTabType } = state.pickerDialog;
  assert(selectedTabType);

  return (
    <Component
      selectedTabType={selectedTabType}
      selectAllShown={shouldShowSelectAll(multipleSelection, userAvailable)}
      selectAllChecked={selectAllChecked}
      changeSelectAll={changeSelectAll}
      alternativeText={locales[SELECT_ALL_ALTERNATIVE_TEXT[selectedTabType]]}
      title={locales[TITLE[selectedTabType]]}
      selectAllLabel={locales.selectAllLabel}
    />
  );
};

export const RightPane = Container;
