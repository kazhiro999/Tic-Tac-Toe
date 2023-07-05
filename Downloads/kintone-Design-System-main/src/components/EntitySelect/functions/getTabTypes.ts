import {
  EntitySelectOtherType,
  PickerDialogTabType,
  PICKER_DIALOG_TAB_TYPE
} from '../modules/types';

export const getTabTypes = (
  data: {
    organizationAvailable?: boolean;
    groupAvailable?: boolean;
    otherTypes?: EntitySelectOtherType[];
  } = {}
) => {
  const tabTypes: PickerDialogTabType[] = [];
  if (data.organizationAvailable) {
    tabTypes.push(PICKER_DIALOG_TAB_TYPE.ORGANIZATION);
  }
  if (data.groupAvailable) {
    tabTypes.push(PICKER_DIALOG_TAB_TYPE.GROUP);
  }
  if (data.otherTypes && data.otherTypes.length > 0) {
    tabTypes.push(PICKER_DIALOG_TAB_TYPE.OTHER);
  }
  return tabTypes;
};
