import * as React from 'react';
import { IconButton } from '../IconButton';
import { EntitySelectContext } from './EntitySelectContext';
import { getTabTypes } from './functions/getTabTypes';
import { useFetchSelectTab } from './functions/useFetchSelectTab';
import { buildEntitySelectOperations } from './modules/operations';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  alternativeText: string;
  pickerIconComponent: React.ReactNode;
};

const Component: React.VFC<Props> = ({
  onClick,
  alternativeText,
  pickerIconComponent
}) => (
  <IconButton
    alternativeText={alternativeText}
    width={32}
    height={32}
    iconWidth={32}
    iconHeight={32}
    icon={pickerIconComponent}
    onClick={onClick}
  />
);

const Container: React.VFC = () => {
  const {
    dispatch,
    pickerIconComponent,
    organizationAvailable,
    groupAvailable,
    otherTypes,
    repositories,
    locales
  } = React.useContext(EntitySelectContext);
  const fetchSelectTab = useFetchSelectTab();

  const handleClick = () => {
    const tabTypes = getTabTypes({
      organizationAvailable,
      groupAvailable,
      otherTypes
    });
    buildEntitySelectOperations(repositories, {
      creatorNameLabel: locales.creatorNameLabel
    }).showPickerDialog(dispatch, tabTypes);

    const selectTabType = tabTypes[0];
    fetchSelectTab(selectTabType);
  };

  return (
    <Component
      onClick={handleClick}
      alternativeText={locales.pickerShowDialogButtonLabel}
      pickerIconComponent={pickerIconComponent}
    />
  );
};

export const PickerButton = Container;
