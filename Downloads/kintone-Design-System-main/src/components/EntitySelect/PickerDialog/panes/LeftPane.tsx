import * as React from 'react';
import { OrganizationList } from '../OrganizationList';
import { Pane } from './Pane';
import { PaneActionBar } from './PaneActionBar';
import { PaneContent } from './PaneContent';
import { PaneTitle } from './PaneTitle';
import {
  PICKER_DIALOG_TAB_TYPE,
  PickerDialogTabType
} from '../../modules/types';
import { OtherList } from '../OtherList';
import { GroupList } from '../GroupList';
import { EntitySelectContext } from '../../EntitySelectContext';
import { assert } from '../../../../functions/asserts/assert';
import { useComponentId } from '../../../../hooks/useComponentId';

type Props = {
  selectedTabType: PickerDialogTabType;
  title: string;
};

const Component: React.VFC<Props> = ({ selectedTabType, title }) => {
  const paneTitleId = useComponentId();
  let paneContent;
  switch (selectedTabType) {
    case PICKER_DIALOG_TAB_TYPE.ORGANIZATION:
      paneContent = <OrganizationList aria-labelledby={paneTitleId} />;
      break;
    case PICKER_DIALOG_TAB_TYPE.GROUP:
      paneContent = <GroupList aria-labelledby={paneTitleId} />;
      break;
    case PICKER_DIALOG_TAB_TYPE.OTHER:
      paneContent = <OtherList aria-labelledby={paneTitleId} />;
      break;
    default:
      throw new Error();
  }

  return (
    <Pane width={320}>
      <PaneTitle title={title} id={paneTitleId} />
      <PaneActionBar />
      <PaneContent position="left">{paneContent}</PaneContent>
    </Pane>
  );
};

const Container: React.VFC = () => {
  const { state, locales } = React.useContext(EntitySelectContext);

  const { selectedTabType } = state.pickerDialog;
  assert(selectedTabType);
  let title = '';
  switch (selectedTabType) {
    case PICKER_DIALOG_TAB_TYPE.ORGANIZATION:
      title = locales.organizationTitleLabel;
      break;
    case PICKER_DIALOG_TAB_TYPE.GROUP:
      title = locales.groupTitleLabel;
      break;
    case PICKER_DIALOG_TAB_TYPE.OTHER:
      title = locales.otherTitleLabel;
      break;
    default:
    // NOP
  }

  return <Component selectedTabType={selectedTabType} title={title} />;
};

export const LeftPane = Container;
