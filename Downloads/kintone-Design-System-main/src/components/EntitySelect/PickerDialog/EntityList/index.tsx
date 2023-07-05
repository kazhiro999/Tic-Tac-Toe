import * as React from 'react';
import { EntitySelectEntity } from '../../modules/types';
import { EntityItem } from './EntityItem';
import { EntitySelectContext } from '../../EntitySelectContext';
import { isSameEntitySelectEntity } from '../../functions/isSameEntitySelectEntity';
import { buildEntitySelectOperations } from '../../modules/operations';
import { ReadMoreItem } from './ReadMoreItem';
import { isArrowDownKey, isArrowUpKey } from '../../../../functions/key';
import { getEntityTypeId } from '../../../../functions/entity';
import styled from 'styled-components';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  entities: EntitySelectEntity[] | null;
  selectedEntities: EntitySelectEntity[] | null;
  'aria-labelledby': string;
  selectEntity: (entity: EntitySelectEntity) => void;
  unselectEntity: (entity: EntitySelectEntity) => void;
  readMoreShown: boolean;
  focusableEntityTypeId: string | null;
  shouldFocus: boolean;
  clearShouldFocus: () => void;
  createHandleKeyDown: (
    entity: EntitySelectEntity
  ) => React.KeyboardEventHandler<HTMLButtonElement>;
};

export const Component: React.VFC<Props & PropsForStyled> = ({
  entities,
  selectedEntities,
  'aria-labelledby': ariaLabelledby,
  selectEntity,
  unselectEntity,
  readMoreShown,
  focusableEntityTypeId,
  shouldFocus,
  clearShouldFocus,
  createHandleKeyDown,
  className
}) => {
  if (entities === null || selectedEntities === null) {
    return null;
  }

  return (
    <ul
      role="listbox"
      aria-multiselectable
      aria-labelledby={ariaLabelledby}
      className={className}
    >
      {entities.map((entity) => {
        const selected = isSelected(entity, selectedEntities);
        const focusable = getEntityTypeId(entity) === focusableEntityTypeId;
        return (
          <EntityItem
            key={getEntityTypeId(entity)}
            entity={entity}
            selected={selected}
            focusable={focusable}
            shouldFocus={shouldFocus}
            clearShouldFocus={clearShouldFocus}
            onClickButton={() =>
              selected ? unselectEntity(entity) : selectEntity(entity)
            }
            onKeyDown={createHandleKeyDown(entity)}
          />
        );
      })}
      {readMoreShown && <ReadMoreItem />}
    </ul>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  margin: 0;
  padding: 0;
  list-style: none;
`;

type OuterProps = {
  'aria-labelledby': string;
};

const Container: React.VFC<OuterProps> = ({
  'aria-labelledby': ariaLabelledby
}) => {
  const { state, dispatch, multipleSelection, repositories, locales } =
    React.useContext(EntitySelectContext);
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });
  const selectEntity = (entity: EntitySelectEntity) => {
    entitySelectOperations.selectEntityInPickerDialog(
      dispatch,
      entity,
      multipleSelection
    );
  };
  const unselectEntity = (entity: EntitySelectEntity) => {
    entitySelectOperations.unselectEntityInPickerDialog(dispatch, entity);
  };

  const createHandleKeyDown =
    (entity: EntitySelectEntity) =>
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isArrowDownKey(e)) {
        entitySelectOperations.focusNextEntityFromEntitiesInPickerDialog(
          dispatch,
          entity
        );
      }

      if (isArrowUpKey(e)) {
        entitySelectOperations.focusPreviousEntityFromEntitiesInPickerDialog(
          dispatch,
          entity
        );
      }
    };

  const clearShouldFocus = () => {
    entitySelectOperations.clearShouldFocusEntityInPickerDialog(dispatch);
  };

  return (
    <StyledComponent
      entities={state.pickerDialog.entities}
      selectedEntities={state.pickerDialog.selectedEntities}
      aria-labelledby={ariaLabelledby}
      selectEntity={selectEntity}
      unselectEntity={unselectEntity}
      readMoreShown={state.pickerDialog.readMoreShown}
      focusableEntityTypeId={state.pickerDialog.focusableEntityTypeId}
      shouldFocus={state.pickerDialog.shouldFocusEntity}
      clearShouldFocus={clearShouldFocus}
      createHandleKeyDown={createHandleKeyDown}
    />
  );
};

export const EntityList = Container;

const isSelected = (
  entity: EntitySelectEntity,
  selectedEntities: EntitySelectEntity[]
) =>
  selectedEntities.some((selectedEntity) =>
    isSameEntitySelectEntity(selectedEntity, entity)
  );
