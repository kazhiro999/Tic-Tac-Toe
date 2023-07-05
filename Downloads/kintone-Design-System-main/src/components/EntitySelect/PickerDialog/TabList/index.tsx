import * as React from 'react';
import {
  PICKER_DIALOG_TAB_TYPE,
  PickerDialogTabType
} from '../../modules/types';
import { TabItem } from './TabItem';
import styled from 'styled-components';
import { EntitySelectContext } from '../../EntitySelectContext';
import { useFetchSelectTab } from '../../functions/useFetchSelectTab';
import { PropsForStyled } from '../../../../typings/propsForStyled';
import { useHandleKeyDownTabList } from '../../../../hooks/TabList/useHandleKeyDownTabList';

const TAB_LABELS = {
  [PICKER_DIALOG_TAB_TYPE.ORGANIZATION]: 'organizationTabLabel',
  [PICKER_DIALOG_TAB_TYPE.GROUP]: 'groupTabLabel',
  [PICKER_DIALOG_TAB_TYPE.OTHER]: 'otherTabLabel'
} as const;

type TabLabelObject = Record<keyof typeof TAB_LABELS, string>;

type Props = {
  tabTypes: PickerDialogTabType[] | null;
  selectedTabType: PickerDialogTabType | null;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  selectTab: (tabType: PickerDialogTabType) => void;
  tabLabelObject: TabLabelObject;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  tabTypes,
  selectedTabType,
  onKeyDown,
  selectTab,
  tabLabelObject
}) => {
  if (tabTypes === null || selectedTabType === null) {
    return null;
  }

  return (
    <div className={className}>
      <ul role="tablist" className={`${className}__tabList`}>
        {tabTypes.map((tabType) => (
          <TabItem
            key={tabType}
            label={tabLabelObject[tabType]}
            selected={tabType === selectedTabType}
            onKeyDown={onKeyDown}
            onClick={() => selectTab(tabType)}
          />
        ))}
      </ul>
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  position: relative;

  &__tabList {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 100%;
    right: 80px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const Container: React.VFC = () => {
  const { state, locales } = React.useContext(EntitySelectContext);
  const fetchSelectTab = useFetchSelectTab();

  const { selectedTabType, tabTypes } = state.pickerDialog;
  const selectedTabIndex =
    tabTypes?.findIndex((tabType) => tabType === selectedTabType) ?? 0;
  const handleKeyDown = useHandleKeyDownTabList(
    tabTypes?.length ?? 0,
    selectedTabIndex,
    (nextIndex) => {
      if (!tabTypes) return;
      fetchSelectTab(tabTypes[nextIndex]);
    }
  );

  const tabLabelObject = {
    [PICKER_DIALOG_TAB_TYPE.ORGANIZATION]: locales.organizationTabLabel,
    [PICKER_DIALOG_TAB_TYPE.GROUP]: locales.groupTabLabel,
    [PICKER_DIALOG_TAB_TYPE.OTHER]: locales.otherTabLabel
  };

  return (
    <StyledComponent
      tabTypes={tabTypes}
      selectedTabType={selectedTabType}
      onKeyDown={handleKeyDown}
      selectTab={fetchSelectTab}
      tabLabelObject={tabLabelObject}
    />
  );
};

export const TabList = Container;
