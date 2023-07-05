import * as React from 'react';
import styled from 'styled-components';
import { assert } from '../../../../functions/asserts/assert';
import { EntitySelectContext } from '../../EntitySelectContext';
import { buildEntitySelectOperations } from '../../modules/operations';
import { PICKER_DIALOG_TAB_TYPE } from '../../modules/types';
import { isArrowDownKey, isArrowUpKey } from '../../../../functions/key';
import { designTokens } from '../../../../designTokens';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  buttonElRef: React.Ref<HTMLButtonElement>;
  focusable: boolean;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onBlur: React.FocusEventHandler<HTMLButtonElement>;
  buttonLabel: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonElRef,
  focusable,
  onClickButton,
  onKeyDown,
  onBlur,
  buttonLabel
}) => {
  return (
    <li className={className} role="presentation">
      <button
        className={`${className}__button`}
        type="button"
        ref={buttonElRef}
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="option"
        tabIndex={focusable ? 0 : -1}
        onClick={onClickButton}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        {buttonLabel}
      </button>
    </li>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  background-color: ${designTokens.colors.athensGray};
  margin: 0;
  padding: 0;

  &__button {
    height: 48px;
    width: 100%;
    padding: 0 26px;
    border: none;
    background-color: transparent;
    color: ${designTokens.colors.curiousBlue};
    cursor: pointer;
    outline: none;
    :lang(en) & {
      font-family: ${designTokens.fonts.family.en};
    }
    font-size: ${designTokens.fonts.size[5]};
    line-height: 1.5;

    &:focus {
      background-color: ${designTokens.colors.geyser};
    }
  }
`;

const Container: React.VFC = () => {
  const { state, dispatch, repositories, locales } =
    React.useContext(EntitySelectContext);
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  const handleClickButton = async () => {
    if (
      state.pickerDialog.selectedTabType === PICKER_DIALOG_TAB_TYPE.ORGANIZATION
    ) {
      const organizationId = state.pickerDialog.selectedOrganizationId;
      assert(organizationId);
      await entitySelectOperations.fetchMoreOrganizationUsersInPickerDialog(
        dispatch,
        organizationId,
        state.pickerDialog.userSize
      );
    } else if (
      state.pickerDialog.selectedTabType === PICKER_DIALOG_TAB_TYPE.GROUP
    ) {
      const groupId = state.pickerDialog.selectedGroupId;
      assert(groupId);
      await entitySelectOperations.fetchMoreGroupUsersInPickerDialog(
        dispatch,
        groupId,
        state.pickerDialog.userSize
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isArrowDownKey(e)) {
      entitySelectOperations.focusNextEntityFromReadMoreInPickerDialog(
        dispatch
      );
    }

    if (isArrowUpKey(e)) {
      entitySelectOperations.focusPreviousEntityFromReadMoreInPickerDialog(
        dispatch
      );
    }
  };

  const clearShouldFocus = React.useCallback(() => {
    buildEntitySelectOperations(repositories, {
      creatorNameLabel: locales.creatorNameLabel
    }).clearShouldFocusEntityInPickerDialog(dispatch);
  }, [dispatch, repositories, locales.creatorNameLabel]);

  const buttonElRef = React.useRef<HTMLButtonElement>(null);
  const { readMoreEntitiesFocused, shouldFocusEntity } = state.pickerDialog;
  const focusable = readMoreEntitiesFocused === true;

  React.useEffect(() => {
    if (buttonElRef.current !== null && focusable && shouldFocusEntity) {
      buttonElRef.current.focus();
    }
  }, [focusable, shouldFocusEntity]);

  return (
    <StyledComponent
      buttonElRef={buttonElRef}
      focusable={focusable}
      onClickButton={handleClickButton}
      onKeyDown={handleKeyDown}
      onBlur={clearShouldFocus}
      buttonLabel={locales.readMoreButtonLabel}
    />
  );
};

export const ReadMoreItem = Container;
