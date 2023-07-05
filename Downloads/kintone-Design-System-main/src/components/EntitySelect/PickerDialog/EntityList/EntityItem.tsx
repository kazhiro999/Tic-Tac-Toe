import { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../../designTokens';
import { EntitySelectEntity } from '../../modules/types';
import clsx from 'clsx';
import { EntitySelectContext } from '../../EntitySelectContext';
import { EntityIcon } from '../../EntityIcon';
import { Icon } from '../../../Icon';
import { MultipleSelectSelectedIcon } from '../../../../icons';
import { PropsForStyled } from '../../../../typings/propsForStyled';
import { ENTITY_TYPE } from '../../../../models/entity';

type Props = {
  buttonElRef: React.Ref<HTMLButtonElement>;
  entity: EntitySelectEntity;
  name: string;
  selected: boolean;
  focusable: boolean;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onBlur: React.FocusEventHandler<HTMLButtonElement>;
  wrapEntityLabel: boolean;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  buttonElRef,
  entity,
  name,
  selected,
  focusable,
  onClickButton,
  onKeyDown,
  onBlur,
  wrapEntityLabel
}) => (
  <li className={className} role="presentation">
    <button
      className={clsx(`${className}__button`, {
        [`${className}__button-selected`]: selected,
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときは、次の行を削除する
        [`${className}__ellipsis`]: !wrapEntityLabel
      })}
      type="button"
      ref={buttonElRef}
      role="option"
      tabIndex={focusable ? 0 : -1}
      aria-selected={selected}
      onClick={onClickButton}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <div
        className={clsx(`${className}__selectedicon`, {
          [`${className}__selectedicon-selected`]: selected
        })}
      >
        <Icon
          icon={<MultipleSelectSelectedIcon />}
          width={13}
          height={11}
          alternativeText=""
        />
      </div>
      <EntityIcon width={32} height={32} alternativeText="" entity={entity} />
      <span
        className={`${className}__button-name`}
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときはtitle属性を削除する
        title={wrapEntityLabel ? undefined : name}
        aria-selected={false}
      >
        {name}
      </span>
    </button>
  </li>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  align-items: center;
  color: ${designTokens.colors.mineShaft};
  margin: 0;
  padding: 0;

  &:nth-of-type(even) {
    background-color: ${designTokens.colors.athensGray};
  }

  &__selectedicon {
    width: 16px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px 8px 4px 0;

    :not(&-selected) {
      visibility: hidden;
    }
  }

  &__button {
    display: flex;
    min-height: 48px;
    width: 100%;
    padding: 8px;
    text-align: left;
    border: none;
    background-color: transparent;
    color: inherit;
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

    &-selected,
    &-selected:focus {
      color: ${designTokens.colors.curiousBlue};
    }

    &-name {
      flex: 1;
      padding-left: 4px;
      margin: 4px 0;
      overflow-wrap: anywhere;
    }
  }

  // KLOG-5698対応
  // TODO: 省略表示の提供を終了するときは、__ellipsis以下のCSSをまるごと削除する
  &__ellipsis &__selectedicon {
    margin: 0 8px 0 0;
  }

  &__ellipsis&__button {
    align-items: center;
    height: 48px;
    min-height: unset;
    padding: 0 8px;
  }

  &__ellipsis &__button-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
  }
`;

type OuterProps = {
  entity: EntitySelectEntity;
  selected: boolean;
  focusable: boolean;
  shouldFocus: boolean;
  clearShouldFocus: () => void;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
};

const Container: React.VFC<OuterProps> = ({
  clearShouldFocus,
  shouldFocus,
  entity,
  ...others
}) => {
  const buttonElRef = useRef<HTMLButtonElement>(null);
  const { focusable } = others;
  const { getDisplayName, wrapEntityLabel } = useContext(EntitySelectContext);
  const name =
    entity.entityType === ENTITY_TYPE.CREATOR
      ? entity.name
      : getDisplayName(entity);

  useEffect(() => {
    if (buttonElRef.current !== null && focusable && shouldFocus) {
      buttonElRef.current.focus();
    }
  }, [focusable, shouldFocus]);

  return (
    <StyledComponent
      buttonElRef={buttonElRef}
      onBlur={clearShouldFocus}
      entity={entity}
      name={name}
      wrapEntityLabel={wrapEntityLabel}
      {...others}
    />
  );
};

export const EntityItem = Container;
