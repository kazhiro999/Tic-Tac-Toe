import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../designTokens';
import { IconButton } from '../../IconButton';
import { EntitySelectValue } from '../modules/types';
import { getEntityTypeId } from '../../../functions/entity';
import { EntitySelectContext } from '../EntitySelectContext';
import { EntityIcon } from '../EntityIcon';
import { UserSelectRemoveIcon } from '../../../icons';
import { PropsForStyled } from '../../../typings/propsForStyled';
import clsx from 'clsx';

type Props = OuterProps & {
  label: string;
  alternativeText: string;
  wrapEntityLabel: boolean;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  value,
  onDeleteButtonClick,
  label,
  alternativeText,
  wrapEntityLabel
}) => {
  const entityTypeId = getEntityTypeId(value);
  const itemId = `entityselect-selectedentitylist-item-${entityTypeId}`;

  return (
    <li
      className={clsx(className, {
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときは、次の行を削除する
        [`${className}__ellipsis`]: !wrapEntityLabel
      })}
      data-testid="shared-EntitySelect-SelectedEntity"
    >
      <EntityIcon entity={value} alternativeText="" width={24} height={24} />
      <span
        className={`${className}__name`}
        id={itemId}
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときはtitle属性を削除する
        title={wrapEntityLabel ? undefined : label}
      >
        {label}
      </span>
      <IconButton
        alternativeText={alternativeText}
        width={24}
        height={24}
        iconWidth={12}
        iconHeight={12}
        icon={<UserSelectRemoveIcon />}
        aria-describedby={itemId}
        onClick={onDeleteButtonClick}
      />
    </li>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  width: 280px;
  box-sizing: border-box;
  border-bottom: 1px solid ${designTokens.colors.porcelain};
  margin: 0;
  padding: 0;
  margin-top: 8px;

  &__name {
    flex: 1;
    margin-left: 8px;
    font-size: ${designTokens.fonts.size[4]};
    overflow-wrap: anywhere;
  }

  // KLOG-5698対応
  // TODO: 省略表示の提供を終了するときは、__ellipsis以下のCSSをまるごと削除する
  &__ellipsis {
    align-items: center;
  }

  &__ellipsis &__name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

type OuterProps = {
  value: EntitySelectValue;
  onDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Container: React.VFC<OuterProps> = ({ value, ...props }) => {
  const { locales, getDisplayName, wrapEntityLabel } =
    React.useContext(EntitySelectContext);
  const name = getDisplayName(value);

  return (
    <StyledComponent
      {...props}
      value={value}
      label={name}
      alternativeText={locales.deleteButtonAlternativeText}
      wrapEntityLabel={wrapEntityLabel}
    />
  );
};

export const SelectedEntityItem = Container;
