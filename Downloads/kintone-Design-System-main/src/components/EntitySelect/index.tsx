import * as React from 'react';
import styled from 'styled-components';
import { useSafeMutativeReducer } from '../../hooks/useSafeMutativeReducer';
import { Center } from '../Center';
import {
  EntitySelectContext,
  EntitySelectContextType,
  Locales
} from './EntitySelectContext';
import { initialState, reducer } from './modules/reducer';
import { EntitySelectOtherType, EntitySelectValue } from './modules/types';
import { PickerButton } from './PickerButton';
import { PickerDialog } from './PickerDialog';
import { SearchBox } from './SearchBox';
import { SearchResultPopup } from './SearchResultPopup';
import { SelectedEntityList } from './SelectedEntityList';
import type { Repositories } from './modules/repositories';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';
import { Entity } from '../../models/entity';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  return (
    <div className={className}>
      <Center horizontal={false} vertical>
        <div className={`${className}__searchBox`}>
          <SearchBox />
          <SearchResultPopup />
        </div>
        <div className={`${className}__pickerButton`}>
          <PickerButton />
          <PickerDialog />
        </div>
      </Center>
      <SelectedEntityList />
    </div>
  );
};

const StyledComponent: React.VFC = styled(Component)`
  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }
  font-size: ${designTokens.fonts.size[5]};
  color: ${designTokens.colors.mineShaft};
  line-height: 1.5;
  display: inline-block;

  &__searchBox {
    position: relative;
  }

  &__pickerButton {
    padding-left: 8px;
  }
`;

type OuterProps = {
  values: EntitySelectValue[];
  changeValues: (values: EntitySelectValue[]) => void;
  placeholder: string;
  pickerIconComponent: React.ReactNode;
  pickerDialogTitle: string;
  userAvailable?: boolean;
  organizationAvailable?: boolean;
  groupAvailable?: boolean;
  otherTypes?: EntitySelectOtherType[];
  multipleSelection?: boolean;
  shouldFocus?: boolean;
  repositories: Repositories;
  locales: Locales;
  getDisplayName: (entity: Entity) => string;
  getLabelAddButton: (count?: number) => string;
  /**
   * KLOG-5698用のフラグ。
   * trueのとき、EntityLabelを折り返します。ツールチップは表示しません。
   * falseのとき、従来どおり省略表示＋ツールチップです。
   */
  wrapEntityLabel?: boolean;
} & Pick<React.AriaAttributes, 'aria-labelledby' | 'aria-required'>;

export type EntitySelectProps = OuterProps;

const Container: React.VFC<OuterProps> = ({
  values,
  changeValues,
  placeholder,
  pickerIconComponent,
  pickerDialogTitle,
  userAvailable = false,
  organizationAvailable = false,
  groupAvailable = false,
  otherTypes = [],
  multipleSelection = true,
  shouldFocus = false,
  repositories,
  locales,
  getDisplayName,
  getLabelAddButton,
  'aria-labelledby': ariaLabelledby,
  'aria-required': ariaRequired,
  wrapEntityLabel = true
}) => {
  const [state, dispatch] = useSafeMutativeReducer(reducer, initialState);
  const contextValue: EntitySelectContextType = {
    state,
    dispatch,
    values,
    changeValues,
    placeholder,
    pickerIconComponent,
    pickerDialogTitle,
    userAvailable,
    organizationAvailable,
    groupAvailable,
    otherTypes,
    multipleSelection,
    shouldFocus,
    repositories,
    locales,
    getDisplayName,
    getLabelAddButton,
    wrapEntityLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-required': ariaRequired
  };

  return (
    <EntitySelectContext.Provider value={contextValue}>
      <StyledComponent />
    </EntitySelectContext.Provider>
  );
};

export const EntitySelect = Container;
