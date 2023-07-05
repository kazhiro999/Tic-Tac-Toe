import { State } from './reducer';

export const isOrganizationExpanded = (state: State, organizationId: string) =>
  state.pickerDialog.expandedOrganizationIds !== null &&
  state.pickerDialog.expandedOrganizationIds.includes(organizationId);

export const canAddEntitiesInPickerDialog = (state: State) =>
  state.pickerDialog.selectedEntities !== null &&
  state.pickerDialog.selectedEntities.length > 0;
