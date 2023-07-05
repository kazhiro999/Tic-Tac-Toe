import clsx from 'clsx';
import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../../designTokens';
import { IconButton } from '../../../IconButton';
import { EntitySelectEntity } from '../../modules/types';
import { getEntityTypeId } from '../../../../functions/entity';
import { EntitySelectContext } from '../../EntitySelectContext';
import { GroupIcon, GroupWhiteIcon } from '../../../../icons';
import { PropsForStyled } from '../../../../typings/propsForStyled';
import { ENTITY_TYPE } from '../../../../models/entity';

type Props = {
  children?: React.ReactNode;
  listElRef: React.Ref<HTMLLIElement>;
  entity: EntitySelectEntity;
  selected: boolean;
  focusable: boolean;
  expandButtonShown: boolean;
  expanded?: boolean;
  'aria-owns'?: string;
  onNameButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onExpandButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLLIElement>;
  onBlur: React.FocusEventHandler<HTMLLIElement>;
  expandButtonIcon: React.ReactNode;
  expandButtonAlternativeText: string;
  buttonText: string;
  wrapEntityLabel: boolean;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className,
  listElRef,
  entity,
  selected,
  focusable,
  expandButtonShown,
  expanded,
  'aria-owns': ariaOwns,
  onNameButtonClick,
  onExpandButtonClick,
  onKeyDown,
  onBlur,
  expandButtonIcon,
  expandButtonAlternativeText,
  buttonText,
  wrapEntityLabel
}) => {
  const entityTypeId = getEntityTypeId(entity);
  const itemId = `entityselect-pickerdialog-item-${entityTypeId}`;

  return (
    <li
      className={clsx(className, {
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときは、次の行を削除する
        [`${className}__ellipsis`]: !wrapEntityLabel
      })}
      ref={listElRef}
      role="treeitem"
      aria-labelledby={itemId}
      aria-owns={ariaOwns}
      aria-expanded={expandButtonShown ? expanded : undefined}
      tabIndex={focusable ? 0 : -1}
      aria-selected={selected}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <div
        className={clsx(`${className}__buttons`, {
          [`${className}__buttons-selected`]: selected
        })}
      >
        <button
          id={itemId}
          className={`${className}__nameButton`}
          type="button"
          // KLOG-5698対応
          // TODO: 省略表示の提供を終了するときはtitle属性を削除する
          title={wrapEntityLabel ? undefined : buttonText}
          tabIndex={-1}
          onClick={onNameButtonClick}
        >
          {buttonText}
        </button>
        {expandButtonShown && (
          <span className={`${className}__expandButton`}>
            <IconButton
              alternativeText={expandButtonAlternativeText}
              width={32}
              height={32}
              iconWidth={9}
              iconHeight={14}
              icon={expandButtonIcon}
              tabIndex={-1}
              onClick={onExpandButtonClick}
              rotate={expanded ? 90 : undefined}
              hideOutline
            />
          </span>
        )}
      </div>
      {children}
    </li>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  margin: 0;
  padding: 0;
  outline: none;

  &__buttons {
    display: inline-flex;
    max-width: 100%;
  }

  // selected状態でないとき
  &__buttons:not(&__buttons-selected) {
    color: ${designTokens.colors.doveGray};
    background-color: ${designTokens.colors.snow};

    &:hover {
      background-color: ${designTokens.colors.geyser};
    }

    // buttonsの外側のli要素にフォーカスしている場合(1つ目のセレクタ)と、buttons直下の要素にフォーカスしている場合(2つ目のセレクタ)がある
    *:focus > &,
    &:focus-within {
      background-color: ${designTokens.colors.geyser};
    }
  }

  // selected状態のとき
  &__buttons&__buttons-selected {
    color: ${designTokens.colors.snow};
    background-color: ${designTokens.colors.curiousBlue};

    &:hover {
      background-color: ${designTokens.colors.darkenCuriousBlue10};
    }

    // buttonsの外側のli要素にフォーカスしている場合(1つ目のセレクタ)と、buttons直下の要素にフォーカスしている場合(2つ目のセレクタ)がある
    *:focus > &,
    &:focus-within {
      background-color: ${designTokens.colors.darkenCuriousBlue10};
    }
  }

  &__nameButton {
    background-color: inherit;
    color: inherit;
    font-size: ${designTokens.fonts.size[4]};
    padding: 8px;
    border: 0;
    text-align: left;
    outline: none;
    cursor: pointer;
    :lang(en) & {
      font-family: ${designTokens.fonts.family.en};
    }
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  &__expandButton {
    flex-shrink: 0;
    padding-top: 3px;
  }

  // KLOG-5698対応
  // TODO: 省略表示の提供を終了するときは、__ellipsis以下のCSSをまるごと削除する
  &__ellipsis &__buttons {
    align-items: center;
  }

  &__ellipsis &__nameButton {
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__ellipsis &__expandButton {
    padding-top: 0;
  }
`;

type OuterProps = {
  children?: React.ReactNode;
  entity: EntitySelectEntity;
  selected: boolean;
  focusable: boolean;
  shouldFocus: boolean;
  clearShouldFocus: () => void;
  expandButtonShown: boolean;
  expanded?: boolean;
  'aria-owns'?: string;
  onNameButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onExpandButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLLIElement>;
};

const Container: React.VFC<OuterProps> = ({
  shouldFocus,
  clearShouldFocus,
  ...others
}) => {
  const { getDisplayName, locales, wrapEntityLabel } =
    React.useContext(EntitySelectContext);
  const listElRef = React.useRef<HTMLLIElement>(null);
  const { focusable, entity, expanded, selected } = others;
  const name =
    entity.entityType === ENTITY_TYPE.CREATOR
      ? entity.name
      : getDisplayName(entity);

  React.useEffect(() => {
    if (listElRef.current !== null && focusable && shouldFocus) {
      listElRef.current.focus();
    }
  }, [focusable, shouldFocus]);

  return (
    <StyledComponent
      listElRef={listElRef}
      expandButtonAlternativeText={
        expanded ? locales.expandButtonLabel : locales.collapseButtonLabel
      }
      expandButtonIcon={selected ? <GroupWhiteIcon /> : <GroupIcon />}
      buttonText={name}
      onBlur={clearShouldFocus}
      wrapEntityLabel={wrapEntityLabel}
      {...others}
    />
  );
};

export const LeftPaneEntityItem = Container;
